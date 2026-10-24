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
