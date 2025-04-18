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
import { useState, useEffect } from 'react';

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
  const [flippedCards, setFlippedCards] = useState<Array<Boolean>>(
    Array(cardList.length).fill(false),
  );

  useEffect(() => {
    const count = flippedCards.filter((card) => card).length % 2;
    console.log('otočené, dělení: ' + count);
    if (count === 0) {
      console.log('dvě karty jsou otočené');
      checkPairs();
    }
  }, [flippedCards]);

  const handleTurnCard = (index: number) => {
    const updated = [...flippedCards];
    updated[index] = !updated[index];
    setFlippedCards(updated);
    console.log(updated);
  };

  const checkPairs = () => {
    console.log('dvojice');

    const turnedIndexes: number[] = flippedCards
      .map((flipped, index) => (flipped ? index : 'drop'))
      .filter((index) => index !== 'drop');

    console.log(turnedIndexes);
    console.log('délka, index: ' + cardList.length, turnedIndexes);

    if (turnedIndexes.length < 2) return;

    const [firstIndex, secondIndex] = turnedIndexes;
    const firstCard = cardList[firstIndex];
    const secondCard = cardList[secondIndex];
    console.log('turnedIndexes:', turnedIndexes);

    if (firstCard.color === secondCard.color) {
      console.log('Dvojice nalezena!');
    } else {
      setTimeout(() => {
        const updated = [...flippedCards];
        updated[firstIndex] = false;
        updated[secondIndex] = false;
        setFlippedCards(updated);
      }, 1000);
    }
  };

  return (
    <>
      {cardList.map(({ Icon, color }, index) => {
        return (
          <div
            className="card"
            key={index}
            onClick={() => handleTurnCard(index)}
          >
            <div
              className={`card-inner ${flippedCards[index] ? 'flipped' : ''}`}
            >
              <div className="card-front">
                <Icon color={color} size={80} />
              </div>
              <div className="card-back">
                <span>tech</span> <span>stack</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
