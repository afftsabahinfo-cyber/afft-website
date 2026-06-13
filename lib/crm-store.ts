import { randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type CrmRecordKind = 'lead' | 'partner';
export type CrmPriority = 'high' | 'medium' | 'low';
export type LeadStatus = 'new' | 'qualified' | 'quoted' | 'follow_up' | 'won' | 'lost';
export type PartnerStatus =
  | 'research'
  | 'contacted'
  | 'talking'
  | 'proposal_sent'
  | 'active'
  | 'paused';
export type CrmStatus = LeadStatus | PartnerStatus;

export type CrmRecord = {
  id: string;
  kind: CrmRecordKind;
  name: string;
  organization: string;
  market: string;
  location: string;
  audienceType: string;
  productInterest: string;
  contactChannel: string;
  contactHandle: string;
  whatsappNumber: string;
  email: string;
  source: string;
  status: CrmStatus;
  priority: CrmPriority;
  estimatedValue: string;
  lastContactOn: string;
  nextFollowUpOn: string;
  nextStep: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type CrmStore = {
  version: number;
  lastUpdated: string;
  records: CrmRecord[];
};

export type CreateCrmRecordInput = Omit<CrmRecord, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateCrmRecordInput = Pick<
  CrmRecord,
  | 'id'
  | 'contactChannel'
  | 'contactHandle'
  | 'whatsappNumber'
  | 'email'
  | 'status'
  | 'priority'
  | 'estimatedValue'
  | 'lastContactOn'
  | 'nextFollowUpOn'
  | 'nextStep'
  | 'notes'
>;

export const CRM_SESSION_COOKIE_NAME = 'afft_crm_session';
export const CRM_DATA_PATH = path.join(process.cwd(), 'data', 'crm-data.json');
export const AFFT_DEFAULT_WHATSAPP = '601111598920';
export const AFFT_DEFAULT_EMAIL = 'afft.Sabah.info@gmail.com';
const CRM_TEMPLATE_PATH = path.join(process.cwd(), 'data', 'crm-template.json');

export const CRM_MARKET_OPTIONS = ['China', 'Taiwan', 'Malaysia', 'Thailand', 'International'] as const;
export const CRM_AUDIENCE_OPTIONS = [
  'Travel Agency',
  'Private Tour Planner',
  'Outdoor Community',
  'Photographer / Wedding Team',
  'Creator / KOL',
  'University Club',
  'Family Traveller',
  'Couple Traveller',
  'Solo Traveller',
  'Corporate Group',
  'General Inquiry',
] as const;
export const CRM_PRODUCT_OPTIONS = [
  'Camping Packages',
  'Rent It',
  'Private Tours',
  'Car Rental',
  'Creator Gear Rental',
  'Combo Sabah Trip',
  'Partner Collaboration',
] as const;
export const CRM_CHANNEL_OPTIONS = [
  'WhatsApp',
  'WeChat',
  'LINE',
  'Email',
  'Instagram',
  'Facebook',
  'Rednote',
  'Phone',
  'Other',
] as const;
export const CRM_PRIORITY_OPTIONS = ['high', 'medium', 'low'] as const;

export const LEAD_STATUS_OPTIONS: ReadonlyArray<{ value: LeadStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

export const PARTNER_STATUS_OPTIONS: ReadonlyArray<{ value: PartnerStatus; label: string }> = [
  { value: 'research', label: 'Research' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'talking', label: 'Talking' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

export function getCrmConfig() {
  const password = process.env.AFFT_CRM_PASSWORD?.trim() ?? '';

  return {
    enabled: process.env.AFFT_CRM_ENABLED === 'true',
    passwordConfigured: password.length > 0,
    password,
  };
}

export function isValidCrmPassword(candidate: string) {
  const secret = getCrmConfig().password;
  const candidateBuffer = Buffer.from(candidate);
  const secretBuffer = Buffer.from(secret);

  if (!secret || candidateBuffer.length !== secretBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, secretBuffer);
}

export function createCrmSessionToken(secret: string) {
  return createHash('sha256').update(`afft-crm:${secret}`).digest('hex');
}

export function isCrmSessionTokenValid(token?: string | null) {
  const { passwordConfigured, password } = getCrmConfig();

  if (!passwordConfigured || !token) {
    return false;
  }

  return token === createCrmSessionToken(password);
}

export function getDefaultStatusForKind(kind: CrmRecordKind): CrmStatus {
  return kind === 'lead' ? 'new' : 'research';
}

export function getStatusOptions(kind: CrmRecordKind) {
  return kind === 'lead' ? LEAD_STATUS_OPTIONS : PARTNER_STATUS_OPTIONS;
}

export function getStatusLabel(status: CrmStatus) {
  return [...LEAD_STATUS_OPTIONS, ...PARTNER_STATUS_OPTIONS].find((option) => option.value === status)?.label ?? status;
}

export function sanitizeTextInput(value: FormDataEntryValue | string | null | undefined) {
  return String(value ?? '').trim();
}

export function sanitizeDateInput(value: FormDataEntryValue | string | null | undefined) {
  const normalized = sanitizeTextInput(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : '';
}

export function sanitizePriorityInput(value: FormDataEntryValue | string | null | undefined): CrmPriority {
  const normalized = sanitizeTextInput(value);
  return (CRM_PRIORITY_OPTIONS as readonly string[]).includes(normalized) ? (normalized as CrmPriority) : 'medium';
}

export function sanitizeEmailInput(value: FormDataEntryValue | string | null | undefined) {
  const normalized = sanitizeTextInput(value);
  return normalized.includes('@') ? normalized : '';
}

export function sanitizeWhatsappInput(value: FormDataEntryValue | string | null | undefined) {
  return sanitizeTextInput(value).replace(/[^\d]/g, '');
}

export function sanitizeKindInput(value: FormDataEntryValue | string | null | undefined): CrmRecordKind {
  return sanitizeTextInput(value) === 'partner' ? 'partner' : 'lead';
}

export function sanitizeStatusInput(
  kind: CrmRecordKind,
  value: FormDataEntryValue | string | null | undefined
): CrmStatus {
  const normalized = sanitizeTextInput(value);
  const options = getStatusOptions(kind).map((option) => option.value);
  return options.includes(normalized as CrmStatus) ? (normalized as CrmStatus) : getDefaultStatusForKind(kind);
}

export function sortRecords(records: CrmRecord[]) {
  return [...records].sort((left, right) => {
    const leftDate = left.nextFollowUpOn || left.updatedAt;
    const rightDate = right.nextFollowUpOn || right.updatedAt;
    return rightDate.localeCompare(leftDate);
  });
}

function createEmptyStore(): CrmStore {
  return {
    version: 1,
    lastUpdated: '',
    records: [],
  };
}

async function ensureCrmDataFile() {
  await mkdir(path.dirname(CRM_DATA_PATH), { recursive: true });

  try {
    await readFile(CRM_DATA_PATH, 'utf8');
  } catch (error) {
    const template = await loadTemplate();
    await writeFile(CRM_DATA_PATH, JSON.stringify(template, null, 2), 'utf8');
  }
}

async function loadTemplate() {
  try {
    const templateContents = await readFile(CRM_TEMPLATE_PATH, 'utf8');
    const parsed = JSON.parse(templateContents) as Partial<CrmStore>;

    return {
      version: parsed.version ?? 1,
      lastUpdated: parsed.lastUpdated ?? '',
      records: Array.isArray(parsed.records) ? parsed.records : [],
    } satisfies CrmStore;
  } catch {
    return createEmptyStore();
  }
}

function normalizeRecord(record: Partial<CrmRecord>): CrmRecord | null {
  if (!record.id || !record.kind || !record.name) {
    return null;
  }

  const kind = record.kind === 'partner' ? 'partner' : 'lead';

  return {
    id: record.id,
    kind,
    name: record.name,
    organization: record.organization ?? '',
    market: record.market ?? '',
    location: record.location ?? '',
    audienceType: record.audienceType ?? '',
    productInterest: record.productInterest ?? '',
    contactChannel: record.contactChannel ?? '',
    contactHandle: record.contactHandle ?? '',
    whatsappNumber: sanitizeWhatsappInput(record.whatsappNumber),
    email: sanitizeEmailInput(record.email),
    source: record.source ?? '',
    status: sanitizeStatusInput(kind, record.status),
    priority: sanitizePriorityInput(record.priority),
    estimatedValue: record.estimatedValue ?? '',
    lastContactOn: sanitizeDateInput(record.lastContactOn),
    nextFollowUpOn: sanitizeDateInput(record.nextFollowUpOn),
    nextStep: record.nextStep ?? '',
    notes: record.notes ?? '',
    createdAt: record.createdAt ?? '',
    updatedAt: record.updatedAt ?? '',
  };
}

async function writeCrmStore(store: CrmStore) {
  await mkdir(path.dirname(CRM_DATA_PATH), { recursive: true });
  await writeFile(CRM_DATA_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export async function readCrmStore() {
  await ensureCrmDataFile();

  try {
    const contents = await readFile(CRM_DATA_PATH, 'utf8');
    const parsed = JSON.parse(contents) as Partial<CrmStore>;
    const records = Array.isArray(parsed.records) ? parsed.records.map(normalizeRecord).filter(Boolean) as CrmRecord[] : [];

    return {
      version: parsed.version ?? 1,
      lastUpdated: parsed.lastUpdated ?? '',
      records,
    } satisfies CrmStore;
  } catch {
    const emptyStore = createEmptyStore();
    await writeCrmStore(emptyStore);
    return emptyStore;
  }
}

export async function createCrmRecord(input: CreateCrmRecordInput) {
  const store = await readCrmStore();
  const timestamp = new Date().toISOString();

  const record: CrmRecord = {
    ...input,
    id: randomUUID(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.records.unshift(record);
  store.lastUpdated = timestamp;
  await writeCrmStore(store);

  return record;
}

export async function updateCrmRecord(input: UpdateCrmRecordInput) {
  const store = await readCrmStore();
  const record = store.records.find((item) => item.id === input.id);

  if (!record) {
    return null;
  }

  record.contactChannel = sanitizeTextInput(input.contactChannel);
  record.contactHandle = sanitizeTextInput(input.contactHandle);
  record.whatsappNumber = sanitizeWhatsappInput(input.whatsappNumber);
  record.email = sanitizeEmailInput(input.email);
  record.status = sanitizeStatusInput(record.kind, input.status);
  record.priority = sanitizePriorityInput(input.priority);
  record.estimatedValue = sanitizeTextInput(input.estimatedValue);
  record.lastContactOn = sanitizeDateInput(input.lastContactOn);
  record.nextFollowUpOn = sanitizeDateInput(input.nextFollowUpOn);
  record.nextStep = sanitizeTextInput(input.nextStep);
  record.notes = sanitizeTextInput(input.notes);
  record.updatedAt = new Date().toISOString();
  store.lastUpdated = record.updatedAt;

  await writeCrmStore(store);

  return record;
}

function buildLeadMessage(record: CrmRecord) {
  const base = `Hi ${record.name}, this is AFFT. Following up on your ${record.productInterest || 'Sabah trip'} enquiry.`;
  const nextStep = record.nextStep ? ` ${record.nextStep}.` : '';
  return `${base}${nextStep} Let us know your travel dates and group size and we will send the next details.`;
}

function buildPartnerMessage(record: CrmRecord) {
  const base = `Hi ${record.name}, this is AFFT in Sabah. We would like to explore a simple partnership for ${record.productInterest || 'Sabah outdoor experiences'}.`;
  const nextStep = record.nextStep ? ` ${record.nextStep}.` : '';
  return `${base}${nextStep} If relevant, we can send a short intro and ideas for your audience or clients.`;
}

function buildMessageBody(record: CrmRecord) {
  return record.kind === 'lead' ? buildLeadMessage(record) : buildPartnerMessage(record);
}

export function buildWhatsappComposeLink(record: CrmRecord) {
  if (!record.whatsappNumber) {
    return '';
  }

  const body = `${buildMessageBody(record)}\n\nAFFT WhatsApp: +${AFFT_DEFAULT_WHATSAPP}\nAFFT Email: ${AFFT_DEFAULT_EMAIL}`;
  return `https://wa.me/${record.whatsappNumber}?text=${encodeURIComponent(body)}`;
}

export function buildEmailComposeLink(record: CrmRecord) {
  if (!record.email) {
    return '';
  }

  const subject =
    record.kind === 'lead'
      ? `AFFT follow up for ${record.productInterest || 'your Sabah enquiry'}`
      : `AFFT partnership idea for ${record.organization || record.name}`;
  const body = `${buildMessageBody(record)}\n\nBest regards,\nAFFT\nWhatsApp: +${AFFT_DEFAULT_WHATSAPP}\nEmail: ${AFFT_DEFAULT_EMAIL}`;

  return `mailto:${record.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
