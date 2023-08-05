import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  console.log('---- get acts:');
  const { data } = await axios.get('http://localhost:8080/acts');
  console.log('data retrieved:', data);
  return NextResponse.json({ acts: data })
}

export async function POST(request) {

  const req = await request.json();
  const { name, beats } = req;
  console.log('adding act ', name, 'from', req);
  if (!name) {
    return NextResponse.json({ error: 'no name' });
  }

  //@TODO: require unique act

  const { data } = await axios.post('http://localhost:8080/acts', { name });

  const actId = data.id;
  if (Array.isArray(beats)) {
    await Promise.all(beats.map((beat) => {
      if (beat.name) {
        return axios.post(`http://localhost:8080/acts/${actId}/beats`, beat);
      }
    }))
  }
  console.log('data for act', name, 'is', data);

  //@TODO: add beats

  return NextResponse.json({ act: data })
}
