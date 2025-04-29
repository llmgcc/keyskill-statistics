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

export enum Technologies {
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
}

export const TechnologiesStyle = {
  [Technologies.Languages]: {
    logo: <PiBracketsCurlyBold />,
    color: colors.indigo[600],
  },
  [Technologies.Databases]: {
    logo: <MdOutlineDataUsage />,
    color: colors.sky[600],
  },
  [Technologies['Frontend Libraries and Frameworks']]: {
    logo: <GiSpiderWeb />,
    color: colors.violet[500],
  },
  [Technologies['Backend Libraries and Frameworks']]: {
    logo: <IoServerSharp />,
    color: colors.amber[600],
  },
  [Technologies['Soft skills']]: {
    logo: <BsPuzzle />,
    color: colors.fuchsia[500],
  },
  [Technologies['Operating systems']]: {
    logo: <FiCommand />,
    color: colors.slate[600],
  },
  [Technologies['Containerization & Orchestration']]: {
    logo: <FiCodesandbox />,
    color: colors.blue[400],
  },
  [Technologies['Infrastructure Automation & Configuration']]: {
    logo: <FaRobot />,
    color: colors.orange[500],
  },
  [Technologies['Code Collaboration & Integration']]: {
    logo: <GiBlockHouse />,
    color: colors.teal[500],
  },
  [Technologies['Graphic design']]: {
    logo: <IoColorPaletteOutline />,
    color: colors.rose[500],
  },
  [Technologies.Monitoring]: {
    logo: <FiSearch />,
    color: colors.emerald[500],
  },
  [Technologies.CMS]: {
    logo: <FiBox />,
    color: colors.purple[400],
  },
  [Technologies['Network Protocols']]: {
    logo: <FaNetworkWired />,
    color: colors.cyan[500],
  },
  [Technologies['Web Servers']]: {
    logo: <GiArtificialIntelligence />,
    color: colors.lime[500],
  },
  [Technologies['Integrated Development Environments']]: {
    logo: <FiCloud />,
    color: colors.sky[400],
  },
  [Technologies['Cloud platforms']]: {
    logo: <TbCloudLock />,
    color: colors.blue[300],
  },
  [Technologies['Mobile Libraries and Frameworks']]: {
    logo: <PiEngine />,
    color: colors.pink[500],
  },
  [Technologies['Message Brokers']]: {
    logo: <SiApachekafka />,
    color: colors.green[500],
  },
  [Technologies['Testing Tools']]: {
    logo: <RiTestTubeLine />,
    color: colors.red[500],
  },
  [Technologies['Machine Learning Libraries and Frameworks']]: {
    logo: <FaRobot />,
    color: colors.fuchsia[600],
  },
  [Technologies['Security tools and frameworks']]: {
    logo: <BsShieldLock />,
    color: colors.yellow[500],
  },
  [Technologies['API technologies and protocols']]: {
    logo: <MdApi />,
    color: colors.orange[400],
  },
  [Technologies['Game engines']]: {
    logo: <PiEngine />,
    color: colors.purple[600],
  },
  [Technologies['Project Management Tools']]: {
    logo: <BsPuzzle />,
    color: colors.cyan[400],
  },
  [Technologies['Blockchain platforms & tools']]: {
    logo: <GrNodes />,
    color: colors.lime[600],
  },
  [Technologies['Messaging & Queuing systems']]: {
    logo: <FiMessageSquare />,
    color: colors.blue[500],
  },
  [Technologies['Search & Indexing engines']]: {
    logo: <SiElasticsearch />,
    color: colors.red[400],
  },
};
