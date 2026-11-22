import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));

/* ---------- Mobile menu ---------- */
const menu = $<HTMLButtonElement>('.menu-toggle');
const nav = $('#primary-nav');
const setMenu = (open: boolean) => { menu?.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('is-open', open); };
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

/* ---------- Header: glass when scrolled, hides on scroll down ---------- */
const header = $('.site-header');
const progress = $('.scroll-progress');
let lastY = window.scrollY;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  const menuOpen = menu?.getAttribute('aria-expanded') === 'true';
  header?.classList.toggle('is-hidden', !menuOpen && y > 420 && y > lastY + 2);
  if (y < lastY - 2) header?.classList.remove('is-hidden');
  lastY = y;
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Split headline into words (keeps Arabic letters joined) ---------- */
function splitWords(el: HTMLElement) {
  const wrap = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent ?? '').split(/(\s+)/).filter(Boolean).map(part => {
        if (/^\s+$/.test(part)) return document.createTextNode(part);
        const outer = document.createElement('span'); outer.className = 'word';
        const inner = document.createElement('span'); inner.className = 'word-inner'; inner.textContent = part;
        outer.append(inner); return outer;
      });
    }
    const outer = document.createElement('span'); outer.className = 'word';
    (node as HTMLElement).classList.add('word-inner');
    outer.append(node); return [outer];
  };
  Array.from(el.childNodes).forEach(child => { const parts = wrap(child.cloneNode(true)); child.replaceWith(...parts); });
  return $$('.word-inner', el);
}

if (!reduce) {
  /* ---------- Hero intro ---------- */
  const heroItems = $$('[data-hero-in]');
  if (heroItems.length) {
    const headline = $<HTMLElement>('[data-split]');
    const words = headline ? splitWords(headline) : [];
    const portrait = $('[data-portrait]');
    const chips = $$('.float-chip, .float-card');
    const others = heroItems.filter(el => el !== headline && !el.classList.contains('portrait-wrap'));
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    gsap.set(heroItems, { opacity: 1 });
    tl.from(others, { y: 26, opacity: 0, duration: 1, stagger: 0.07 }, 0.1)
      .from(words, { yPercent: 115, rotate: 3, duration: 1.1, stagger: 0.045 }, 0.2);
    if (portrait) {
      tl.fromTo(portrait, { clipPath: 'inset(100% 0% 0% 0% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.3, ease: 'expo.inOut' }, 0.15)
        .from($('img', portrait), { scale: 1.25, duration: 1.6, ease: 'expo.out' }, 0.35)
        .from('.portrait-ring', { scale: 0.86, opacity: 0, duration: 1.2 }, 0.45)
        .from(chips, { y: 18, scale: 0.85, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'back.out(1.6)' }, 0.9);
      // gentle idle float once they are in
      chips.forEach((chip, i) => gsap.to(chip, { y: i % 2 ? 7 : -7, duration: 2.6 + i * 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.9 }));
    }
    tl.from('.tools-strip', { opacity: 0, y: 20, duration: 1 }, 0.9);
  }

  /* Hero glow + portrait follow the pointer a little */
  const glow = $('.hero-glow');
  const heroShell = $('.hero-shell');
  if (finePointer && heroShell && glow) {
    const gx = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3.out' });
    const gy = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3.out' });
    const pw = $('.portrait-wrap');
    const px = pw ? gsap.quickTo(pw, 'x', { duration: 1, ease: 'power3.out' }) : null;
    const py = pw ? gsap.quickTo(pw, 'y', { duration: 1, ease: 'power3.out' }) : null;
    heroShell.addEventListener('pointermove', e => {
      const r = heroShell.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      gx(nx * 120); gy(ny * 90); px?.(nx * -14); py?.(ny * -10);
    });
  }

  /* ---------- Section headings ---------- */
  $$('.section-heading, .detail-narrative, .detail-aside, .about-copy, .about-label, .contact-copy, .next-project-inner, .tracks-section h2').forEach(el => {
    const kids = el.children.length ? Array.from(el.children) : [el];
    gsap.from(kids, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  /* Detail page hero */
  const detailHeading = $('.detail-heading');
  if (detailHeading) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(Array.from(detailHeading.children), { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.1)
      .fromTo('.detail-cover', { clipPath: 'inset(0% 0% 100% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.3, ease: 'expo.inOut' }, 0.1)
      .from('.detail-cover img', { scale: 1.2, duration: 1.6 }, 0.3);
  }

  /* ---------- Card grids: staggered rise ---------- */
  const cardSel = '.expertise-card, .project-card, .service-card, .track-card, .gallery-figure, .work-card';
  gsap.set(cardSel, { y: 60, opacity: 0 });
  ScrollTrigger.batch(cardSel, {
    start: 'top 90%', once: true,
    onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true, clearProps: 'transform' }),
  });

  /* Project cover images drift inside their frame while scrolling */
  $$('.project-image picture').forEach(pic => {
    gsap.fromTo(pic, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: pic.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Post rows: image wipes in, caption follows ---------- */
  $$('.post-row').forEach((row, i) => {
    const media = $('.post-media', row), copy = $('.post-copy', row);
    const fromSide = (i % 2 === 0) === (document.documentElement.dir === 'rtl') ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', once: true } });
    tl.from(row, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' })
      .fromTo(media, { clipPath: fromSide }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0.1)
      .from($('img', media!), { scale: 1.15, duration: 1.4, ease: 'expo.out' }, 0.3)
      .from(copy ? Array.from(copy.children) : [], { x: document.documentElement.dir === 'rtl' ? -30 : 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 0.5);
  });

  /* ---------- Process timeline draws itself ---------- */
  const steps = $$('.step');
  if (steps.length) {
    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 820px)', narrow: '(max-width: 819px)' }, ctx => {
      const wide = ctx.conditions?.wide;
      const lines = $$('.step-line');
      gsap.set(lines, wide ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.steps-grid', start: 'top 80%', end: wide ? 'top 35%' : 'bottom 60%', scrub: 0.8 } });
      steps.forEach((step, i) => {
        tl.from($('.step-count', step), { scale: 0.4, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, i * 0.5)
          .from([$('h3', step), $('p', step)], { y: 20, opacity: 0, duration: 0.35, stagger: 0.05 }, i * 0.5 + 0.1);
        if (lines[i]) tl.to(lines[i], wide ? { scaleX: 1, duration: 0.5, ease: 'none' } : { scaleY: 1, duration: 0.5, ease: 'none' }, i * 0.5 + 0.2);
      });
    });
  }

  /* ---------- Contact panel ---------- */
  const panel = $('.contact-panel');
  if (panel) gsap.from(panel, { scale: 0.92, opacity: 0, y: 40, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 85%', once: true } });

  /* Big background monogram drifts */
  const mark = $('.about-mark');
  if (mark) gsap.to(mark, { yPercent: -60, ease: 'none', scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer) {
    // spotlight that follows the cursor across cards
    $$('.expertise-card, .project-card, .service-card, .post-row, .track-card, .work-card').forEach(card => {
      card.classList.add('has-spotlight');
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
    // magnetic primary buttons
    $$('.button-cyan, .button-blue, .button-dark').forEach(btn => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('pointermove', e => { const r = btn.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.25); yTo((e.clientY - r.top - r.height / 2) * 0.35); });
      btn.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  // images that finish loading late change layout: keep trigger positions right
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ---------- Lightbox ---------- */
const dialog = $<HTMLDialogElement>('#lightbox');
const dialogImage = dialog ? $<HTMLImageElement>('.lightbox-image', dialog) : null;
const caption = dialog ? $('.lightbox-caption', dialog) : null;
const captionWrap = dialog ? $('.lightbox-caption-wrap', dialog) : null;
const source = dialog ? $<HTMLAnchorElement>('.lightbox-source', dialog) : null;
const triggers = $$<HTMLButtonElement>('[data-gallery-item]');
let index = 0, lastTrigger: HTMLElement | null = null;
const show = (n: number) => {
  if (!dialog || !dialogImage || !triggers.length) return;
  index = (n + triggers.length) % triggers.length;
  const button = triggers[index];
  dialogImage.src = button.dataset.full ?? '';
  dialogImage.alt = button.dataset.alt ?? '';
  if (caption) caption.textContent = button.dataset.caption ?? '';
  if (captionWrap) captionWrap.hidden = !button.dataset.caption;
  if (source) { source.href = button.dataset.source ?? ''; source.textContent = button.dataset.source ? `${button.dataset.sourceLabel ?? 'Source'} ↗` : ''; source.hidden = !button.dataset.source; }
  if (!reduce) gsap.fromTo(dialogImage, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
};
triggers.forEach((button, n) => button.addEventListener('click', () => { lastTrigger = button; show(n); dialog?.showModal(); dialog?.focus(); }));
dialog?.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
dialog?.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => lastTrigger?.focus());
dialog?.addEventListener('keydown', event => { if (event.key === 'ArrowRight') show(index + 1); if (event.key === 'ArrowLeft') show(index - 1); });


/* ---------- Carousel posts ---------- */
$$('[data-carousel]').forEach(carousel => {
  const track = $('.carousel-track', carousel)!;
  const slides = $$('.carousel-slide', carousel);
  const dots = $$('.carousel-dots span', carousel);
  const current = $('[data-carousel-current]', carousel);
  const prev = $<HTMLButtonElement>('[data-carousel-prev]', carousel);
  const next = $<HTMLButtonElement>('[data-carousel-next]', carousel);
  const at = () => Math.round(track.scrollLeft / track.clientWidth);
  const go = (i: number) => track.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  const update = () => {
    const i = at();
    dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    if (current) current.textContent = String(i + 1);
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === slides.length - 1;
  };
  prev?.addEventListener('click', e => { e.stopPropagation(); go(at() - 1); });
  next?.addEventListener('click', e => { e.stopPropagation(); go(at() + 1); });
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
});
