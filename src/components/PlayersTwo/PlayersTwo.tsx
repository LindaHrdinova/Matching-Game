import cs from '../../texts/cs';
import en from '../../texts/en';

interface playersTwoProp {
  appLanguage: string;
  player1Points: number;
  player2Points: number;
  activePlayer1: boolean;
}

export const PlayersTwo: React.FC<playersTwoProp> = ({
  appLanguage,
  player1Points,
  player2Points,
  activePlayer1,
}) => {
  const texts = appLanguage === 'en' ? en : cs;

  return (
    <div className="players__scoreCounter players__scoreCounter--twoPlayers">
      <div className={activePlayer1 ? 'player player--active' : 'player'}>
        <span className={activePlayer1 ? 'player__weight--active' : ''}>
          {texts.player} 1
        </span>
        <span>
          {texts.pairsFound}: {player1Points}
        </span>
      </div>
      <div className={activePlayer1 ? 'player' : 'player player--active'}>
        <span className={activePlayer1 ? '' : 'player__weight--active'}>
          {texts.player} 2
        </span>
        <span>
          {texts.pairsFound}: {player2Points}
        </span>
      </div>
    </div>
  );
};
