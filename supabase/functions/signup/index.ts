import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import 'https://deno.land/x/dotenv/load.ts';

// Environment Variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Define CORS Headers
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

Deno.serve(async (req) => {
  console.log('📢 Function triggered!');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    const { email, password } = await req.json();
    console.log('📢 Received request payload:', { email });

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return new Response(
        JSON.stringify({ error: 'Email and password are required.' }),
        { status: 400, headers }
      );
    }

    // Sign up the user with Supabase Auth (enforce email confirmation)
    console.log('📢 Creating new user in auth.users...');
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Requires user to verify email before login
    });

    if (error) {
      console.error('❌ Error creating user:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers
      });
    }

    console.log('✅ User successfully created:', data.user?.id);
    console.log(
      '🔄 UserProfile will be auto-created via the database trigger.'
    );

    return new Response(
      JSON.stringify({
        message: 'Signup successful! Check your email to verify your account.'
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error('❌ Unexpected Signup Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers
    });
  }
});
