import { useState } from 'react';
import { Card } from '../Card/Card';
import { cardList as originalCardList } from '../../data/cardsData';

const fisherYatesShuffle = (list: typeof originalCardList) => {
  const newList = [...list];
  for (let i = newList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newList[i], newList[j]] = [newList[j], newList[i]];
  }
  return newList;
};

export const Cards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(originalCardList.length).fill(false),
  );
  const [firstCard, setFirstCard] = useState({ index: -1, icon: '' });
  const [isBoardLocked, setIsBoardLocked] = useState<boolean>(false);
  const [cardList, setCardList] = useState(() => {
    return fisherYatesShuffle(originalCardList);
  });
  const [pairsFound, setPairsFound] = useState<number>(0);

  const flipCard = (index: number, state: boolean) => {
    const newFlippedCards: boolean[] = [...flippedCards];
    newFlippedCards[index] = state;
    setFlippedCards(newFlippedCards);
  };

  const handleTurnCard = (index: number, icon: any) => {
    if (isBoardLocked || flippedCards[index]) return;

    flipCard(index, true);

    if (firstCard.index === -1) {
      setFirstCard({ index, icon });
    } else if (firstCard.icon === icon) {
      setFirstCard({ index: -1, icon: '' });
      setIsBoardLocked(true);
      setPairsFound(pairsFound + 1);
      setTimeout(() => {
        setIsBoardLocked(false);
      }, 600);
    } else {
      setIsBoardLocked(true);
      setTimeout(() => {
        flipCard(index, false);
        flipCard(firstCard.index, false);
        setFirstCard({ index: -1, icon: '' });
        setIsBoardLocked(false);
      }, 1000);
    }
  };

  const handleRestartGame = () => {
    setIsBoardLocked(true);
    setFlippedCards(Array(cardList.length).fill(false));
    setPairsFound(0);
    setTimeout(() => {
      setCardList(fisherYatesShuffle(originalCardList));
      setIsBoardLocked(false);
    }, 700);
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
      {pairsFound === cardList.length / 2 ? (
        <button onClick={handleRestartGame}>nová hra</button>
      ) : null}
    </>
  );
};
