import { Categories } from '@/config/categories';
import { Experience } from '@/config/experience';
import { Highlights } from '@/config/highlights';
import { Technologies } from '@/config/technologies';

export const translations = {
  en: {
    translation: {
      navigation: {
        uniqueSkills: 'Unique Key Skills (All-Time)',
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
        RUR: 'Russian Ruble',
      },
      mainText: {
        title: 'Analysis of <badge>key skills</badge> in the IT Sector',
        subtitle:
          'Skills and salary data were collected by analyzing <text>{{vacancies}}</text> IT job postings via the <linkto>HeadHunter API</linkto> from <text>{{dateFrom}}</text> to <text>{{dateTo}}</text>.',
        enumeration:
          'Key skills were classified using machine learning methods into:',
        domains: '- <linkto>{{count}} domains</linkto>, such as',
        categories: '- <linkto>{{count}} categories</linkto>, including',
        end: 'This classification helps to gauge which skills are in demand and to observe differences in salary ranges across IT domains.',
      },
      filters: {
        title: 'Filters',
      },
      common: {
        and: 'and',
        days: 'days',
        experience: 'Experience',
        period: 'Period',
        unknownCategory: 'Unknown',
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
        uniqueSkills: 'Уникальные ключевые навыки (за все время)',
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
        RUR: 'Российский рубль',
      },
      mainText: {
        title: 'Анализ <badge>ключевых навыков</badge> в сфере IT',
        subtitle:
          'Данные по навыкам и диапазонам зарплат собраны на основе анализа <text>{{vacancies}}</text> IT вакансий через <linkto>API HeadHunter</linkto> за период с <text>{{dateFrom}}</text> по <text>{{dateTo}}</text>.',
        enumeration:
          'Ключевые навыки классифицированы с помощью методов машинного обучения по:',
        domains: '- <linkto>{{count}} направлениям</linkto>, таким как',
        categories: '- <linkto>{{count}} категориям</linkto>, включая',
        end: 'Эта классификация помогает оценить, какие навыки востребованы, и увидеть различия в диапазонах зарплат между IT-направлениями.',
      },
      filters: {
        title: 'Фильтры',
      },
      common: {
        and: 'и',
        days: 'дней',
        experience: 'Опыт работы',
        period: 'Период',
        unknownCategory: 'Неизвестно',
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
        // Languages: 'Языки программирования',
        // Databases: 'Базы данных',
        // 'Frontend Libraries and Frameworks':
        //   'Библиотеки и фреймворки фронтэнда',
        // 'Backend Libraries and Frameworks': 'Библиотеки и фреймворки бэкэнда',
        // 'Soft skills': 'Гибкие навыки',
        // 'Operating systems': 'Операционные системы',
        // 'Containerization & Orchestration': 'Контейнеризация и оркестрация',
        // 'Infrastructure Automation & Configuration':
        //   'Автоматизация и конфигурация инфраструктуры',
        // 'Code Collaboration & Integration':
        //   'Совместная разработка и интеграция кода',
        // 'Graphic design': 'Графический дизайн',
        // Monitoring: 'Мониторинг',
        // CMS: 'Системы управления контентом',
        // 'Network Protocols': 'Сетевые протоколы',
        // 'Web Servers': 'Веб-серверы',
        // 'Integrated Development Environments':
        //   'Интегрированные среды разработки',
        // 'Cloud platforms': 'Облачные платформы',
        // 'Mobile Libraries and Frameworks':
        //   'Библиотеки и фреймворки для мобильной разработки',
        // 'Message Brokers': 'Брокеры сообщений',
        // 'Testing Tools': 'Инструменты тестирования',
        // 'Machine Learning Libraries and Frameworks':
        //   'Библиотеки и фреймворки машинного обучения',
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
