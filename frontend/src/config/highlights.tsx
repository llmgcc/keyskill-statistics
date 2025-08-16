import { FaQuestionCircle, FaStar } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdTrendingDown,
  MdTrendingUp,
} from 'react-icons/md';

export enum Highlights {
  'gainers' = 'gainers',
  'decliners' = 'decliners',
  'new' = 'new',
  'highest-salary' = 'highest-salary',
  'lowest-salary' = 'lowest-salary',
  'gainers-salary' = 'gainers-salary',
}

export const HighlightIcons = {
  [Highlights.gainers]: <MdTrendingUp className="text-emerald-500" />,
  [Highlights.decliners]: <MdTrendingDown className="text-red-400" />,
  [Highlights.new]: <FaStar className="text-background-accent" />,
  [Highlights['highest-salary']]: <MdArrowUpward className="text-green-400" />,
  [Highlights['lowest-salary']]: (
    <MdArrowDownward className="text-orange-500" />
  ),
  [Highlights['gainers-salary']]: (
    <FaMoneyBillTrendUp className="text-background-accent" />
  ),
};

export const HighlightTitles = {
  [Highlights.gainers]: 'Fastest-Growing Skills',
  [Highlights.decliners]: 'Skills Losing Demand',
  [Highlights.new]: 'Newly Emerging Skills',
  [Highlights['highest-salary']]: 'Highest-Paying Skills',
  [Highlights['lowest-salary']]: 'Lowest-Paying Skills',
  [Highlights['gainers-salary']]: 'Skills with Growing Salaries',
};
