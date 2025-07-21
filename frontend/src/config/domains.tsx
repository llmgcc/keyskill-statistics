import { BiBug, BiCube, BiDotsHorizontal, BiShield } from 'react-icons/bi';
import { BsBoxes, BsCpu, BsGlobe } from 'react-icons/bs';
import { CiServer } from 'react-icons/ci';
import { FaCode, FaNetworkWired, FaQuestion } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { GiSmartphone } from 'react-icons/gi';
import { GrNodes } from 'react-icons/gr';
import { HiServerStack } from 'react-icons/hi2';
import { IoAnalytics, IoBarChart } from 'react-icons/io5';
import { LuKanban } from 'react-icons/lu';
import {
  MdAdminPanelSettings,
  MdOutlineDesignServices,
  MdScience,
} from 'react-icons/md';
import { PiDatabaseThin, PiUsersThree } from 'react-icons/pi';
import { RiUserStarLine } from 'react-icons/ri';
import colors from 'tailwindcss/colors';

export enum Domains {
  'Frontend development' = 'Frontend development',
  'Backend development' = 'Backend development',
  'Testing & Quality assurance' = 'Testing & Quality assurance',
  'Technical support' = 'Technical support',
  'DevOps & Infrastructure' = 'DevOps & Infrastructure',
  'Systems analytics' = 'Systems analytics',
  'Project management' = 'Project management',
  'System administration' = 'System administration',
  'Computer Graphics & Game Development' = 'Computer Graphics & Game Development',
  'Mobile development' = 'Mobile development',
  'Design' = 'Design',
  'Data Science' = 'Data Science',
  'Cybersecurity' = 'Cybersecurity',
  'HR Management' = 'HR Management',
  'Digital Marketing & SEO' = 'Digital Marketing & SEO',
  'Systems Programming' = 'Systems Programming',
  '1C Development' = '1C Development',
  'Website administration' = 'Website administration',
  'Blockchain' = 'Blockchain',
  'Data analytics' = 'Data analytics',
  'Product Management' = 'Product Management',
  'Network Administration' = 'Network Administration',
  'Database Administration' = 'Database Administration',
  'Other' = 'Other',
  'Unknown' = 'Unknown',
}

export const DomainDescription: Record<Domains, string> = {
  'Frontend development':
    'Building interactive user interfaces and optimizing client-side',
  'Backend development': 'Implementing server logic, APIs, and data management',
  'Testing & Quality assurance':
    'Planning and automating software testing processes',
  'Technical support':
    'Installing, configuring and troubleshooting hardware and software',
  'DevOps & Infrastructure':
    'Automating CI/CD, containerization, and server maintenance',
  'Systems analytics':
    'Gathering requirements, processes, and technical documentation',
  'Project management': 'Planning, coordinating, and overseeing IT projects',
  'System administration':
    'Configuring, monitoring, and supporting server systems',
  'Computer Graphics & Game Development':
    '2D/3D graphics, game engines, and rendering optimization',
  'Mobile development':
    'Developing native and cross‑platform mobile applications',
  Design: 'UI/UX design, prototyping, and visual identity',
  'Data Science': 'Data analysis, modeling, and deploying ML solutions',
  Cybersecurity: 'Securing systems, penetration testing, and risk management',
  'HR Management': 'Recruiting, onboarding, and retaining IT personnel',
  'Digital Marketing & SEO':
    'Promotion, site optimization, and traffic analytics',
  'Systems Programming': 'Low‑level software: drivers, embedded systems, IoT',
  '1C Development': 'Building and customizing business apps on the 1C platform',
  'Website administration': 'Managing CMS, content, and website security',
  Blockchain: 'Smart contracts, protocols, and decentralized networks',
  'Data analytics': 'Business intelligence, data visualization and reporting',
  'Product Management':
    'Strategic planning and development of digital products',
  'Network Administration':
    'Designing, configuring, and monitoring computer networks',
  'Database Administration':
    'Managing database systems, optimization and security',
  Other: 'Non‑technical and supporting roles outside core IT domains',
  Unknown: 'Unclassified or emerging technology domains',
};

export const DomainShort: Record<Domains, string> = {
  'Frontend development': 'Front',
  'Backend development': 'Back',
  'Testing & Quality assurance': 'QA',
  'Technical support': 'Support',
  'DevOps & Infrastructure': 'DevOps',
  'Systems analytics': 'SA',
  'Project management': 'PM',
  'System administration': 'SysAdm',
  'Computer Graphics & Game Development': 'CG/GD',
  'Mobile development': 'Mobile',
  Design: 'Design',
  'Data Science': 'DS',
  Cybersecurity: 'Sec',
  'HR Management': 'HR',
  'Digital Marketing & SEO': 'DM/SEO',
  'Systems Programming': 'SP',
  '1C Development': '1C',
  'Website administration': 'WebAdm',
  Blockchain: 'BC',
  'Data analytics': 'DA',
  'Product Management': 'ProdM',
  'Network Administration': 'Net',
  'Database Administration': 'DBA',
  Other: 'Other',
  Unknown: 'Unknown',
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
  [Domains['Testing & Quality assurance']]: {
    logo: <BiBug />,
    color: colors.emerald[600],
  },
  [Domains['Technical support']]: {
    logo: <MdAdminPanelSettings />,
    color: colors.blue[400],
  },
  [Domains['DevOps & Infrastructure']]: {
    logo: <BsBoxes />,
    color: colors.blue[500],
  },
  [Domains['Systems analytics']]: {
    logo: <IoAnalytics />,
    color: colors.purple[500],
  },
  [Domains['Project management']]: {
    logo: <PiUsersThree />,
    color: colors.pink[500],
  },
  [Domains['System administration']]: {
    logo: <HiServerStack />,
    color: colors.slate[700],
  },
  [Domains['Computer Graphics & Game Development']]: {
    logo: <BiCube />,
    color: colors.red[600],
  },
  [Domains['Mobile development']]: {
    logo: <GiSmartphone />,
    color: colors.fuchsia[500],
  },
  [Domains.Design]: {
    logo: <MdOutlineDesignServices />,
    color: colors.rose[600],
  },
  [Domains['Data Science']]: {
    logo: <MdScience />,
    color: colors.yellow[500],
  },
  [Domains.Cybersecurity]: {
    logo: <BiShield />,
    color: colors.stone[600],
  },
  [Domains['HR Management']]: {
    logo: <RiUserStarLine />,
    color: colors.sky[600],
  },
  [Domains['Digital Marketing & SEO']]: {
    logo: <FiTrendingUp />,
    color: colors.yellow[600],
  },
  [Domains['Systems Programming']]: {
    logo: <BsCpu />,
    color: colors.amber[600],
  },
  [Domains['1C Development']]: {
    logo: <MdAdminPanelSettings />,
    color: colors.cyan[600],
  },
  [Domains['Website administration']]: {
    logo: <BsGlobe />,
    color: colors.teal[500],
  },
  [Domains.Blockchain]: {
    logo: <GrNodes />,
    color: colors.gray[400],
  },
  [Domains['Data analytics']]: {
    logo: <IoBarChart />,
    color: colors.indigo[500],
  },
  [Domains['Product Management']]: {
    logo: <LuKanban />,
    color: colors.orange[300],
  },
  [Domains['Network Administration']]: {
    logo: <FaNetworkWired />,
    color: colors.blue[800],
  },
  [Domains['Database Administration']]: {
    logo: <PiDatabaseThin />,
    color: colors.orange[500],
  },
  [Domains.Other]: {
    logo: <BiDotsHorizontal />,
    color: colors.zinc[500],
  },
  [Domains.Unknown]: {
    logo: <FaQuestion />,
    color: colors.slate[400],
  },
};
