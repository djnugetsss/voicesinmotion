# Deploying to Vercel and moving voicesinmotion.net

Two separate jobs: **get the site live on Vercel** (safe, reversible, no effect
on the current site), then **point the domain at it** (the only step visitors
notice). Do them in that order and there is no window where the site is down.

---

## Part 1: Get it on Vercel

### 1. Push to GitHub

```bash
git init                     # if this isn't a repo yet
git add -A
git commit -m "Voices In Motion site"
git branch -M main
git remote add origin https://github.com/<you>/voicesinmotion.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Pick the repository.
3. Vercel detects Next.js. **Change nothing**: build command, output directory
   and install command are all correct by default.
4. There are no environment variables to set. The site has no backend, no
   database and no API keys.
5. Deploy.

You get a URL like `voicesinmotion-xxxx.vercel.app`. Open it and click through
all three pages.

### 3. Check it properly before touching DNS

On the `.vercel.app` URL:

- [ ] Home and `/about` load, and `/media` redirects home (it is off: see `content/flags.ts`)
- [ ] Both Google Form links and the Calendly link open correctly
- [ ] The Instagram link goes to the right account
- [ ] It looks right on your phone, not just your laptop
- [ ] Paste the URL into Slack/iMessage and confirm the preview card renders

Every push to `main` now redeploys automatically. Pull requests get their own
preview URL.

---

## Part 2: Point the domain at it

### First: find out where DNS actually lives

This determines everything. In the Squarespace dashboard, go to
**Settings → Domains** and click `voicesinmotion.net`.

- **"Managed by Squarespace"** / it's listed under Squarespace's own domains →
  Squarespace is both the registrar and the DNS host.
- **"Connected domain"** / "Third-party domain" → the domain is registered
  somewhere else (GoDaddy, Namecheap, Cloudflare, Google Domains) and merely
  points at Squarespace. **Make your changes at that registrar, not in
  Squarespace.**

### Before you change anything: write down your MX records

**This is the step people skip and regret.** If `you@voicesinmotion.net` email
exists, it runs on `MX` records in the current DNS. Changing nameservers throws
those away and email stops arriving, silently.

In your DNS panel, screenshot or copy every existing record, `MX` especially,
plus any `TXT` records (SPF, DKIM, domain verification for Google Workspace
etc.). Keep them.

If you only use Gmail/Outlook at a personal address and nothing `@voicesinmotion.net`,
you have no MX to preserve and can skip this.

### Then: lower the TTL (a day ahead, if you can)

In the DNS panel, set the TTL on the existing `A` and `CNAME` records to
`300` (5 minutes). Wait a few hours. This makes the actual switch propagate in
minutes instead of up to 48 hours. Optional but worth it.

---

### Add the domain in Vercel

1. Vercel project → **Settings → Domains**.
2. Add `voicesinmotion.net`. Add `www.voicesinmotion.net` too.
3. Vercel will show you exactly which records to create. **Use the values on
   that screen**: they are authoritative and occasionally change. At time of
   writing they are:
   - apex `voicesinmotion.net` → `A` record → `76.76.21.21`
   - `www` → `CNAME` → `cname.vercel-dns.com`

### Now pick one of two paths

#### Path A: Keep DNS where it is, change two records (recommended)

Safest option, because every other record (**including MX**) stays exactly
as it is. Nothing about email can break.

In whichever panel hosts your DNS (Squarespace or your registrar):

1. **Delete** the existing Squarespace records:
   - the four `A` records on `@` pointing at `198.185.159.144`, `198.185.159.145`,
     `198.49.23.144`, `198.49.23.145` (these are Squarespace's, and yours may differ
     slightly)
   - the `CNAME` on `www` pointing at something like `ext-cust.squarespace.com`
   - any `CNAME` Squarespace added for domain verification
2. **Add** the two records Vercel gave you:
   - `A` · host `@` · value `76.76.21.21` · TTL 300
   - `CNAME` · host `www` · value `cname.vercel-dns.com` · TTL 300
3. **Leave everything else alone**: MX, TXT, SPF, DKIM all stay.

#### Path B: Move nameservers to Vercel

Only if you want Vercel managing DNS. Point the registrar's nameservers at
`ns1.vercel-dns.com` and `ns2.vercel-dns.com`, then **re-create every MX and
TXT record** in Vercel's DNS panel from the notes you took. If you have email
on this domain and aren't comfortable doing that, use Path A.

### Watch it go green

Back in Vercel → Settings → Domains, both entries show "Valid Configuration"
once DNS propagates (minutes if you lowered TTL, otherwise up to 48 hours).
Vercel issues the SSL certificate automatically. You don't need to do
anything for HTTPS.

Check from outside your own network, since your ISP may cache:

```bash
dig voicesinmotion.net +short          # expect 76.76.21.21
dig www.voicesinmotion.net +short      # expect a vercel-dns target
curl -sI https://voicesinmotion.net | head -1
```

Or use [dnschecker.org](https://dnschecker.org) to see propagation worldwide.

### Set the redirect

In Vercel → Domains, mark one as primary. Convention is apex
(`voicesinmotion.net`) as primary with `www` redirecting to it. Vercel handles
the 308 redirect.

---

## Part 3: Afterwards

### Don't cancel Squarespace immediately

Leave the Squarespace subscription running for **at least a week** after the
switch. If something is wrong you can repoint DNS back in minutes. Once you're
confident, cancel the *site* subscription.

**If Squarespace is also your domain registrar, cancelling the site does not
cancel the domain**, but check the renewal is still active, or you can lose
the domain. If you'd rather not leave the registration there, transfer it to
Vercel or another registrar *after* the site is stable, not during the switch.

### Tell Google about the change

1. [Google Search Console](https://search.google.com/search-console) → add
   `voicesinmotion.net` as a property (DNS TXT verification is easiest).
2. Submit `https://voicesinmotion.net/sitemap.xml`.

The sitemap and `robots.txt` are generated by the app at
`src/app/sitemap.ts` and `src/app/robots.ts`. There is no file to upload.

### If the old site had pages this one doesn't

If Squarespace had URLs that people link to and this site doesn't have, add
redirects in `next.config.ts` so those links don't 404:

```ts
async redirects() {
  return [
    { source: "/old-page", destination: "/", permanent: true },
  ];
}
```

---

## Rolling back

If anything goes wrong after the switch, change the `A` record back to the
Squarespace IPs you wrote down. With TTL at 300 you're back within minutes.

Separately, any bad *deploy* can be undone without touching DNS: Vercel →
Deployments → find the last good one → **Promote to Production**.
