import fetch from 'node-fetch';
import { ListAssistantsResponse } from '@/types/vapiAi/api/assistant/list';

// Function to list assistants with optional query parameters
async function listAssistants(
  limit: number = 100, // Default limit
  createdAtGt?: string, // Optional: created after this date
  createdAtLt?: string, // Optional: created before this date
  updatedAtGt?: string, // Optional: updated after this date
  updatedAtLt?: string // Optional: updated before this date
): Promise<ListAssistantsResponse> {
  const VAPI_URL = 'https://api.vapi.ai/assistant';
  const VAPI_API_KEY = '<YOUR_VAPI_API_KEY>'; // Replace with your actual API key

  // Construct query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('limit', limit.toString());
  if (createdAtGt) queryParams.append('createdAtGt', createdAtGt);
  if (createdAtLt) queryParams.append('createdAtLt', createdAtLt);
  if (updatedAtGt) queryParams.append('updatedAtGt', updatedAtGt);
  if (updatedAtLt) queryParams.append('updatedAtLt', updatedAtLt);

  const response = await fetch(`${VAPI_URL}?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error listing assistants: ${error}`);
  }

  // Cast the result of json() to ListAssistantsResponse
  const assistantsList = (await response.json()) as ListAssistantsResponse;

  return assistantsList;
}

// Example usage
listAssistants(50, '2023-01-01T00:00:00Z', undefined, '2023-12-31T23:59:59Z')
  .then((response) => console.log('Assistants:', response))
  .catch((error) => console.error('Error:', error));
