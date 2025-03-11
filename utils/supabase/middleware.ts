import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // ✅ 1. Check User Authentication
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.includes('/login') &&
    !request.nextUrl.pathname.includes('/register') &&
    !request.nextUrl.pathname.includes('/forgot-password') &&
    !request.nextUrl.pathname.includes('/reset-password') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ✅ 2. Fetch User Profile
  const { data: userProfile } = await supabase
    .from('UserProfile')
    .select('firstName, lastName, email, companyInfo')
    .eq('user_id', user?.id)
    .single();

  // ✅ 3. Validate Profile Completeness
  // const isProfileComplete =
  //   userProfile &&
  //   userProfile.firstName &&
  //   userProfile.lastName &&
  //   userProfile.email &&
  //   userProfile.companyInfo; // Add more fields as necessary

  // // ✅ 4. Redirect Incomplete Profiles to /dashboard/profile
  // if (
  //   !isProfileComplete &&
  //   request.nextUrl.pathname.startsWith('/dashboard') &&
  //   request.nextUrl.pathname !== '/dashboard/profile'
  // ) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/dashboard/profile';
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}
