export const metadata = {
  metadataBase: new URL('https://treynguyen.com'),
  title: 'Trey Nguyen Design',
  description: 'Trey Nguyen is a product designer based in Texas. Selected work, resume and contact.',
  icons: { icon: '/assets/tnd-favicon.png' },
  openGraph: { title: 'Trey Nguyen Design', description: 'Product designer based in Texas.', url: 'https://treynguyen.com', type: 'website' },
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-palette="A" data-mode="dark" data-font="1" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;600&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/site.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
