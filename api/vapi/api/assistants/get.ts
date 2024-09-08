import { AssistantResponse } from '@/types/vapiAi/api/assistant/get';

// Function to get an assistant by ID
async function getAssistantById(
  assistantId: string
): Promise<AssistantResponse> {
  const VAPI_URL = `https://api.vapi.ai/assistant/${assistantId}`;
  const VAPI_API_KEY = '<YOUR_VAPI_API_KEY>'; // Replace with your actual API key

  const response = await fetch(VAPI_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error fetching assistant: ${error}`);
  }

  const assistant: AssistantResponse = await response.json();
  return assistant;
}

// Example usage
getAssistantById('assistant-id-123')
  .then((assistant) => console.log('Assistant fetched:', assistant))
  .catch((error) => console.error('Error:', error));
