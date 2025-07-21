import {
  BiBarChart,
  BiDotsHorizontal,
  BiJoystick,
  BiMobile,
  BiServer,
  BiShield,
  BiTerminal,
} from 'react-icons/bi';
import { BsBox, BsCloudCheck, BsGear, BsRobot } from 'react-icons/bs';
import {
  FaCode,
  FaCodeBranch,
  FaDatabase,
  FaHandshake,
  FaPaintBrush,
  FaQuestion,
} from 'react-icons/fa';
import { MdApi } from 'react-icons/md';
import { PiBracketsCurly } from 'react-icons/pi';
import { RiDashboard2Fill } from 'react-icons/ri';
import { TbServerBolt } from 'react-icons/tb';
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
  'Monitoring & Logging' = 'Monitoring & Logging',
  'Machine Learning Libraries and Frameworks' = 'Machine Learning Libraries and Frameworks',
  'API Technologies & Standards' = 'API Technologies & Standards',
  'Web Servers & Proxies' = 'Web Servers & Proxies',
  'Message Brokers & Queues' = 'Message Brokers & Queues',
  'Security Tools & Practices' = 'Security Tools & Practices',
  'Mobile Development Frameworks' = 'Mobile Development Frameworks',
  'Game Engines & Tools' = 'Game Engines & Tools',
  'Business Intelligence Tools' = 'Business Intelligence Tools',
  'Other' = 'Other',
  'Unknown' = 'Unknown',
}

export const CategoryDescription: Record<Categories, string> = {
  Languages: 'Programming languages used to write software and applications',
  Databases: 'Systems for storing and managing structured data',
  'Frontend Libraries and Frameworks':
    'Libraries and frameworks for building user interfaces and web applications',
  'Backend Libraries and Frameworks':
    'Libraries and frameworks for server-side application development',
  'Soft skills': 'Non-technical interpersonal and professional skills',
  'Operating systems':
    'Software platforms that manage computer hardware and software resources',
  'Containerization & Orchestration':
    'Tools for packaging, deploying and managing containerized applications',
  'Infrastructure Automation & Configuration':
    'Tools for automating infrastructure deployment and configuration',
  'Code Collaboration & Integration':
    'Tools and practices for version control and continuous integration',
  'Graphic design':
    'Tools for creating and editing visual content and user interfaces',
  'Monitoring & Logging':
    'Tools and platforms for system monitoring, logging and observability',
  'Machine Learning Libraries and Frameworks':
    'Libraries and tools for developing machine learning and AI applications',
  'API Technologies & Standards':
    'Technologies and specifications for building and documenting APIs',
  'Web Servers & Proxies':
    'Software for serving web content and managing network traffic',
  'Message Brokers & Queues':
    'Systems for handling asynchronous messaging and event processing',
  'Security Tools & Practices':
    'Tools and methodologies for application and infrastructure security',
  'Mobile Development Frameworks':
    'Frameworks for building mobile applications',
  'Game Engines & Tools': 'Platforms and tools for game development',
  'Business Intelligence Tools':
    'Tools for data analysis and business reporting',
  Other: "Skills that don't fit into other specific categories",
  Unknown: 'Unclassified or emerging technology skills',
};

export const CategoryShort: Record<Categories, string> = {
  Languages: 'Lang',
  Databases: 'DB',
  'Frontend Libraries and Frameworks': 'Front',
  'Backend Libraries and Frameworks': 'Back',
  'Soft skills': 'Soft',
  'Operating systems': 'OS',
  'Containerization & Orchestration': 'Cont',
  'Infrastructure Automation & Configuration': 'IaC',
  'Code Collaboration & Integration': 'CI/CD',
  'Graphic design': 'Design',
  'Monitoring & Logging': 'Monitor',
  'Machine Learning Libraries and Frameworks': 'ML',
  'API Technologies & Standards': 'API',
  'Web Servers & Proxies': 'Web',
  'Message Brokers & Queues': 'Queue',
  'Security Tools & Practices': 'Sec',
  'Mobile Development Frameworks': 'Mobile',
  'Game Engines & Tools': 'Game',
  'Business Intelligence Tools': 'BI',
  Other: 'Other',
  Unknown: 'Unknown',
};

export const CategoriesStyle = {
  [Categories.Languages]: {
    logo: <PiBracketsCurly />,
    color: colors.blue[500],
  },
  [Categories.Databases]: {
    logo: <FaDatabase />,
    color: colors.violet[600],
  },
  [Categories['Frontend Libraries and Frameworks']]: {
    logo: <FaCode />,
    color: colors.red[400],
  },
  [Categories['Backend Libraries and Frameworks']]: {
    logo: <BiServer />,
    color: colors.indigo[500],
  },
  [Categories['Soft skills']]: {
    logo: <FaHandshake />,
    color: colors.pink[400],
  },
  [Categories['Operating systems']]: {
    logo: <BiTerminal />,
    color: colors.gray[600],
  },
  [Categories['Containerization & Orchestration']]: {
    logo: <BsBox />,
    color: colors.blue[600],
  },
  [Categories['Infrastructure Automation & Configuration']]: {
    logo: <BsGear />,
    color: colors.amber[600],
  },
  [Categories['Code Collaboration & Integration']]: {
    logo: <FaCodeBranch />,
    color: colors.purple[600],
  },
  [Categories['Graphic design']]: {
    logo: <FaPaintBrush />,
    color: colors.rose[400],
  },
  [Categories['Monitoring & Logging']]: {
    logo: <RiDashboard2Fill />,
    color: colors.emerald[500],
  },
  [Categories['Machine Learning Libraries and Frameworks']]: {
    logo: <BsRobot />,
    color: colors.yellow[600],
  },
  [Categories['API Technologies & Standards']]: {
    logo: <MdApi />,
    color: colors.sky[500],
  },
  [Categories['Web Servers & Proxies']]: {
    logo: <TbServerBolt />,
    color: colors.teal[500],
  },
  [Categories['Message Brokers & Queues']]: {
    logo: <BsCloudCheck />,
    color: colors.violet[300],
  },
  [Categories['Security Tools & Practices']]: {
    logo: <BiShield />,
    color: colors.zinc[600],
  },
  [Categories['Mobile Development Frameworks']]: {
    logo: <BiMobile />,
    color: colors.fuchsia[500],
  },
  [Categories['Game Engines & Tools']]: {
    logo: <BiJoystick />,
    color: colors.orange[500],
  },
  [Categories['Business Intelligence Tools']]: {
    logo: <BiBarChart />,
    color: colors.lime[600],
  },
  [Categories.Other]: {
    logo: <BiDotsHorizontal />,
    color: colors.zinc[500],
  },
  [Categories.Unknown]: {
    logo: <FaQuestion />,
    color: colors.slate[400],
  },
};
