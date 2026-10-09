# Newtown Smile Dental — Redesign Demo

A modern static redesign concept for **Newtown Smile Dental**, built to deploy directly on Netlify.

## What is included

- Responsive single-page website
- Current practice information, phone, email, address and office hours
- Existing website imagery referenced from the current Wix CDN
- Full services presentation
- Insurance / billing information
- Embedded map and directions
- Netlify appointment-request form
- Spam honeypot
- Lightweight patient-facing Appointment Assistant
- Thank-you confirmation page
- SEO metadata and Dentist structured data
- Security-oriented Netlify response headers

## Deploy on Netlify

1. In Netlify choose **Add new site → Import an existing project**.
2. Connect GitHub and select `patpet21/newtownsmiledental`.
3. No build command is required.
4. Publish directory: `.`
5. Deploy.

Netlify should automatically detect the HTML form named `appointment-request`.

After the first deployment, open **Forms** in Netlify and configure form submission notifications for the office email.

## Important production note — patient privacy

This demo intentionally asks only for basic contact and scheduling information. It tells patients **not** to send diagnoses, medical history, Social Security numbers, insurance member IDs or other sensitive health information.

Before connecting an AI model, CRM, email automation, SMS platform, scheduling platform or database to information that may contain protected health information, the dental practice should confirm that the chosen vendors and workflow meet its HIPAA/privacy obligations and that required agreements (including BAAs where applicable) are in place.

## Recommended automation roadmap

### Phase 1 — appointment rescue
- Website form → secure intake / approved destination
- Immediate acknowledgement to the patient
- Staff alert for every new request
- If no staff action after a defined SLA, send a reminder
- Escalate unresolved requests to a manager
- Daily digest of unconfirmed appointment requests

### Phase 2 — patient assistant
The website assistant can answer non-clinical questions such as:
- office hours
- location and directions
- services
- new-patient process
- general insurance workflow
- appointment availability request

It should hand off to a staff member for:
- clinical questions
- treatment recommendations
- detailed insurance or billing disputes
- urgent symptoms
- any request involving sensitive medical information

### Phase 3 — real booking
After confirming what scheduling system the practice uses, connect available time slots and confirmation workflows. Do not promise a slot until the scheduling system confirms it.

## Assets

The redesign currently references the original images hosted by the practice's Wix CDN. Before a final production migration away from Wix, download the source image files from the practice's Wix Media Manager (with client permission) and host them in this repository / Netlify instead of hotlinking.

## Current practice contact data

- Newtown Smile Dental
- Minsoo Cho, DDS
- 86-01 Justice Ave, Elmhurst, NY 11373
- 718-393-0100
- Fax 718-889-2355
- newtownsmiledental@gmail.com
