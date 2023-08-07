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

  if (!user) {
    return NextResponse.json({ act: null })
  }

  const act = await req.json();

  const { data: otherActs } = await supabase
    .from('acts')
    .select()
    .eq('project_id', act.project_id);

  console.log('other acts:', otherActs);

  let order = otherActs.reduce((order, act) => {
    if (act.order && act.order > order) {
      return act.order;
    }
    return order;
  }, 0) + 1;

  console.log('creating act', act);
// @TODO: check for duplicates
  const response = await supabase
    .from('acts')
    .insert({...act, user_id: user.id, order})
    .select();


  console.log('-=-- response:', response);

  if (!response) {
    console.error('back response:', response);
    return NextResponse.json({ response });
  }

  const {
    error, data: newActs
  } = response;

  if (Array.isArray(newActs)) {
    const [newAct] = newActs
    return NextResponse.json({ act: newAct });
  }
  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ error: 'irregular return' })
}
