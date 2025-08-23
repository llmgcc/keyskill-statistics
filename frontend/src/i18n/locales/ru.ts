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
      favorites: 'Избранное',
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
      declining: 'Падающий спрос',
      new: 'Новые',
      growingSalary: 'Растущая зарплата',
      similar: 'Похожие',
      highestSalary: 'Высокооплачиваемые',
      lowestSalary: 'Низкооплачиваемые',
      noData: 'Результаты не найдены',
      showMore: 'Показать больше',
      showLess: 'Показать меньше',
      github: 'GitHub',
      mentions: 'упоминаний',
      last: 'последние',
      previous: 'предыдущие',
      change: 'изменение',
      confidence: 'Уверенность',
      seeMore: 'Еще',
      mainPage: 'Главная',
      allSkills: 'Все навыки',
      allCategories: 'Все категории',
      allDomains: 'Все направления',
    },
    favorites: {
      removed: 'удален из избранного',
      added: 'добавлен в избранное',
      favorites: 'Избранное',
    },
    domains: {
      [Domains['Frontend Development']]: 'Frontend Разработка',
      [Domains['Backend Development']]: 'Backend Разработка',
      [Domains['Testing & Quality Assurance']]:
        'Тестирование и Обеспечение Качества',
      [Domains['Technical Support']]: 'Техническая Поддержка',
      [Domains['DevOps & Infrastructure']]: 'DevOps и Инфраструктура',
      [Domains['Systems Analytics']]: 'Системная Аналитика',
      [Domains['Project Management']]: 'Управление Проектами',
      [Domains['System Administration']]: 'Системное Администрирование',
      [Domains['Computer Graphics & Game Development']]:
        'Компьютерная Графика и Разработка Игр',
      [Domains['Mobile Development']]: 'Мобильная Разработка',
      [Domains.Design]: 'Дизайн',
      [Domains['Data Science']]: 'Анализ данных',
      [Domains.Cybersecurity]: 'Информационная Безопасность',
      [Domains['HR Management']]: 'HR Менеджмент',
      [Domains['Digital Marketing & SEO']]: 'Цифровой Маркетинг и SEO',
      [Domains['Systems Programming']]: 'Системное Программирование',
      [Domains['1C Development']]: '1С Разработка',
      [Domains['Website Administration']]: 'Администрирование Сайтов',
      [Domains.Blockchain]: 'Блокчейн',
      [Domains['Data Analytics']]: 'Аналитика Данных',
      [Domains['Product Management']]: 'Управление Продуктом',
      [Domains['Network Administration']]: 'Сетевое Администрирование',
      [Domains['Database Administration']]: 'Администрирование Баз Данных',
      [Domains.Other]: 'Другое',
      [Domains.Unknown]: 'Неизвестно',
    },
    domainDescription: {
      [Domains['Frontend Development']]:
        'Создание интерактивных интерфейсов и оптимизация клиентской части',
      [Domains['Backend Development']]:
        'Разработка серверной логики, API и управление данными',
      [Domains['Testing & Quality Assurance']]:
        'Планирование и автоматизация тестирования приложений',
      [Domains['Technical Support']]:
        'Установка, настройка и устранение неполадок оборудования и ПО',
      [Domains['DevOps & Infrastructure']]:
        'Автоматизация CI/CD, контейнеризация и управление серверами',
      [Domains['Systems Analytics']]:
        'Сбор требований, бизнес‑процессы и техническая документация',
      [Domains['Project Management']]:
        'Планирование, координация и контроль IT‑проектов',
      [Domains['System Administration']]:
        'Настройка, мониторинг и поддержка серверных систем',
      [Domains['Computer Graphics & Game Development']]:
        '2D/3D‑графика, игровые движки и оптимизация рендеринга',
      [Domains['Mobile Development']]:
        'Разработка нативных и кроссплатформенных мобильных приложений',
      [Domains.Design]: 'UI/UX‑дизайн, прототипирование и визуальная айдентика',
      [Domains['Data Science']]:
        'Анализ данных, построение и деплой ML моделей',
      [Domains.Cybersecurity]:
        'Защита систем, пентест и управление рисками безопасности',
      [Domains['HR Management']]: 'Подбор, адаптация и удержание IT‑персонала',
      [Domains['Digital Marketing & SEO']]:
        'Продвижение, оптимизация сайтов и аналитика трафика',
      [Domains['Systems Programming']]:
        'Низкоуровневое ПО: драйверы, встраиваемые системы, IoT',
      [Domains['1C Development']]:
        'Разработка и настройка бизнес‑приложений на платформе 1C',
      [Domains['Website Administration']]:
        'Управление CMS, контентом и безопасностью сайтов',
      [Domains.Blockchain]:
        'Смарт‑контракты, протоколы и децентрализованные сети',
      [Domains['Data Analytics']]:
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
      [Categories['Programming Languages']]: 'Языки Программирования',
      [Categories.Databases]: 'Базы Данных',
      [Categories['Frontend Libraries and Frameworks']]:
        'Frontend Библиотеки и Фреймворки',
      [Categories['Backend Libraries and Frameworks']]:
        'Backend Библиотеки и Фреймворки',
      [Categories['Soft Skills']]: 'Гибкие Навыки',
      [Categories['Operating Systems']]: 'Операционные Системы',
      [Categories['Containerization & Orchestration']]:
        'Контейнеризация и Оркестрация',
      [Categories['Infrastructure Automation & Configuration']]:
        'Автоматизация и Конфигурация Инфраструктуры',
      [Categories['Code Collaboration & Integration']]:
        'Совместная Разработка и Интеграция',
      [Categories['Graphic Design']]: 'Графический Дизайн',
      [Categories['Monitoring & Logging']]: 'Мониторинг и Логирование',
      [Categories['Machine Learning Libraries and Frameworks']]:
        'Библиотеки и Фреймворки Машинного Обучения',
      [Categories['API Technologies & Standards']]:
        'API Технологии и Стандарты',
      [Categories['Web Servers & Proxies']]: 'Веб-серверы и Прокси',
      [Categories['Message Brokers & Queues']]: 'Брокеры Сообщений и Очереди',
      [Categories['Security Tools & Practices']]:
        'Инструменты и Практики Безопасности',
      [Categories['Mobile Development Frameworks']]:
        'Фреймворки Мобильной Разработки',
      [Categories['Game Engines & Tools']]: 'Игровые Движки и Инструменты',
      [Categories['Business Intelligence Tools']]:
        'Инструменты Бизнес-аналитики',
      [Categories.Other]: 'Другое',
      [Categories.Unknown]: 'Неизвестно',
      [Categories['Enterprise Business Platforms']]:
        'Корпоративные Бизнес-платформы',
      [Categories['Hardware & Maintenance']]: 'Оборудование и Обслуживание',
      [Categories['Software Development Principles']]: 'Принципы Разработки ПО',
      [Categories['Desktop Development Frameworks']]:
        'Фреймворки для Десктопной Разработки',
      [Categories['System Design & Notations']]:
        'Системное Проектирование и Нотации',
      [Categories['Social Media & Content Platforms']]:
        'Социальные Сети и Контент-платформы',
      [Categories['Testing Frameworks']]: 'Фреймворки Тестирования',
      [Categories['Cloud Services']]: 'Облачные Сервисы',
      [Categories['Package Managers']]: 'Менеджеры Пакетов',
      [Categories['Build Tools']]: 'Инструменты Сборки',
      [Categories['Code Editors & IDEs']]: 'Редакторы Кода и IDE',
      [Categories['State Management Libraries']]:
        'Библиотеки Управления Состоянием',
      [Categories['Content Management Systems']]:
        'Системы Управления Контентом',
      [Categories['Graphics APIs & GPGPU']]: 'Графические API и GPGPU',
      [Categories['Project Management Tools']]:
        'Инструменты Управления Проектами',
      [Categories['Network Protocols']]: 'Сетевые Протоколы',
      [Categories['Blockchain Platforms and Tools']]:
        'Блокчейн Платформы и Инструменты',
      [Categories['3D Modeling Tools']]: 'Инструменты 3D Моделирования',
      [Categories['Documentation Tools']]: 'Инструменты Документации',
      [Categories['Search Engine Technologies']]: 'Технологии Поисковых Систем',
      [Categories['Virtualization Platforms']]: 'Платформы Виртуализации',
      [Categories['AI Generation Tools']]: 'ИИ Инструменты Генерации',
      [Categories['NLP Processing Libraries']]:
        'Библиотеки Обработки Естественного Языка',
      [Categories['ETL Tools']]: 'ETL Инструменты',
      [Categories['Object-Relational Mappers']]: 'ORM библиотеки',
      [Categories['SEO Analysis Tools']]: 'Инструменты SEO Анализа',
      [Categories['ERP Systems']]: 'ERP Системы',
      [Categories['Data Warehousing Tools']]: 'Инструменты Хранилищ Данных',
      [Categories['Big Data Frameworks']]: 'Фреймворки Больших Данных',
      [Categories['Communication & Collaboration Tools']]:
        'Инструменты Коммуникации и Совместной Работы',
    },
    categoryDescription: {
      [Categories['Programming Languages']]:
        'Языки программирования для разработки и обработки данных',
      [Categories.Databases]:
        'Системы для хранения и управления структурированными данными',
      [Categories['Frontend Libraries and Frameworks']]:
        'Библиотеки и фреймворки для создания пользовательских интерфейсов и веб-приложений',
      [Categories['Backend Libraries and Frameworks']]:
        'Библиотеки и фреймворки для серверной разработки приложений',
      [Categories['Soft Skills']]:
        'Нетехнические межличностные и профессиональные навыки',
      [Categories['Operating Systems']]:
        'Программные платформы для управления аппаратными и программными ресурсами',
      [Categories['Containerization & Orchestration']]:
        'Инструменты для упаковки, развертывания и управления контейнеризованными приложениями',
      [Categories['Infrastructure Automation & Configuration']]:
        'Инструменты для автоматизации развертывания и настройки инфраструктуры',
      [Categories['Code Collaboration & Integration']]:
        'Инструменты и практики для контроля версий и непрерывной интеграции',
      [Categories['Graphic Design']]:
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

      [Categories['Enterprise Business Platforms']]:
        'Платформы для управления бизнесом и планирования корпоративных ресурсов',
      [Categories['Hardware & Maintenance']]:
        'Компьютерное оборудование, инструменты обслуживания и ремонтное оборудование',
      [Categories['Software Development Principles']]:
        'Принципы разработки ПО, паттерны проектирования и лучшие практики разработки кода',
      [Categories['Desktop Development Frameworks']]:
        'Фреймворки и библиотеки для создания десктопных приложений',
      [Categories['System Design & Notations']]:
        'Стандарты и нотации для моделирования, документирования и визуализации систем и процессов',
      [Categories['Social Media & Content Platforms']]:
        'Платформы социальных сетей и инструменты создания контента для маркетинга и взаимодействия',

      [Categories['Testing Frameworks']]:
        'Фреймворки и библиотеки специально для автоматизированного тестирования',
      [Categories['Cloud Services']]:
        'Специфические сервисы и инструменты облачных платформ',
      [Categories['Package Managers']]:
        'Инструменты для управления программными пакетами и зависимостями',
      [Categories['Build Tools']]:
        'Инструменты для сборки, объединения и компиляции кода',
      [Categories['Code Editors & IDEs']]:
        'Интегрированные среды разработки и текстовые редакторы',
      [Categories['State Management Libraries']]:
        'Библиотеки для управления состоянием приложений',
      [Categories['Content Management Systems']]:
        'Платформы для создания, управления и публикации цифрового контента',
      [Categories['Graphics APIs & GPGPU']]:
        'Графические программные интерфейсы и фреймворки для вычислений общего назначения на GPU',
      [Categories['Project Management Tools']]:
        'Приложения для планирования, отслеживания и управления проектами разработки ПО',
      [Categories['Network Protocols']]:
        'Протоколы связи, определяющие правила передачи данных между устройствами и системами в сетях',
      [Categories['Blockchain Platforms and Tools']]:
        'Платформы и фреймворки для разработки блокчейн-приложений и смарт-контрактов',
      [Categories['3D Modeling Tools']]:
        'Программное обеспечение для создания и редактирования 3D моделей и анимации',
      [Categories['Documentation Tools']]:
        'Инструменты для создания и управления технической документацией',
      [Categories['Search Engine Technologies']]:
        'Платформы и инструменты для реализации функций поиска',
      [Categories['Virtualization Platforms']]:
        'Технологии для создания и управления виртуальными машинами и средами',
      [Categories['AI Generation Tools']]:
        'ИИ-инструменты для генерации контента, кода и других ресурсов',
      [Categories['NLP Processing Libraries']]:
        'Библиотеки и фреймворки для задач обработки естественного языка',
      [Categories['ETL Tools']]:
        'Инструменты для извлечения, преобразования и загрузки данных между системами',
      [Categories['Object-Relational Mappers']]:
        'Библиотеки, которые отображают структуры баз данных на объектно-ориентированные модели',
      [Categories['SEO Analysis Tools']]:
        'Инструменты для оптимизации веб-сайтов для поисковых систем',
      [Categories['ERP Systems']]:
        'Системы планирования корпоративных ресурсов для управления бизнес-операциями',
      [Categories['Data Warehousing Tools']]:
        'Платформы и инструменты для хранения и анализа крупномасштабных данных',
      [Categories['Big Data Frameworks']]:
        'Фреймворки для обработки и анализа больших наборов данных',
      [Categories['Communication & Collaboration Tools']]:
        'Платформы и инструменты для командной коммуникации и совместной работы',
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
      [Highlights.gainers]: 'Самые быстрорастущие навыки',
      [Highlights.decliners]: 'Навыки с падающим спросом',
      [Highlights.new]: 'Новые навыки',
      [Highlights['highest-salary']]: 'Высокооплачиваемые навыки',
      [Highlights['lowest-salary']]: 'Низкооплачиваемые навыки',
      [Highlights['growingSalary']]: 'Навыки с растущей зарплатой',
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
        [Level.Junior]: 'Базовый уровень для начинающих специалистов',
        [Level['Junior+']]:
          'Начальный уровень с минимальными требованиями к опыту',
        [Level.Middle]: 'Средний уровень для опытных специалистов',
        [Level['Middle+']]: 'Повышенный уровень с расширенными требованиями',
        [Level.Senior]: 'Высокий уровень для экспертов',
        [Level['Senior+']]:
          'Экспертный уровень с высокими требованиями к квалификации',
      },
      description:
        'Сложность рассчитывается на основе частоты встречаемости навыка среди специалистов разного уровня',
      distribution: 'Распределение по опыту',
      info: 'Показатель сложности, рассчитанный на основе распределения требований к опыту работы. Высокие значения указывают на востребованность в senior позициях.',
    },
    skillPage: {
      relatedSkills: {
        title: 'Связанные навыки',
        subtitle: 'Навыки, которые часто встречаются вместе с <b>{{name}}</b>',
      },
      similarSkills: {
        title: 'Похожие навыки',
        subtitle:
          'Навыки, похожие по значению или по функциональности на <b>{{name}}</b>',
      },
    },
    categoryPage: {
      primarySkills: {
        title: 'Основные навыки',
        subtitle:
          'Навыки, наиболее тесно связанные с категорией <b>{{category}}</b>',
      },
      allSkills: {
        title: 'Все навыки',
        subtitle: 'Навыки, связанные с категорией <b>{{category}}</b>',
      },
    },
    domainPage: {
      primarySkills: {
        subtitle:
          'Навыки, наиболее тесно связанные с направлением <b>{{category}}</b>',
      },
      allSkills: {
        subtitle: 'Навыки, связанные с направлением <b>{{category}}</b>',
      },
    },
    skills: {
      title: 'Анализ IT навыков',
      subtitle:
        'Полный анализ спроса, зарплат и сложности для <text>{{skillCount}}</text> IT навыков, включая <examples/>. Данные отображаются за последние <text>{{days}}</text> дней и отражают тренды {{experienceText}}.',
      experienceText: {
        [Experience.any]: 'для <text>всех</text> уровней опыта',
        [Experience.noExperience]: 'для <text>начинающих</text> специалистов',
        [Experience.between1And3]: 'для позиций с опытом <text>1-3 года</text>',
        [Experience.between3And6]: 'для позиций с опытом <text>3-6 лет</text>',
        [Experience.moreThan6]: 'для позиций с опытом <text>6+ лет</text>',
        [Experience.unknown]:
          'для позиций с <text>неуказанными</text> требованиями к опыту',
      },
    },
    domainsPage: {
      title: 'Анализ IT направлений',
      subtitle:
        'Полный анализ спроса, зарплат и сложности для <text>{{domainCount}}</text> IT направлений, включая <examples/>. Данные отображаются за последние <text>{{days}}</text> дней и отражают тренды {{experienceText}}.',
    },
    categoriesPage: {
      title: 'Анализ IT категорий',
      subtitle:
        'Полный анализ спроса, зарплат и сложности для <text>{{categoryCount}}</text> IT категорий, включая <examples/>. Данные отображаются за последние <text>{{days}}</text> дней и отражают тренды {{experienceText}}.',
    },
    highlightsPage: {
      title: 'Обзор IT навыков',
      subtitle:
        'Ключевые тренды и статистика по IT навыкам: рост спроса, зарплатные показатели и новые технологии. Данные отображаются за последние <text>{{days}}</text> дней и отражают тренды {{experienceText}}.',
      highlightType: {
        [Highlights.gainers]: {
          title: 'Самые быстрорастущие навыки',
          subtitle:
            'Анализ IT навыков, которые показывают наибольший рост популярности. Представлено <text>{{skillCount}}</text> навыков, которые стали более востребованы за последние <text>{{days}}</text> дней. Данные отражают тренды {{experienceText}} и включают новые технологии, такие как AI/ML фреймворки, облачные платформы и современные инструменты разработки.',
        },
        [Highlights.decliners]: {
          title: 'Навыки с падающим спросом',
          subtitle:
            'Анализ IT навыков, которые показывают наибольшее снижение популярности. Представлено <text>{{skillCount}}</text> навыков, которые стали менее востребованы за последние <text>{{days}}</text> дней. Данные отражают тренды {{experienceText}} и включают технологии, которые теряют актуальность.',
        },
        [Highlights.new]: {
          title: 'Новые навыки',
          subtitle:
            'Анализ IT навыков, которые впервые появились на рынке труда. Представлено <text>{{skillCount}}</text> навыков, которые впервые встретились за последние <text>{{days}}</text> дней. Данные отражают тренды {{experienceText}} и включают новые технологии и инструменты.',
        },
        [Highlights['highest-salary']]: {
          title: 'Самые высокооплачиваемые навыки',
          subtitle:
            'Анализ IT навыков с самыми высокими зарплатами. Представлено <text>{{skillCount}}</text> навыков, которые имеют самую высокую оплату за последние <text>{{days}}</text> дней. Данные отражают тренды {{experienceText}} и включают технологии с высоким спросом.',
        },
        [Highlights['lowest-salary']]: {
          title: 'Самые низкооплачиваемые навыки',
          subtitle:
            'Анализ IT навыков с самыми низкими зарплатами. Представлено <text>{{skillCount}}</text> навыков, которые имеют самую низкую оплату за последние <text>{{days}}</text> дней. Данные отражают тренды {{experienceText}} и включают более доступные технологии.',
        },
        [Highlights['growingSalary']]: {
          title: 'Навыки с растущей зарплатой',
          subtitle:
            'Анализ IT навыков, которые показывают наибольший рост зарплат. Представлено <text>{{skillCount}}</text> навыков за последние <text>{{days}}</text> дней. Данные отражают тренды {{experienceText}} и включают технологии с разными условиями оплаты.',
        },
      },
    },
    favoritesPage: {
      title: 'Избранное',
      subtitle:
        'Персональная коллекция сохраненных IT навыков, направлений и категорий для отслеживания и сравнения. Управляйте списком для мониторинга трендов и изменений. Данные отображаются за последние <text>{{days}}</text> дней и отражают текущие рыночные условия.',
      skills: 'Избранные навыки',
      domains: 'Избранные направления',
      categories: 'Избранные категории',
    },
    footer: {
      text: '{{appName}} анализирует рынок IT-вакансий и определяет востребованные навыки для карьерного роста',
      backToTop: 'Вернуться наверх',
    },
    tooltips: {
      salary:
        'Ожидаемая медианная зарплата в месяц. Включает гистограмму распределения зарплат по различным диапазонам.',
      domainsConfidence:
        'Показатель уверенности в том, что навык относится к направлению <text>{{name}}</text>',
      categoriesConfidence:
        'Показатель уверенности в том, что навык относится к категории <text>{{name}}</text>',
      similarity: 'Показатель схожести навыков по значению и функциональности',
    },
  },
};
