# Final local release review

Reviewed on 2026-11-18 using real Brave browser sessions through Playwright MCP, served only on `127.0.0.1:8765`. No framework, package, or build dependency was added.

## Confirmed fixes

- Four leadership images fit within their reserved portrait frames. Absolute positioning inside a positioned frame prevents image intrinsic height from expanding the grid item. Ali and Noorshan retain equal frame sizes; Founder and Past President keep their featured layouts. Original photos are unchanged.
- Home's featured photograph and the three Programs photographs reserve explicit aspect ratios before loading. The Madaba photo retains its own ratio. `contain` preserves complete image content on mobile and desktop.
- The footer university name is 12px rather than 9.6px on narrow screens. View photo labels are 12.8px rather than 11.52px.

## Browser coverage

All six pages were exercised at 320x720, 375x812, 390x844, 430x932, 768x1024, 1280x800, and 1920x1080, with real browser screenshots kept locally under `.playwright-mcp/`.

- No horizontal overflow, missing displayed images, JavaScript console errors, or HTTP asset errors in the page matrix.
- Click navigation traversed all six pages at 390px and 1280px. Internal link targets and section anchors were checked through local HTTP responses.
- Archive opening/closing, CSS plus/minus, full-width active border, Enter, Space, ArrowDown, Escape, outside click, and ARIA state were exercised at all seven widths.
- Every archive photograph opened at 320px and 1280px; Close/Escape, focus restoration, and scroll restoration were checked. Background content could not be scrolled while the dialog was open.
- Touch emulation, reduced-motion behavior, skip-link focus, resizing across the mobile-navigation breakpoint, and a no-JavaScript static gallery were checked in real browser contexts.
- Image-load checks compared reserved image dimensions before and after actual image requests were released in fresh browser contexts. This tests the image boxes, not a claimed Lighthouse performance score.
- A canceled responsive-image candidate can produce `net::ERR_ABORTED` during resizing or rapid navigation. It is not treated as a missing asset when the final selected image loads successfully and its direct HTTP request succeeds.

## Content verification

- 28 unique current members: 2 Leadership, 16 other confirmed team members, 10 New Members.
- 5 ordinary Past Members, 1 separate Founder, 1 separate Past President; 35 unique people overall.
- Etedal Ereiqat appears once; Dima Alsaheb remains a Past Member; Zaid Saleh remains in Public Relations.
- Home statistics remain 25+ / 5+ / 3. Four confirmed team groups are retained without inventing a fifth team.
- Eight archive photographs; the removed Club Moments card remains absent. No invented messages or testimonials.

## Git and production gates

Before committing, inspect the staged file list, confirm `CNAME` is unchanged, verify `.gitignore` with `git check-ignore`, and ensure no browser artifacts are tracked or staged. Retained originals and proportionally resized display variants are intentional.

After a local commit, fetch the remote, compare against `main` and `development`, and stop on unexpected upstream changes or conflicts. Push without force, create a Pull Request, and merge only after repository checks and required approvals pass. Confirm the resulting remote main commit and successful GitHub Pages deployment before testing the public website. This document does not claim that a commit, push, merge, or deployment has occurred.

## Verification limits

Viewport and touch emulation ran in Brave on Windows, not physical phones. Safari, Firefox, a screen reader, comprehensive WCAG auditing, and benchmark performance scores were not tested. Social links were not used to send messages or join a group.
