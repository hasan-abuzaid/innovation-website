# Innovation Club · GJU

A six-page static website for Innovation Club at German Jordanian University. Built with HTML, CSS, and vanilla JavaScript. No packages, framework, or build step are required.

## Pages

- `index.html`: Home, About, Vision and Mission, What We Do, and Join Us.
- `team.html`: Founder, Our People, Our New Members, Past President, and Past Members, in that order.
- `events.html`: the five existing past events.
- `programs.html`: Expert on Campus, hackathons, and field trips.
- `archive.html`: Photo Archive with eight real photographs, concise titles/captions, and an optional lightbox.
- `past-members-messages.html`: an honest empty state and an inert reusable card template for real, approved messages.

## Structure

- `css/styles.css`: shared design tokens, layouts, components, responsive rules, and reduced motion styles.
- `js/main.js`: mobile navigation, click/touch/keyboard Archive disclosure, optional native-dialog photo lightbox with semantic photo buttons and background scroll locking, reveal effects, and original lightbulb motion controls.
- `assets/images/brand/`: original club logo.
- `assets/images/leadership/`: the four supplied original photographs; `optimized/` contains 320px and 640px versions.
- `assets/images/archive/`: 640px and 1600px versions of the supplied Vivid Leadership Conference and Career Fair photos. Their originals remain in `assets/images/team/`.
- `assets/images/events/` and `assets/images/team/`: responsive JPEG variants.
- `assets/images/originals/`: preserved original photos, not referenced by the pages.
- `assets/icons/favicon.svg`: bulb favicon; original logo PNG is a fallback.
- `docs/membership-review.md`: all 28 current members, the full original-directory comparison, and name-matching decisions.
- `CNAME`: existing custom domain; unchanged.

## Local preview

Open `index.html` in a browser and follow the navigation links. The six pages also work directly through file URLs. Google Fonts requires an internet connection; system font fallbacks are provided.

If Python is already installed, an optional local HTTP server can be started from this directory:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ and stop the server with Ctrl+C. No install or build command is required.

## Editing content

Keep core content in HTML so it remains available without JavaScript. Shared headers and footers are static markup on all six pages: update them together when changing navigation or contact links. Update the membership comparison when changing team membership. Do not infer team roles from a similar first name.

The original large images are retained. Responsive JPEG was used with the available local encoder; WebP/AVIF can be evaluated later without blocking local preview. The 1065px conference image has an accurate 1065w descriptor even though its large-variant filename ends in 1280.

The old 20-member board count and 1,500-member claim are not presented as current membership: the user confirmed 28 current members after explicitly adding Mahdi Alroomi. Hasan's former 20-member board is described only as historical context. Event facts and program descriptions come from the original website; exact dates and new positions were not invented.

## Public statistics and exact membership

Home displays 25+ Current members, 5+ Operational teams, and 3 Core program formats, as requested. The exact current roster is 28; the directory lists only confirmed teams and does not invent a fifth team. There are 10 members with no confirmed team, 5 ordinary Past Members, a separate Past President, and a separate Founder. See docs/membership-review.md for the corrected identity and assignment decisions.

## Leadership photographs

The real supplied photographs are connected to the existing cards in team.html:

| Person | Original photograph, retained | Display variants |
| --- | --- | --- |
| Mohannad Awawdeh — Founder | assets/images/leadership/Mohannad Awadeh.jpg | optimized/mohannad-awawdeh-320.jpg and -640.jpg |
| Ali Al-Qudah — President | assets/images/leadership/Ali.jpg | optimized/ali-al-qudah-320.jpg and -640.jpg |
| Noorshan Zaza — Vice President | assets/images/leadership/Noorshan Zaza.jpg | optimized/noorshan-zaza-320.jpg and -640.jpg |
| Hasan Abuzaid — Past President | assets/images/leadership/Hasan_Abuzaid.jpg | optimized/hasan-abuzaid-320.jpg and -640.jpg |

Variant paths are relative to assets/images/leadership/. The user supplied the identity mapping; do not swap people based on a similar name or appearance. Resizing and JPEG compression preserve the full image, faces, colors, and proportions. No retouching, generative editing, or content cropping was applied. Responsive portrait frames use object-fit: contain. The existing adjacent names identify decorative portraits, so alt is empty within aria-hidden frames.

To replace a portrait later, retain its original, optimize proportionally, update src/srcset and actual dimensions inside the matching data-profile-photo slot, and inspect it at phone and desktop widths.

## Adding archive photographs

1. Use an approved real photograph and retain its original. Do not infer an event date or other details from file metadata.
2. Reuse an existing optimized asset if the photo is already on Events or another page. For a new photo, use assets/images/archive/ with a descriptive lowercase filename. Produce proportionally resized versions, such as 640px and 1600px, without changing people or cropping faces.
3. Copy one figure.archive-card from archive.html. Set a unique figure id, a factual title/caption, descriptive alt, actual image dimensions, srcset widths, and a sizes value that matches the gallery.
4. The div.archive-photo-frame stores the larger image path in data-photo-src. Keep data-lightbox, data-photo-title, and an optional concise data-photo-caption. JavaScript upgrades the frame to a semantic button when native dialog is supported. Without JavaScript or dialog support, real images and captions remain a readable static gallery. Do not add raw-image anchors or visible file-opening links.
5. Add only selected previews to Home. Preview links go to archive.html#the-photo-id; do not duplicate the entire gallery on Home or Our Team.

The current archive has eight unique photos: Vivid Leadership Conference; Career Fair 2026; Passionate Innovators; EoC: Hisham Abubaker; Madaba Innovation Trail; Industrial Partnership Conference 2025; EoC: Eng. Salah Aloqabi; and one original club group photograph. Only the two newly supplied event photos need new archive assets; existing event and team variants are reused.

## Adding real messages from past members

No messages have been supplied, so no testimonial is displayed. The template in past-members-messages.html is inert and has no names, quotes, or made-up text. No form, account, backend, database, or CMS is used.

1. Obtain the person's real message and approval to publish it, together with the name they want shown. Verify any previous role, photo, or date separately; omit unknown fields.
2. In past-members-messages.html, copy the article inside template#past-member-message-template into div#member-messages. It becomes ordinary static HTML; no JavaScript data rendering is needed.
3. Fill h3[data-message-name] with the real name and p[data-message-text] with the approved message. Preserve its meaning; escape HTML-sensitive characters. Split a longer message into real paragraphs as needed.
4. Optional fields remain hidden until provided. For a verified previous role, fill p[data-message-role] and remove hidden. For an approved real portrait, add a valid src, actual width/height, and remove hidden from img[data-message-photo]. The adjacent name identifies the decorative photo, so alt can remain empty.
5. For a verified date, fill time[data-message-date], set datetime to the real ISO date, and remove hidden. Do not use a guessed date.
6. Once the first real message is present, remove div.messages-empty. Keep the permanent section heading, message grid, and reusable template. Never publish the unfilled card as visible content.

## Local review checklist

Real Brave browser testing through Playwright MCP covered all six pages at 320x720, 375x812, 390x844, 430x932, 768x1024, 1280x800, and 1920x1080. Local screenshots and browser output stay in the ignored `.playwright-mcp/` folder. See `docs/release-review.md` for the final checks and their limits. The steps below are also useful when reviewing later edits.

1. Open index.html, team.html, events.html, programs.html, archive.html, and past-members-messages.html directly; test header and footer links and active page indicators.
2. At 1280px and 1920px widths, open Archive by click and by Enter/Space. It opens instantly, without scaling, sliding, or rotation. Confirm aria-expanded tracks the native details state and aria-controls points to archive-menu. Tab into both links. ArrowDown/ArrowUp on its summary focuses the first/last link. Escape closes the dropdown and returns focus to Archive. Click outside and move focus outside to close it.
3. At 320px, 360px, 375px, 390px, 430px, and 768px widths, open the main navigation, open Archive, and follow each link. Escape closes Archive first and the mobile list second. Expand the list in landscape and confirm it scrolls within the viewport. Test resizing across the 900/901px navigation breakpoint, including while focus is inside Archive. Focus should move to Archive on desktop or the hamburger on mobile when the submenu closes.
4. Inspect all four named portraits at 390px and 1280px. Faces and whole photographs must remain visible and roles unchanged. Check eight gallery cards and the full-width amber active-navigation border at 320px, 360px, 375px, 390px, 430px, 768px, 1024px, 1280px, and 1920px for clipping or horizontal overflow. Archive must be active on both archive-related pages.
5. At 768px and 1024px, verify Programs and the Home event preview stack with full, uncropped photos. At 1280px the existing desktop columns remain, with complete photographs fitted within their own reserved ratios. Check image space before loading, font-size zoom, long team names, FAQ touch areas, and footer links.
6. Open a gallery photo by click/touch and Enter. Check the matching title, caption, and image. Tab stays inside the native dialog; Escape and Close dismiss it and restore focus to the same photo button. Background scrolling is locked while open; closing restores its previous scroll position and inline styles. No visible file-opening link or raw-image anchor should remain.
7. Disable JavaScript and reload. Main links and the native Archive disclosure still work. Gallery photos and captions remain visible as static content; no inert photo buttons, raw-image links, or lightbox controls are visible.
8. Confirm the messages page displays only the empty state, not a fabricated message. Check the console, failed network requests, reduced motion, Home statistics 25+/5+/3, and the unchanged membership roster.


- Open all six pages, including direct page URLs and event/program section links.
- Check phone, tablet, desktop, zoom, keyboard navigation, and reduced motion.
- Disable JavaScript: navigation, names, numbers, and content must remain visible.
- Inspect image quality, especially group photographs.
- Verify all local asset paths and the 28-current-member partition.

## Git and hosting

Develop and test on `development`. Release through a reviewed Pull Request into `main`, after checking the latest remote branches, intended files, repository checks, approvals, and merge conflicts. Never force-push or bypass branch protection. Verify the actual GitHub Pages configuration and successful deployment before checking the live custom domain; a merge alone does not confirm publication. Preserve `CNAME` and the custom domain.

`.gitignore` excludes `.playwright-mcp/`, `playwright-report/`, and `test-results/`. Keep screenshots, local release helpers, logs, and generated browser output out of commits. Website images under `assets/images/` remain tracked. Original photographs are deliberately retained alongside the display variants; gallery cards reuse assets rather than creating duplicate event entries.
