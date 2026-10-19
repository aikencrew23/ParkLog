# ParkLog — web app

ParkLog is an offline logger for Parks on the Air activations. It installs to the Home Screen on iPhone and iPad, works with no signal, and keeps every contact on the device it was logged on. Nothing is sent to a server.

## What's in this folder

- `index.html` — the whole app, including the built-in POTA park list
- `sw.js` — lets the app open and run offline
- `manifest.webmanifest` and `icons/` — the Home Screen name and icon
- `_headers` — tells Netlify (and Cloudflare Pages) to always check for updates

## Put it online with GitHub Pages (free)

1. Create a **public** repository named `parklog`.
2. On the repository page choose **Add file → Upload files**, drag in everything from inside the `parklog` folder (index.html, sw.js, manifest.webmanifest, the icons folder and the rest), and commit.
3. Go to **Settings → Pages**. Under Build and deployment choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `yourname.github.io/parklog`.

### Use a custom domain (recommended before anyone installs it)

Each person's log is tied to the site's address. A custom domain keeps the address the same even if you later move the repository to another GitHub account.

1. In **Settings → Pages → Custom domain**, enter the address, for example `parklog.yourclub.org`, and save.
2. At your domain's DNS provider, add a **CNAME** record: name `parklog`, value `yourname.github.io`.
3. Back in Settings → Pages, tick **Enforce HTTPS** once it becomes available (it can take a little while after DNS is set).

To move to another GitHub account later: transfer the repository, turn Pages on again, enter the same custom domain, and change the CNAME value to the new account's `name.github.io`.

GitHub caches files for a few minutes, so updates can take a short while to reach phones. The `_headers` file only matters on Netlify; GitHub ignores it.

## Put it online with Netlify (free)

1. Go to app.netlify.com/drop and sign in (a free account keeps the site from expiring).
2. Drag the `parklog` folder, or the zip, onto the page.
3. Netlify gives you an address like `something-random.netlify.app`. Under Site configuration you can rename it, for example `parklog.netlify.app`.

Pick the address once and keep it. Each person's log is stored under the site's address, so moving to a new address later would leave everyone's logs behind at the old one. If you want your own domain, set it up before club members start using the app.

Any static host works the same way: Cloudflare Pages, GitHub Pages, or Static.app. The site must be served over HTTPS (all of these do it automatically).

## Install on iPhone or iPad

1. Open the site in Safari.
2. Tap Share, then **Add to Home Screen**.
3. Always open the logger from the Home Screen icon. That's the copy that keeps its data and works offline. The app shows a reminder if it's opened in a Safari tab.

Open it once while you have a connection so it can save itself for offline use.

## Publishing an update

1. Replace `index.html` with the new version.
2. In `sw.js`, change the `VERSION` line (for example `2026.10.19-1` to `2026.10.25-1`). Without this step, phones keep using the old copy.
3. Upload the changed files to the repository (or drag the folder onto your site's Deploys page in Netlify).

The next time someone opens the app with a connection, it shows "A new version of the logger is ready" with an **Update now** button. Their activations and contacts carry over.

## Data and backups

- Logs live only on each person's device. The site owner can't see anyone's contacts.
- Settings (the gear) → Backup and restore saves everything to one file. On iPhone, Save opens the share sheet, so choose **Save to Files** or AirDrop.
- Restore → Merge combines a backup with what's already on the device. That's also how two operators on separate phones combine logs after a multi-op activation.
- Deleting the Home Screen icon deletes that device's log, so back up first.
