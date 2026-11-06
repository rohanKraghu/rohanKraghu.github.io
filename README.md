# rohankraghu.github.io

A static personal site. No build step, no dependencies, no framework: the
files here are served exactly as they are.

```
index.html                  Portfolio. Professional mode (Work gallery, Experience, About) and Personal mode (#personal).
robots.txt, sitemap.xml     For search engines. Add new top-level pages to sitemap.xml
sitemap.txt                 and sitemap.txt (a plain-text copy Search Console reads more easily).
assets/                     Images and documents linked from the portfolio.
assets/og-src/              Source pages for the social share cards. Not linked from the site.
countersign/index.html      Countersign, the startup: what it is and build progress.
honest-backtest/index.html  Honest Backtest, the engine and the Sharpe study.
transit-detection/          Finding Planets in Starlight, the TESS vetting pipeline.
```

## Replacing the resume or the CV

**Use Drive's "Manage versions" on the existing file. Do not delete and
re-upload.**

Both links point at a Google Drive file ID. Uploading a replacement mints a
new ID, which leaves the old links pointing at a file that no longer exists.
Nothing on the site errors, and nothing in the repository changes: the links
simply start 404ing for visitors, and you will not find out unless you click
them yourself.

In Drive: right-click the file, **Manage versions**, **Upload new version**.
The ID, and therefore every link, stays the same.

If a file ID does have to change, each document is referenced twice in
`index.html`, in the hero rail and again in the footer. Update both.

| Document | Drive file ID |
|---|---|
| Resume | `1UW79_YkT75EXo4CSBRI5zAsjaoH72mxc` |
| CV | `1a4m2MELCSOLzXVYQ5rJhc83yZAnm_Ekg` |

## Numeraldo

Numeraldo and its crash course live at [numeraldo.org](https://numeraldo.org),
from the separate repository `rohanKraghu/numeraldo`. Because that
repository has a custom domain, `rohankraghu.github.io/numeraldo/` redirects
there automatically, so do not add a `numeraldo/` folder here: GitHub Pages
would ignore it. Link to `https://numeraldo.org` instead.

## Updating the Countersign progress

The milestone list, the progress bar, the hero's "Current milestone" and
the build log on the Countersign page all render from one object near the
bottom of `countersign/index.html`:

```js
const COUNTERSIGN = { lastUpdated: "...", milestones: [ ... ], log: [ ... ] };
```

When a milestone lands, set its `status` from `"now"` to `"done"`, set the
next one to `"now"`, add a line to the top of `log`, and change
`lastUpdated`. Status is one of `"done"`, `"now"` or `"next"`. With no
`"now"` milestone, the page shows the first `"next"` one as the next
milestone.

Keep it high level: no unreleased evaluation numbers, licensing plans or
customer names.

## Adding a photo to the Personal stage

The scattered frames under `#personal` are plain `.float` divs. Each one
needs three things, and the third is easy to miss:

1. An 800 x 1000 WebP in `assets/`: `me-<thing>.webp` for a photo of you,
   `astro-<thing>.webp` for a telescope image. The frame is 4:5 and the
   image is `object-fit:cover`, so crop to 4:5 first rather than letting
   the browser choose what to cut.
2. A `<span class="when">` with the year, after the `<img>`. Every frame
   carries one.
3. A `.float:nth-child(N)` rule giving it `left` and `top`, in the main
   block **and** in the `max-width:680px` block. Without it the frame has no
   position of its own and stacks in the corner.

Frames are in reverse date order and the karate photo stays last, because
the About text refers to it as the last photo.

The current layout holds ten. The front photo sits in the middle, so the
others live in two columns down each side on desktop and a ring on mobile.
A frame's `top` has to leave room for its own height, which is about 34% of
the stage on desktop and 21% on mobile: past `top:64%` and `top:78%` it
hangs off the bottom. An eleventh photo does not just need a position, it
needs the frames made smaller or the stage made taller, which is what
`.stage{height}` and `.float{width}` control at each breakpoint.

## The page build-in

On every load the page assembles itself: six cursors fan out across the
header, the hero and the tab bar, each drawing a box around an element with
a size badge on it, and each element fades up as its box completes. It runs
for about one and three quarter seconds and then removes itself from the DOM.

Thirteen elements carry `data-build`. At animation time only the ones
inside the viewport are animated, so on a phone that is about eight and the
rest are simply shown when the holding class comes off. Six cursors work
concurrently in six colours, each with its own box, so several boxes are
being drawn at any moment.

Everything is CSS transitions. There is no animation loop, and nothing runs
after it finishes.

It does not run when the visitor asked for reduced motion, or when
JavaScript is off, in which case the markup renders as written. It stops
early and shows everything the moment the visitor scrolls, clicks, types or
taps. If the main script never runs, the inline script in `<head>` clears
the holding class after four seconds anyway, so the page can never be left
invisible. No content is created by JavaScript: crawlers and reader modes
see the full markup.

To make it quieter: raise `STEP`, lower the cursor count `K`, or drop
`data-build` from whichever elements should not be held back. To remove it
entirely: drop all the `data-build` attributes, the `.build` rules in the
stylesheet, the last block in the script, and restore the one-line `<head>`
script to `document.documentElement.className="js"`.

The idea comes from the Swarm Rebuild Chrome extension and, behind it, Joel
Califa's Swarm. Neither is reused here: that extension's source carries no
licence and asks that it not be reused, so this is an independent and much
smaller implementation of the same idea.

## Social share cards

Every page carries an Open Graph image: the 1200 x 630 card that Slack,
iMessage, LinkedIn and X show when the link is posted.

| Page | Card |
|---|---|
| `index.html` | `assets/og.png` |
| `countersign/index.html` | `assets/og-countersign.png` |
| `honest-backtest/index.html` | `assets/og-honest-backtest.png` |
| `transit-detection/index.html` | `assets/og-transit-detection.png` |

Each card is drawn by the page of the same name in `assets/og-src/`, using
that section's own palette, typefaces and figures. To change one: edit its
source, open it in a browser sized to exactly 1200 x 630, screenshot it, and
replace the PNG. Nothing links to these sources and nothing imports them.

The `og:image` URLs are absolute and all point at `rohankraghu.github.io`.

## Conventions

- **No em dashes.** Colons, semicolons, commas and brackets instead. En
  dashes are used for ranges, such as `Sep 2024 – Present`.
- **No comments** in HTML, CSS or JavaScript, which is why this file exists.
- **No inline styles.** Everything lives in the page's own `<style>` block,
  or in `assets/course.css` for the crash course.
- **Straight apostrophes**, not curly.
- **Relative paths** throughout the crash course, so the folder can be moved
  or served from its own subdomain unchanged. Its README covers that.

## Deploying

GitHub Pages builds from `main`. A push deploys; there is nothing else to
run. Check the run under the repository's Actions tab if a change does not
appear.

If every page shows GitHub's "There isn't a GitHub Pages site here", Pages
has been switched off, and no commit will fix it. In the repository's
Settings, under Pages, set Source to "Deploy from a branch", branch `main`,
folder `/ (root)`, and save. The next build brings the site back.
