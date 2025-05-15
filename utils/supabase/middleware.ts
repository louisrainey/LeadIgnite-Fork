// import { type NextRequest, NextResponse } from "next/server";

// // * Middleware: Only bare essentials retained. Supabase and user redirect logic commented out for reference.
// export async function updateSession(request: NextRequest) {
// 	// --- Supabase and user redirect logic removed for minimal middleware ---
// 	// import { createServerClient } from "@supabase/ssr";
// 	// ...
// 	// All logic for authentication, user profile, and redirects is commented out below for reference.
// 	/*
// 	let supabaseResponse = NextResponse.next({ request });
// 	const supabase = createServerClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
// 		{
// 			cookies: {
// 				getAll() {
// 					return request.cookies.getAll();
// 				},
// 				setAll(cookiesToSet) {
// 					for (const cookie of cookiesToSet) {
// 						supabaseResponse.cookies.set(
// 							cookie.name,
// 							cookie.value,
// 							cookie.options,
// 						);
// 					}
// 					supabaseResponse = NextResponse.next({ request });
// 					for (const cookie of cookiesToSet) {
// 						supabaseResponse.cookies.set(
// 							cookie.name,
// 							cookie.value,
// 							cookie.options,
// 						);
// 					}
// 				},
// 			},
// 		},
// 	);
// 	// ...
// 	// Authentication, profile, and redirect logic here
// 	*/
// 	// --- End of commented-out logic ---

// 	return NextResponse.next();
// }
