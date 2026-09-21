# Financial Literacy Crash Course

A self-contained static mini-site: two free courses, one for teens and one for seniors.

```
crash-course/
├── index.html        Hub — overview, both tracks, notes for facilitators
├── teens.html        Track 1 — 8 modules + 2 calculators + 8-question quiz
├── seniors.html      Track 2 — 8 modules + worksheet + scam checker + quiz
├── glossary.html     47 terms, searchable, filterable by track
└── assets/
    ├── course.css    Design tokens (inherited from numeraldo.org) + all layout
    └── course.js     Scrollspy, text-size control, quizzes, checklist persistence
```

No build step, no dependencies, no framework. Open `index.html` in a browser and it works.

## Getting around

The header nav is not the only way between pages, because on a phone it is a sideways-scrolling
strip and a reader halfway down a track should not have to go back up to it. Every track page also
carries:

- a **track-switch button in the hero** (`Teens track →` / `Seniors track →`),
- a **switch link pinned under the sticky syllabus**, visible the whole way down the page,
- a **"Keep going" card band** above the fine print, linking the other track, the glossary and the
  overview,
- the same **four footer links** on every page.

If you add a page to the folder, add it to all four places.

## It is built to move to a subdomain

Every internal link and asset reference is **relative** (`teens.html`, `assets/course.css`) — there
are no absolute `/` paths anywhere. That means the same files work unchanged at:

- `rohankraghu.github.io/numeraldo/crash-course/` (where it lives today)
- `numeraldo.org/crash-course/` (once the Numeraldo site moves to its own domain)
- `learn.numeraldo.org/` or `money.numeraldo.org/` (a subdomain root, later)
- a local folder, a USB stick, or any static host

The folder has already been moved once — from the repository root into `numeraldo/` — without a
single edit. That is the design working as intended.

The only absolute URLs are deliberate outbound ones: the main site, Google Fonts, and the government
resources in the seniors track.

### Moving it to Cloudflare Pages

1. Point the subdomain's DNS at Cloudflare and create a Pages project from this repository.
2. Set the **build output directory** to `numeraldo/crash-course` and leave the build command
   empty — it is already static.
3. Add the custom domain (e.g. `learn.numeraldo.org`) in the Pages project.

The folder becomes the site root; `index.html` becomes the landing page. Nothing in the HTML changes.

If the old paths are already indexed, add a redirect from the previous location to the new one so
links keep working.

### Moving it into WordPress

The pages are plain HTML, so there are two sane options:

- **Keep them static.** Host the folder on the subdomain (Cloudflare Pages, or the host's static
  directory) and link to it from WordPress. Fastest, and nothing breaks.
- **Port the content.** Paste each module into the editor and load `assets/course.css` via the theme.
  The calculators, quizzes, and checklists need `assets/course.js` plus the per-page scripts at the
  bottom of `teens.html` and `seniors.html` — most WordPress themes require a plugin to allow inline
  `<script>`, so the static option is usually less work.

## Editing

- **Design tokens** (colors, fonts, spacing) live at the top of `assets/course.css` and match the main
  Numeraldo site. Change them in one place and both tracks follow. Dark mode is handled there too.
- **Module content** is plain HTML in each track file, wrapped in `<article class="module" id="mN">`.
  Adding a module means copying that block and adding a matching entry to the `.toc` list — the
  scrollspy and progress counter pick it up automatically.
- **Reusable blocks:** `.domath` (worked example), `.term` (definition list), `.flag` (red-flag
  callout), `.safe` (do-this callout), `.check` (self-saving checklist), `.tool` (calculator),
  `.q` (quiz question — put the correct option key in `data-answer`), `.cnav` (a card in the
  "Keep going" band).
- **No inline styles.** Spacing and color live in `assets/course.css`; the few one-off needs are
  utility classes there (`.lead`, `.sub-note`, `.aside-note`, `.note.spaced`).
- **Nothing is collected.** The calculators run in the browser; checklists use `localStorage` on the
  reader's own device, wrapped in try/catch so private browsing degrades gracefully. There is no
  analytics, no form, and no third-party script beyond the Google Fonts stylesheet.

## Accuracy

Worked examples were computed rather than estimated; the compound-interest method was checked against
the standard published figure for $100/month at 7% over 40 years ($262,481). Figures that change with
legislation — contribution limits, RMD ages, tax brackets — are deliberately described qualitatively
with a note to confirm current numbers, so the pages don't go stale or wrong.

Every page carries an educational-use disclaimer. The material describes United States rules.
