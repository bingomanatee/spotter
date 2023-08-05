import styles from './NewActModal.module.scss';
import stateFactory from './NewActModal.state.ts';
import useForest from '~/components/utils/useForest'
import {
  Button,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import useForestInput from '~/components/utils/useForestInput'
import { NAME } from '~/consts'
import { Beats } from '~/components/pages/NewActModal/Beats'

type NewActModalProps = {}

export default function NewActModal(props: NewActModalProps) {
  const [value, state] = useForest([stateFactory, props],
    (localState) => {
      localState.do.init();
    });

  const { context, act } = value;
  const [name, setName] = useForestInput(state, NAME);

  if (state.$.isOpen() && act) {
    return (
      <Modal isOpen onClose={state.do.close} size="4xl">
        <ModalOverlay/>
        <ModalContent width="75vw">
          <ModalHeader>Add An Act after act &quot;{act.name} &quot;({act.id})</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <div className={styles.grid}>
              <Text textStyle="label">Name</Text>
              <Input value={name} onChange={setName}/>

              <Text textStyle="label">span</Text>
              <HStack>
                <Text textStyle="info">{(state.$.start()?.format('m:ss')) || 0}</Text>
                -
                <Text textStyle="info">{(state.$.end()?.format('m:ss')) || 0}</Text>
              </HStack>
            </div>
            <Heading as="h3">Beats</Heading>
            <Beats state={state}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => state.do.save()}>
              Add Acts and beats
            </Button>
            <Button onClick={state.do.close} variant='ghost'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    )
  }
}
