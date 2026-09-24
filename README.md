# rohankraghu.github.io

A static personal site. No build step, no dependencies, no framework: the
files here are served exactly as they are.

```
index.html                  Portfolio. Work, Experience, About, contact.
assets/                     Images used by the portfolio page.
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
