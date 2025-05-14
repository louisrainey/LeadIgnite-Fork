import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client (Use Service Role Key for Backend Calls)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error("Missing Supabase environment variables");
}
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET(request: Request) {
	console.log("📢 OAuth Callback Triggered");

	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");

	console.log("🔹 Received Code:", code);

	if (code) {
		// Exchange the code for a session
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			console.log("✅ User session saved!");

			return NextResponse.redirect(`${origin}/dashboard`); // Redirect to dashboard
		}
		console.error("❌ Error exchanging code:", error);
		return NextResponse.json({ error: error.message }, { status: 400 });
	}

	return NextResponse.json(
		{ error: "Missing authorization code." },
		{ status: 400 },
	);
}
