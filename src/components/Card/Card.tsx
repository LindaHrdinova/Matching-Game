import { IconType } from 'react-icons';
import React from 'react';
import './style.css';

interface CardProps {
  Icon: IconType;
  color: string;
  flippedCard: boolean;
  index: number;
  handleTurnCard: (index: number, Icon: IconType) => void;
}

export const Card: React.FC<CardProps> = ({
  Icon,
  color,
  flippedCard,
  index,
  handleTurnCard,
}) => {
  return (
    <div
      className={flippedCard ? 'card disabledCard' : 'card'}
      onClick={() => handleTurnCard(index, Icon)}
      role={'button'}
      tabIndex={flippedCard ? -1 : 0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ')
          handleTurnCard(index, Icon);
      }}
    >
      <div className={flippedCard ? 'card-inner flipped' : 'card-inner'}>
        <div className="card-front">
          <Icon color={color} className="card-icon" />
        </div>
        <div className="card-back">
          <span>tech</span> <span>stack</span>
        </div>
      </div>
    </div>
  );
};
