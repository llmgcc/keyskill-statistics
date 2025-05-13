import { Categories } from '@/config/categories';
import { Domains } from '@/config/domains';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';

export default {
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
      title: 'Анализ <badge>ключевых навыков</badge> в сфере IT',
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
      domains: 'Направления',
      categories: 'Категории',
      skills: 'Ключевые навыки',
    },
    domains: {
      [Domains['Frontend development']]: 'Frontend разработка',
      [Domains['Backend development']]: 'Backend разработка',
      [Domains['DevOps & Infrastructure']]: 'DevOps и Инфраструктура',
      [Domains['Data Science & Machine Learning']]:
        'Анализ данных и Машинное обучение',
      [Domains['Mobile development']]: 'Мобильная разработка',
      [Domains['Testing & Quality assurance']]:
        'Тестирование и Обеспечение качества',
      [Domains['Computer graphics & Game development']]:
        'Компьютерная графика и Разработка игр',
      [Domains.Blockchain]: 'Блокчейн',
      [Domains.Design]: 'Дизайн',
      [Domains['System administration']]: 'Системное администрирование',
      [Domains['Website administration']]: 'Администрирование сайтов',
      [Domains['1C Development']]: '1С разработка',
      [Domains['Systems analytics']]: 'Системная аналитика',
      [Domains['Systems programming']]: 'Системное программирование',
      [Domains.Cybersecurity]: 'Информационная безопасность',
      [Domains['HR management']]: 'HR менеджмент',
      [Domains['Project management']]: 'Управление проектами',
      [Domains['Network administration']]: 'Сетевое администрирование',
      [Domains['Digital Marketing & SEO']]: 'Цифровой маркетинг и SEO',
      [Domains.Other]: 'Другое',
    },
    domainsShort: {
      [Domains['Frontend development']]: 'Front',
      [Domains['Backend development']]: 'Back',
      [Domains['DevOps & Infrastructure']]: 'DevOps',
      [Domains['Data Science & Machine Learning']]: 'АД/МО',
      [Domains['Mobile development']]: 'Моб',
      [Domains['Testing & Quality assurance']]: 'QA',
      [Domains['Computer graphics & Game development']]: 'КГ/РИ',
      [Domains.Blockchain]: 'БЧ',
      [Domains.Design]: 'Дизайн',
      [Domains['System administration']]: 'СА',
      [Domains['Website administration']]: 'ВА',
      [Domains['1C Development']]: '1С',
      [Domains['Systems analytics']]: 'СА',
      [Domains['Systems programming']]: 'СП',
      [Domains.Cybersecurity]: 'Безоп',
      [Domains['HR management']]: 'HR',
      [Domains['Project management']]: 'УП',
      [Domains['Network administration']]: 'Сети',
      [Domains['Digital Marketing & SEO']]: 'ЦМ/SEO',
      [Domains.Other]: 'Другое',
    },
    domainDescription: {
      [Domains['Frontend development']]:
        'Создание интерактивных интерфейсов и оптимизация клиентской части.',
      [Domains['Backend development']]:
        'Разработка серверной логики, API и управление данными.',
      [Domains['DevOps & Infrastructure']]:
        'Автоматизация CI/CD, контейнеризация и управление серверами.',
      [Domains['Data Science & Machine Learning']]:
        'Анализ данных, построение и деплой ML‑моделей.',
      [Domains['Mobile development']]:
        'Разработка нативных и кроссплатформенных мобильных приложений.',
      [Domains['Testing & Quality assurance']]:
        'Планирование и автоматизация тестирования приложений.',
      [Domains['Computer graphics & Game development']]:
        '2D/3D‑графика, игровые движки и оптимизация рендеринга.',
      [Domains.Blockchain]:
        'Смарт‑контракты, протоколы и децентрализованные сети.',
      [Domains.Design]:
        'UI/UX‑дизайн, прототипирование и визуальная айдентика.',
      [Domains['System administration']]:
        'Настройка, мониторинг и поддержка серверных систем.',
      [Domains['Website administration']]:
        'Управление CMS, контентом и безопасностью сайтов.',
      [Domains['1C Development']]:
        'Разработка и настройка бизнес‑приложений на платформе 1C.',
      [Domains['Systems analytics']]:
        'Сбор требований, бизнес‑процессы и техническая документация.',
      [Domains['Systems programming']]:
        'Низкоуровневое ПО: драйверы, встраиваемые системы, ядра.',
      [Domains.Cybersecurity]:
        'Защита систем, пентест и управление рисками безопасности.',
      [Domains['HR management']]: 'Подбор, адаптация и удержание IT‑персонала.',
      [Domains['Project management']]:
        'Планирование, координация и контроль IT‑проектов.',
      [Domains['Network administration']]:
        'Проектирование, настройка и мониторинг компьютерных сетей.',
      [Domains['Digital Marketing & SEO']]:
        'Продвижение, оптимизация сайтов и аналитика трафика.',
      [Domains.Other]: 'Нетеxнические и вспомогательные роли вне IT‑доменов.',
    },

    categories: {
      [Categories.Languages]: 'Языки',
      [Categories.Databases]: 'Базы данных',
      [Categories['Frontend Libraries and Frameworks']]:
        'Фронтенд библиотеки и фреймворки',
      [Categories['Backend Libraries and Frameworks']]:
        'Бэкенд библиотеки и фреймворки',
      [Categories['Soft skills']]: 'Гибкие навыки',
      [Categories['Operating systems']]: 'Операционные системы',
      [Categories['Containerization & Orchestration']]:
        'Контейнеризация и оркестрация',
      [Categories['Infrastructure Automation & Configuration']]:
        'Автоматизация и конфигурация инфраструктуры',
      [Categories['Code Collaboration & Integration']]:
        'Совместная разработка и интеграция',
      [Categories['Graphic design']]: 'Графический дизайн',
      [Categories.Monitoring]: 'Мониторинг',
      [Categories.CMS]: 'Системы управления контентом',
      [Categories['Network Protocols']]: 'Сетевые протоколы',
      [Categories['Web Servers']]: 'Веб-серверы',
      [Categories['Integrated Development Environments']]:
        'Интегрированные среды разработки',
      [Categories['Cloud platforms']]: 'Облачные платформы',
      [Categories['Mobile Libraries and Frameworks']]:
        'Мобильные библиотеки и фреймворки',
      [Categories['Message Brokers']]: 'Брокеры сообщений',
      [Categories['Testing Tools']]: 'Инструменты тестирования',
      [Categories['Machine Learning Libraries and Frameworks']]:
        'Библиотеки и фреймворки машинного обучения',
      [Categories['Security tools and frameworks']]:
        'Инструменты и фреймворки безопасности',
      [Categories['API technologies and protocols']]:
        'API технологии и протоколы',
      [Categories['Game engines']]: 'Игровые движки',
      [Categories['Project Management Tools']]:
        'Инструменты управления проектами',
      [Categories['Blockchain platforms & tools']]:
        'Блокчейн платформы и инструменты',
      [Categories['Messaging & Queuing systems']]:
        'Системы обмена сообщениями и очереди',
      [Categories['Search & Indexing engines']]:
        'Поисковые и индексирующие движки',
      [Categories['Data Visualization & BI tools']]:
        'Инструменты визуализации данных и бизнес-аналитики',
      [Categories['Graphics APIs & GPGPU']]: 'Графические API и GPGPU',
      [Categories['Documentation tools']]: 'Инструменты документации',
      [Categories['Code Quality Tools']]: 'Инструменты контроля качества кода',
    },

    categoriesShort: {
      [Categories.Languages]: 'Языки',
      [Categories.Databases]: 'БД',
      [Categories['Frontend Libraries and Frameworks']]: 'Front',
      [Categories['Backend Libraries and Frameworks']]: 'Back',
      [Categories['Soft skills']]: 'ГН',
      [Categories['Operating systems']]: 'ОС',
      [Categories['Containerization & Orchestration']]: 'Контейнеры',
      [Categories['Infrastructure Automation & Configuration']]: 'IaC',
      [Categories['Code Collaboration & Integration']]: 'CI',
      [Categories['Graphic design']]: 'Дизайн',
      [Categories.Monitoring]: 'Мониторинг',
      [Categories.CMS]: 'CMS',
      [Categories['Network Protocols']]: 'Сети',
      [Categories['Web Servers']]: 'Веб-серверы',
      [Categories['Integrated Development Environments']]: 'IDE',
      [Categories['Cloud platforms']]: 'Обл',
      [Categories['Mobile Libraries and Frameworks']]: 'Моб',
      [Categories['Message Brokers']]: 'Брокеры',
      [Categories['Testing Tools']]: 'Тестирование',
      [Categories['Machine Learning Libraries and Frameworks']]: 'ML',
      [Categories['Security tools and frameworks']]: 'Безопасность',
      [Categories['API technologies and protocols']]: 'API',
      [Categories['Game engines']]: 'Игры',
      [Categories['Project Management Tools']]: 'PM',
      [Categories['Blockchain platforms & tools']]: 'Блокчейн',
      [Categories['Messaging & Queuing systems']]: 'Очереди',
      [Categories['Search & Indexing engines']]: 'Поиск',
      [Categories['Data Visualization & BI tools']]: 'BI',
      [Categories['Graphics APIs & GPGPU']]: 'GPU',
      [Categories['Documentation tools']]: 'Док',
      [Categories['Code Quality Tools']]: 'Качество кода',
    },

    categoryDescription: {
      [Categories.Languages]:
        'Языки программирования и разметки для разработки и обработки данных.',
      [Categories.Databases]:
        'СУБД разных типов для хранения и выборки структурированных данных.',
      [Categories['Frontend Libraries and Frameworks']]:
        'Инструменты для создания динамичных интерфейсов и управления состоянием.',
      [Categories['Backend Libraries and Frameworks']]:
        'Серверные фреймворки для API, бизнес‑логики и работы с БД.',
      [Categories['Soft skills']]:
        'Коммуникация, командная работа и другие межличностные навыки.',
      [Categories['Operating systems']]:
        '	ОС для разработки, деплоя и администрирования приложений.',
      [Categories['Containerization & Orchestration']]:
        'Упаковка в контейнеры и управление их масштабируемым развёртыванием.',
      [Categories['Infrastructure Automation & Configuration']]:
        'Инфраструктура как код: автоматическое развёртывание и конфигурирование.',
      [Categories['Code Collaboration & Integration']]:
        'Системы контроля версий и CI/CD для командной разработки.',
      [Categories['Graphic design']]:
        'Создание визуальных элементов, макетов и цифровых иллюстраций.',
      [Categories.Monitoring]:
        'Сбор метрик и оповещений для отслеживания здоровья систем.',
      [Categories.CMS]:
        'Платформы управления контентом для публикации и поддержки сайтов.',
      [Categories['Message Brokers']]:
        'Очереди и брокеры сообщений для асинхронного взаимодействия.',
      [Categories['Network Protocols']]:
        'Правила обмена данными между устройствами и приложениями.',
      [Categories['Web Servers']]:
        'Серверы для обработки HTTP‑/HTTPS‑запросов и доставки контента.',
      [Categories['Integrated Development Environments']]:
        'IDE с редактором, отладчиком и инструментами сборки.',
      [Categories['Cloud platforms']]:
        'Облачные сервисы для вычислений, хранения и управления ресурсами.',
      [Categories['Mobile Libraries and Frameworks']]:
        'Фреймворки для кроссплатформенной и нативной мобильной разработки.',
      [Categories['Testing Tools']]:
        'Автоматизация функционального, интеграционного и нагрузочного тестирования.',
      [Categories['Machine Learning Libraries and Frameworks']]:
        'Библиотеки для обучения, оценки и деплоя ML‑/DL‑моделей.',
      [Categories['Security tools and frameworks']]:
        'Инструменты для пентестов, анализ безопасности и защиты приложений.',
      [Categories['API technologies and protocols']]:
        'Протоколы и стандарты для построения и потребления веб‑сервисов.',
      [Categories['Game engines']]:
        'Фреймворки для разработки 2D/3D‑игр, рендеринга и физики.',
      [Categories['Project Management Tools']]:
        'Инструменты для планирования, отслеживания и управления задачами.',
      [Categories['Blockchain platforms & tools']]:
        'Платформы и утилиты для разработки децентрализованных приложений.',
      [Categories['Messaging & Queuing systems']]:
        'Очереди и брокеры сообщений для асинхронного взаимодействия.',
      [Categories['Search & Indexing engines']]:
        'Системы полнотекстового поиска и индексирования данных.',
      [Categories['Data Visualization & BI tools']]:
        'Дашборды и отчёты для визуализации данных и бизнес‑аналитики.',
      [Categories['Graphics APIs & GPGPU']]:
        'API для аппаратного рендеринга и GPGPU‑вычислений на видеокарте.',
      [Categories['Documentation tools']]:
        'Системы для написания, хранения и публикации технической документации.',
      [Categories['Code Quality Tools']]:
        'Анализ и повышение качества кода, линтинг и метрики соответствия стандартам.',
    },

    experience: {
      [Experience.any]: 'Любой',
      [Experience.noExperience]: 'Нет опыта',
      [Experience.between1And3]: 'От 1 года до 3 лет',
      [Experience.between3And6]: 'От 3 до 6 лет',
      [Experience.moreThan6]: 'Более 6 лет',
    },
    experienceShort: {
      [Experience.any]: 'Любой',
      [Experience.noExperience]: 'Нет',
      [Experience.between1And3]: '1-3',
      [Experience.between3And6]: '3-6',
      [Experience.moreThan6]: '>6',
    },
    highlights: {
      [Highlights['Fastest-Growing Skills']]: 'Самые быстрорастущие навыки',
      [Highlights['Skills Losing Demand']]: 'Навыки с падающим спросом',
      [Highlights['Newly Emerging Skills']]: 'Новые навыки',
      [Highlights['Highest-Paying Skills']]: 'Навыки с максимальной зарплатой',
      [Highlights['Lowest-Paying Skills']]: 'Навыки с минимальной зарплатой',
      [Highlights['Skills with Undisclosed Salaries']]:
        'Навыки с неизвестной зарплатой',
    },
  },
};
