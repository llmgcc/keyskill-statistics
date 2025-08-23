import {
  BiBarChart,
  BiBookOpen,
  BiBrain,
  BiBuilding,
  BiBuildings,
  BiChat,
  BiCloud,
  BiCodeBlock,
  BiCog,
  BiCoin,
  BiCube,
  BiData,
  BiDesktop,
  BiDotsHorizontal,
  BiEdit,
  BiFile,
  BiGroup,
  BiJoystick,
  BiLink,
  BiMobile,
  BiNetworkChart,
  BiPackage,
  BiSearch,
  BiServer,
  BiShare,
  BiShield,
  BiSolidBattery,
  BiSolidCube,
  BiStats,
  BiTask,
  BiTerminal,
  BiTestTube,
  BiText,
  BiTransfer,
  BiTrendingUp,
  BiWindow,
  BiWrench,
} from 'react-icons/bi';
import {
  BsBox,
  BsCloudCheck,
  BsDiagram2,
  BsGear,
  BsRobot,
} from 'react-icons/bs';
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
  'Programming Languages' = 'Programming Languages',
  'Databases' = 'Databases',
  'Frontend Libraries and Frameworks' = 'Frontend Libraries and Frameworks',
  'Backend Libraries and Frameworks' = 'Backend Libraries and Frameworks',
  'Soft Skills' = 'Soft Skills',
  'Operating Systems' = 'Operating Systems',
  'Containerization & Orchestration' = 'Containerization & Orchestration',
  'Infrastructure Automation & Configuration' = 'Infrastructure Automation & Configuration',
  'Code Collaboration & Integration' = 'Code Collaboration & Integration',
  'Graphic Design' = 'Graphic Design',
  'Monitoring & Logging' = 'Monitoring & Logging',
  'Machine Learning Libraries and Frameworks' = 'Machine Learning Libraries and Frameworks',
  'API Technologies & Standards' = 'API Technologies & Standards',
  'Web Servers & Proxies' = 'Web Servers & Proxies',
  'Message Brokers & Queues' = 'Message Brokers & Queues',
  'Security Tools & Practices' = 'Security Tools & Practices',
  'Mobile Development Frameworks' = 'Mobile Development Frameworks',
  'Game Engines & Tools' = 'Game Engines & Tools',
  'Business Intelligence Tools' = 'Business Intelligence Tools',
  'Testing Frameworks' = 'Testing Frameworks',
  'Cloud Services' = 'Cloud Services',
  'Package Managers' = 'Package Managers',
  'Build Tools' = 'Build Tools',
  'Code Editors & IDEs' = 'Code Editors & IDEs',
  'State Management Libraries' = 'State Management Libraries',
  'Content Management Systems' = 'Content Management Systems',
  'Graphics APIs & GPGPU' = 'Graphics APIs & GPGPU',
  'Project Management Tools' = 'Project Management Tools',
  'Network Protocols' = 'Network Protocols',
  'Blockchain Platforms and Tools' = 'Blockchain Platforms and Tools',
  '3D Modeling Tools' = '3D Modeling Tools',
  'CRM Platforms' = 'CRM Platforms',
  'Documentation Tools' = 'Documentation Tools',
  'Search Engine Technologies' = 'Search Engine Technologies',
  'Virtualization Platforms' = 'Virtualization Platforms',
  'AI Generation Tools' = 'AI Generation Tools',
  'NLP Processing Libraries' = 'NLP Processing Libraries',
  'ETL Tools' = 'ETL Tools',
  'Object-Relational Mappers' = 'Object-Relational Mappers',
  'SEO Analysis Tools' = 'SEO Analysis Tools',
  'ERP Systems' = 'ERP Systems',
  'Data Warehousing Tools' = 'Data Warehousing Tools',
  'Big Data Frameworks' = 'Big Data Frameworks',
  'Communication & Collaboration Tools' = 'Communication & Collaboration Tools',
  'Other' = 'Other',
  'Unknown' = 'Unknown',

  'Hardware & Maintenance' = 'Hardware & Maintenance',
  'Software Development Principles' = 'Software Development Principles',
  'Desktop Development Frameworks' = 'Desktop Development Frameworks',
  'System Design & Notations' = 'System Design & Notations',
  'Social Media & Content Platforms' = 'Social Media & Content Platforms',
  'Enterprise Business Platforms' = 'Enterprise Business Platforms',
}

export const CategoryDescription: Record<Categories, string> = {
  'Programming Languages':
    'Programming languages used to write software and applications',
  Databases: 'Systems for storing and managing structured data',
  'Frontend Libraries and Frameworks':
    'Libraries and frameworks for building user interfaces and web applications',
  'Backend Libraries and Frameworks':
    'Libraries and frameworks for server-side application development',
  'Soft Skills': 'Non-technical interpersonal and professional skills',
  'Operating Systems':
    'Software platforms that manage computer hardware and software resources',
  'Containerization & Orchestration':
    'Tools for packaging, deploying and managing containerized applications',
  'Infrastructure Automation & Configuration':
    'Tools for automating infrastructure deployment and configuration',
  'Code Collaboration & Integration':
    'Tools and practices for version control and continuous integration',
  'Graphic Design':
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
  'Testing Frameworks':
    'Frameworks and libraries specifically for automated testing',
  'Cloud Services': 'Specific cloud platform services and tools',
  'Package Managers': 'Tools for managing software packages and dependencies',
  'Build Tools': 'Tools for building, bundling and compiling code',
  'Code Editors & IDEs': 'Integrated development environments and text editors',
  'State Management Libraries': 'Libraries for managing application state',
  'Content Management Systems':
    'Platforms for creating, managing and publishing digital content',
  'Graphics APIs & GPGPU':
    'Graphics programming interfaces and general-purpose GPU computing frameworks',
  'Project Management Tools':
    'Applications used for planning, tracking, and managing software development projects',
  'Network Protocols':
    'Communication protocols that define rules for data transmission between devices and systems across networks',
  'Blockchain Platforms and Tools':
    'Platforms and frameworks for developing blockchain applications and smart contracts',
  '3D Modeling Tools':
    'Software for creating and editing 3D models and animations',
  'CRM Platforms':
    'Customer relationship management systems for managing interactions with customers',
  'Documentation Tools':
    'Tools for creating and managing technical documentation',
  'Search Engine Technologies':
    'Platforms and tools for implementing search functionality',
  'Virtualization Platforms':
    'Technologies for creating and managing virtual machines and environments',
  'AI Generation Tools':
    'AI-powered tools for generating content, code and other assets',
  'NLP Processing Libraries':
    'Libraries and frameworks for natural language processing tasks',
  'ETL Tools':
    'Tools for extracting, transforming and loading data between systems',
  'Object-Relational Mappers':
    'Libraries that map database structures to object-oriented models',
  'SEO Analysis Tools': 'Tools for optimizing websites for search engines',
  'ERP Systems':
    'Enterprise resource planning systems for managing business operations',
  'Data Warehousing Tools':
    'Platforms and tools for storing and analyzing large-scale data',
  'Big Data Frameworks':
    'Frameworks for processing and analyzing large datasets',
  'Communication & Collaboration Tools':
    'Platforms and tools for team communication and collaboration',
  Other: "Skills that don't fit into other specific categories",
  Unknown: 'Unclassified or emerging technology skills',

  'Enterprise Business Platforms':
    'Business management and enterprise resource planning platforms',
  'Hardware & Maintenance':
    'Computer hardware components, maintenance tools and repair equipment',
  'Software Development Principles':
    'Software engineering principles, design patterns and best practices for code development',
  'Desktop Development Frameworks':
    'Frameworks and libraries for building desktop applications',
  'System Design & Notations':
    'Standards and notations for modeling, documenting and visualizing systems and processes',
  'Social Media & Content Platforms':
    'Social media platforms and content creation tools for marketing and engagement',
};

export const CategoriesStyle = {
  [Categories['Programming Languages']]: {
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
  [Categories['Soft Skills']]: {
    logo: <FaHandshake />,
    color: colors.pink[400],
  },
  [Categories['Operating Systems']]: {
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
  [Categories['Graphic Design']]: {
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

  [Categories['Testing Frameworks']]: {
    logo: <BiTestTube />,
    color: colors.green[500],
  },
  [Categories['Cloud Services']]: {
    logo: <BiCloud />,
    color: colors.blue[400],
  },
  [Categories['Package Managers']]: {
    logo: <BiPackage />,
    color: colors.blue[500],
  },
  [Categories['Build Tools']]: {
    logo: <BiCog />,
    color: colors.gray[500],
  },
  [Categories['Code Editors & IDEs']]: {
    logo: <BiEdit />,
    color: colors.purple[500],
  },
  [Categories['State Management Libraries']]: {
    logo: <BiSolidBattery />,
    color: colors.indigo[400],
  },
  [Categories['Content Management Systems']]: {
    logo: <BiFile />,
    color: colors.cyan[500],
  },
  [Categories['Graphics APIs & GPGPU']]: {
    logo: <BiCube />,
    color: colors.red[500],
  },
  [Categories['Project Management Tools']]: {
    logo: <BiTask />,
    color: colors.blue[700],
  },
  [Categories['Network Protocols']]: {
    logo: <BiNetworkChart />,
    color: colors.teal[600],
  },
  [Categories['Blockchain Platforms and Tools']]: {
    logo: <BiCoin />,
    color: colors.yellow[500],
  },
  [Categories['3D Modeling Tools']]: {
    logo: <BiSolidCube />,
    color: colors.purple[400],
  },
  [Categories['CRM Platforms']]: {
    logo: <BiGroup />,
    color: colors.pink[500],
  },
  [Categories['Documentation Tools']]: {
    logo: <BiBookOpen />,
    color: colors.slate[500],
  },
  [Categories['Search Engine Technologies']]: {
    logo: <BiSearch />,
    color: colors.orange[400],
  },
  [Categories['Virtualization Platforms']]: {
    logo: <BiDesktop />,
    color: colors.gray[700],
  },
  [Categories['AI Generation Tools']]: {
    logo: <BiBrain />,
    color: colors.violet[500],
  },
  [Categories['NLP Processing Libraries']]: {
    logo: <BiText />,
    color: colors.emerald[400],
  },
  [Categories['ETL Tools']]: {
    logo: <BiTransfer />,
    color: colors.amber[500],
  },
  [Categories['Object-Relational Mappers']]: {
    logo: <BiLink />,
    color: colors.indigo[600],
  },
  [Categories['SEO Analysis Tools']]: {
    logo: <BiTrendingUp />,
    color: colors.green[600],
  },
  [Categories['ERP Systems']]: {
    logo: <BiBuilding />,
    color: colors.stone[600],
  },
  [Categories['Data Warehousing Tools']]: {
    logo: <BiData />,
    color: colors.blue[800],
  },
  [Categories['Big Data Frameworks']]: {
    logo: <BiStats />,
    color: colors.red[600],
  },
  [Categories['Communication & Collaboration Tools']]: {
    logo: <BiChat />,
    color: colors.sky[400],
  },

  [Categories['Hardware & Maintenance']]: {
    logo: <BiWrench />,
    color: colors.orange[600],
  },
  [Categories['Software Development Principles']]: {
    logo: <BiCodeBlock />,
    color: colors.emerald[600],
  },
  [Categories['Desktop Development Frameworks']]: {
    logo: <BiWindow />,
    color: colors.slate[600],
  },
  [Categories['System Design & Notations']]: {
    logo: <BsDiagram2 />,
    color: colors.cyan[600],
  },
  [Categories['Social Media & Content Platforms']]: {
    logo: <BiShare />,
    color: colors.pink[600],
  },
  [Categories['Enterprise Business Platforms']]: {
    logo: <BiBuildings />,
    color: colors.stone[600],
  },
};
