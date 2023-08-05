import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button, useDisclosure
} from '@chakra-ui/react'
import { useCallback, useRef } from 'react'

export default function DeleteDialog({ title, children, onDelete, onDone }) {
  const cancelRef = useRef(null)
  const { isOpen, onClose } = useDisclosure({defaultIsOpen: true});

  const onFinish = useCallback(() => {
    onClose();
    onDone();
  }, [onDone, onClose])
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {children}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onFinish}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={() => {
              onDelete();
              onFinish();
            }} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
