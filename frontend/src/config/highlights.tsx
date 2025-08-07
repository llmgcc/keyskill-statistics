import {
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaStar,
} from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import {
  MdArrowDownward,
  MdAttachMoney,
  MdTrendingDown,
  MdTrendingUp,
} from 'react-icons/md';
import { TbPigMoney } from 'react-icons/tb';

export enum Highlights {
  'gainers' = 'gainers',
  'decliners' = 'decliners',
  'new' = 'new',
  'highest-salary' = 'highest-salary',
  'lowest-salary' = 'lowest-salary',
  'unknown-salary' = 'unknown-salary',
}

export const HighlightIcons = {
  [Highlights.gainers]: <MdTrendingUp className="text-emerald-500" />,
  [Highlights.decliners]: <MdTrendingDown className="text-red-400" />,
  [Highlights.new]: <FaStar className="text-background-accent" />,
  [Highlights['highest-salary']]: <TbPigMoney className="text-pink-400" />,
  [Highlights['lowest-salary']]: (
    <MdArrowDownward className="text-orange-500" />
  ),
  [Highlights['unknown-salary']]: (
    <FaQuestionCircle className="text-gray-500" />
  ),
};

export const HighlightTitles = {
  [Highlights.gainers]: 'Fastest-Growing Skills',
  [Highlights.decliners]: 'Skills Losing Demand',
  [Highlights.new]: 'Newly Emerging Skills',
  [Highlights['highest-salary']]: 'Highest-Paying Skills',
  [Highlights['lowest-salary']]: 'Lowest-Paying Skills',
  [Highlights['unknown-salary']]: 'Skills with Undisclosed Salaries',
};
