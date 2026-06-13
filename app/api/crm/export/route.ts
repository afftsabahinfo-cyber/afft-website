import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { CRM_SESSION_COOKIE_NAME, isCrmSessionTokenValid, readCrmStore } from '@/lib/crm-store';

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(CRM_SESSION_COOKIE_NAME)?.value;

  if (!isCrmSessionTokenValid(sessionToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const store = await readCrmStore();
  const filename = `afft-crm-backup-${new Date().toISOString().slice(0, 10)}.json`;

  return new NextResponse(JSON.stringify(store, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
    },
  });
}
