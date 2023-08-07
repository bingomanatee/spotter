import useForestFiltered from '~/components/utils/useForestFiltered'
import actState from '~/lib/actState'
import { Table, TableContainer, Tbody, Th, Td, Thead, Tr, Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Act } from '~/types'

function ActHead({ act }: { act: Act }) {
  return (
    <Tr>
      <Td border="none"><Text textStyle="runsheet-head">{act.id}</Text></Td>
      <Td border="none" colSpan={3}>
        <Text textStyle="runsheet-head"><b>&quot;{act.name}&quot;</b></Text>
      </Td>
    </Tr>
  )
}

function ActBeats({ actId }: { actId: number }) {
  const beats = useForestFiltered(actState,
    (value: Record<string, any>) => {
      console.log('beats value: ', value);
      return value.beats.get(actId) || []
    }
  );

  return <>
    {beats.map((beat) => (
      <Fragment key={beat.id}>
        <Tr>
          <Td border="none" p={0} verticalAlign="top" rowSpan={2}>
            <Text textStyle="runsheet">{beat.id}</Text>
          </Td>
          <Td border="none" p={0} verticalAlign="top" rowSpan={2}><Text textStyle="runsheet">{beat.time}</Text></Td>
          <Td border="none" p={0} verticalAlign="top"><Text textStyle="runsheet">{beat.name}</Text></Td>
          <Td border="none" p={0} verticalAlign="top"><Text textStyle="runsheet">{beat.cameraAngle}</Text></Td>

        </Tr>
        <Tr>
          <Td px={0} pt={1} pb={3} verticalAlign="top" border="none" colSpan={2}>
            <Text textStyle="runsheet">{beat.content}</Text>
            {beat.notes ? (<Text textStyle="runsheet" color="whiteAlpha.500"><i>{beat.notes}</i></Text>) : null}
          </Td>
        </Tr>
      </Fragment>
    ))}
    <Tr>

    </Tr>
  </>
}

export default function Runsheet() {

  const { acts } = useForestFiltered(actState, ['acts']);

  return (

    <TableContainer>
      <Table varient="unstyled">
        <Thead>
          <Tr>
            <Th width="80px" border="none" rowSpan={2} px={0} verticalAlign="top"><Text
              textStyle="runsheet">ID</Text></Th>
            <Th width="120px" border="none" rowSpan={2} px={0} verticalAlign="top"><Text
              textStyle="runsheet">Time</Text></Th>
            <Th width="100%" border="none" px={0}><Text textStyle="runsheet">Name</Text></Th>
            <Th width="max(15%, 200px)" p={0} border="none"><Text textStyle="runsheet">Camera Angle</Text></Th>
          </Tr>
          <Tr>
            <Th border="none" p={0}><Text textStyle="runsheet">Content, Notes</Text></Th>
          </Tr>
        </Thead>

        <Tbody>
          {acts.map((act) => (
            <Fragment key={act.id}>
              <ActHead act={act}/>
              <ActBeats actId={act.id}/>
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )


}
