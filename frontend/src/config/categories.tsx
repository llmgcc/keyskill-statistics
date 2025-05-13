import { BsPuzzle, BsShieldLock } from 'react-icons/bs';
import { FaNetworkWired, FaRobot } from 'react-icons/fa';
import {
  FiBox,
  FiCloud,
  FiCodesandbox,
  FiCommand,
  FiMessageSquare,
  FiSearch,
} from 'react-icons/fi';
import {
  GiArtificialIntelligence,
  GiBlockHouse,
  GiSpiderWeb,
} from 'react-icons/gi';
import { GrNodes } from 'react-icons/gr';
import { IoColorPaletteOutline, IoServerSharp } from 'react-icons/io5';
import { MdApi, MdOutlineDataUsage } from 'react-icons/md';
import { PiBracketsCurlyBold, PiEngine } from 'react-icons/pi';
import { RiTestTubeLine } from 'react-icons/ri';
import { SiApachekafka, SiElasticsearch } from 'react-icons/si';
import { TbCloudLock } from 'react-icons/tb';
import colors from 'tailwindcss/colors';

export enum Categories {
  'Languages' = 'Languages',
  'Databases' = 'Databases',
  'Frontend Libraries and Frameworks' = 'Frontend Libraries and Frameworks',
  'Backend Libraries and Frameworks' = 'Backend Libraries and Frameworks',
  'Soft skills' = 'Soft skills',
  'Operating systems' = 'Operating systems',
  'Containerization & Orchestration' = 'Containerization & Orchestration',
  'Infrastructure Automation & Configuration' = 'Infrastructure Automation & Configuration',
  'Code Collaboration & Integration' = 'Code Collaboration & Integration',
  'Graphic design' = 'Graphic design',
  'Monitoring' = 'Monitoring',
  'CMS' = 'CMS',
  'Network Protocols' = 'Network Protocols',
  'Web Servers' = 'Web Servers',
  'Integrated Development Environments' = 'Integrated Development Environments',
  'Cloud platforms' = 'Cloud platforms',
  'Mobile Libraries and Frameworks' = 'Mobile Libraries and Frameworks',
  'Message Brokers' = 'Message Brokers',
  'Testing Tools' = 'Testing Tools',
  'Machine Learning Libraries and Frameworks' = 'Machine Learning Libraries and Frameworks',
  'Security tools and frameworks' = 'Security tools and frameworks',
  'API technologies and protocols' = 'API technologies and protocols',
  'Game engines' = 'Game engines',
  'Project Management Tools' = 'Project Management Tools',
  'Blockchain platforms & tools' = 'Blockchain platforms & tools',
  'Messaging & Queuing systems' = 'Messaging & Queuing systems',
  'Search & Indexing engines' = 'Search & Indexing engines',

  'Data Visualization & BI tools' = 'Data Visualization & BI tools',
  'Graphics APIs & GPGPU' = 'Graphics APIs & GPGPU',
  'Documentation tools' = 'Documentation tools',
  'Code Quality Tools' = 'Code Quality Tools',
}

export const CategoryDescription: Record<Categories, string> = {
  Languages:
    'Programming and markup languages for development and data processing.',
  Databases: 'Systems for storing and querying structured data.',
  'Frontend Libraries and Frameworks':
    'Tools for dynamic interfaces and state management.',
  'Backend Libraries and Frameworks':
    '	Server frameworks for APIs, business logic, and database work.',
  'Soft skills': 'Communication, teamwork, and interpersonal abilities.',
  'Operating systems':
    'OS for development, deployment, and system administration.',
  'Containerization & Orchestration':
    'Packaging in containers and managing scalable deployments.',
  'Infrastructure Automation & Configuration':
    '	Infrastructure-as-code: automated provisioning and configuration.',
  'Code Collaboration & Integration':
    'Version control and CI/CD tools for team development.',
  'Graphic design':
    'Creating visual elements, layouts, and digital illustrations.',
  Monitoring: 'Collecting metrics and alerts to track system health.',
  CMS: 'Content management platforms for website publishing and upkeep.',
  'Network Protocols':
    'Rules for data exchange between devices and applications.',
  'Web Servers':
    'Servers for handling HTTP/HTTPS requests and serving content.',
  'Integrated Development Environments':
    'IDEs with editor, debugger, and build tools.',
  'Cloud platforms':
    'Cloud services for compute, storage, and resource management.',
  'Mobile Libraries and Frameworks':
    'Frameworks for native and cross‑platform mobile development.',
  'Message Brokers':
    'Message brokers and queues for asynchronous communication.',
  'Testing Tools':
    'Automating functional, integration, and performance testing.',
  'Machine Learning Libraries and Frameworks':
    'Libraries for training, evaluating, and deploying ML/DL models.',
  'Security tools and frameworks':
    'Tools for penetration testing, security analysis, and protection.',
  'API technologies and protocols':
    'Protocols and standards for building and consuming web services.',
  'Game engines':
    'Frameworks for 2D/3D game development, rendering, and physics.',
  'Project Management Tools':
    'Tools for planning, tracking, and managing project tasks.',
  'Blockchain platforms & tools':
    'Platforms and utilities for decentralized application development.',
  'Messaging & Queuing systems':
    'Message brokers and queues for asynchronous communication.',
  'Search & Indexing engines':
    'Full‑text search systems and data indexing engines.',
  'Data Visualization & BI tools':
    'Dashboards and reports for data visualization and business analytics.',
  'Graphics APIs & GPGPU': 'APIs for hardware rendering and GPGPU computation.',
  'Documentation tools':
    'Systems for writing, storing, and publishing technical docs.',
  'Code Quality Tools':
    'Analyzers and linters for code quality and compliance metrics.',
};

export const CategoryShort: Record<Categories, string> = {
  Languages: 'Langs',
  Databases: 'DB',
  'Frontend Libraries and Frameworks': 'FrontLibs',
  'Backend Libraries and Frameworks': 'BackLibs',
  'Soft skills': 'Soft',
  'Operating systems': 'OS',
  'Containerization & Orchestration': 'Containers',
  'Infrastructure Automation & Configuration': 'IaC',
  'Code Collaboration & Integration': 'CI/CD',
  'Graphic design': 'Design',
  Monitoring: 'Monitor',
  CMS: 'CMS',
  'Network Protocols': 'Net',
  'Web Servers': 'WebServ',
  'Integrated Development Environments': 'IDE',
  'Cloud platforms': 'Cloud',
  'Mobile Libraries and Frameworks': 'Mobile',
  'Message Brokers': 'Brokers',
  'Testing Tools': 'Testing',
  'Machine Learning Libraries and Frameworks': 'ML',
  'Security tools and frameworks': 'Security',
  'API technologies and protocols': 'API',
  'Game engines': 'Games',
  'Project Management Tools': 'PM',
  'Blockchain platforms & tools': 'Block',
  'Messaging & Queuing systems': 'Queue',
  'Search & Indexing engines': 'Search',
  'Data Visualization & BI tools': 'BI',
  'Graphics APIs & GPGPU': 'Graphics',
  'Documentation tools': 'Docs',
  'Code Quality Tools': 'CodeQ',
};

export const CategoriesStyle = {
  [Categories.Languages]: {
    logo: <PiBracketsCurlyBold />,
    color: colors.indigo[600],
  },
  [Categories.Databases]: {
    logo: <MdOutlineDataUsage />,
    color: colors.sky[600],
  },
  [Categories['Frontend Libraries and Frameworks']]: {
    logo: <GiSpiderWeb />,
    color: colors.violet[500],
  },
  [Categories['Backend Libraries and Frameworks']]: {
    logo: <IoServerSharp />,
    color: colors.amber[600],
  },
  [Categories['Soft skills']]: {
    logo: <BsPuzzle />,
    color: colors.fuchsia[500],
  },
  [Categories['Operating systems']]: {
    logo: <FiCommand />,
    color: colors.slate[600],
  },
  [Categories['Containerization & Orchestration']]: {
    logo: <FiCodesandbox />,
    color: colors.blue[400],
  },
  [Categories['Infrastructure Automation & Configuration']]: {
    logo: <FaRobot />,
    color: colors.orange[500],
  },
  [Categories['Code Collaboration & Integration']]: {
    logo: <GiBlockHouse />,
    color: colors.teal[500],
  },
  [Categories['Graphic design']]: {
    logo: <IoColorPaletteOutline />,
    color: colors.rose[500],
  },
  [Categories.Monitoring]: {
    logo: <FiSearch />,
    color: colors.emerald[500],
  },
  [Categories.CMS]: {
    logo: <FiBox />,
    color: colors.purple[400],
  },
  [Categories['Network Protocols']]: {
    logo: <FaNetworkWired />,
    color: colors.cyan[500],
  },
  [Categories['Web Servers']]: {
    logo: <GiArtificialIntelligence />,
    color: colors.lime[500],
  },
  [Categories['Integrated Development Environments']]: {
    logo: <FiCloud />,
    color: colors.sky[400],
  },
  [Categories['Cloud platforms']]: {
    logo: <TbCloudLock />,
    color: colors.blue[300],
  },
  [Categories['Mobile Libraries and Frameworks']]: {
    logo: <PiEngine />,
    color: colors.pink[500],
  },
  [Categories['Message Brokers']]: {
    logo: <SiApachekafka />,
    color: colors.green[500],
  },
  [Categories['Testing Tools']]: {
    logo: <RiTestTubeLine />,
    color: colors.red[500],
  },
  [Categories['Machine Learning Libraries and Frameworks']]: {
    logo: <FaRobot />,
    color: colors.fuchsia[600],
  },
  [Categories['Security tools and frameworks']]: {
    logo: <BsShieldLock />,
    color: colors.yellow[500],
  },
  [Categories['API technologies and protocols']]: {
    logo: <MdApi />,
    color: colors.orange[400],
  },
  [Categories['Game engines']]: {
    logo: <PiEngine />,
    color: colors.purple[600],
  },
  [Categories['Project Management Tools']]: {
    logo: <BsPuzzle />,
    color: colors.cyan[400],
  },
  [Categories['Blockchain platforms & tools']]: {
    logo: <GrNodes />,
    color: colors.lime[600],
  },
  [Categories['Messaging & Queuing systems']]: {
    logo: <FiMessageSquare />,
    color: colors.blue[500],
  },
  [Categories['Search & Indexing engines']]: {
    logo: <SiElasticsearch />,
    color: colors.red[400],
  },

  [Categories['Data Visualization & BI tools']]: {
    logo: <SiElasticsearch />,
    color: colors.red[400],
  },
  [Categories['Graphics APIs & GPGPU']]: {
    logo: <SiElasticsearch />,
    color: colors.red[400],
  },
  [Categories['Documentation tools']]: {
    logo: <SiElasticsearch />,
    color: colors.red[400],
  },
  [Categories['Code Quality Tools']]: {
    logo: <SiElasticsearch />,
    color: colors.red[400],
  },
};
