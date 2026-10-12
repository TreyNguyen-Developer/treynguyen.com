import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';

// The page markup lives in app/body.html and the behavior in public/site.js.
// Both are the first production port of the design; they get split into React
// components as sections are reworked.
const markup = fs.readFileSync(path.join(process.cwd(), 'app', 'body.html'), 'utf8');

export default function Home() {
  return (
    <>
      <div id="site" dangerouslySetInnerHTML={{ __html: markup }} suppressHydrationWarning />
      <Script src="/site.js" strategy="afterInteractive" />
    </>
  );
}
