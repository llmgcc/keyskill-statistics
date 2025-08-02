import { Categories } from '@/config/categories';
import { Domains } from '@/config/domains';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';
import { Level } from '@/config/level';

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
      skills: 'Навыки',
      highlights: 'Обзор',
      favourites: 'Избранные',
      search: 'Поиск',
      all: 'Все',
      navigate: 'Навигация',
      navigation: 'Навигация',
      links: 'Ссылки',
      close: 'Закрыть',
      domainsPrimary: 'Основное направление',
      categoriesPrimary: 'Основная категория',
      skillOfAllTime: 'за все время',
      loading: 'Загрузка',
      popular: 'Популярные',
      trending: 'Растущий спрос',
      similar: 'Похожие',
      highestSalary: 'Высокая зарплата',
      noData: 'Результаты не найдены',
      showMore: 'Показать больше',
      showLess: 'Показать меньше',
      github: 'GitHub',
      mentions: 'упоминаний',
      last: 'последние',
      previous: 'предыдущие',
      change: 'изменение',
    },
    favorites: {
      removed: 'удален из избранного',
      added: 'добавлен в избранное',
      favorites: 'Избранное',
    },
    domains: {
      [Domains['Frontend development']]: 'Frontend разработка',
      [Domains['Backend development']]: 'Backend разработка',
      [Domains['Testing & Quality assurance']]:
        'Тестирование и Обеспечение качества',
      [Domains['Technical support']]: 'Техническая поддержка',
      [Domains['DevOps & Infrastructure']]: 'DevOps и Инфраструктура',
      [Domains['Systems analytics']]: 'Системная аналитика',
      [Domains['Project management']]: 'Управление проектами',
      [Domains['System administration']]: 'Системное администрирование',
      [Domains['Computer Graphics & Game Development']]:
        'Компьютерная графика и Разработка игр',
      [Domains['Mobile development']]: 'Мобильная разработка',
      [Domains.Design]: 'Дизайн',
      [Domains['Data Science']]: 'Наука о данных',
      [Domains.Cybersecurity]: 'Информационная безопасность',
      [Domains['HR Management']]: 'HR менеджмент',
      [Domains['Digital Marketing & SEO']]: 'Цифровой маркетинг и SEO',
      [Domains['Systems Programming']]: 'Системное программирование',
      [Domains['1C Development']]: '1С разработка',
      [Domains['Website administration']]: 'Администрирование сайтов',
      [Domains.Blockchain]: 'Блокчейн',
      [Domains['Data analytics']]: 'Аналитика данных',
      [Domains['Product Management']]: 'Управление продуктом',
      [Domains['Network Administration']]: 'Сетевое администрирование',
      [Domains['Database Administration']]: 'Администрирование баз данных',
      [Domains.Other]: 'Другое',
      [Domains.Unknown]: 'Неизвестно',
    },
    domainsShort: {
      [Domains['Frontend development']]: 'Front',
      [Domains['Backend development']]: 'Back',
      [Domains['Testing & Quality assurance']]: 'QA',
      [Domains['Technical support']]: 'Поддержка',
      [Domains['DevOps & Infrastructure']]: 'DevOps',
      [Domains['Systems analytics']]: 'СА',
      [Domains['Project management']]: 'УП',
      [Domains['System administration']]: 'СисАдм',
      [Domains['Computer Graphics & Game Development']]: 'КГ/РИ',
      [Domains['Mobile development']]: 'Моб',
      [Domains.Design]: 'Дизайн',
      [Domains['Data Science']]: 'DS',
      [Domains.Cybersecurity]: 'Безоп',
      [Domains['HR Management']]: 'HR',
      [Domains['Digital Marketing & SEO']]: 'ЦМ/SEO',
      [Domains['Systems Programming']]: 'СП',
      [Domains['1C Development']]: '1С',
      [Domains['Website administration']]: 'ВебАдм',
      [Domains.Blockchain]: 'БЧ',
      [Domains['Data analytics']]: 'АД',
      [Domains['Product Management']]: 'УП',
      [Domains['Network Administration']]: 'Сети',
      [Domains['Database Administration']]: 'АБД',
      [Domains.Other]: 'Другое',
      [Domains.Unknown]: 'Неизв',
    },
    domainDescription: {
      [Domains['Frontend development']]:
        'Создание интерактивных интерфейсов и оптимизация клиентской части',
      [Domains['Backend development']]:
        'Разработка серверной логики, API и управление данными',
      [Domains['Testing & Quality assurance']]:
        'Планирование и автоматизация тестирования приложений',
      [Domains['Technical support']]:
        'Установка, настройка и устранение неполадок оборудования и ПО',
      [Domains['DevOps & Infrastructure']]:
        'Автоматизация CI/CD, контейнеризация и управление серверами',
      [Domains['Systems analytics']]:
        'Сбор требований, бизнес‑процессы и техническая документация',
      [Domains['Project management']]:
        'Планирование, координация и контроль IT‑проектов',
      [Domains['System administration']]:
        'Настройка, мониторинг и поддержка серверных систем',
      [Domains['Computer Graphics & Game Development']]:
        '2D/3D‑графика, игровые движки и оптимизация рендеринга',
      [Domains['Mobile development']]:
        'Разработка нативных и кроссплатформенных мобильных приложений',
      [Domains.Design]: 'UI/UX‑дизайн, прототипирование и визуальная айдентика',
      [Domains['Data Science']]:
        'Анализ данных, построение и деплой ML‑моделей',
      [Domains.Cybersecurity]:
        'Защита систем, пентест и управление рисками безопасности',
      [Domains['HR Management']]: 'Подбор, адаптация и удержание IT‑персонала',
      [Domains['Digital Marketing & SEO']]:
        'Продвижение, оптимизация сайтов и аналитика трафика',
      [Domains['Systems Programming']]:
        'Низкоуровневое ПО: драйверы, встраиваемые системы, IoT',
      [Domains['1C Development']]:
        'Разработка и настройка бизнес‑приложений на платформе 1C',
      [Domains['Website administration']]:
        'Управление CMS, контентом и безопасностью сайтов',
      [Domains.Blockchain]:
        'Смарт‑контракты, протоколы и децентрализованные сети',
      [Domains['Data analytics']]:
        'Бизнес-аналитика, визуализация данных и отчетность',
      [Domains['Product Management']]:
        'Стратегическое планирование и развитие цифровых продуктов',
      [Domains['Network Administration']]:
        'Проектирование, настройка и мониторинг компьютерных сетей',
      [Domains['Database Administration']]:
        'Управление системами баз данных, оптимизация и безопасность',
      [Domains.Other]:
        'Нетеxнические и вспомогательные роли вне IT‑направлений',
      [Domains.Unknown]:
        'Работа со специализированными или новыми технологиями',
    },

    categories: {
      [Categories.Languages]: 'Языки программирования',
      [Categories.Databases]: 'Базы данных',
      [Categories['Frontend Libraries and Frameworks']]:
        'Frontend библиотеки и фреймворки',
      [Categories['Backend Libraries and Frameworks']]:
        'Backend библиотеки и фреймворки',
      [Categories['Soft skills']]: 'Гибкие навыки',
      [Categories['Operating systems']]: 'Операционные системы',
      [Categories['Containerization & Orchestration']]:
        'Контейнеризация и оркестрация',
      [Categories['Infrastructure Automation & Configuration']]:
        'Автоматизация и конфигурация инфраструктуры',
      [Categories['Code Collaboration & Integration']]:
        'Совместная разработка и интеграция',
      [Categories['Graphic design']]: 'Графический дизайн',
      [Categories['Monitoring & Logging']]: 'Мониторинг и логирование',
      [Categories['Machine Learning Libraries and Frameworks']]:
        'Библиотеки и фреймворки машинного обучения',
      [Categories['API Technologies & Standards']]:
        'API технологии и стандарты',
      [Categories['Web Servers & Proxies']]: 'Веб-серверы и прокси',
      [Categories['Message Brokers & Queues']]: 'Брокеры сообщений и очереди',
      [Categories['Security Tools & Practices']]:
        'Инструменты и практики безопасности',
      [Categories['Mobile Development Frameworks']]:
        'Фреймворки мобильной разработки',
      [Categories['Game Engines & Tools']]: 'Игровые движки и инструменты',
      [Categories['Business Intelligence Tools']]:
        'Инструменты бизнес-аналитики',
      [Categories.Other]: 'Другое',
      [Categories.Unknown]: 'Неизвестно',
    },

    categoriesShort: {
      [Categories.Languages]: 'Языки',
      [Categories.Databases]: 'БД',
      [Categories['Frontend Libraries and Frameworks']]: 'Front',
      [Categories['Backend Libraries and Frameworks']]: 'Back',
      [Categories['Soft skills']]: 'Soft',
      [Categories['Operating systems']]: 'ОС',
      [Categories['Containerization & Orchestration']]: 'Конт',
      [Categories['Infrastructure Automation & Configuration']]: 'IaC',
      [Categories['Code Collaboration & Integration']]: 'CI/CD',
      [Categories['Graphic design']]: 'Дизайн',
      [Categories['Monitoring & Logging']]: 'Монит',
      [Categories['Machine Learning Libraries and Frameworks']]: 'ML',
      [Categories['API Technologies & Standards']]: 'API',
      [Categories['Web Servers & Proxies']]: 'Веб',
      [Categories['Message Brokers & Queues']]: 'Очереди',
      [Categories['Security Tools & Practices']]: 'Безоп',
      [Categories['Mobile Development Frameworks']]: 'Моб',
      [Categories['Game Engines & Tools']]: 'Игры',
      [Categories['Business Intelligence Tools']]: 'BI',
      [Categories.Other]: 'Другое',
      [Categories.Unknown]: 'Неизв',
    },

    categoryDescription: {
      [Categories.Languages]:
        'Языки программирования для разработки и обработки данных',
      [Categories.Databases]:
        'Системы для хранения и управления структурированными данными',
      [Categories['Frontend Libraries and Frameworks']]:
        'Библиотеки и фреймворки для создания пользовательских интерфейсов и веб-приложений',
      [Categories['Backend Libraries and Frameworks']]:
        'Библиотеки и фреймворки для серверной разработки приложений',
      [Categories['Soft skills']]:
        'Нетехнические межличностные и профессиональные навыки',
      [Categories['Operating systems']]:
        'Программные платформы для управления аппаратными и программными ресурсами',
      [Categories['Containerization & Orchestration']]:
        'Инструменты для упаковки, развертывания и управления контейнеризованными приложениями',
      [Categories['Infrastructure Automation & Configuration']]:
        'Инструменты для автоматизации развертывания и настройки инфраструктуры',
      [Categories['Code Collaboration & Integration']]:
        'Инструменты и практики для контроля версий и непрерывной интеграции',
      [Categories['Graphic design']]:
        'Инструменты для создания и редактирования визуального контента и пользовательских интерфейсов',
      [Categories['Monitoring & Logging']]:
        'Инструменты и платформы для мониторинга систем, логирования и наблюдаемости',
      [Categories['Machine Learning Libraries and Frameworks']]:
        'Библиотеки и инструменты для разработки приложений машинного обучения и ИИ',
      [Categories['API Technologies & Standards']]:
        'Технологии и спецификации для создания и документирования API',
      [Categories['Web Servers & Proxies']]:
        'Программное обеспечение для обслуживания веб-контента и управления сетевым трафиком',
      [Categories['Message Brokers & Queues']]:
        'Системы для обработки асинхронных сообщений и событий',
      [Categories['Security Tools & Practices']]:
        'Инструменты и методологии для безопасности приложений и инфраструктуры',
      [Categories['Mobile Development Frameworks']]:
        'Фреймворки для создания мобильных приложений',
      [Categories['Game Engines & Tools']]:
        'Платформы и инструменты для разработки игр',
      [Categories['Business Intelligence Tools']]:
        'Инструменты для анализа данных и бизнес-отчетности',
      [Categories.Other]:
        'Навыки, не подходящие под другие конкретные категории',
      [Categories.Unknown]:
        'Неклассифицированные или новые технологические навыки',
    },
    experience: {
      [Experience.any]: 'Любой',
      [Experience.noExperience]: 'Нет опыта',
      [Experience.between1And3]: 'От 1 года до 3 лет',
      [Experience.between3And6]: 'От 3 до 6 лет',
      [Experience.moreThan6]: 'Более 6 лет',
      [Experience.unknown]: 'Не указан',
    },
    experienceShort: {
      [Experience.any]: 'Любой',
      [Experience.noExperience]: 'Нет',
      [Experience.between1And3]: '1-3',
      [Experience.between3And6]: '3-6',
      [Experience.moreThan6]: '>6',
      [Experience.unknown]: 'Не указан',
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
    pagination: {
      text: '{{currentPage}} - {{totalPages}} из {{totalRows}}',
      show: 'Показывать',
    },
    columns: {
      name: 'Название',
      salary: 'Зарплата',
      mentions: 'Упоминаний',
      trend: 'Тренд',
      skills: 'Навыков',
      similarity: 'Похожесть',
    },
    charts: {
      salaryDistribution: 'Распределение зарплат',
      salarySubtitle: 'Ожидаемая медианная зарплата в месяц',
      demandTrend: 'Тренд спроса',
      trendSubtitle: 'Упоминаний за последние <text>{{days}}</text> дней',
      notEnoughData: 'Недостаточно данных',
      tooltips: {
        demand: {
          skill:
            'Общее количество упоминаний <b>{{name}}</b> с течением времени',
          domain:
            'Общее количество упоминаний всех навыков направления <b>{{name}}</b> с течением времени',
          category:
            'Общее количество упоминаний всех навыков категории <b>{{name}}</b> с течением времени',
        },
        salary: {
          skill: 'Распределение зарплат для навыка <b>{{name}}</b>',
          domain: 'Распределение зарплат для направления <b>{{name}}</b>',
          category: 'Распределение зарплат для категории <b>{{name}}</b>',
        },
        prediction: {
          domain: 'Предсказанные направления для навыка <b>{{name}}</b>',
          category: 'Предсказанные категории для навыка <b>{{name}}</b>',
        },
        complexity: {
          title: 'Сложность основана на распределении опыта',
        },
      },
    },
    complexity: {
      title: 'Сложность',
      subtitle: {
        [Level.Junior]: 'В основном требуется для начальных позиций',
        [Level['Junior+']]: 'Характерен для начала карьеры',
        [Level.Middle]: 'Стандартный уровень для специалистов',
        [Level['Middle+']]: 'Для специалистов с расширенными задачами',
        [Level.Senior]: 'Для экспертов и сложных задач',
        [Level['Senior+']]: 'Для ведущих экспертов и руководящих позиций',
      },
      description:
        'Сложность рассчитывается на основе частоты встречаемости навыка среди специалистов разного уровня',
      distribution: 'Распределение по опыту',
    },
    skillPage: {
      relatedSkills: {
        title: 'Связанные навыки',
        subtitle: 'Навыки, которые часто встречаются вместе',
      },
      similarSkills: {
        title: 'Похожие навыки',
        subtitle: 'Навыки, схожие по значению или функциональности',
      },
    },
    footer: {
      text: '{{appName}} анализирует рынок IT-вакансий и определяет востребованные навыки для карьерного роста',
      backToTop: 'Вернуться наверх',
    },
  },
};
