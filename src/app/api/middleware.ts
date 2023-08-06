import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  console.log('---- running user middleware');
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(' ------------ checking', user?.id, user, 'for', req.nextUrl.pathname)

  // console.log('--- middleware user is ', user);
  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/account', req.url)) // was '/account'
  }

  if (user && /api/.test(req.url) && !req.headers.uid) {
    console.log('adding uid', user.id, user, 'to', req.nextUrl.pathname)
    const newHeaders = new Headers(req.headers)
// Add a new header
    newHeaders.set('uid', user.id);
    newHeaders.set('updated-user', 'done')
    return NextResponse.next({
      request: {
        headers: newHeaders
      }
    })
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/account'],
}
