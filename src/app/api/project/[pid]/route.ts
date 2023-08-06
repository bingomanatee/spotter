import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(req, { params }) {

  if (!params?.pid) {
    return NextResponse.json({ apiError: 'no project id' })
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error: authError } = await supabase.auth.getSession()

  if (authError) {
    return NextResponse.json({ authError })
  }

  const user = data?.session.user;
  console.log('posting user -', data, user)
  if (!user) {
    return NextResponse.json({ project: null })
  }

  // ------------ validated user and id

// @TODO: check for duplicates
  const response = await supabase
    .from('projects')
    .select()
    .eq('id', params.pid)

  console.log('-=-- response:', response);

  if (!response) {
    console.error('back response:', response);
    return NextResponse.json({ response });
  }

  const {
    error, data: projects
  } = response;
  if (error) {
    return NextResponse.json({ error });
  }

  if (Array.isArray(projects)) {
    const [project] = projects;

    if (!project
      || (project.user_id !== user.id)
      || (!project.active)) {
      // user doesn't own project (or project doesn't exist) (or is not active)
      // -- send no evidence to client
      return NextResponse.json({ project: null })
    }

    return NextResponse.json({ project });
  }

  return NextResponse.json({ error: 'irregular response' })
}
