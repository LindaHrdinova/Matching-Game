import { useState } from 'react';
import { Card } from '../Card/Card';
import { IconType } from 'react-icons';

interface CardListProps {
  Icon: IconType;
  color: string;
}

interface CardsProps {
  pairsFound: number;
  cardList: CardListProps[];
  isBoardLocked: boolean;
  flippedCards: boolean[];
  attempCounter: number;
  player1Points: number;
  player2Points: number;
  activePlayer1: boolean;
  onSetPairsFound: (value: number) => void;
  onSetFlippedCards: (value: boolean[]) => void;
  onSetIsBoardLocked: (value: boolean) => void;
  onSetAttemptCounter: (value: number) => void;
  onSetPlayer1Points: (value: number) => void;
  onSetPlayer2Points: (value: number) => void;
  onSetActivePlayer1: (value: boolean) => void;
}

export const Cards: React.FC<CardsProps> = ({
  pairsFound,
  cardList,
  isBoardLocked,
  flippedCards,
  attempCounter,
  player1Points,
  player2Points,
  activePlayer1,
  onSetPairsFound,
  onSetFlippedCards,
  onSetIsBoardLocked,
  onSetAttemptCounter,
  onSetPlayer1Points,
  onSetPlayer2Points,
  onSetActivePlayer1,
}) => {
  const [firstFlippedCard, setFirstFlippedCard] = useState<{
    index: number;
    Icon: IconType | null;
  }>({
    index: -1,
    Icon: null,
  });
  const { index: firstFlippedIndex, Icon: firstFlippedIcon } = firstFlippedCard;

  const flipCard = (index: number, state: boolean) => {
    const newFlippedCards: boolean[] = [...flippedCards];
    newFlippedCards[index] = state;
    onSetFlippedCards(newFlippedCards);
  };

  const addPointToPlayer = () => {
    activePlayer1
      ? onSetPlayer1Points(player1Points + 1)
      : onSetPlayer2Points(player2Points + 1);
  };

  const handleTurnCard = (index: number, Icon: IconType) => {
    if (isBoardLocked || flippedCards[index]) return;

    flipCard(index, true);

    if (firstFlippedIndex === -1) {
      setFirstFlippedCard({ index, Icon });
    } else if (firstFlippedIcon === Icon) {
      setFirstFlippedCard({ index: -1, Icon: null });
      onSetIsBoardLocked(true);
      onSetPairsFound(pairsFound + 1);
      onSetAttemptCounter(attempCounter + 1);
      addPointToPlayer();
      setTimeout(() => {
        onSetIsBoardLocked(false);
      }, 600);
    } else {
      onSetIsBoardLocked(true);
      onSetAttemptCounter(attempCounter + 1);
      setTimeout(() => {
        onSetActivePlayer1(!activePlayer1);
        flipCard(index, false);
        flipCard(firstFlippedIndex, false);
        setFirstFlippedCard({ index: -1, Icon: null });
        onSetIsBoardLocked(false);
      }, 1000);
    }
  };

  return (
    <>
      {cardList.map(({ Icon, color }, index) => {
        return (
          <Card
            Icon={Icon}
            color={color}
            flippedCard={flippedCards[index]}
            index={index}
            key={index}
            handleTurnCard={handleTurnCard}
          />
        );
      })}
    </>
  );
};
