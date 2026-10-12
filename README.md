# Trey Nguyen Design

Portfolio site for treynguyen.com. Next.js (App Router), deployed on Vercel.

- `app/layout.js`: fonts, metadata, favicon
- `app/page.js`: renders `app/body.html` and loads `public/site.js`
- `public/site.js`, `public/site.css`: the site's behavior and styles (first port of the design; to be split into React components)
- `public/assets/`: project screenshots (hero, mobile, full page) and logos

## Run locally

    npm install
    npm run dev

## Deploy

Push to GitHub and import the repo in Vercel. Framework preset: Next.js. No environment variables are required yet.
