# Setup Guide — Turning This Into a Self-Editable Site

This site is now wired up to **Decap CMS**, a free visual editor. Once set up,
your customer logs into `yoursite.com/admin` and edits text, photos, and the
hero video through a simple form — no code, no you.

Total setup time: ~15 minutes. Everything below is free.

---

## Why this approach

The site is a single static `index.html` that now reads its content from
`content/site-data.json`. The admin panel edits that JSON file (and uploads
images/video into the `img/` and `videos/` folders) directly in your GitHub
repo. Netlify rebuilds and republishes automatically, in seconds, whenever
a change is saved — no server, no database, no monthly CMS fees.

---

## Step 1 — Put the site on GitHub

1. Create a free GitHub account if you don't have one: https://github.com/signup
2. Create a new **public or private repository** (e.g. `green-shoots-academy`).
3. Upload this entire project folder to that repository (drag-and-drop on
   github.com works fine, or use `git push` if you're comfortable with git).
   Make sure the folder structure stays intact:
   ```
   index.html
   admin/
     index.html
     config.yml
   content/
     site-data.json
   img/
   videos/
   ```

## Step 2 — Deploy to Netlify (free hosting)

1. Go to https://app.netlify.com and sign up (you can sign up with your GitHub account).
2. Click **"Add new site" → "Import an existing project"**.
3. Choose GitHub, then select the repository you just created.
4. Leave the build settings blank (no build command needed — it's a static
   site) and click **Deploy**.
5. Netlify will give you a URL like `random-name-123.netlify.app`. You can
   rename this later under **Site settings → Change site name**, or connect
   your own domain (e.g. `greenshootsacademy.ug`) under **Domain settings**.

## Step 3 — Turn on Identity + Git Gateway (this powers the login)

1. In your Netlify site dashboard, go to **Site settings → Identity**.
2. Click **Enable Identity**.
3. Scroll to **Registration preferences** and set it to **Invite only**
   (so random people can't sign up to your admin panel).
4. Scroll to **Services → Git Gateway** and click **Enable Git Gateway**.
   This lets the browser-based editor save changes back to GitHub on the
   customer's behalf, without them ever needing a GitHub account.

## Step 4 — Update the config file with your real site URL

1. Open `admin/config.yml` in the repo.
2. Replace both instances of `https://YOUR-SITE-NAME.netlify.app` with your
   actual Netlify URL from Step 2 (or your custom domain once connected).
3. Save/commit the change.

## Step 5 — Invite your customer

1. In Netlify: **Site settings → Identity → Invite users**.
2. Enter the customer's email. They'll receive an email invite, click it,
   set a password, and land on the admin panel automatically.
3. From then on they log in at `https://yoursite.com/admin`.

---

## What the customer can edit

Everything content-related, listed under one screen called **"Edit Website"**:
- Logo, academy name, tagline
- Homepage title, subtitle, background video and backup photo
- Sponsor logos
- Impact numbers (scoreboard)
- "Why Partner" cards
- Featured athletes (photos, names, stats)
- Athlete story banner
- Success story testimonials
- Programs and Projects lists
- Photo gallery (add/remove photos, tag by category)
- Contact info and social links
- Footer text

Each field has a plain-language label (e.g. "Homepage Banner (Hero)",
"Featured Athletes") — no code or file names are shown to them.

## What stays code-only (by design)

Colors, fonts, layout, and the registration/sponsor/donate forms stay in
the code, since changing those needs more care. If they ever want the
color scheme changed or a new section added, that's a good moment to loop
you back in.

## Testing locally before you deploy

You can preview the page (without the live CMS) any time by opening
`index.html` directly in a browser, or running a simple local server from
this folder:

```
python3 -m http.server 8000
```

then visiting `http://localhost:8000`. The `/admin` editor itself only
works once deployed to Netlify with Identity + Git Gateway turned on,
since it needs those services to save changes.
