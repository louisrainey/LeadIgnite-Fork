// Import dependencies
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import 'https://deno.land/x/dotenv/load.ts';

// Environment Variables (Set in Supabase Edge Functions)
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = Deno.env.get(
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
)!;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

serve(async (req) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required.' }),
        { status: 400 }
      );
    }

    // Authenticate User via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401
      });
    }

    // Generate user session token
    return new Response(
      JSON.stringify({ token: data.session?.access_token, user: data.user }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500
    });
  }
});
