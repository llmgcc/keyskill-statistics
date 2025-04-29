import { BiBug, BiShield } from 'react-icons/bi';
import { BsCpu, BsGlobe, BsPuzzle } from 'react-icons/bs';
import {
  FaCloud,
  FaCode,
  FaDatabase,
  FaLeaf,
  FaNetworkWired,
  FaQuestion,
  FaServer,
} from 'react-icons/fa';
import { GiArtificialIntelligence, GiSmartphone } from 'react-icons/gi';
import { GrNodes } from 'react-icons/gr';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { IoAnalytics } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { RiUserStarLine } from 'react-icons/ri';
import { TbBrandUnity } from 'react-icons/tb';
import colors from 'tailwindcss/colors';

export enum Categories {
  'Frontend' = 'Frontend',
  'Backend' = 'Backend',
  'DevOps & Infrastructure' = 'DevOps & Infrastructure',
  'Data Science & Machine Learning' = 'Data Science & Machine Learning',
  'Mobile' = 'Mobile',
  'Quality assurance' = 'Quality assurance',
  'Computer graphics & Game development' = 'Computer graphics & Game development',
  'Blockchain' = 'Blockchain',
  'Design' = 'Design',
  'System Administration' = 'System Administration',
  'Website administration' = 'Website administration',
  '1C Development' = '1C Development',
  'Analytics' = 'Analytics',
  'Systems programming' = 'Systems programming',
  'Information security' = 'Information security',
  'HR Management' = 'HR Management',
  'Project management' = 'Project management',
  'Network administration' = 'Network administration',
  'Digital Marketing & SEO' = 'Digital Marketing & SEO',
  'Other' = 'Other',
}

export const CategoriesStyle = {
  [Categories.Frontend]: {
    logo: <FaCode />,
    color: colors.violet[600],
  },
  [Categories.Backend]: {
    logo: <FaServer />,
    color: colors.orange[700],
  },
  [Categories['DevOps & Infrastructure']]: {
    logo: <FaCloud />,
    color: colors.blue[500],
  },
  [Categories['Data Science & Machine Learning']]: {
    logo: <GiArtificialIntelligence />,
    color: colors.fuchsia[600],
  },
  [Categories.Mobile]: {
    logo: <GiSmartphone />,
    color: colors.indigo[500],
  },
  [Categories['Quality assurance']]: {
    logo: <BiBug />,
    color: colors.emerald[600],
  },
  [Categories['Computer graphics & Game development']]: {
    logo: <TbBrandUnity />,
    color: colors.red[500],
  },
  [Categories.Blockchain]: {
    logo: <GrNodes />,
    color: colors.lime[600],
  },
  [Categories.Design]: {
    logo: <HiOutlineColorSwatch />,
    color: colors.rose[500],
  },
  [Categories['System Administration']]: {
    logo: <FaDatabase />,
    color: colors.slate[700],
  },
  [Categories['Website administration']]: {
    logo: <BsGlobe />,
    color: colors.teal[500],
  },
  [Categories['1C Development']]: {
    logo: <MdAdminPanelSettings />,
    color: colors.cyan[600],
  },
  [Categories.Analytics]: {
    logo: <IoAnalytics />,
    color: colors.purple[500],
  },
  [Categories['Systems programming']]: {
    logo: <BsCpu />,
    color: colors.amber[600],
  },
  [Categories['Information security']]: {
    logo: <BiShield />,
    color: colors.green[700],
  },
  [Categories['HR Management']]: {
    logo: <RiUserStarLine />,
    color: colors.sky[600],
  },
  [Categories['Project management']]: {
    logo: <BsPuzzle />,
    color: colors.pink[500],
  },
  [Categories['Network administration']]: {
    logo: <FaNetworkWired />,
    color: colors.blue[400],
  },
  [Categories['Digital Marketing & SEO']]: {
    logo: <FaLeaf />,
    color: colors.yellow[600],
  },
  [Categories.Other]: {
    logo: <FaQuestion />,
    color: colors.zinc[500],
  },
};
