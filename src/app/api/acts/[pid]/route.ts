import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(req, { params }) {
  console.log('--------------------------  get acts:', params, req.method);

  if (!params?.pid) {
    return NextResponse.json({ apiError: 'no project id' })
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error: authError } = await supabase.auth.getSession()

  if (authError) {
    return NextResponse.json({ authError })
  }

  const user = data?.session.user;
  if (!user) {
    return NextResponse.json({ project: null })
  }

  // ------------ validated user and id

// @TODO: check for duplicates
  const response = await supabase
    .from('acts')
    .select(`
    *, beats(*)`)
    .eq('project_id', params.pid)

  console.log('------------- acts get', params, ' response', response);

  if (!response) {
    console.error('back response:', response);
    return NextResponse.json({ bad: true });
  }

  const {
    error, data: acts
  } = response;
  if (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json({ acts });
}
