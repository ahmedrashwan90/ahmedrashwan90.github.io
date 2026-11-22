# Ahmed Rashwan Portfolio

Bilingual Arabic/English portfolio built with Astro 7. The deployable project root is this folder; original project directories and strategy documents stay outside it. The site is static and has no backend.

## Local review

```sh
npm install
npm run dev
```

Astro prints the local URL. The root route forwards to `/ar/`.

To review a GitHub Pages style subpath in PowerShell:

```powershell
$env:BASE_PATH='/portfolio-review/'
npm run build
npm run preview -- --port 4321
```

Open `http://localhost:4321/portfolio-review/ar/`. The built pages use responsive AVIF/WebP variants at multiple widths; gallery images load lazily and the hero portrait loads eagerly.

## Build and deployment

```sh
npm ci
npm run build
npm run preview
```

The build runs Astro diagnostics/type checking before generating `dist/`.

Use this folder as the root of the Git repository you connect to GitHub. Then:

1. Push the `main` branch.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. The workflow reads the actual Pages origin and base path from `actions/configure-pages`, builds the static site, and deploys `dist/`.

This supports both repository subpaths and root-level user/organization sites. Set a custom domain in GitHub Pages before deploying to it. No production hostname is baked into the source, and no external repository or deployment has been created.
