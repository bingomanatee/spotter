import { NextResponse } from 'next/server'
import axios from 'axios'

/*export async function GET() {
  console.log('---- get acts:');
  const {data} = await axios.get('http://localhost:8080/acts');
  console.log('data retrieved:', data);
  return NextResponse.json({ acts: data })
}*/

export async function DELETE(request, { params: { beatid: beatId, actid: actId } }) {
  console.log('api deleting ', beatId);
  try {

    await axios.delete(`http://localhost:8080/acts/${actId}/beats/${beatId}`);

    //@TODO: delete beats

    return NextResponse.json({ beatId: beatId, deleted: true })
  } catch (err) {
    console.log('api- error deleting beats', err.message);
    return NextResponse.json({ beatId: beatId, deleted: false, error: err.message })
  }
}
