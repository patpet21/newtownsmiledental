# Portfolio visual refresh – 2026-10-17

This update adds eight original, self-contained SVG concept illustrations under public/project-covers, integrated into compact, cursor-interactive project cards and case-study hero artwork.

Each visual says "VISUAL CONCEPT" so the design does NOT misrepresent these compositions as actual screenshots of deployed products. Real screenshots can replace each cover later without code changes. No copyrighted external images or paid services are used.

Features:
- Reduced project card width (~262–342 px on desktop, max 309 px on mobile).
- Individual concept mockups for PrivacyGate, PrivateStone, PropertyDEX, PropertyDEX Framework, Business Websites, Retail IT, Lead Rescue and E-Learning/AI PM Lab.
- Pointer tilt with dynamic glow and layered motion. Touch falls back to regular swipe.
- Horizontal gallery buttons and accessible scroll progress indicator.
- Significantly reduced vertical spacing for home sections, service rows, project case studies, ecosystem cards and showcase galleries.
- Reduced-motion support, lazy-loaded images, preserved internal case-study URLs.
- No new npm dependencies. No GitHub Actions.

QA still required: visual confirmation on Netlify/Chrome, small mobile screens, keyboard focus, WebGL handling.