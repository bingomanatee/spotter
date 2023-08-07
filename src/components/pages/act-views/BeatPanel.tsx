import { Beat } from '~/types'
import {
  Box,
  Button, CloseButton,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import actState from '~/lib/actState'
import styles from '~/components/pages/act-views/styles.module.scss'
import Dropzone from 'react-dropzone'
import { AddIcon } from '@chakra-ui/icons'
import DeleteDialog from '~/components/DeleteDialog'

function BeatPanelDelete({ beat, actId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteBeat = useCallback(() => {
    actState.do.deleteBeat(beat.id, actId);
    onClose();
  }, [onClose, beat.id]);

  return (
    <>
      <CloseButton color="red" position="absolute" right={1} top={1} onClick={onOpen}/>
      {!isOpen ? null : (
        <DeleteDialog
          onDone={onClose}
          onDelete={deleteBeat}
          title={` Delete beat "${beat.name}(${beat.id})"?`}
        >
          The Beat will be deleted.
        </DeleteDialog>
      )
      }
    </>
  )


}

export function BeatPanel({ beat, actId }: { beat: Beat, actId: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box layerStyle="beat-previs">
        {<div className={styles.background} style={{
          backgroundImage: `url('/api/images/beats/imageUrl/${beat.id}')`
        }}/>}
        <Box layerStyle="beat-previs-time">
          <Text textStyle="info" fontSize="xs" p={0}>
            {beat.time}
          </Text>
        </Box>
        <BeatPanelDelete actId={actId} beat={beat}/>
        <Text display="none" textStyle="previs-id">{beat.id}</Text>
        <Heading variant="beat-previs-title">{beat.name}
          {beat.camera_angle ? <small><br/>{beat.camera_angle}</small> : null}
        </Heading>
        <Text textStyle="previs-content">{beat.content}</Text>
        <Button variant="previs-button" onClick={onOpen} left="0" bottom="0">Image</Button>
        <Button
          leftIcon={<AddIcon color="darkGreen"/>}
          variant="previs-button" right="0" bottom="0"
          onClick={() => actState.do.addBeatAfter('beat', beat.id)}>
          Beat
        </Button>
      </Box>
      {isOpen ? <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Text>Add a background image URL to this beat:</Text>
            <Input placeholder="image URL" type="url" onChange={(e) => setImageUrl(e.target.value)}/>
            {/*    <Text><b>or</b> upload an image:</Text>
      <Dropzone onDrop={(files) => actState.do.uploadBeatImage(beat.id, files, onClose)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>*/}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
              onClose();
              actState.do.putBeatImage(beat.id, imageUrl);
            }}>
              Use this image
            </Button>
            <Button onClick={onClose} variant='ghost'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> : null}
    </>
  )
}
