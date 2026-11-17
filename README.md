# Innovation Club · GJU

The official Innovation Club website at German Jordanian University. A six-page static site built with HTML, CSS, and vanilla JavaScript, hosted on GitHub Pages.

**Live website:** [innovationclub.online](https://innovationclub.online/)

No framework, package installation, build step, backend, database, or CMS is required. Typography uses Outfit and DM Sans from Google Fonts, with system-font fallbacks.

## Pages

| Page | Live URL | Source |
| --- | --- | --- |
| Home | [/](https://innovationclub.online/) | [index.html](index.html) |
| Our Team | [/team/](https://innovationclub.online/team/) | [team/index.html](team/index.html) |
| Events | [/events/](https://innovationclub.online/events/) | [events/index.html](events/index.html) |
| Programs | [/programs/](https://innovationclub.online/programs/) | [programs/index.html](programs/index.html) |
| Photo Archive | [/archive/](https://innovationclub.online/archive/) | [archive/index.html](archive/index.html) |
| Messages from Past Members | [/past-members-messages/](https://innovationclub.online/past-members-messages/) | [past-members-messages/index.html](past-members-messages/index.html) |

## Website features

- Dark theme with Amber and Teal accents and an animated lightbulb on Home.
- Responsive navigation, active-page indicators, and an Archive dropdown with a plus/minus indicator.
- Founder and Past President in one featured section: two equal columns at 1024px and above, stacked below 1024px.
- Current leadership, confirmed teams, new members, and former members on Our Team.
- Five past events, three program formats, and eight real photographs in the Photo Archive.
- A native-dialog photo lightbox with Close/Escape, focus restoration, and background scroll locking.
- Keyboard focus styles, a skip link, and reduced-motion support. Without JavaScript, core content, navigation links, the native Archive disclosure, and static gallery remain available.
- The authentic message from Etedal Ereiqat (Lala), preserved verbatim, with a reusable template for more approved messages.

## Project structure

```text
index.html                         Home
team/index.html                    Our Team
events/index.html                  Events
programs/index.html                Programs
archive/index.html                 Photo Archive
past-members-messages/index.html   Messages from Past Members
css/styles.css                     Shared styles and responsive rules
js/main.js                         Navigation, lightbox, and animation controls
assets/
  icons/favicon.svg
  images/
    brand/                         Original club logo
    leadership/                    Original portraits and optimized/ variants
    events/                        Event display images
    archive/                       Archive display images
    team/                          Group photos and supplied archive originals
    originals/                     Preserved original club photographs
docs/
  membership-review.md             Current roster and identity decisions
  release-review.md                Historical browser QA record
team.html, events.html,
programs.html, archive.html,
past-members-messages.html         Legacy redirect pages
.gitignore                         Excludes local test output
CNAME                              Existing custom domain
```

## Clean URLs and older links

GitHub Pages serves the `index.html` inside each page folder. Use trailing slashes in page links, such as `/team/`, and root-relative paths for shared files, such as `/css/styles.css` or `/assets/images/brand/logo.png`. Canonical and Open Graph URLs use the clean routes.

The five legacy `.html` pages contain a canonical link, a meta refresh, a JavaScript `location.replace`, and a normal fallback link. They are HTML redirects served with HTTP 200, not server-side 301 redirects. With JavaScript, query strings and fragments are carried to the destination, for example `/events.html#passionate-innovators` to `/events/#passionate-innovators`.

An explicit `/index.html` visit redirects to `/` through a conditional script. Visiting `/` does not redirect. Without JavaScript, `/index.html` still displays Home with `/` as its canonical URL. Keep these compatibility files for old bookmarks.

## Local preview

Start a static HTTP server from the repository root. Opening pages through `file://` is not supported because navigation and asset paths start at `/`. Google Fonts needs an internet connection; the rest of the site uses local files.

If Python is already installed:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

If Node.js is already installed, this PowerShell alternative uses only its built-in modules:

```powershell
@'
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(process.cwd());
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const name = decodeURIComponent(url.pathname);
    let file = path.resolve(root, '.' + name);
    if (name.split('/').some(part => part.startsWith('.')) ||
        (file !== root && !file.startsWith(root + path.sep))) {
      res.writeHead(403).end(); return;
    }
    if ((await fs.stat(file)).isDirectory()) {
      if (!name.endsWith('/')) {
        res.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return;
      }
      file = path.join(file, 'index.html');
    }
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(8000, '127.0.0.1', () => console.log('http://127.0.0.1:8000/'));
'@ | node
```

Open **http://127.0.0.1:8000/** and follow the page links. Stop the server with **Ctrl+C**. Both examples bind only to your computer; no package install is needed.

## Membership and public statistics

The directory currently contains **36 unique people**:

| Category | Count |
| --- | --- |
| Current members | 28: 2 Leadership, 16 other team members, 10 New Members |
| Past Members | 6, including Amin Alsadi |
| Founder | 1: Mohannad Awawdeh |
| Past President | 1: Hasan Abuzaid |

Founder and Past President have their own featured cards and are excluded from ordinary Past Members. People without a confirmed team remain under Our New Members. Leadership profiles appear once; their team affiliations do not create duplicate team-list entries.

Home intentionally displays **25+ Current members / 5+ Operational teams / 3 Core program formats**. These approximate public statistics do not replace the exact roster. Only four confirmed team groups are listed; do not invent another team to match the display.

Use [docs/membership-review.md](docs/membership-review.md) for the full roster, aliases, confirmed assignments, and remaining assignment uncertainty. Update it and the totals here whenever membership changes. Do not infer identities or team assignments from similar names.

## Editing pages and shared components

Edit the directory-based source pages, not the legacy redirect files. Keep core content in HTML. Navigation and footer markup are repeated across all six source pages, so update them together when changing shared links or contact information.

Use [css/styles.css](css/styles.css) for design changes and [js/main.js](js/main.js) for interactive behavior. Our Team references a versioned stylesheet URL to avoid mixing new HTML with old cached CSS; update that version when needed for related stylesheet changes.

### Leadership photographs

Originals are in `assets/images/leadership/`; display copies are in its `optimized/` folder.

| Person | Original filename | Display filename prefix |
| --- | --- | --- |
| Mohannad Awawdeh — Founder | `Mohannad Awadeh.jpg` | `mohannad-awawdeh-` |
| Ali Al-Qudah — President | `Ali.jpg` | `ali-al-qudah-` |
| Noorshan Zaza — Vice President | `Noorshan Zaza.jpg` | `noorshan-zaza-` |
| Hasan Abuzaid — Past President | `Hasan_Abuzaid.jpg` | `hasan-abuzaid-` |

Each prefix has 320px and 640px JPEG variants. Preserve originals, faces, proportions, and verified identity mappings. To replace a photo, update the matching `data-profile-photo` slot, `src`, `srcset`, actual dimensions, and `sizes`. Portrait frames use `object-fit: contain`; adjacent names identify the decorative images.

### Archive photographs

1. Use an approved real photo, retain its original, and reuse an existing display asset when possible.
2. For a new image, place proportional JPEG variants in `assets/images/archive/`, with descriptive lowercase filenames and accurate dimensions. Do not invent event details or dates.
3. Copy a `figure.archive-card` in [archive/index.html](archive/index.html). Give it a unique ID, factual title/caption, descriptive `alt`, and correct `src`, `srcset`, and `sizes`.
4. Keep `data-lightbox`, `data-photo-src`, `data-photo-title`, and an optional concise `data-photo-caption` on `div.archive-photo-frame`. Use root-relative image paths, including the larger lightbox image.
5. JavaScript upgrades the frame to a photo button. Without JavaScript or native-dialog support, it remains a static gallery. Do not add raw-image links.
6. Add only selected previews to Home, linking to `/archive/#the-photo-id`.

Responsive JPEG variants and preserved originals are intentional. The conference variant ending in `1280.jpg` is actually 1065px wide and uses a `1065w` descriptor.

### Authentic past-member messages

In [past-members-messages/index.html](past-members-messages/index.html):

1. Obtain the member's real message and permission to publish it. Verify any optional role, photo, or date separately.
2. Copy the article from `template#past-member-message-template` into `div#member-messages`.
3. Fill `h3[data-message-name]` and the paragraphs inside `blockquote[data-message-text]`. Preserve every character, punctuation mark, emoji, capitalization, and supplied paragraph break. Escape HTML-sensitive characters without changing the rendered text.
4. Keep optional photo, role, and date fields hidden until verified. For a supplied image, provide its real path, dimensions, and appropriate alternative text. For a verified date, set the correct ISO `datetime`.
5. Never publish an unfilled card or invent a message. Keep the inert template for future additions. No submission form or backend is used.

Etedal Ereiqat and Lala are one person. Her card displays **Etedal Ereiqat (Lala)**; adding her message does not create another directory profile.

## Verification and release

Before publishing, check all six clean routes, internal anchors, asset references, legacy redirect targets, and canonical URLs. Run available static checks without adding dependencies:

```powershell
node --check js/main.js
git diff --check
git status --short
```

For visual or interaction changes, review mobile and desktop layouts, portraits, navigation, keyboard focus, reduced motion, and Lightbox Close/Escape. Past browser checks are recorded in [docs/release-review.md](docs/release-review.md); that file is a historical snapshot, not the current membership source. The clean-URL migration and latest membership addition were verified with static checks and ordinary HTTP requests, without new browser automation or screenshots.

GitHub Pages publishes from **`main`, repository root `/`**, at the existing custom domain. Normally develop on `development` and use a reviewed Pull Request. Direct pushes to `main` require explicit authorization. Fetch the latest remote state, preserve unrelated work, test, review staged files, and use a normal push. Never force-push or bypass branch protection.

Keep `CNAME` and domain settings unchanged. After a release, confirm that the matching GitHub Pages deployment succeeded, then check the live routes and assets; a successful push alone does not prove the site has updated.

[.gitignore](.gitignore) excludes `.playwright-mcp/`, `playwright-report/`, and `test-results/`. Keep local screenshots, browser logs, helpers, and test output out of commits. Do not ignore production images under `assets/images/`.
