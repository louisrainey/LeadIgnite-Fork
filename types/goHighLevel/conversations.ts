export interface GetEmailByIdResponse {
  id: string; // Required: Email ID
  altId?: string; // Optional: External ID
  threadId: string; // Required: Message or Thread ID
  locationId: string; // Required: Location ID
  contactId: string; // Required: Contact ID
  conversationId: string; // Required: Conversation ID
  dateAdded: string; // Required: Date added (ISO timestamp)
  subject?: string; // Optional: Subject of the email
  body: string; // Required: Body content of the email
  direction: 'inbound' | 'outbound'; // Required: Direction of the email (inbound/outbound)
  status:
    | 'pending'
    | 'scheduled'
    | 'sent'
    | 'delivered'
    | 'read'
    | 'undelivered'
    | 'connected'
    | 'failed'
    | 'opened'; // Allowed status values
  contentType: string; // Required: Content type (e.g., text/plain)
  attachments?: string[]; // Optional: Array of attachment URLs
  provider: 'Leadconnector' | 'Gmail' | 'mailgun' | 'smtp' | 'custom'; // Allowed email providers
  from: string; // Required: Name and email of the sender
  to: string[]; // Required: List of recipient email IDs
  cc?: string[]; // Optional: List of CC email IDs
  bcc?: string[]; // Optional: List of BCC email IDs
  replyToMessageId?: string; // Optional: Reply-to message ID
  source?: 'workflow' | 'bulk_action' | 'campaign' | 'api' | 'app'; // Optional: Source of the email
}
