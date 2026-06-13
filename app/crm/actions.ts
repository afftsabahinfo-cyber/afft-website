'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  CRM_SESSION_COOKIE_NAME,
  createCrmRecord,
  createCrmSessionToken,
  getCrmConfig,
  getDefaultStatusForKind,
  isCrmSessionTokenValid,
  isValidCrmPassword,
  sanitizeDateInput,
  sanitizeEmailInput,
  sanitizeKindInput,
  sanitizePriorityInput,
  sanitizeTextInput,
  sanitizeWhatsappInput,
  updateCrmRecord,
} from '@/lib/crm-store';

async function requireCrmSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(CRM_SESSION_COOKIE_NAME)?.value;

  if (!isCrmSessionTokenValid(sessionToken)) {
    redirect('/crm');
  }
}

export async function loginAction(formData: FormData) {
  const passwordAttempt = sanitizeTextInput(formData.get('password'));
  const { enabled, passwordConfigured, password } = getCrmConfig();

  if (!enabled || !passwordConfigured || !isValidCrmPassword(passwordAttempt)) {
    redirect('/crm?error=invalid-password');
  }

  const cookieStore = await cookies();
  cookieStore.set(CRM_SESSION_COOKIE_NAME, createCrmSessionToken(password), {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    path: '/',
  });

  redirect('/crm');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(CRM_SESSION_COOKIE_NAME);
  redirect('/crm');
}

export async function createRecordAction(formData: FormData) {
  await requireCrmSession();

  const kind = sanitizeKindInput(formData.get('kind'));

  await createCrmRecord({
    kind,
    name: sanitizeTextInput(formData.get('name')),
    organization: sanitizeTextInput(formData.get('organization')),
    market: sanitizeTextInput(formData.get('market')),
    location: sanitizeTextInput(formData.get('location')),
    audienceType: sanitizeTextInput(formData.get('audienceType')),
    productInterest: sanitizeTextInput(formData.get('productInterest')),
    contactChannel: sanitizeTextInput(formData.get('contactChannel')),
    contactHandle: sanitizeTextInput(formData.get('contactHandle')),
    whatsappNumber: sanitizeWhatsappInput(formData.get('whatsappNumber')),
    email: sanitizeEmailInput(formData.get('email')),
    source: sanitizeTextInput(formData.get('source')),
    status: getDefaultStatusForKind(kind),
    priority: sanitizePriorityInput(formData.get('priority')),
    estimatedValue: sanitizeTextInput(formData.get('estimatedValue')),
    lastContactOn: sanitizeDateInput(formData.get('lastContactOn')),
    nextFollowUpOn: sanitizeDateInput(formData.get('nextFollowUpOn')),
    nextStep: sanitizeTextInput(formData.get('nextStep')),
    notes: sanitizeTextInput(formData.get('notes')),
  });

  revalidatePath('/crm');
  redirect('/crm');
}

export async function updateRecordAction(formData: FormData) {
  await requireCrmSession();

  const id = sanitizeTextInput(formData.get('id'));

  if (!id) {
    redirect('/crm');
  }

  await updateCrmRecord({
    id,
    contactChannel: sanitizeTextInput(formData.get('contactChannel')),
    contactHandle: sanitizeTextInput(formData.get('contactHandle')),
    whatsappNumber: sanitizeWhatsappInput(formData.get('whatsappNumber')),
    email: sanitizeEmailInput(formData.get('email')),
    status: sanitizeTextInput(formData.get('status')) as never,
    priority: sanitizePriorityInput(formData.get('priority')),
    estimatedValue: sanitizeTextInput(formData.get('estimatedValue')),
    lastContactOn: sanitizeDateInput(formData.get('lastContactOn')),
    nextFollowUpOn: sanitizeDateInput(formData.get('nextFollowUpOn')),
    nextStep: sanitizeTextInput(formData.get('nextStep')),
    notes: sanitizeTextInput(formData.get('notes')),
  });

  revalidatePath('/crm');
  redirect('/crm');
}
