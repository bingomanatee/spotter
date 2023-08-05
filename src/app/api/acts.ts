import axios from 'axios/index'

import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function ActsProxy(
  req, res
) {
  console.log('acts proxy')
  try {
   const polledData = await  axios.get('http://localhost:8080/acts');
    const { data } = polledData
    console.log('acts sending data:', data);
    return res.status(200).json(data);
  } catch (err) {
    res.error(err.message);
  }
}


