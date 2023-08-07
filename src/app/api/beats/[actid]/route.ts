import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(req, {params}) {
  const supabase = createRouteHandlerClient({ cookies });
  const {actid: actId} = params;

  const { data, error: authError } = await supabase.auth.getSession()

  if (authError) {
    return NextResponse.json({authError})
  }

  const user = data?.session.user;
  console.log('posting user -', data, user)
  if (!user) {
    return NextResponse.json({ beats: null })
  }

  console.log('loading beats for', actId);
// @TODO: check for duplicates
  const response = await supabase
    .from('beats')
    .eq('act_id', actId)
    .select();

  console.log('-=-- response:', response);

  if (!response) {
    console.error('bad response:');
    return NextResponse.json({ bad: true });
  }

  const {
    error, data: newBeats
  } = response;

  if (Array.isArray(newBeats)) {
    return NextResponse.json({ beats: newBeats });
  }
  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ error: 'irregular return' })
}
