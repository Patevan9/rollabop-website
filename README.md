# Rollabop website

The official website for **Rollabop**, a game by Lippy Robotics Labs.

Live at **https://patevan9.github.io/rollabop-website/** once GitHub Pages is switched on.

A static site built with [Eleventy](https://www.11ty.dev/). It outputs plain HTML and CSS, plus one small optional script.
There is no framework in the browser. There are no cookies, analytics, tracking or third-party requests.

## Run it locally

```bash
npm install
npm start          # http://localhost:8080, reloads as you edit
npm run build      # outputs to _site
```

## Where to change things

| I want to…                                  | Edit                                   |
|---------------------------------------------|----------------------------------------|
| Change any wording on Home / How to Play    | `src/_data/copy.json`                  |
| Add the Play Store link, version, support email, domain | `src/_data/site.json`      |
| Add a logo, screenshot, Galaxy Ball art, app icon | `src/_data/assets.json` (see `ASSETS.md`) |
| Change colours, fonts, spacing              | `src/_includes/css/tokens.css`         |
| Change page layouts                         | `src/*.njk`, `src/_includes/`          |
| Menu links                                  | `src/_data/nav.json`                   |

Empty values are safe. The site hides or softens anything that isn't set yet.

### Going live on Google Play

1. In `site.json`, set `release.playStoreUrl` to the listing URL and `release.status` to `"available"`.
2. Put Google's official badge in `src/assets/store/`, and fill `googlePlayBadge` in `assets.json`.

The "Coming to Android" plaque is then replaced by the badge everywhere, and a Google Play link appears in the footer and on About.

### Adding a domain

Set `site.url` (e.g. `"https://rollabop.com"`, no trailing slash). This adds canonical links, social previews and `sitemap.xml`.
To use it with GitHub Pages, also add the domain under repo **Settings → Pages → Custom domain**.

### Publishing the privacy policy

The policy is a **draft**. While `privacy.status` is `"draft"`, it shows a review banner and asks search engines not to index it.
When it has been reviewed, fill in the "To be confirmed" sections in `src/privacy.njk`.
Then set `privacy.status` to `"final"` and add a `lastUpdated` date.

## The hero ball pile

The balls in the hero tray are a naturally settled pile. They were computed once, offline, by `scripts/generate-tray.mjs`.
No physics runs in the browser. To try a different arrangement:

```bash
node scripts/generate-tray.mjs 23     # any number = a different pile
```

## Deployment

`.github/workflows/website.yml` builds the site and publishes it to **GitHub Pages** on every push to `main`.
Pull requests get a build check only.

**One-time setup:** repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Without a custom domain, the site is served at `https://patevan9.github.io/rollabop-website/`. The build adds that prefix to all links automatically.

The `_site` folder is plain static files, so it can also be hosted on Netlify, Cloudflare Pages or any web host.

## Motion & accessibility

- All animation is subtle and switches off under the system's "reduce motion" setting.
- The site works fully without JavaScript. The script only adds the mobile menu, gentle section fades and slight hero depth.
- Skip link, visible focus rings, 48px touch targets, semantic landmarks, WCAG AA contrast throughout.

## Fonts

Cormorant Garamond (display) and Source Serif 4 (body) are self-hosted from `src/assets/fonts/` under the SIL Open Font License (licence files included).
