export const dynamic = 'force-static';

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="AFFT">
  <rect width="64" height="64" rx="14" fill="#1F1B16"/>
  <path d="M7 49 26 17l10 16 8-12 13 28H7Z" fill="#F28C28"/>
  <path d="m18 36 8-14 6 10-4 6-5-5-5 3Z" fill="#FFF7EA"/>
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      'Content-Type': 'image/svg+xml; charset=utf-8',
    },
  });
}
