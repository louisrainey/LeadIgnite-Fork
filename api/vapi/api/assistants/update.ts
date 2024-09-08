import fetch from 'node-fetch'; // Or node-fetch version 3, or axios if preferred
import { UpdateAssistantRequest } from '@/types/vapiAi/api/assistant/update'; // The extended type

// Function to update an assistant by ID
async function updateAssistantById(
  assistantId: string,
  updateData: UpdateAssistantRequest
): Promise<void> {
  const VAPI_URL = `https://api.vapi.ai/assistant/${assistantId}`;
  const VAPI_API_KEY = '<YOUR_VAPI_API_KEY>'; // Replace with your actual API key

  const response = await fetch(VAPI_URL, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error updating assistant: ${error}`);
  }

  const updatedAssistant = await response.json();
  console.log('Assistant updated successfully:', updatedAssistant);
}

// Example usage
const updateData: UpdateAssistantRequest = {
  name: 'Updated Assistant Name',
  model: {
    temperature: 0.8 // Updating just the temperature field
  }
};

updateAssistantById('assistant-id-123', updateData)
  .then(() => console.log('Update complete'))
  .catch((error) => console.error('Error:', error));
