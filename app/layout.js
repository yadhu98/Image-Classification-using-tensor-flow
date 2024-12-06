import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./globals.css" />
      </head>
      <body>
        <Script
            src="https://unpkg.com/ml5@0.6.1/dist/ml5.min.js"
          strategy="beforeInteractive"
         />
        {children}</body>
    </html>
  );
}