import type { Metadata } from 'next';
import { Urbanist, Playfair_Display } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

const siteUrl = 'https://afft.club';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'AFFT Club',
  title: {
    default: 'AFFT Club | Sabah Outdoor Experiences',
    template: '%s | AFFT Club',
  },
  description:
    'AFFT helps visitors plan Sabah camping packages, Rent It gear rental, private tours, car rental and outdoor experiences around Kota Kinabalu and Mount Kinabalu.',
  keywords: [
    'AFFT',
    'Sabah camping',
    'Kota Kinabalu camping',
    'Kundasang private tour',
    'Sabah car rental',
    'Sabah gear rental',
    'Rent It Sabah',
    'Mount Kinabalu outdoor experience',
    'Kiulu campsite',
    'Kota Belud campsite',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'zh-Hans': '/zh',
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'AFFT Club',
    title: 'AFFT Club | Sabah Outdoor Experiences',
    description:
      'Camping packages, Rent It gear rental, private tours, car rental and outdoor planning support in Sabah.',
    images: [
      {
        url: '/images/kinabalu-hero.webp',
        alt: 'AFFT Sabah outdoor experience with Mount Kinabalu scenery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AFFT Club | Sabah Outdoor Experiences',
    description:
      'Plan Sabah camping, Rent It gear rental, private tours and car rental with AFFT.',
    images: ['/images/kinabalu-hero.webp'],
  },
  category: 'travel',
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const globalStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AFFT Club',
      legalName: 'ADVENTURE FRONTIER FREEDOM TRAVEL',
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      foundingDate: '2024',
      email: 'afft.sabah.info@gmail.com',
      telephone: '+601111598920',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+601111598920',
          contactType: 'customer service',
          areaServed: ['MY', 'TW', 'TH'],
          availableLanguage: ['English', 'Chinese', 'Malay'],
        },
      ],
      sameAs: [
        'https://www.facebook.com/share/17tRoTFe1x/',
        'https://www.instagram.com/afft.club.kk.car.service/',
        'https://www.tiktok.com/@afft.club',
        'https://xhslink.com/m/7CrxZ1jRF6',
      ],
      areaServed: [
        'Kota Kinabalu',
        'Tuaran',
        'Kota Belud',
        'Ranau',
        'Kundasang',
        'Papar',
        'Sabah',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'AFFT Club',
      url: siteUrl,
      telephone: '+601111598920',
      email: 'afft.sabah.info@gmail.com',
      priceRange: 'RM',
      description:
        'Sabah outdoor travel support for camping packages, camping equipment rental, creator gear rental, private tours and car rental.',
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: 'Sabah West Coast Division',
        },
        {
          '@type': 'Place',
          name: 'Kota Kinabalu',
        },
        {
          '@type': 'Place',
          name: 'Kundasang',
        },
        {
          '@type': 'Place',
          name: 'Mount Kinabalu',
        },
      ],
      knowsAbout: [
        'Sabah camping packages',
        'Camping equipment rental',
        'Creator gear rental',
        'Private Sabah tours',
        'Car rental and private charter',
        'Kota Kinabalu airport transfer',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'AFFT Club',
      url: siteUrl,
      inLanguage: ['en', 'zh-Hans'],
      publisher: {
        '@type': 'Organization',
        name: 'AFFT Club',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SiteNavigationElement',
      name: [
        'Camping Packages',
        'Rent It',
        'Camp Spots',
        'Private Tours',
        'Car Rental',
        'Customer Stories',
        'FAQ',
        'About AFFT',
      ],
      url: [
        `${siteUrl}/camping`,
        `${siteUrl}/rent-it`,
        `${siteUrl}/camping-spots`,
        `${siteUrl}/private-tours`,
        `${siteUrl}/car-rental`,
        `${siteUrl}/customer-stories`,
        `${siteUrl}/faq`,
        `${siteUrl}/about`,
      ],
    },
  ];

  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${playfair.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
