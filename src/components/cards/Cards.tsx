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
];

export const Cards: React.FC = () => {
  return (
    <>
      {cardList.map(({ Icon, color }, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-inner">
              <div className="card-front">
                <Icon color={color} size={80} />
              </div>
              <div className="card-back">tech pack</div>
            </div>
          </div>
        );
      })}
      {cardList.map(({ Icon, color }, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-inner">
              <div className="card-front">
                <Icon color={color} size={80} />
              </div>
              <div className="card-back">tech pack</div>
            </div>
          </div>
        );
      })}
    </>
  );
};
