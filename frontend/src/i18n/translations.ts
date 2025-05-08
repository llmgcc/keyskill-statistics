import { Categories } from '@/config/categories';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';
import { Technologies } from '@/config/technologies';

export const translations = {
  en: {
    translation: {
      navigation: {
        uniqueSkills: 'Unique Key Skills (All Time)',
        lastUpdate: 'Last update',
        tooltips: {
          theme: 'Theme',
          currency: 'Currency',
          language: 'Language',
        },
      },
      currency: {
        EUR: 'Euro',
        USD: 'US Dollar',
        RUB: 'Russian Ruble',
      },
      mainText: {
        title: 'Analysis of <badge>key skills</badge> in the IT Sector',
        subtitle:
          'Skills and salary data were collected by analyzing <text>{{vacancies}}</text> IT job postings via the <linkto>HeadHunter API</linkto> from <text>{{dateFrom}}</text> to <text>{{dateTo}}</text>.',
        enumeration:
          'Key skills were classified using machine learning methods into:',
        domains: '- <linkto>{{count}} domains</linkto>, such as',
        categories: '- <linkto>{{count}} categories</linkto>, including',
        end: 'Classification helps to gauge which skills are in demand and to observe differences in salary ranges across IT domains.',
      },
      filters: {
        title: 'Filters',
      },
      categoryFilter: {
        allDomains: 'All domains',
        allCategories: 'All categories',
        placeholder: 'Title',
        placeholderForSkill: 'Search for a skill',
        strictMatch: 'Strict match',
        strictModeTooltipCategory:
          'Show only skills where the selected category is the primary category (highest confidence score)',
      },
      common: {
        and: 'and',
        days: 'days',
        experience: 'Experience',
        period: 'Period',
        unknownCategory: 'Unknown',
        domains: 'Domains',
        categories: 'Categories',
      },
      domains: Categories,
      categories: Technologies,
      experience: {
        [Experience.any]: 'Any',
        [Experience.noExperience]: 'No experience',
        [Experience.between1And3]: '1-3 years',
        [Experience.between3And6]: '3-6 years',
        [Experience.moreThan6]: 'More than 6 years',
      },
      highlights: Highlights,
    },
  },

  ru: {
    translation: {
      navigation: {
        uniqueSkills: 'Уникальных ключевых навыков (за все время)',
        lastUpdate: 'Последнее обновление',
        tooltips: {
          theme: 'Тема',
          currency: 'Валюта',
          language: 'Язык',
        },
      },
      currency: {
        EUR: 'Евро',
        USD: 'Доллар США',
        RUB: 'Российский рубль',
      },
      mainText: {
        title: 'Анализ <badge>ключевых навыков</badge> в IT-сфере',
        subtitle:
          'Данные о навыках и зарплатах собраны на основе анализа <text>{{vacancies}}</text> IT-вакансий с использованием <linkto>HeadHunter API</linkto> за период с <text>{{dateFrom}}</text> по <text>{{dateTo}}</text>.',
        enumeration:
          'Ключевые навыки классифицированы с помощью методов машинного обучения по:',
        domains: '- <linkto>{{count}} направлениям</linkto>, таким как',
        categories: '- <linkto>{{count}} категориям</linkto>, включая',
        end: 'Классификация помогает оценить, какие навыки востребованы, и увидеть различия в диапазонах зарплат между IT-направлениями.',
      },
      filters: {
        title: 'Фильтры',
      },
      categoryFilter: {
        allDomains: 'Все направления',
        allCategories: 'Все категории',
        placeholder: 'Название',
        placeholderForSkill: 'Название навыка',
        strictMatch: 'Точное совпадение',
        strictModeTooltipCategory:
          'Показывать только навыки, где выбранная категория является основной (с наивысшим показателем уверенности)',
      },
      common: {
        and: 'и',
        days: 'дней',
        experience: 'Опыт работы',
        period: 'Период',
        unknownCategory: 'Неизвестно',
        domains: 'Области',
        categories: 'Категории',
      },
      domains: {
        [Categories.Frontend]: 'Фронтэнд',
        [Categories.Backend]: 'Бэкэнд',
        [Categories['DevOps & Infrastructure']]: 'DevOps и Инфраструктура',
        [Categories['Data Science & Machine Learning']]:
          'Анализ данных и Машинное обучение',
        [Categories.Mobile]: 'Мобильная разработка',
        [Categories['Quality assurance']]: 'Обеспечение качества',
        [Categories['Computer graphics & Game development']]:
          'Компьютерная графика и Разработка игр',
        [Categories.Blockchain]: 'Блокчейн',
        [Categories.Design]: 'Дизайн',
        [Categories['System Administration']]: 'Системное администрирование',
        [Categories['Website administration']]: 'Администрирование сайтов',
        [Categories['1C Development']]: '1С Разработка',
        [Categories.Analytics]: 'Аналитика',
        [Categories['Systems programming']]: 'Системное программирование',
        [Categories['Information security']]: 'Информационная безопасность',
        [Categories['HR Management']]: 'HR Менеджмент',
        [Categories['Project management']]: 'Управление проектами',
        [Categories['Network administration']]: 'Сетевое администрирование',
        [Categories['Digital Marketing & SEO']]: 'Цифровой маркетинг и SEO',
        [Categories.Other]: 'Другое',
      },
      categories: {
        [Technologies.Languages]: 'Языки',
        [Technologies.Databases]: 'Базы данных',
        [Technologies['Frontend Libraries and Frameworks']]:
          'Фронтенд библиотеки и фреймворки',
        [Technologies['Backend Libraries and Frameworks']]:
          'Бэкенд библиотеки и фреймворки',
        [Technologies['Soft skills']]: 'Гибкие навыки',
        [Technologies['Operating systems']]: 'Операционные системы',
        [Technologies['Containerization & Orchestration']]:
          'Контейнеризация и оркестрация',
        [Technologies['Infrastructure Automation & Configuration']]:
          'Автоматизация и конфигурация инфраструктуры',
        [Technologies['Code Collaboration & Integration']]:
          'Совместная разработка и интеграция',
        [Technologies['Graphic design']]: 'Графический дизайн',
        [Technologies.Monitoring]: 'Мониторинг',
        [Technologies.CMS]: 'Системы управления контентом',
        [Technologies['Network Protocols']]: 'Сетевые протоколы',
        [Technologies['Web Servers']]: 'Веб-серверы',
        [Technologies['Integrated Development Environments']]:
          'Интегрированные среды разработки',
        [Technologies['Cloud platforms']]: 'Облачные платформы',
        [Technologies['Mobile Libraries and Frameworks']]:
          'Мобильные библиотеки и фреймворки',
        [Technologies['Message Brokers']]: 'Брокеры сообщений',
        [Technologies['Testing Tools']]: 'Инструменты тестирования',
        [Technologies['Machine Learning Libraries and Frameworks']]:
          'Библиотеки и фреймворки машинного обучения',
        [Technologies['Security tools and frameworks']]:
          'Инструменты и фреймворки безопасности',
        [Technologies['API technologies and protocols']]:
          'API технологии и протоколы',
        [Technologies['Game engines']]: 'Игровые движки',
        [Technologies['Project Management Tools']]:
          'Инструменты управления проектами',
        [Technologies['Blockchain platforms & tools']]:
          'Блокчейн платформы и инструменты',
        [Technologies['Messaging & Queuing systems']]:
          'Системы обмена сообщениями и очереди',
        [Technologies['Search & Indexing engines']]:
          'Поисковые и индексирующие движки',
        [Technologies['Data Visualization & BI tools']]:
          'Инструменты визуализации данных и бизнес-аналитики',
        [Technologies['Graphics APIs & GPGPU']]: 'Графические API и GPGPU',
        [Technologies['Documentation tools']]: 'Инструменты документации',
        [Technologies['Code Quality Tools']]:
          'Инструменты контроля качества кода',
      },
      experience: {
        [Experience.any]: 'Любой',
        [Experience.noExperience]: 'Нет опыта',
        [Experience.between1And3]: 'От 1 года до 3 лет',
        [Experience.between3And6]: 'От 3 до 6 лет',
        [Experience.moreThan6]: 'Более 6 лет',
      },
      highlights: {
        [Highlights['Fastest-Growing Skills']]: 'Самые быстрорастущие навыки',
        [Highlights['Skills Losing Demand']]: 'Навыки с падающим спросом',
        [Highlights['Newly Emerging Skills']]: 'Новые навыки',
        [Highlights['Highest-Paying Skills']]:
          'Навыки с максимальной зарплатой',
        [Highlights['Lowest-Paying Skills']]: 'Навыки с минимальной зарплатой',
        [Highlights['Skills with Undisclosed Salaries']]:
          'Навыки с неизвестной зарплатой',
      },
    },
  },
};
