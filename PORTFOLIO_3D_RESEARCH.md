# Creative 3D portfolio — research and reusable resources
Updated: 2026-10-17

## Existing property, preserved
- Website: https://pietroforestieri.netlify.app/
- Stack: React 19 + TypeScript + Vite + React Router + Motion; Netlify deploys main.
- Eight cases remain in src/data/projects.ts: PrivacyGate, PrivateStone, NYC Retail IT Coordination, Business Websites & Booking, Lead Rescue, E-Learning / AI PM Lab, PropertyDEX, PropertyDEX Framework.
- Detail pages and project ecosystem links remain intact. Existing live demo and prototype labels must remain accurate.

## Review of user-supplied sites
1. Existing PrivateStone case study — correct case-study content but original generic circular artwork offered little project distinction. A bespoke architectural visual now differentiates it. Next priority: real product screenshots or an interactive workflow walkthrough if verified.
2. Beautiful UI — https://www.beautifului.dev/ — MIT: https://www.beautifului.dev/license ; best for task cards, inline AI activity, approval flows, and premium process components, NOT for true 3D rendering.
3. AI PM Lab — https://aipmlinks.propertydex.xyz/ — authoritative ecosystem links to PrivacyGate, AI PM Lab, PropertyDEX and framework. Preserve its links and avoid presenting experimental products as commercial successes.

## Additional resources: free/free-to-use code worth considering
| Source | URL | Practical use | License / condition |
|---|---|---|---|
| React Bits | https://reactbits.dev/ | Text, background animations, interactive cards | MIT + Commons Clause; check license before redistribution; free for personal and commercial products, not component resale |
| Aceternity UI 3D Card | https://ui.aceternity.com/components/3d-card-effect | Perspective cards and cursor parallax | Copyable component available; inspect its license before incorporating |
| Magic UI | https://magicui.design/docs/components | Blur fade, globe, particles, orbiting circles | Free components plus optional Pro products; check actual license |
| Three.js | https://threejs.org/ | True GPU 3D scenes, advanced interactive models | MIT |
| React Three Fiber | https://r3f.docs.pmnd.rs/ | React-oriented 3D scene architecture | MIT |
| Codrops demos | https://tympanus.net/codrops/demos/ | Experimental WebGL/GSAP portfolio effects and code | Demo hub promotes free MIT use; verify each demo and third-party asset |
| Codrops Scroll-Driven Blender Gallery | https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/ | Future cinematic section with a moving 3D camera | Check individual demo assets |
| Codrops 3D Image Rotations | https://tympanus.net/codrops/2026/06/18/exploring-3d-image-rotations-on-scroll/ | Future scroll-to-rotate project preview layout | Check individual demo assets |
| shader-web-background | https://github.com/xemantic/shader-web-background | Lightweight WebGL shader backdrops | Verify repository license |
| Beautiful UI | https://www.beautifului.dev/ | Refined AI product interface primitives | MIT |

## Implementation shipped
- Native WebGL point cloud torus with 4,800 desktop / 1,900 mobile particle points.
- Dynamic cursor-responsive rotation and additive glow, no external assets.
- IntersectionObserver pauses offscreen animation; reduced motion displays static scene.
- Horizontal eight-project rail with scroll-snap, touch gestures and navigation arrows.
- CSS-layered, project-specific artworks for privacy, architecture, tokenization and sites.
- Shared existing project metadata and case-study routes; no duplicate content or fictitious metrics.
- No new npm dependencies, no GitHub Actions, no external paid services.

## Quality checks still necessary
- Netlify build result for latest main commit.
- Live visual QA in Chrome, Edge, Safari and mobile touch.
- Lighthouse performance and accessibility with motion reduced.
- Verify each external link and supply actual product imagery before claiming screenshot previews.
