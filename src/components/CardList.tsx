import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure()

  // TODO SELECTED IMAGE URL STATE
  const [imageViewUrl, setImageViewUrl] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string) {
    setImageViewUrl(url)
    onOpen()
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid
        columns={3}
        spacing="8"
        w="100%"
      >
        {cards ? (
          cards.map(card => (
            <Card data={card} viewImage={handleViewImage} />
          ))
        ) : 'Não há imagens aqui'}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage 
        imgUrl={imageViewUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
