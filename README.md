# Innovation Club · GJU — Website

Official website for the Innovation Club at German Jordanian University.

## Stack

Single-file vanilla HTML/CSS/JS. No frameworks, no build step. Just open `index.html`.

## File Structure

```
├── index.html          # Entire site (single file)
├── logo.png            # Club logo
├── events/             # Event photos (referenced in HTML)
└── team/               # Board group photos (referenced in HTML)
```

## Adding Photos

1. Drop event images into `events/` — filenames must match the `src` paths in `index.html`.
2. Drop board group photos into `team/`.
3. In `index.html`, uncomment the `<img>` tags and remove the corresponding placeholder `<div>`s.

## Sections

- Hero with animated lightbulb
- Stats (members, board, events, teams)
- Past Events (cards with photo placeholders)
- The Team (board group photos)
- Board Members (Founder, President, leads)
- Teams (Media, PR, Logistics, Secretary)
- Footer

## Deployment

Static hosting — GitHub Pages, Netlify, Vercel, or any server that can serve HTML. Push to `main` and it's live.

## Editing Safely

Never edit `main` directly. Create a branch, make changes, open a PR, verify, then merge.

## Contact

Hasan Abuzaid — President, Innovation Club @ GJU
