import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error: authError } = await supabase.auth.getSession()

  if (authError) {
    return NextResponse.json({authError})
  }

  const user = data?.session.user;
  console.log('posting user -', data, user)
  if (!user) {
    return NextResponse.json({ project: null })
  }

  const project = await req.json();
  console.log('creating project', project);
// @TODO: check for duplicates
  const response = await supabase
    .from('projects')
    .insert({name: project.name, user_id: user.id})
    .select();


  console.log('-=-- response:', response);

  if (!response) {
    console.error('back response:', response);
    return NextResponse.json({ response });
  }

  const {
    error, data: newProjects
  } = response;

  if (Array.isArray(newProjects)) {
    const [newProject] = newProjects
    return NextResponse.json({ project: newProject });
  }
  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ error: 'irregular return' })
}
