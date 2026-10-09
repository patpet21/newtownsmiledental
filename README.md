# Newtown Smile Dental — Luxury Redesign Demo

A premium static redesign concept for **Newtown Smile Dental**, designed as a boutique dental experience and deployable directly on Netlify.

## Design direction

- Editorial luxury aesthetic: porcelain, ink and champagne-bronze palette
- Full-screen cinematic hero using imagery from the current Wix site
- Large editorial typography and high-end spacing
- Service presentation inspired by premium hospitality / medical brands
- “Newtown Concierge” patient-assistant concept
- Three-step appointment request flow
- Responsive mobile experience
- Existing practice contact information, hours and services retained

## Current functionality

- Responsive single-page website
- Netlify appointment-request form
- Spam honeypot
- Appointment progress flow
- Insurance carrier field
- Human handoff CTA
- Digital concierge for non-clinical questions
- Map and directions
- SEO metadata + Dentist structured data
- Privacy guidance telling users not to send sensitive information through the general website form

## Deploy on Netlify

1. In Netlify choose **Add new site → Import an existing project**.
2. Connect GitHub and select `patpet21/newtownsmiledental`.
3. No build command is required.
4. Publish directory: `.`
5. Deploy.

Netlify should detect the form named `appointment-request`.

After first deploy:
- Open **Forms** in Netlify.
- Configure a submission notification for the office.
- Run a full test submission before showing the workflow as live.

## Automation concept for the client

### Phase 1 — Patient Response Rescue
1. Patient submits appointment request.
2. Patient immediately receives acknowledgement.
3. Office staff receives a new-request alert.
4. If nobody marks the request handled within a defined SLA, send a reminder.
5. Unresolved requests escalate.
6. Office receives a daily list of unconfirmed requests.

### Phase 2 — Newtown Concierge
The concierge should answer safe, non-clinical questions such as:
- office hours
- location
- services
- new-patient process
- general insurance workflow
- appointment request

It should hand off to a human for:
- diagnosis or treatment advice
- urgent symptoms
- detailed insurance disputes
- detailed patient history
- sensitive personal information

### Phase 3 — Real booking
Once the practice confirms its scheduling software, connect live availability only if that system exposes a suitable integration. Until then, the site must say **Request a visit**, not imply that a time is confirmed.

## Privacy note

This demo intentionally collects only basic scheduling and contact information. Before routing protected patient information through email automation, AI, CRM, databases, SMS or other vendors, the practice should confirm its privacy/compliance requirements and vendor agreements.

## Assets

The current demo references image URLs from the practice's existing Wix CDN. For final production migration:
- obtain client permission,
- export/download source assets from Wix,
- host them within the final production stack,
- replace temporary hotlinks.

## Practice contact data

- Newtown Smile Dental
- Minsoo Cho, DDS
- 86-01 Justice Ave, Elmhurst, NY 11373
- 718-393-0100
- Fax 718-889-2355
- newtownsmiledental@gmail.com
