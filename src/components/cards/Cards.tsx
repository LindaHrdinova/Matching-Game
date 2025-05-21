import { useState, useEffect } from 'react';
import { Card } from '../Card/Card';

import { IconType } from 'react-icons';
import { SiCss3 } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { FaHtml5 } from 'react-icons/fa';
import { SiSpring } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { BsFiletypeSql } from 'react-icons/bs';
import { RiTailwindCssFill } from 'react-icons/ri';
import { FaSass } from 'react-icons/fa';

const cardList: { Icon: IconType; color: string }[] = [
  { Icon: SiCss3, color: '#264de4' },
  { Icon: SiTypescript, color: '#3178C6' },
  { Icon: RiTailwindCssFill, color: '#38bdf8' },
  { Icon: FaSass, color: '#CC6699' },
  { Icon: FaReact, color: '#61DAFB' },
  { Icon: SiSpring, color: '#6DB33F' },
  { Icon: FaJava, color: '#5382a1' },
  { Icon: FaHtml5, color: '#E34F26' },
  { Icon: BsFiletypeSql, color: '#000000' },
  { Icon: SiJavascript, color: '#F7DF1E' },
  { Icon: SiCss3, color: '#264de4' },
  { Icon: SiTypescript, color: '#3178C6' },
  { Icon: RiTailwindCssFill, color: '#38bdf8' },
  { Icon: FaSass, color: '#CC6699' },
  { Icon: FaReact, color: '#61DAFB' },
  { Icon: SiSpring, color: '#6DB33F' },
  { Icon: FaJava, color: '#5382a1' },
  { Icon: FaHtml5, color: '#E34F26' },
  { Icon: BsFiletypeSql, color: '#000000' },
  { Icon: SiJavascript, color: '#F7DF1E' },
];

export const Cards: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(cardList.length).fill(false),
  );

  const [firstCard, setFirstCard] = useState({ index: -1, icon: '' });
  const [isBoardLocked, setIsBoardLocked] = useState<boolean>(false);

  useEffect(() => {
    const fisherYatesShuffle = () => {
      for (let i = cardList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = cardList[i];
        cardList[i] = cardList[j];
        cardList[j] = k;
        // source: https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_random2
      }
    };
    fisherYatesShuffle();
  }, []);

  const handleTurnCard = (index: number, icon: any) => {
    if (flippedCards[index]) return;
    if (isBoardLocked || flippedCards[index]) return;

    console.log(index);
    const newFlippedCards: boolean[] = [...flippedCards];
    newFlippedCards[index] = true;
    setFlippedCards(newFlippedCards);
    if (firstCard.index === -1) {
      setFirstCard({ index, icon });
    } else if (firstCard.icon === icon) {
      setFirstCard({ index: -1, icon: '' });
      setIsBoardLocked(true);
      setTimeout(() => {
        setIsBoardLocked(false);
      }, 600);
    } else {
      setIsBoardLocked(true);
      setTimeout(() => {
        const newFlippedCards: boolean[] = [...flippedCards];
        newFlippedCards[index] = false;
        newFlippedCards[firstCard.index] = false;
        setFlippedCards(newFlippedCards);
        setFirstCard({ index: -1, icon: '' });
        setIsBoardLocked(false);
      }, 1000);
    }
    console.log(firstCard);
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
