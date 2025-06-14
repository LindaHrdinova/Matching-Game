import './style.css';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoPerson } from 'react-icons/io5';
import { useState } from 'react';
import cs from '../../texts/cs';
import en from '../../texts/en';

interface OptionProps {
  appLanguage: string;
  onSetNumberOfPlayers: (num: number) => void;
  onSetAppLanguage: (arg: string) => void;
}

export const Option: React.FC<OptionProps> = ({
  appLanguage,
  onSetNumberOfPlayers,
  onSetAppLanguage,
}) => {
  const texts = appLanguage === 'en' ? en : cs;

  const [optionHidden, setOptionHidden] = useState<boolean>(true);

  const handleSubmitOption = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    const language = String(formData.get('language'));
    onSetAppLanguage(language);
    onSetNumberOfPlayers(Number(formData.get('numOfPlayer')));
    setOptionHidden(true);
  };

  return (
    <>
      <div className="option">
        <button
          className="option__button"
          onClick={() => {
            setOptionHidden(optionHidden ? false : true);
          }}
        >
          <IoSettingsSharp className="option__icon" />
        </button>
        <div
          className={
            optionHidden ? 'option__area option__area--hidden' : 'option__area'
          }
        >
          <form
            action="/action_page.php"
            className="optionForm__form"
            onSubmit={(e) => handleSubmitOption(e)}
          >
            <div className="optionForm__optionList">
              <div className="optionForm__option">
                <p>{texts.numOfPlayer}:</p>
                <input
                  type="radio"
                  id="players1"
                  name="numOfPlayer"
                  value="1"
                  defaultChecked
                />
                <label htmlFor="players1">
                  <IoPerson />
                </label>
                <br />
                <input type="radio" id="2" name="numOfPlayer" value="2" />
                <label htmlFor="2">
                  <IoPerson />
                  <IoPerson />
                </label>
                <br />
              </div>
              <div className="optionForm__option">
                <p>{texts.chooseLanguage}:</p>
                <input
                  type="radio"
                  id="languageEN"
                  name="language"
                  value="en"
                  defaultChecked
                />
                <label htmlFor="languageEN">English</label>
                <br />
                <input
                  type="radio"
                  id="languageCS"
                  name="language"
                  value="cs"
                />
                <label htmlFor="languageCS">Čeština</label>
                <br />
              </div>
            </div>
            <input
              className="optionForm__submit"
              type="submit"
              value={texts.accept}
            />
          </form>
        </div>
      </div>
    </>
  );
};
