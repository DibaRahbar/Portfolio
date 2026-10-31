# Diba Rahbar — Portfolio

Product design portfolio built with Vite, React, Tailwind, shadcn, and ReactBits. English and Persian (RTL).

## Develop

```bash
npm install
npm run dev
```

## Content

- Projects and websites: `src/data.ts`
- Interface text (EN / FA): `src/i18n.tsx`
- Colors: `src/index.css` and `src/theme.ts`
- Fonts: `public/` (Kalameh for English, Shazde for Persian)

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repo settings, set **Pages → Source** to **GitHub Actions** once.
