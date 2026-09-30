# Verification

Tested locally on 30 September 2026.

- Production build and TypeScript validation passed on Next.js 16.3.7.
- Crawled 39 linked content routes: all returned successful responses.
- An unknown research slug returned HTTP 404.
- Inspected desktop and mobile screenshots of the home page, research explorer and contact page.
- At 390px, home and research had no horizontal overflow. Home had zero broken images.
- Mobile menu opened, navigated to Research and closed after navigation.
- Ongoing filter returned six matching items.
- Completed filter showed the intended empty state.
- Search for “migration” returned three matching entries.
- Empty contact form failed browser validation as expected.
- No browser JavaScript errors were reported during page/link checks.

Contact enquiries use an email draft, not a delivery service. Email delivery, a production domain and public hosting are outside this local preview. No real message was sent during testing.
