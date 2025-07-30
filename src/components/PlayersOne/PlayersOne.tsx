import cs from '../../texts/cs';
import en from '../../texts/en';

interface playersOneProp {
  appLanguage: string;
  attempCounter: number;
}

export const PlayersOne: React.FC<playersOneProp> = ({
  appLanguage,
  attempCounter,
}) => {
  const texts = appLanguage === 'en' ? en : cs;

  return (
    <div className="players__scoreCounter">
      {texts.attempts}: {attempCounter}
    </div>
  );
};
