import { NextResponse } from 'next/server'
import axios from 'axios'
import Redis from 'ioredis';
import { beatImagePaths } from '~/utils/beatImagePaths'

const CONFIG = {
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_URL, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD
};


const client = new Redis(CONFIG);

function getBeatId(request) {
  const href = request.url;
  const match = /\/images\/beats\/imageUrl\/(.*)/.exec(href)
  return match ? match[1] : null
}

export async function GET(request, { params: { beatid: beatId } }, response) {
  if (beatId) {

    const { urlPath, dataPath } = beatImagePaths(beatId);

    const [urlExists, dataExists] = await Promise.all([
      client.exists(urlPath), client.exists(dataPath)
    ]);
    console.log('looking for image for beat ', urlPath, dataPath, beatId, urlExists, dataExists);
    if (urlExists) {
      const imageUrl = await client.get(urlPath);
      return NextResponse.redirect(imageUrl);
    }
    if (dataExists) {
      const data = await client.get(dataPath);
      const size = await client.bitcount(dataPath);
      let response = new Response(data);
      response.headers.set('Content-Type', 'image/jpeg');
      response.headers.set('size', size/8);
      return response;
    }
    return new Response('');
  } else {
    console.log('cannot find beat image  in ', request.url)
  }

  return NextResponse.json({ error: 'no image saved' })
}

export async function POST(request, {params: { beatid: beatId }}) {
  if (beatId) {
    const formData = await request.formData();
    const file = formData.get('imageFile');
    console.log('posting image data data ', file, 'to beat', beatId);

    const data = await file.text();
    const { dataPath, dataHeadersPath } = beatImagePaths(beatId);
    await client.set(dataPath, data);

    return NextResponse.json({ beatId, dataPath, uploaded: true })
  }

  NextResponse.error('no beat id');
}
