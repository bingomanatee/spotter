import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request, { params: { actid: actId } }) {
  const { data } = await axios.get('http://localhost:8080/acts/' + actId + '/beats');
  return NextResponse.json({ beats: data })
}

export async function POST(request, { params: { actid: actId } }) {
  const beat = await request.json();
  console.log('request beat:', beat);
   const { data } = await axios.post('http://localhost:8080/acts/' + actId + '/beats', beat);

  return NextResponse.json({beat: data, actId})
}
