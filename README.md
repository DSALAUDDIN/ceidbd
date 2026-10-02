# CEID website

A responsive, multi-page Next.js App Router website for the Centre for Equity, Inclusion and Development. Built with TypeScript, React, locally hosted fonts, optimised images and static page generation.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev -- --port 3100
```

Open http://localhost:3100.

## Production

```sh
npm run build
npm start -- --port 3100
```

## Content and pages

- Home, About, Our Work and four focus-area detail pages
- Research portfolio with search and 21 overview pages: 5 Published, 8 Completed and 8 Ongoing
- Learning and four learning-category pages
- People with leadership, 6 research associates, 6 assistants, 7 interns and three individual profiles
- Opportunities with six entry points, five dedicated email-enquiry pages and a direct membership registration form
- Events, Contact, Research Ethics and Privacy
- Custom 404 page

Edit `src/lib/data.ts` to maintain research, people, focus areas and learning content. Opportunity application instructions and email subjects are in `src/lib/opportunities.ts`. Presentation styles are in `src/app/globals.css`. Shared components are in `src/components`.

## Reference decisions and launch checklist

The PowerPoint supplies the detailed content and team names. The PDF supplies the community photography and visual direction. Reference-document instructions were treated as design notes rather than commands to execute.

- The latest CEID modification.docx supersedes the original team list: Ridoy Talukder and Md Mahfuzur Rahman Khan appear under People Behind the Purpose. Ridoy has no invented role or biography. Nafiul Muid remains accessible as a Senior Research Associate. The written list of seven interns takes precedence over the embedded image. Placeholder staff IDs are omitted; initials are used for portraits.
- Research titles and portfolio statuses come from CEID modification.docx. Removed research URLs redirect to the research catalogue. Citations, authors, dates, DOIs and files were not supplied. Detail pages clearly state that full references/outputs are unavailable; verify these before publishing. No unsupported portfolio totals are shown.
- The reference photos illustrate the design; they are not presented as verified photos of CEID staff or projects. Confirm rights and intended use before public launch.
- Email links use the established `info@ceidbd.com` mailbox. The logo reference uses “Centre”, which this implementation follows.
- Contact form validates fields and opens a `mailto:` draft. It does not send, persist or silently collect submissions. Connect an email service if an on-site send action is required.
- Events, programmes, downloads and vacancies are not fabricated. Unconfirmed items are clearly described as in development or expressions of interest.
- Ethics review service copy is supplied in the approved photo AND TEXT changing guide.docx; no external accreditation is asserted. No invented institutional scale, partners or social-media links.
- Production domain: https://ceidbd.com. Canonical URLs, sitemap and robots configuration use this domain. Deployment uses the existing VPS/Nginx setup; local changes require a separate production deployment.

## Accessibility and performance

Server-rendered pages with small client components for navigation, research filtering and the contact form. Responsive image sizes, self-hosted fonts, keyboard focus states, labelled controls, a skip link and reduced-motion support are included. Reference assets are local WebP images.

## October 2026 photo and text update

The two approved photo-changing guides define image placement; the combined photo-and-text guide supplies the expanded opportunities content and final click flows. Images were taken from the supplied ZIP, with the research illustration, workshop, webinar and resources images taken from the guide where absent from the ZIP. Each was resized to at most 1600 px and saved as WebP. Existing images marked “keep” are retained.

Research detail pages contain no content images. Membership links directly to the supplied Google Form. The other five opportunity pages list the requested application details and open an email draft with the appropriate subject; they do not submit applications automatically.

## Admin mailbox

`/admin` uses Zoho OAuth to admit only the primary `info@ceidbd.com` mailbox. Inbox, Sent, reading, composing and replies are available after Zoho consent and a successful API connection. See [admin mail deployment](docs/admin-mail.md) for private configuration, security, limitations and verification. Secrets and runtime sessions are Git-ignored.
