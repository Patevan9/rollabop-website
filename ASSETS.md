# Assets still needed

Every image slot is listed in `src/_data/assets.json`. While a slot's `src` is empty, the site shows a labelled placeholder.
Nothing official has been invented.

To add a real asset:

1. Put the file in the folder shown below.
2. In `assets.json`, set `src` (e.g. `/assets/brand/rollabop-logo.svg`), `width`, `height` and `alt`, and set `placeholder` to `false`.
3. Rebuild. The placeholder, and its "coming soon" note, disappear.

| Slot | Folder | Format & size | Currently shows |
|------|--------|---------------|-----------------|
| `rollabopLogo` | `src/assets/brand/` | ✅ **Done**: official transparent master, served as 480/960/1280px WebP | Official wordmark |
| `lippyLogo` | `src/assets/brand/` | SVG preferred, or transparent PNG | "Lippy Robotics Labs" in text |
| `appIcon` | `src/assets/icons/` | ✅ **Done**: framed Galaxy Ball icon, 512px, transparent corners | Link previews; 180px version for phone home screens |
| `favicon` | `src/assets/icons/` | ✅ **Done**: Galaxy Ball cut out as a circle, 32/48/192px | Browser tab icon |
| `galaxyBall` | `src/assets/galaxy/` | ✅ **Done**: official Galaxy Ball art, cut out as a circle, 480/900px WebP | Galaxy Balls section |
| `heroArt` (optional) | `src/assets/galaxy/` or `brand/` | Tall render of the tray, WebP | Built-in CSS tray illustration, labelled on the page |
| `screenshots.gameplay1` | `src/assets/screenshots/` | Portrait phone screenshot, WebP (~1080×2400) | Labelled phone-frame placeholder |
| `screenshots.gameplay2` | `src/assets/screenshots/` | as above | Labelled placeholder |
| `screenshots.levelSelect` | `src/assets/screenshots/` | as above, once the real screen exists | Labelled placeholder |
| `screenshots.titleScreen` | `src/assets/screenshots/` | as above | Reserved slot (not yet placed on a page) |
| `googlePlayBadge` | `src/assets/store/` | Official badge from Google's badge generator | Hidden until `release.playStoreUrl` is set |

### The Rollabop wordmark ✅

The official transparent master is kept at `brand-source/rollabop-wordmark-master.png` (2172×724). It is not published.
The site serves three sizes made from it (`src/assets/brand/rollabop-wordmark-480/960/1280.webp`), and each device picks the smallest one that stays sharp.
To update the logo later: replace the master, export the three widths again, and keep `alt` as "Rollabop".

The earlier reference image is kept as `brand-source/rollabop-wordmark-reference.png` for the record.

The wordmark is used only for the brand: the hero, header, footer and About page title.

Also still to provide, in `src/_data/site.json`:

- `release.playStoreUrl`: when the listing is live
- `supportEmail`: the official support address
- `url`: the domain, once you have one
- `version`: at release
- `social`: official community links, if any

**Tip:** convert screenshots to WebP (e.g. `cwebp -q 82 in.png -o out.webp`) to keep pages fast.
