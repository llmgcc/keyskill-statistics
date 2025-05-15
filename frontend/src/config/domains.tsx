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

export enum Domains {
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

export const DomainDescription: Record<Domains, string> = {
  'Frontend development':
    'Building interactive user interfaces and optimizing client-side',
  'Backend development':
    'Implementing server logic, APIs, and data management',
  'DevOps & Infrastructure':
    'Automating CI/CD, containerization, and server maintenance',
  'Data Science & Machine Learning':
    'Data analysis, modeling, and deploying ML solutions',
  'Mobile development':
    'Developing native and cross‑platform mobile applications',
  'Testing & Quality assurance':
    'Planning and automating software testing processes',
  'Computer graphics & Game development':
    '	2D/3D graphics, game engines, and rendering optimization',
  Blockchain: 'Smart contracts, protocols, and decentralized networks',
  Design: 'UI/UX design, prototyping, and visual identity',
  'System administration':
    'Configuring, monitoring, and supporting server systems',
  'Website administration': 'Managing CMS, content, and website security',
  '1C Development':
    'Building and customizing business apps on the 1C platform',
  'Systems analytics':
    'Gathering requirements, processes, and technical documentation',
  'Systems programming':
    'Low‑level software: drivers, embedded systems, IoT',
  Cybersecurity: 'Securing systems, penetration testing, and risk management',
  'HR management': 'Recruiting, onboarding, and retaining IT personnel',
  'Project management': 'Planning, coordinating, and overseeing IT projects',
  'Network administration':
    'Designing, configuring, and monitoring computer networks',
  'Digital Marketing & SEO':
    'Promotion, site optimization, and traffic analytics',
  Other: 'Non‑technical and supporting roles outside core IT domains',
};

export const DomainShort: Record<Domains, string> = {
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
  'Systems analytics': 'SA',
  'Systems programming': 'SP',
  Cybersecurity: 'Sec',
  'HR management': 'HR',
  'Project management': 'PM',
  'Network administration': 'Net',
  'Digital Marketing & SEO': 'DM/SEO',
  Other: 'Other',
};

export const DomainsStyle = {
  [Domains['Frontend development']]: {
    logo: <FaCode />,
    color: colors.red[500],
  },
  [Domains['Backend development']]: {
    logo: <CiServer />,
    color: colors.cyan[500],
  },
  [Domains['DevOps & Infrastructure']]: {
    logo: <BsBoxes />,
    color: colors.blue[500],
  },
  [Domains['Data Science & Machine Learning']]: {
    logo: <MdScience />,
    color: colors.yellow[500],
  },
  [Domains['Mobile development']]: {
    logo: <GiSmartphone />,
    color: colors.fuchsia[500],
  },
  [Domains['Testing & Quality assurance']]: {
    logo: <BiBug />,
    color: colors.emerald[600],
  },
  [Domains['Computer graphics & Game development']]: {
    logo: <BiCube />,
    color: colors.red[600],
  },
  [Domains.Blockchain]: {
    logo: <GrNodes />,
    color: colors.gray[400],
  },
  [Domains.Design]: {
    logo: <MdOutlineDesignServices />,
    color: colors.rose[600],
  },
  [Domains['System administration']]: {
    logo: <HiServerStack />,
    color: colors.slate[700],
  },
  [Domains['Website administration']]: {
    logo: <BsGlobe />,
    color: colors.teal[500],
  },
  [Domains['1C Development']]: {
    logo: <MdAdminPanelSettings />,
    color: colors.cyan[600],
  },
  [Domains['Systems analytics']]: {
    logo: <IoAnalytics />,
    color: colors.purple[500],
  },
  [Domains['Systems programming']]: {
    logo: <BsCpu />,
    color: colors.amber[600],
  },
  [Domains.Cybersecurity]: {
    logo: <BiShield />,
    color: colors.stone[600],
  },
  [Domains['HR management']]: {
    logo: <RiUserStarLine />,
    color: colors.sky[600],
  },
  [Domains['Project management']]: {
    logo: <PiUsersThree />,
    color: colors.pink[500],
  },
  [Domains['Network administration']]: {
    logo: <FaNetworkWired />,
    color: colors.blue[800],
  },
  [Domains['Digital Marketing & SEO']]: {
    logo: <FiTrendingUp />,
    color: colors.yellow[600],
  },
  [Domains.Other]: {
    logo: <FaQuestion />,
    color: colors.zinc[500],
  },
};
