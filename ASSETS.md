# Assets still needed

Every image slot is listed in `src/_data/assets.json`. While a slot's `src` is empty, the site shows a labelled placeholder.
Nothing official has been invented.

To add a real asset:

1. Put the file in the folder shown below.
2. In `assets.json`, set `src` (e.g. `/assets/brand/rollabop-logo.svg`), `width`, `height` and `alt`, and set `placeholder` to `false`.
3. Rebuild. The placeholder, and its "coming soon" note, disappear.

| Slot | Folder | Format & size | Currently shows |
|------|--------|---------------|-----------------|
| `rollabopLogo` | `src/assets/brand/` | Transparent SVG preferred, or PNG/WebP ≥ 2400px wide | **Interim** wordmark (`rollabop-wordmark.webp`) lifted from the approved reference. See note below |
| `lippyLogo` | `src/assets/brand/` | SVG preferred, or transparent PNG | "Lippy Robotics Labs" in text |
| `appIcon` | `src/assets/icons/` | 512×512 PNG | Placeholder favicon (`favicon-placeholder.svg`); no social image |
| `galaxyBall` | `src/assets/galaxy/` | Square, transparent background, ≥ 1200px, WebP or PNG | Interim SVG illustration, labelled on the page |
| `heroArt` (optional) | `src/assets/galaxy/` or `brand/` | Tall render of the tray, WebP | Built-in CSS tray illustration, labelled on the page |
| `screenshots.gameplay1` | `src/assets/screenshots/` | Portrait phone screenshot, WebP (~1080×2400) | Labelled phone-frame placeholder |
| `screenshots.gameplay2` | `src/assets/screenshots/` | as above | Labelled placeholder |
| `screenshots.levelSelect` | `src/assets/screenshots/` | as above, once the real screen exists | Labelled placeholder |
| `screenshots.titleScreen` | `src/assets/screenshots/` | as above | Reserved slot (not yet placed on a page) |
| `googlePlayBadge` | `src/assets/store/` | Official badge from Google's badge generator | Hidden until `release.playStoreUrl` is set |

### The Rollabop wordmark

The approved direction is the gold script "Rollabop", with the gold ball as the second "o" and the long curved sweep underneath.
The reference is kept in `brand-source/rollabop-wordmark-reference.png`. It is not published.

The site currently uses `src/assets/brand/rollabop-wordmark.webp`. This was extracted from that reference: the wood background was removed and it was upscaled 2×.
It looks right, but the source is only 596px wide, so it's slightly soft on high-density screens. The bottom of the "p" is also cropped, as it is in the reference.

For the final version, supply a clean master with a transparent background: SVG, or PNG/WebP at least 2400px wide, with the full "p" descender.
Drop it in `src/assets/brand/` and update `src`, `width` and `height` in `assets.json`. Keep `alt` as "Rollabop"; that is the text screen readers and search engines use.

The wordmark is used only for the brand: the hero, header, footer and About page title. All headings and body text stay in the site typefaces.

Also still to provide, in `src/_data/site.json`:

- `release.playStoreUrl`: when the listing is live
- `supportEmail`: the official support address
- `url`: the domain, once you have one
- `version`: at release
- `social`: official community links, if any

**Tip:** convert screenshots to WebP (e.g. `cwebp -q 82 in.png -o out.webp`) to keep pages fast.
