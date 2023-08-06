import { NextResponse } from 'next/server'
import axios from 'axios'

/*export async function GET() {
  console.log('---- get acts:');
  const {data} = await axios.get('http://localhost:8080/acts');
  console.log('data retrieved:', data);
  return NextResponse.json({ acts: data })
}*/

export async function DELETE(request, { params: { actid: actId } }) {
  await axios.delete('http://localhost:8080/acts/' + actId,);

  //@TODO: delete beats

  return NextResponse.json({ deleted: actId })
}
