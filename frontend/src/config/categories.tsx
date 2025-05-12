import { BiBug, BiCube, BiShield } from 'react-icons/bi';
import { BsBoxes, BsCpu, BsGlobe } from 'react-icons/bs';
import { CiServer } from 'react-icons/ci';
import { FaCode, FaNetworkWired, FaQuestion } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { GiSmartphone } from 'react-icons/gi';
import { GrNodes } from 'react-icons/gr';
import { HiServerStack } from 'react-icons/hi2';
import { IoAnalytics } from 'react-icons/io5';
import {
  MdAdminPanelSettings,
  MdOutlineDesignServices,
  MdScience,
} from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import { RiUserStarLine } from 'react-icons/ri';
import colors from 'tailwindcss/colors';

export enum Categories {
  'Frontend development' = 'Frontend development',
  'Backend development' = 'Backend development',
  'DevOps & Infrastructure' = 'DevOps & Infrastructure',
  'Data Science & Machine Learning' = 'Data Science & Machine Learning',
  'Mobile development' = 'Mobile development',
  'Testing & Quality assurance' = 'Testing & Quality assurance',
  'Computer graphics & Game development' = 'Computer graphics & Game development',
  'Blockchain' = 'Blockchain',
  'Design' = 'Design',
  'System administration' = 'System administration',
  'Website administration' = 'Website administration',
  '1C Development' = '1C Development',
  'Systems analytics' = 'Systems analytics',
  'Systems programming' = 'Systems programming',
  'Cybersecurity' = 'Cybersecurity',
  'HR management' = 'HR management',
  'Project management' = 'Project management',
  'Network administration' = 'Network administration',
  'Digital Marketing & SEO' = 'Digital Marketing & SEO',
  'Other' = 'Other',
}

export const DomainDescription: Record<Categories, string> = {
  'Frontend development':
    'Building interactive user interfaces and optimizing client-side.',
  'Backend development':
    'Implementing server logic, APIs, and data management.',
  'DevOps & Infrastructure':
    'Automating CI/CD, containerization, and server maintenance.',
  'Data Science & Machine Learning':
    'Data analysis, modeling, and deploying ML solutions.',
  'Mobile development':
    'Developing native and cross‑platform mobile applications.',
  'Testing & Quality assurance':
    'Planning and automating software testing processes.',
  'Computer graphics & Game development':
    '	2D/3D graphics, game engines, and rendering optimization.',
  Blockchain: 'Smart contracts, protocols, and decentralized networks.',
  Design: 'UI/UX design, prototyping, and visual identity.',
  'System administration':
    'Configuring, monitoring, and supporting server systems.',
  'Website administration': 'Managing CMS, content, and website security.',
  '1C Development':
    '	Building and customizing business apps on the 1C platform.',
  'Systems analytics':
    '	Gathering requirements, processes, and technical documentation.',
  'Systems programming':
    'Low‑level software: drivers, embedded systems, kernels.',
  Cybersecurity: 'Securing systems, penetration testing, and risk management.',
  'HR management': 'Recruiting, onboarding, and retaining IT personnel.',
  'Project management': 'Planning, coordinating, and overseeing IT projects.',
  'Network administration':
    'Designing, configuring, and monitoring computer networks.',
  'Digital Marketing & SEO':
    'Promotion, site optimization, and traffic analytics.',
  Other: 'Non‑technical and supporting roles outside core IT domains.',
};

export const DomainShort: Record<Categories, string> = {
  'Frontend development': 'Front',
  'Backend development': 'Back',
  'DevOps & Infrastructure': 'DevOps',
  'Data Science & Machine Learning': 'DS/ML',
  'Mobile development': 'Mobile',
  'Testing & Quality assurance': 'QA',
  'Computer graphics & Game development': 'CG/GD',
  Blockchain: 'BC',
  Design: 'Design',
  'System administration': 'SysAdm',
  'Website administration': 'WebAdm',
  '1C Development': '1C',
  'Systems analytics': 'Analytics',
  'Systems programming': 'SysProg',
  Cybersecurity: 'Security',
  'HR management': 'HR',
  'Project management': 'PM',
  'Network administration': 'Network',
  'Digital Marketing & SEO': 'Marketing',
  Other: 'Other',
};

export const CategoriesStyle = {
  [Categories['Frontend development']]: {
    logo: <FaCode />,
    color: colors.red[500],
  },
  [Categories['Backend development']]: {
    logo: <CiServer />,
    color: colors.cyan[500],
  },
  [Categories['DevOps & Infrastructure']]: {
    logo: <BsBoxes />,
    color: colors.blue[500],
  },
  [Categories['Data Science & Machine Learning']]: {
    logo: <MdScience />,
    color: colors.yellow[500],
  },
  [Categories['Mobile development']]: {
    logo: <GiSmartphone />,
    color: colors.fuchsia[500],
  },
  [Categories['Testing & Quality assurance']]: {
    logo: <BiBug />,
    color: colors.emerald[600],
  },
  [Categories['Computer graphics & Game development']]: {
    logo: <BiCube />,
    color: colors.red[500],
  },
  [Categories.Blockchain]: {
    logo: <GrNodes />,
    color: colors.gray[400],
  },
  [Categories.Design]: {
    logo: <MdOutlineDesignServices />,
    color: colors.rose[600],
  },
  [Categories['System administration']]: {
    logo: <HiServerStack />,
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
  [Categories['Systems analytics']]: {
    logo: <IoAnalytics />,
    color: colors.purple[500],
  },
  [Categories['Systems programming']]: {
    logo: <BsCpu />,
    color: colors.amber[600],
  },
  [Categories.Cybersecurity]: {
    logo: <BiShield />,
    color: colors.stone[600],
  },
  [Categories['HR management']]: {
    logo: <RiUserStarLine />,
    color: colors.sky[600],
  },
  [Categories['Project management']]: {
    logo: <PiUsersThree />,
    color: colors.pink[500],
  },
  [Categories['Network administration']]: {
    logo: <FaNetworkWired />,
    color: colors.blue[400],
  },
  [Categories['Digital Marketing & SEO']]: {
    logo: <FiTrendingUp />,
    color: colors.yellow[600],
  },
  [Categories.Other]: {
    logo: <FaQuestion />,
    color: colors.zinc[500],
  },
};
