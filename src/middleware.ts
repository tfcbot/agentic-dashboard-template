import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/onboarding(.*)',
])

export default clerkMiddleware(async (auth, request) => {
    const { userId, sessionClaims } = await auth()
   
   
   
    if (!userId && !isPublicRoute(request)) {
        (await auth()).redirectToSignIn({ returnBackUrl: request.url })
    }


    if (userId && !sessionClaims?.metadata.onboardingComplete && 
      request.nextUrl.pathname !== '/onboarding'
    ) {
      const onboardingUrl = new URL('/onboarding', request.url)
      const response = NextResponse.redirect(onboardingUrl)
      response.headers.set('Cache-Control', 'no-store, max-age=0')
      return response
    }


    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    return response
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
