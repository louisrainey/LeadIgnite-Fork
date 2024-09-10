export type DndSettings = {
  status: string; // DND status (e.g., "active")
  message: string; // DND message
  code: string; // DND code
};

export type ContactDndSettings = {
  Call: DndSettings;
  Email: DndSettings;
  SMS: DndSettings;
  WhatsApp: DndSettings;
  GMB: DndSettings;
  FB: DndSettings;
};

export type CustomField = {
  id: string; // Custom field ID
  value: string; // Custom field value
};

export type AttributionSource = {
  url: string; // Attribution source URL
  campaign: string; // Campaign name
  utmSource: string; // UTM Source
  utmMedium: string; // UTM Medium
  utmContent: string; // UTM Content
  referrer: string; // Referrer URL
  campaignId: string; // Campaign ID
  fbclid: string; // Facebook click ID
  gclid: string; // Google click ID
  msclikid: string; // Microsoft click ID
  dclid: string; // Display click ID
  fbc: string; // Facebook cookie
  fbp: string; // Facebook Pixel
  fbEventId: string; // Facebook event ID
  userAgent: string; // User agent
  ip: string; // IP address
  medium: string; // Medium
  mediumId: string; // Medium ID
};

export type Contact = {
  id: string; // Contact ID
  name: string; // Full name of the contact
  locationId: string; // Location ID
  firstName: string; // First name
  lastName: string; // Last name
  email: string; // Email address
  emailLowerCase: string; // Lowercase email address
  timezone: string; // Timezone
  companyName?: string; // Company name (optional)
  phone?: string; // Phone number (optional)
  dnd: boolean; // Do Not Disturb status
  dndSettings: ContactDndSettings; // DND settings object
  type: string; // Contact type (e.g., "read")
  source: string; // Source of the contact (e.g., "public api")
  assignedTo: string; // Assigned to user or location ID
  address1?: string; // Address line 1 (optional)
  city?: string; // City (optional)
  state?: string; // State (optional)
  country?: string; // Country code (optional)
  postalCode?: string; // Postal code (optional)
  website?: string; // Website URL (optional)
  tags: string[]; // Tags array
  dateOfBirth?: string; // Date of birth (ISO string)
  dateAdded: string; // Date added (ISO string)
  dateUpdated: string; // Date updated (ISO string)
  attachments?: string; // Attachments (optional)
  ssn?: string; // Social Security Number (optional)
  keyword?: string; // Keyword associated with the contact (optional)
  firstNameLowerCase: string; // Lowercase first name
  fullNameLowerCase: string; // Lowercase full name
  lastNameLowerCase: string; // Lowercase last name
  lastActivity?: string; // Last activity timestamp (ISO string, optional)
  customFields: CustomField[]; // Custom fields
  businessId: string; // Business ID
  attributionSource?: AttributionSource; // Attribution source (optional)
  lastAttributionSource?: AttributionSource; // Last attribution source (optional)
};

export type GetContactResponse = {
  contact: Contact; // Contact object returned in the response
};

export type GetContactPathParams = {
  contactId: string; // Required Contact ID
};

export type GetContactHeaders = {
  Authorization: string; // Bearer token for authorization
  Version: string; // API version (e.g., '2021-07-28')
};

export const exampleGetContactResponse: GetContactResponse = {
  contact: {
    id: 'seD4PfOuKoVMLkEZqohJ',
    name: 'rubika deo',
    locationId: 've9EPM428h8vShlRW1KT',
    firstName: 'rubika',
    lastName: 'Deo',
    email: 'rubika@deos.com',
    emailLowerCase: 'rubika@deos.com',
    timezone: '',
    companyName: 'DGS VolMAX',
    phone: '+18832327657',
    dnd: true,
    dndSettings: {
      Call: { status: 'active', message: 'string', code: 'string' },
      Email: { status: 'active', message: 'string', code: 'string' },
      SMS: { status: 'active', message: 'string', code: 'string' },
      WhatsApp: { status: 'active', message: 'string', code: 'string' },
      GMB: { status: 'active', message: 'string', code: 'string' },
      FB: { status: 'active', message: 'string', code: 'string' }
    },
    type: 'read',
    source: 'public api',
    assignedTo: 've9EPM428h8vShlRW1KT',
    address1: '3535 1st St N',
    city: 'ruDolomitebika',
    state: 'AL',
    country: 'US',
    postalCode: '35061',
    website: 'https://www.tesla.com',
    tags: ['nisi sint commodo amet', 'consequat'],
    dateOfBirth: '1990-09-25T00:00:00.000Z',
    dateAdded: '2021-07-02T05:18:26.704Z',
    dateUpdated: '2021-07-02T05:18:26.704Z',
    attachments: 'string',
    ssn: 'string',
    keyword: 'test',
    firstNameLowerCase: 'rubika',
    fullNameLowerCase: 'rubika deo',
    lastNameLowerCase: 'deo',
    lastActivity: '2021-07-16T11:39:30.564Z',
    customFields: [{ id: 'MgobCB14YMVKuE4Ka8p1', value: 'name' }],
    businessId: '641c094001436dbc2081e642',
    attributionSource: {
      url: 'Trigger Link',
      campaign: 'string',
      utmSource: 'string',
      utmMedium: 'string',
      utmContent: 'string',
      referrer: 'https: //www.google.com',
      campaignId: 'string',
      fbclid: 'string',
      gclid:
        'CjOKCQjwnNyUBhCZARISAI9AYIFtNnIcWcYGIOQINz_ZoFI5SSLRRugSoPZoiEu27IZBY£1-MAIWmEaAo2VEALW_WCB',
      msclikid: 'string',
      dclid: 'string',
      fbc: 'string',
      fbp: 'fb. 1.1674748390986.1171287961',
      fbEventId: 'Mozilla/5.0',
      userAgent: 'Mozilla/5.0',
      ip: '58.111.106.198',
      medium: 'survey',
      mediumId: 'FglfHAn30PRwsZVyQlKp'
    },
    lastAttributionSource: {
      url: 'Trigger Link',
      campaign: 'string',
      utmSource: 'string',
      utmMedium: 'string',
      utmContent: 'string',
      referrer: 'https: //www.google.com',
      campaignId: 'string',
      fbclid: 'string',
      gclid:
        'CjOKCQjwnNyUBhCZARISAI9AYIFtNnIcWcYGIOQINz_ZoFI5SSLRRugSoPZoiEu27IZBY£1-MAIWmEaAo2VEALW_WCB',
      msclikid: 'string',
      dclid: 'string',
      fbc: 'string',
      fbp: 'fb. 1.1674748390986.1171287961',
      fbEventId: 'Mozilla/5.0',
      userAgent: 'Mozilla/5.0',
      ip: '58.111.106.198',
      medium: 'survey',
      mediumId: 'FglfHAn30PRwsZVyQlKp'
    }
  }
};
