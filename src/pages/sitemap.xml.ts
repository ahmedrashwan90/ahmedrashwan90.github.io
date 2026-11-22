import type { APIRoute } from 'astro';
import {basePath,projects} from '../data/projects';
export const GET:APIRoute=({site})=>{
 if(!site)return new Response('Set SITE_URL to generate the production sitemap.',{status:404,headers:{'content-type':'text/plain; charset=utf-8'}});
 const paths=['/ar/','/en/',...projects.flatMap(p=>[`/ar/projects/${p.slug}/`,`/en/projects/${p.slug}/`])];
 const urls=paths.map(path=>{const slug=path.match(/\/projects\/([^/]+)/)?.[1];const alternates=slug?['ar','en'].map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${new URL(basePath(`/${lang}/projects/${slug}/`),site).href}"/>`).join(''):['ar','en'].map(lang=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${new URL(basePath(`/${lang}/`),site).href}"/>`).join('');return `<url><loc>${new URL(basePath(path),site).href}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${new URL(basePath(slug?`/ar/projects/${slug}/`:'/ar/'),site).href}"/></url>`}).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,{headers:{'content-type':'application/xml; charset=utf-8'}});
};
