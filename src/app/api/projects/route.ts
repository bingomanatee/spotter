import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req, params) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.getSession()

  const user = data?.session?.user;
  console.log('getting projects for', user, 'from', data);
  if (!user) {
    return NextResponse.json({ projects: [] })
  }

  const projects = await supabase
    .from('projects')
    .select()
    .eq('active', true)
    .eq('user_id', user.id);
  return NextResponse.json({projects});
}
