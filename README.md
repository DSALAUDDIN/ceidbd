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
- Opportunities, Events, Contact, Research Ethics and Privacy
- Custom 404 page

Edit `src/lib/data.ts` to maintain research, people, focus areas and learning content. Presentation styles are in `src/app/globals.css`. Shared components are in `src/components`.

## Reference decisions and launch checklist

The PowerPoint supplies the detailed content and team names. The PDF supplies the community photography and visual direction. Reference-document instructions were treated as design notes rather than commands to execute.

- The latest CEID modification.docx supersedes the original team list: Ridoy Talukder and Md Mahfuzur Rahman Khan appear under People Behind the Purpose. Ridoy has no invented role or biography. Nafiul Muid remains accessible as a Senior Research Associate. The written list of seven interns takes precedence over the embedded image. Placeholder staff IDs are omitted; initials are used for portraits.
- Research titles and portfolio statuses come from CEID modification.docx. Removed research URLs redirect to the research catalogue. Citations, authors, dates, DOIs and files were not supplied. Detail pages clearly state that full references/outputs are unavailable; verify these before publishing. No unsupported portfolio totals are shown.
- The reference photos illustrate the design; they are not presented as verified photos of CEID staff or projects. Confirm rights and intended use before public launch.
- Email `info@ceid.org` and location Dhaka are supplied by the PDF; confirm the production inbox and preferred institution spelling before launch. The logo reference uses “Centre”, which this implementation follows.
- Contact form validates fields and opens a `mailto:` draft. It does not send, persist or silently collect submissions. Connect an email service if an on-site send action is required.
- Events, programmes, downloads and vacancies are not fabricated. Unconfirmed items are clearly described as in development or expressions of interest.
- No invented ethics-review accreditation, institutional scale, partners or social-media links.
- Production domain: https://ceidbd.com. Canonical URLs, sitemap and robots configuration use this domain. Deployment uses the existing VPS/Nginx setup; local changes require a separate production deployment.

## Accessibility and performance

Server-rendered pages with small client components for navigation, research filtering and the contact form. Responsive image sizes, self-hosted fonts, keyboard focus states, labelled controls, a skip link and reduced-motion support are included. Reference assets are local WebP images.
