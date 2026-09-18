# numeraldo.org

The Numeraldo website. **The whole site is one file: `index.html`.**

There is nothing to install, nothing to build, and no password to remember beyond your
GitHub login. To change the site you edit that one file here on GitHub and click
**Commit changes**. The live site updates about a minute later.

---

## How to edit anything

1. Click **`index.html`** in the file list above.
2. Click the **pencil icon** (top right of the file).
3. Make your change.
4. Scroll to the bottom, click **Commit changes**, then **Commit changes** again.
5. Wait ~1 minute and reload the site.

If you make a mistake, nothing is lost. Click the **History** link at the top of the file
list, open the version from before your change, and copy the old text back in.

---

## 1. Changing the money tracker

This is the part you will edit most. Near the **bottom** of `index.html` there is a block
that looks like this, marked with a comment telling you to edit it:

```js
const NUMERALDO = {
  goal: 25000,                 // fundraising goal for the year, in dollars
  lastUpdated: "September 2026",
  studentsWeekly: "40+",       // shown in the hero ledger
  partnerCount: "3",           // shown in the hero ledger
  programs: [
    {
      name: "Casio Calculator Access Initiative",
      amount: 5800,
      color: "#0E6E5C",
      desc: "Distribution, onboarding sessions, and classroom loaner sets for donated calculators."
    },
    ...
  ]
};
```

**Change the numbers here and the entire tracker redraws itself.** You never type a total,
a percentage, or a bar width anywhere — the page works all of that out:

| What you see on the page | Where it comes from |
|---|---|
| Total raised | All the `amount` lines added together |
| The percentage | Total raised ÷ `goal` |
| "$10,750 to go" | `goal` − total raised |
| The coloured bar | Each program's `amount` compared to the `goal` |
| The % beside each program | That program's share of the total raised |

**Rules for editing it:**

- `amount` and `goal` are plain numbers — no `$`, no commas. Write `5800`, not `$5,800`.
- Anything in `"quotes"` is text and can say whatever you like.
- Every line inside the block ends with a comma, except the last one before a `}`.
- To **add a program**, copy one whole `{ ... }` block including its braces, paste it after
  another one, put a comma between them, and change the four values.
- To **remove a program**, delete its `{ ... }` block and the comma before it.
- `color` is the little square beside the program name and its slice of the bar. Use one of
  the existing colours, or any hex code.

After editing, check the page: if the tracker area comes up blank, a comma or a brace is
missing. Use **History** to go back and try again.

---

## 2. Before the site is shown to anyone

**Every number on the site right now is invented as a placeholder.** They were needed to
build the page and must be replaced with real figures. The page currently admits this in
two places, and those two sentences must be deleted once the real numbers are in:

- In the Programs section: *"Every figure on this page marked in mono type is a placeholder…"*
- Under the tracker: *"Figures shown are placeholders pending confirmation."*

The full list of invented numbers to replace:

| Where | Currently says |
|---|---|
| Fundraising goal | $25,000 |
| Casio Calculator Access Initiative | $5,800 |
| Weekly Numeracy Club | $4,300 |
| Senior Financial Literacy Workshops | $2,600 — **does this program exist?** |
| Curriculum & Operations | $1,550 |
| Top of page | "40+" students weekly, "3" partners |
| Casio panel | 120 calculators, 4 sites, $6,400 retail value |
| Boys & Girls Club panel | 18 students per session, 32 sessions, 96 volunteer hours |
| Boys & Girls Club schedule | "Tuesdays · 4:00–5:15 pm", "Grades 4–8" |
| Partner "since" years | Casio 2026, Boys & Girls Club 2025 |
| Board of Advisors | Four blank cards |
| Event dates | 2026 dates on the Mensa workshop and the Casio launch |

**Two things to confirm before the site is public:**

1. The top of the page describes Numeraldo as a **501(c)(3) nonprofit**. If that
   registration is not complete, delete those three words — it is a legal claim.
2. The **Casio** and **Boys & Girls Club** names appear as partners. Both are trademarks.
   Using the name to describe a real partnership is normally fine; using their *logo* needs
   their permission (see §3).

---

## 3. Adding photos and logos

Create a folder called `images` in this repository (when you upload your first picture,
type `images/` before the filename and GitHub makes the folder for you).

**Founder portrait.** Find this line in `index.html`:

```html
<div class="portrait"><span class="initials">RKR</span></div>
```

and replace it with:

```html
<div class="portrait"><img src="images/rohan.jpg" alt="Rohan K. Raghu" style="width:100%;height:100%;object-fit:cover;border-radius:3px"></div>
```

Keep `object-fit:cover` — it stops the photo from being stretched. The frame is a tall
4:5 shape, so a portrait-orientation photo fits best.

**Partner logos.** Find the lines that read:

```html
<div class="logo-slot">CASIO</div>
```

and replace the text inside with an image:

```html
<div class="logo-slot"><img src="images/casio.svg" alt="Casio" style="max-height:44px;width:auto"></div>
```

Do this only once you have permission to use the logo. Most organisations have a
"brand" or "media" page with the rules, or will grant it if you ask.

---

## 4. The Board of Advisors section

There are four placeholder cards reading "Advisor name / Role · affiliation":

```html
<div class="card"><span class="initials">—</span><div class="nm">Advisor name</div><div class="rl">Role · affiliation</div></div>
```

Replace `Advisor name`, `Role · affiliation`, and the `—` (put their initials there).

**If the board's names are not going to be published, delete the whole section** — the
`<span class="eyebrow" ...>Board of Advisors</span>` line and the `<div class="board">`
block beneath it. Four blank cards look worse than no section at all.

---

## 5. Adding a donate link

Right now the **Support us** button and the **See where the money goes** button both scroll
down to the tracker. That is deliberate and honest — there is no donation page yet, so the
buttons do not pretend there is one.

When you have a donation link (PayPal Giving Fund, Givebutter, Zeffy, or similar), search
`index.html` for `href="#impact"` and change the **two button links** to your donation URL:

```html
<a class="btn" href="https://your-donation-link">Support us</a>
```

Leave the third one alone — that is the "Impact" item in the top menu, which should keep
scrolling down the page.

---

## 6. Putting numeraldo.org on this site

The site currently lives at `https://rohankraghu.github.io`. Moving the real domain across
is three steps **and the order matters**.

> **Do not create the `CNAME` file first.** The moment that file exists, GitHub forwards
> `rohankraghu.github.io` to `numeraldo.org` — which still points at the old WordPress site.
> The new site would disappear from view and the two would loop between each other.

**Step 1 — check the new site.** Open `https://rohankraghu.github.io` and read it top to
bottom on a computer and on a phone.

**Step 2 — change the DNS at your domain registrar.** Delete the existing `A` records for
`@` and add these four, plus the `www` record:

```
A      @     185.199.108.153
A      @     185.199.109.153
A      @     185.199.110.153
A      @     185.199.111.153
CNAME  www   rohankraghu.github.io
```

The old WordPress site stays up on its own while this spreads across the internet, which
takes anywhere from ten minutes to a few hours.

**Step 3 — switch the domain on.** Once `numeraldo.org` is pointing here:

1. Rename the file **`CNAME.pending`** in this repository to **`CNAME`** (open it, click the
   pencil, and delete `.pending` from the filename box at the top). It already contains the
   right text.
2. Go to **Settings → Pages**, type `numeraldo.org` into **Custom domain**, click **Save**.
3. Wait for the padlock check to finish (up to an hour), then tick **Enforce HTTPS**.

Then check all four of these load the new site: `numeraldo.org`, `www.numeraldo.org`,
`https://numeraldo.org`, and `rohankraghu.github.io`.

---

## 7. Things not to do

- **Do not delete `index.html`.** It is the entire site.
- **Do not rename `index.html`.** The name is what makes it the front page.
- **Do not add a website builder, a theme, or a framework** to this repository. The site is
  deliberately one plain file so that it never breaks, never needs updating, and can always
  be fixed by editing text. Anyone offering to "modernise" it is adding a thing that will
  need maintaining.
- **Do not paste in tracking or advertising scripts.** The site loads exactly one outside
  resource — the fonts from Google — and is faster and more private for it.

---

## Files in this repository

| File | What it is |
|---|---|
| `index.html` | The entire website. |
| `README.md` | This guide. |
| `CNAME.pending` | The custom domain, parked. Rename to `CNAME` at step 3 above — **not before**. |
| `.nojekyll` | Tells GitHub to publish the files exactly as they are. Leave it alone. |

Questions about the site: info@numeraldo.org
