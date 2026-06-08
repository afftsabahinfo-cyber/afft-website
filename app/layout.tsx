import type { Metadata } from 'next';
import { Urbanist, Playfair_Display } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'AFFT Club | Sabah Outdoor Experiences',
  description: 'Premium Sabah outdoor experiences, camping packages, gear rentals and private travel services around Mount Kinabalu.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
