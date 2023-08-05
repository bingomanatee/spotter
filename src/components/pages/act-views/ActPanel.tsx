import { Act } from '~/types'
import {
  AlertDialog,
  AlertDialogBody, AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  CloseButton,
  Heading, useDisclosure
} from '@chakra-ui/react'
import actState from '~/lib/actState'
import { useCallback, useRef } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import DeleteDialog from '~/components/DeleteDialog'

export function ActPanel({ act, isStart, isEnd }: { act: Act, isStart?: boolean, isEnd?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteAct = useCallback(() => {
    actState.do.deleteAct(act.id);
    onClose();
  }, [onClose, act.id]);

  if (isStart || isEnd) {
    return null;
  } // @TODO -- allow bookend addition of acts with isStart/isEnd

  return <>
    <Box layerStyle={isStart || isEnd ? 'act-previs-start' : "act-previs"}>
      <Heading variant="act-previs-title">{act.name}</Heading>
      <Button
        leftIcon={<AddIcon color="darkGreen"/>}
        variant="previs-button" right="0" bottom="0"
        onClick={() => actState.do.openActAfterAct(act.id)}>
        Act</Button>
      {(isStart || isEnd) ? null : <CloseButton color="red" position="absolute" right={1} top={1} onClick={onOpen}/>}
    </Box>
    {(isStart || isEnd || !isOpen) ? null : (
      <DeleteDialog
        onDone={onClose}
        onDelete={deleteAct}
        title={` Delete act "${act.name}(${act.id})"?`}
      >
        The act and all its beats will be deleted.
      </DeleteDialog>
    )
    }
  </>
}
