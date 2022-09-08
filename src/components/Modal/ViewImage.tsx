import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Button,
  
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0} maxW="700px" w="100%">
          <Image
            src={imgUrl}
            alt="Imagem"
            w="100%"
            objectFit="cover"
          >

          </Image>
        </ModalBody>
        <ModalFooter background="pGray.900" >
            <Link mr="auto" href={imgUrl} isExternal>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}
