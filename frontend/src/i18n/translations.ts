import {
  Categories,
  DomainDescription,
  DomainShort,
} from '@/config/categories';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';
import {
  CategoryDescription,
  CategoryShort,
  Technologies,
} from '@/config/technologies';

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
        all: 'All',
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
      domainsShort: DomainShort,
      domainDescription: DomainDescription,
      categories: Technologies,
      categoriesShort: CategoryShort,
      categoryDescription: CategoryDescription,
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
        all: 'Все',
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
        [Categories['Frontend development']]: 'Frontend разработка',
        [Categories['Backend development']]: 'Backend разработка',
        [Categories['DevOps & Infrastructure']]: 'DevOps и Инфраструктура',
        [Categories['Data Science & Machine Learning']]:
          'Анализ данных и Машинное обучение',
        [Categories['Mobile development']]: 'Мобильная разработка',
        [Categories['Testing & Quality assurance']]:
          'Тестирование и Обеспечение качества',
        [Categories['Computer graphics & Game development']]:
          'Компьютерная графика и Разработка игр',
        [Categories.Blockchain]: 'Блокчейн',
        [Categories.Design]: 'Дизайн',
        [Categories['System administration']]: 'Системное администрирование',
        [Categories['Website administration']]: 'Администрирование сайтов',
        [Categories['1C Development']]: '1С разработка',
        [Categories['Systems analytics']]: 'Системная аналитика',
        [Categories['Systems programming']]: 'Системное программирование',
        [Categories.Cybersecurity]: 'Информационная безопасность',
        [Categories['HR management']]: 'HR менеджмент',
        [Categories['Project management']]: 'Управление проектами',
        [Categories['Network administration']]: 'Сетевое администрирование',
        [Categories['Digital Marketing & SEO']]: 'Цифровой маркетинг и SEO',
        [Categories.Other]: 'Другое',
      },
      domainsShort: {
        [Categories['Frontend development']]: 'Front',
        [Categories['Backend development']]: 'Back',
        [Categories['DevOps & Infrastructure']]: 'DevOps',
        [Categories['Data Science & Machine Learning']]: 'АД&МО',
        [Categories['Mobile development']]: 'Моб',
        [Categories['Testing & Quality assurance']]: 'QA',
        [Categories['Computer graphics & Game development']]: 'Геймдев',
        [Categories.Blockchain]: 'Блокчейн',
        [Categories.Design]: 'Дизайн',
        [Categories['System administration']]: 'СисАдм',
        [Categories['Website administration']]: 'ВебАдм',
        [Categories['1C Development']]: '1С',
        [Categories['Systems analytics']]: 'Аналитика',
        [Categories['Systems programming']]: 'СистПрог',
        [Categories.Cybersecurity]: 'Безопасность',
        [Categories['HR management']]: 'HR',
        [Categories['Project management']]: 'УП',
        [Categories['Network administration']]: 'Сети',
        [Categories['Digital Marketing & SEO']]: 'Маркетинг',
        [Categories.Other]: 'Другое',
      },
      domainDescription: {
        [Categories['Frontend development']]:
          'Создание интерактивных интерфейсов и оптимизация клиентской части.',
        [Categories['Backend development']]:
          'Разработка серверной логики, API и управление данными.',
        [Categories['DevOps & Infrastructure']]:
          'Автоматизация CI/CD, контейнеризация и управление серверами.',
        [Categories['Data Science & Machine Learning']]:
          'Анализ данных, построение и деплой ML‑моделей.',
        [Categories['Mobile development']]:
          'Разработка нативных и кроссплатформенных мобильных приложений.',
        [Categories['Testing & Quality assurance']]:
          'Планирование и автоматизация тестирования приложений.',
        [Categories['Computer graphics & Game development']]:
          '3D/2D‑графика, игровые движки и оптимизация рендеринга.',
        [Categories.Blockchain]:
          'Смарт‑контракты, протоколы и децентрализованные сети.',
        [Categories.Design]:
          'UI/UX‑дизайн, прототипирование и визуальная айдентика.',
        [Categories['System administration']]:
          'Настройка, мониторинг и поддержка серверных систем.',
        [Categories['Website administration']]:
          'Управление CMS, контентом и безопасностью сайтов.',
        [Categories['1C Development']]:
          'Разработка и настройка бизнес‑приложений на платформе 1C.',
        [Categories['Systems analytics']]:
          'Сбор требований, бизнес‑процессы и техническая документация.',
        [Categories['Systems programming']]:
          'Низкоуровневое ПО: драйверы, встраиваемые системы, ядра.',
        [Categories.Cybersecurity]:
          'Защита систем, пентест и управление рисками безопасности.',
        [Categories['HR management']]:
          'Подбор, адаптация и удержание IT‑персонала.',
        [Categories['Project management']]:
          'Планирование, координация и контроль IT‑проектов.',
        [Categories['Network administration']]:
          'Проектирование, настройка и мониторинг компьютерных сетей.',
        [Categories['Digital Marketing & SEO']]:
          'Продвижение, оптимизация сайтов и аналитика трафика.',
        [Categories.Other]:
          'Нетеxнические и вспомогательные роли вне IT‑доменов.',
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

      categoriesShort: {
        [Technologies.Languages]: 'Языки',
        [Technologies.Databases]: 'БД',
        [Technologies['Frontend Libraries and Frameworks']]: 'Front',
        [Technologies['Backend Libraries and Frameworks']]: 'Back',
        [Technologies['Soft skills']]: 'ГН',
        [Technologies['Operating systems']]: 'ОС',
        [Technologies['Containerization & Orchestration']]: 'Контейнеры',
        [Technologies['Infrastructure Automation & Configuration']]: 'IaC',
        [Technologies['Code Collaboration & Integration']]: 'CI',
        [Technologies['Graphic design']]: 'Дизайн',
        [Technologies.Monitoring]: 'Мониторинг',
        [Technologies.CMS]: 'CMS',
        [Technologies['Network Protocols']]: 'Сети',
        [Technologies['Web Servers']]: 'Веб-серверы',
        [Technologies['Integrated Development Environments']]: 'IDE',
        [Technologies['Cloud platforms']]: 'Обл',
        [Technologies['Mobile Libraries and Frameworks']]: 'Моб',
        [Technologies['Message Brokers']]: 'Брокеры',
        [Technologies['Testing Tools']]: 'Тестирование',
        [Technologies['Machine Learning Libraries and Frameworks']]: 'ML',
        [Technologies['Security tools and frameworks']]: 'Безопасность',
        [Technologies['API technologies and protocols']]: 'API',
        [Technologies['Game engines']]: 'Игры',
        [Technologies['Project Management Tools']]: 'PM',
        [Technologies['Blockchain platforms & tools']]: 'Блокчейн',
        [Technologies['Messaging & Queuing systems']]: 'Очереди',
        [Technologies['Search & Indexing engines']]: 'Поиск',
        [Technologies['Data Visualization & BI tools']]: 'BI',
        [Technologies['Graphics APIs & GPGPU']]: 'GPU',
        [Technologies['Documentation tools']]: 'Док',
        [Technologies['Code Quality Tools']]: 'Качество кода',
      },

      categoryDescription: {
        [Technologies.Languages]:
          'Языки программирования и разметки для разработки и обработки данных.',
        [Technologies.Databases]:
          'СУБД разных типов для хранения и выборки структурированных данных.',
        [Technologies['Frontend Libraries and Frameworks']]:
          'Инструменты для создания динамичных интерфейсов и управления состоянием.',
        [Technologies['Backend Libraries and Frameworks']]:
          'Серверные фреймворки для API, бизнес‑логики и работы с БД.',
        [Technologies['Soft skills']]:
          'Коммуникация, командная работа и другие межличностные навыки.',
        [Technologies['Operating systems']]:
          '	ОС для разработки, деплоя и администрирования приложений.',
        [Technologies['Containerization & Orchestration']]:
          'Упаковка в контейнеры и управление их масштабируемым развёртыванием.',
        [Technologies['Infrastructure Automation & Configuration']]:
          'Инфраструктура как код: автоматическое развёртывание и конфигурирование.',
        [Technologies['Code Collaboration & Integration']]:
          'Системы контроля версий и CI/CD для командной разработки.',
        [Technologies['Graphic design']]:
          'Создание визуальных элементов, макетов и цифровых иллюстраций.',
        [Technologies.Monitoring]:
          'Сбор метрик и оповещений для отслеживания здоровья систем.',
        [Technologies.CMS]:
          'Платформы управления контентом для публикации и поддержки сайтов.',
        [Technologies['Message Brokers']]:
          'Очереди и брокеры сообщений для асинхронного взаимодействия.',
        [Technologies['Network Protocols']]:
          'Правила обмена данными между устройствами и приложениями.',
        [Technologies['Web Servers']]:
          'Серверы для обработки HTTP‑/HTTPS‑запросов и доставки контента.',
        [Technologies['Integrated Development Environments']]:
          'IDE с редактором, отладчиком и инструментами сборки.',
        [Technologies['Cloud platforms']]:
          'Облачные сервисы для вычислений, хранения и управления ресурсами.',
        [Technologies['Mobile Libraries and Frameworks']]:
          'Фреймворки для кроссплатформенной и нативной мобильной разработки.',
        [Technologies['Testing Tools']]:
          'Автоматизация функционального, интеграционного и нагрузочного тестирования.',
        [Technologies['Machine Learning Libraries and Frameworks']]:
          'Библиотеки для обучения, оценки и деплоя ML‑/DL‑моделей.',
        [Technologies['Security tools and frameworks']]:
          'Инструменты для пентестов, анализ безопасности и защиты приложений.',
        [Technologies['API technologies and protocols']]:
          'Протоколы и стандарты для построения и потребления веб‑сервисов.',
        [Technologies['Game engines']]:
          'Фреймворки для разработки 2D/3D‑игр, рендеринга и физики.',
        [Technologies['Project Management Tools']]:
          'Инструменты для планирования, отслеживания и управления задачами.',
        [Technologies['Blockchain platforms & tools']]:
          'Платформы и утилиты для разработки децентрализованных приложений.',
        [Technologies['Messaging & Queuing systems']]:
          'Очереди и брокеры сообщений для асинхронного взаимодействия.',
        [Technologies['Search & Indexing engines']]:
          'Системы полнотекстового поиска и индексирования данных.',
        [Technologies['Data Visualization & BI tools']]:
          'Дашборды и отчёты для визуализации данных и бизнес‑аналитики.',
        [Technologies['Graphics APIs & GPGPU']]:
          'API для аппаратного рендеринга и GPGPU‑вычислений на видеокарте.',
        [Technologies['Documentation tools']]:
          'Системы для написания, хранения и публикации технической документации.',
        [Technologies['Code Quality Tools']]:
          'Анализ и повышение качества кода, линтинг и метрики соответствия стандартам.',
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
