// pages/api/opportunities/search.ts
import { searchOpportunities } from '@/lib/ghlSchemas/opportunites';
import { SearchOpportunitiesQuery } from '@/lib/ghlSchemas/opportunites/schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { isError } from 'util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = process.env.GHL_TOKEN as string;
    const query: SearchOpportunitiesQuery = {
      location_id: req.query.locationId as string
      // Add other query parameters here if necessary
    };

    if (!query.location_id) {
      return res.status(400).json({ error: 'Location ID is required' });
    }

    const response = await searchOpportunities(accessToken, query);
    res.status(200).json(response);
  } catch (error) {
    if (isError(error)) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
}
