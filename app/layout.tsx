import '@/styles/dist.css';
import React from 'react';
import Header from '@/ui/Header';
import ListModal from '@/ui/ListModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Lens Lists</title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;1,400;1,500&family=Space+Grotesk:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-space">
        <div
          className="flex h-full min-h-screen flex-col items-center text-zinc-600"
          style={{
            background: 'linear-gradient(to bottom, #b6fbff, #93b4e4)',
          }}
        >
          <Header></Header>
          <div className="container mx-auto flex max-w-screen-xl py-7 px-4 lg:px-4 xl:px-4">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
