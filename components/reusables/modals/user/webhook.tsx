'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ClipboardCopy, FileSearch } from 'lucide-react'; // Icons for clipboard and no history
import { useModalStore } from '@/lib/stores/dashboard';

// Webhook entry interface
interface WebhookEntry {
  date: string;
  payload: Record<string, any>;
}

// Example webhook history data
const webhookHistory: WebhookEntry[] = [
  {
    date: '2023-09-12',
    payload: {
      phone: '0000000000',
      address: {
        zip: '00000',
        city: 'Test City',
        state: 'Test State',
        street: 'Test Street'
      },
      summary: 'Summary from AI Bot',
      list_name: 'List Name',
      name_full: 'Full Name',
      name_last: 'Last Name',
      name_first: 'First Name',
      webhook_type: 'lead_created'
    }
  }
  // Add more entries as needed
];

export const WebhookModal: React.FC = () => {
  const { isWebhookModalOpen, closeWebhookModal } = useModalStore();
  const [webhookUrl, setWebhookUrl] = useState('https://mywebsite.com/webhook');
  const [webhookPayload] = useState(`{
  "phone": "0000000000",
  "address": {
    "zip": "00000",
    "city": "Test City",
    "state": "Test State",
    "street": "Test Street"
  },
  "summary": "Summary from AI Bot",
  "list_name": "List Name",
  "name_full": "Full Name",
  "name_last": "Last Name",
  "name_first": "First Name",
  "webhook_type": "lead_created"
}`);

  // Function to copy payload to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookPayload);
    alert('Payload copied to clipboard!');
  };

  // Function to handle webhook testing
  const handleTestWebhook = () => {
    console.log('Testing Webhook URL:', webhookUrl);
    console.log('Testing Webhook Payload:', webhookPayload);
  };

  // Function to save webhook configuration
  const handleSaveWebhook = () => {
    console.log('Webhook saved:', { webhookUrl });
    closeWebhookModal();
  };

  return (
    <Dialog open={isWebhookModalOpen} onOpenChange={closeWebhookModal}>
      <DialogContent
        className="sm:max-w-3xl"
        autoFocus={false}
        style={{ zIndex: 9999 }}
      >
        <DialogHeader>
          <DialogTitle>Manage Webhook</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-lg font-medium">Webhook</h3>
          <p className="text-sm text-muted-foreground">
            Call a webhook when you get a new lead.
          </p>

          {/* Webhook URL Input */}
          <div className="mt-4">
            <label className="block text-sm font-medium">Webhook URL</label>
            <Input
              type="url"
              placeholder="https://mywebsite.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="dark:bg-gray-800 dark:text-gray-200" // Dark mode styling
            />
          </div>

          {/* Webhook Payload Section */}
          <div className="relative mt-4">
            <label className="block text-sm font-medium">Webhook Payload</label>
            <div className="relative">
              <Textarea
                rows={8}
                value={webhookPayload}
                readOnly
                className="overflow-x-auto dark:bg-gray-800 dark:text-gray-200" // Dark mode styling and horizontal scroll
              />
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                className="absolute right-2 top-2"
                size="icon"
              >
                <ClipboardCopy className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              </Button>
            </div>
          </div>
        </div>

        {/* Webhook History Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium">Webhook History</h3>
          <Separator className="my-2 dark:bg-gray-600" />

          {webhookHistory.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center">
              <FileSearch className="h-10 w-10 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                No webhook history available
              </p>
            </div>
          ) : (
            <div className="max-h-64 space-y-4 overflow-y-auto">
              {webhookHistory.map((entry, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 dark:border-gray-600"
                >
                  <p className="text-sm dark:text-gray-200">
                    Webhook sent on {entry.date} with payload:
                  </p>
                  <pre className="rounded bg-gray-100 p-2 text-xs dark:bg-gray-700">
                    {JSON.stringify(entry.payload, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={closeWebhookModal}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleTestWebhook}>
            Test
          </Button>
          <Button
            className="bg-blue-600 text-white"
            onClick={handleSaveWebhook}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
