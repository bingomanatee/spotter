import styles from './NewBeatModal.module.scss';
import stateFactory from './NewBeatModal.state.ts';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack, Textarea
} from '@chakra-ui/react'
import useForestInput from '~/components/utils/useForestInput'
import { NewBeatModalProps } from '~/components/pages/NewBeatModal/types'
import useForest from '~/components/utils/useForest'
import { CAMERA_ANGLE, CONTENT, DURATION, NAME } from '~/consts'

export default function NewBeatModal(props: NewBeatModalProps) {
  const { context } = props;

  const [value, state] = useForest([stateFactory, props],
    (localState) => {
      console.log('initializing localState with ', props);
      localState.do.init();
    });

  const { isOpen, act, beat } = value;

  const [name, setName] = useForestInput(state, NAME);
  const [cameraAngle, setCA] = useForestInput(state, CAMERA_ANGLE);
  const [content, setContent] = useForestInput<HTMLTextAreaElement>(state, CONTENT);
  const [notes, setNotes] = useForestInput<HTMLTextAreaElement>(state, 'notes');
  const [duration, setDuration] = useForestInput(state, DURATION);
  if (context === 'beat' && act && beat) {
    return (
      <Modal isOpen={isOpen} onClose={state.do.close} size="xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Add A Beat to act &quot;{act.name} &quot;({act.id})</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <div className={styles.grid}>
              <Text textStyle="label">Name</Text>
              <Input value={name} onChange={setName}/>

              <Text textStyle="label">Starting at</Text>
              <HStack><Text m={0} p={0}>{(state.$.endOfLastBeat()?.format('m:ss')) || '??'}
              </Text>
                <Text textStyle="info"> (end of beat &quot;{beat.name} &quot;)</Text>
              </HStack>

              <Text textStyle="label">Duration(seconds)</Text>
              <Input value={duration} type="number" min={1} step={1} onChange={setDuration}/>

              <Text textStyle="label">Content</Text>
              <Textarea value={content} onChange={setContent} />

              <Text textStyle="label">Notes</Text>
              <Textarea value={notes} onChange={setNotes} />

              <Text textStyle="label">Camera Angle</Text>
              <Input value={cameraAngle} onChange={setCA} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => state.do.addBeat()}>
              Add Beat
            </Button>
            <Button onClick={state.do.close} variant='ghost'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    )
  }

  return null;
}
