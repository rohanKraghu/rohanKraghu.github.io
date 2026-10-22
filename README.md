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
numeraldo/index.html        Numeraldo, the nonprofit.
numeraldo/crash-course/     Financial Literacy Crash Course (its own README).
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

## Updating the Numeraldo figures

Every number on the Numeraldo page renders from one object near the bottom
of `numeraldo/index.html`:

```js
const NUMERALDO = { goal: 25000, lastUpdated: "...", programs: [ ... ] };
```

The hero ledger, the fundraising meter, the allocation table and its
percentages all derive from it. Edit that block and nothing else.

One exception: the share card `assets/og-numeraldo.png` repeats the three
hero figures and is a flat image, so it does not follow. Regenerate it when
they change, as below.

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
| `numeraldo/index.html` | `assets/og-numeraldo.png` |
| `numeraldo/crash-course/`, all four pages | `assets/og-crash-course.png` |
| `countersign/index.html` | `assets/og-countersign.png` |
| `honest-backtest/index.html` | `assets/og-honest-backtest.png` |

Each card is drawn by the page of the same name in `assets/og-src/`, using
that section's own palette, typefaces and figures. To change one: edit its
source, open it in a browser sized to exactly 1200 x 630, screenshot it, and
replace the PNG. Nothing links to these sources and nothing imports them.

The `og:image` URLs are absolute and all point at `rohankraghu.github.io`,
including the ones on the Numeraldo pages. `numeraldo.org` is a separate
site and does not serve these files.

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
