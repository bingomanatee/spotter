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


export async function POST(req, {params}) {
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

  const { beats } = await req.json();

  console.log('creating beats', beats);
  // ----- find last orders:

  const { data: otherBeats } = await supabase
    .from('beats')
    .select()
    .eq('act_id', actId);

  console.log('other acts:', otherBeats);

  let order = otherBeats.reduce((order, beat) => {
    if (beat.order && beat.order > order) {
      return beat.order;
    }
    return order;
  }, 0) + 1;

  beats.forEach((beat) => {
    beat.order = order;
    order += 1;
  })

// @TODO: check for duplicates
  const response = await supabase
    .from('beats')
    .insert(beats.map((beat) => (beat)))
    .select();


  console.log('-=-- response:', response);

  if (!response) {
    console.error('back response:', response);
    return NextResponse.json({ response });
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
