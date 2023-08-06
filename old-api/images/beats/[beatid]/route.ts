import { NextResponse } from 'next/server'
import Redis from 'ioredis';
import { beatImagePaths } from '~/utils/beatImagePaths'

const CONFIG = {
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_URL, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD
};


const client = new Redis(CONFIG);

function requestBeatId(request) {
  const match = /\/images\/beats\/(.+)/.exec(request.url);

  return match ? match[1]  || null : null;
}

export async function GET(request) {
  const beatId = requestBeatId(request);
  if (beatId) {
    const {urlPath} = beatImagePaths(beatId);
    const imageUrl = await client.get(urlPath);
    return NextResponse.json({ beatId, imageUrl })
  } else {
    console.log('cannot find beat ID in ', href)
  }

  return NextResponse.json({ beatId: null, imageUrl: null })
}

export async function PUT(request, {params: {beatid: beatId}}) {
  const body = await request.json();

  if (beatId) {
    console.log('adding body', body, 'for beatId', beatId);
    const {urlPath} = beatImagePaths(beatId);
    if (body && typeof body === 'object' && 'imageUrl' in body && /^http(s)?:\/\//.test(body.imageUrl)) {
      console.log('writing', body.imageUrl, 'for beat', beatId);
      await client.set(urlPath, body.imageUrl);
      const imageUrl = await client.get(urlPath);
      return NextResponse.json({ beatId, imageUrl })
    } else {
      return NextResponse.json({ beatId, imageUrl: null , error: 'badly formatted image url'})
    }
  }
  console.log('cannot put beat ID in ', request.url)
  return NextResponse.json({ beatId: null, imageUrl: null })

}
