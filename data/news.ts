export interface NewsItem {
  slug: string;
  title_uk: string;
  title_en: string;
  date: string;
  excerpt_uk: string;
  excerpt_en: string;
  content_uk: string;
  content_en: string;
  image: string;
}

export const news: NewsItem[] = [
  {
    slug: "den-vidkrytyh-dverei-2026",
    title_uk: "День відкритих дверей 2026",
    title_en: "Open Day 2026",
    date: "2026-03-20",
    excerpt_uk:
      "Національна академія СБУ запрошує всіх бажаючих на День відкритих дверей, що відбудеться 15 квітня 2026 року.",
    excerpt_en:
      "The National Academy of the SSU invites everyone to the Open Day, which will take place on 15 April 2026.",
    content_uk: `Національна академія Служби безпеки України запрошує всіх бажаючих на День відкритих дверей, що відбудеться 15 квітня 2026 року.

Під час заходу ви зможете:
- Ознайомитися з умовами вступу та навчання
- Відвідати навчальні аудиторії та лабораторії
- Поспілкуватися з викладачами та курсантами
- Отримати відповіді на всі питання щодо вступної кампанії

Початок о 10:00. Реєстрація обов'язкова.`,
    content_en: `The National Academy of the Security Service of Ukraine invites everyone to the Open Day, which will take place on 15 April 2026.

During the event you will be able to:
- Learn about admission requirements and study conditions
- Visit classrooms and laboratories
- Speak with faculty members and cadets
- Get answers to all questions regarding the admission campaign

The event begins at 10:00. Registration is required.`,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop&q=80",
  },
  {
    slug: "naukova-konferentsiya-2026",
    title_uk: "Міжнародна наукова конференція з кібербезпеки",
    title_en: "International Academic Conference on Cyber Security",
    date: "2026-03-15",
    excerpt_uk:
      "В Академії відбулася міжнародна наукова конференція, присвячена сучасним викликам у сфері кібербезпеки.",
    excerpt_en:
      "The Academy hosted an international academic conference devoted to modern challenges in the field of cyber security.",
    content_uk: `В Національній академії СБУ відбулася міжнародна наукова конференція «Сучасні виклики кібербезпеки: теорія та практика».

У конференції взяли участь понад 200 науковців та практиків з 15 країн світу.

Основні теми доповідей:
- Штучний інтелект у кібербезпеці
- Захист критичної інфраструктури
- Протидія кіберзагрозам в умовах гібридної війни
- Підготовка фахівців з кібербезпеки

За результатами конференції буде видано збірник наукових праць.`,
    content_en: `The National Academy of the SSU hosted the international academic conference "Modern Challenges of Cyber Security: Theory and Practice."

Over 200 researchers and practitioners from 15 countries participated in the conference.

Main topics of the presentations:
- Artificial intelligence in cyber security
- Critical infrastructure protection
- Countering cyber threats in hybrid warfare
- Training cyber security specialists

A collection of academic papers will be published based on the conference results.`,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&q=80",
  },
  {
    slug: "sportyvni-zmagannya",
    title_uk: "Курсанти академії перемогли на змаганнях з рукопашного бою",
    title_en: "Academy Cadets Win Hand-to-Hand Combat Competition",
    date: "2026-03-10",
    excerpt_uk:
      "Команда курсантів Національної академії СБУ здобула першість на Чемпіонаті України з рукопашного бою серед силових структур.",
    excerpt_en:
      "The cadet team of the National Academy of the SSU won first place at the Ukrainian Hand-to-Hand Combat Championship among security forces.",
    content_uk: `Команда курсантів Національної академії СБУ здобула першість на Чемпіонаті України з рукопашного бою серед силових структур.

Наші курсанти вибороли 5 золотих, 3 срібні та 2 бронзові медалі.

Вітаємо переможців та їх тренерів з блискучою перемогою!`,
    content_en: `The cadet team of the National Academy of the SSU won first place at the Ukrainian Hand-to-Hand Combat Championship among security forces.

Our cadets won 5 gold, 3 silver, and 2 bronze medals.

Congratulations to the winners and their coaches on this outstanding victory!`,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop&q=80",
  },
  {
    slug: "ugoda-pro-spivpratsyu",
    title_uk: "Підписано угоду про співпрацю з NATO DEEP",
    title_en: "Cooperation Agreement Signed with NATO DEEP",
    date: "2026-03-05",
    excerpt_uk:
      "Академія підписала меморандум про взаєморозуміння з NATO Defence Education Enhancement Programme.",
    excerpt_en:
      "The Academy signed a memorandum of understanding with the NATO Defence Education Enhancement Programme.",
    content_uk: `Національна академія СБУ підписала меморандум про взаєморозуміння з NATO Defence Education Enhancement Programme (NATO DEEP).

Угода передбачає:
- Обмін досвідом у сфері підготовки кадрів
- Спільні навчальні програми
- Стажування викладачів та курсантів
- Участь у міжнародних навчаннях

Це важливий крок на шляху інтеграції національної системи безпекової освіти до євроатлантичних стандартів.`,
    content_en: `The National Academy of the SSU signed a memorandum of understanding with the NATO Defence Education Enhancement Programme (NATO DEEP).

The agreement provides for:
- Exchange of expertise in personnel training
- Joint educational programmes
- Faculty and cadet internships
- Participation in international exercises

This is an important step towards integrating the national security education system into Euro-Atlantic standards.`,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&h=400&fit=crop&q=80",
  },
  {
    slug: "vypusk-2026",
    title_uk: "Урочистий випуск офіцерів 2026 року",
    title_en: "Ceremonial Officer Graduation of 2026",
    date: "2026-02-28",
    excerpt_uk:
      "В Академії відбувся урочистий випуск молодих офіцерів, які отримали дипломи та офіцерські звання.",
    excerpt_en:
      "The Academy held a ceremonial graduation for young officers who received their diplomas and officer ranks.",
    content_uk: `В Національній академії Служби безпеки України відбувся урочистий випуск молодих офіцерів.

Понад 150 випускників отримали дипломи магістрів та лейтенантські погони.

Найкращим випускникам були вручені відзнаки та нагороди від керівництва Служби безпеки України.

Вітаємо випускників та бажаємо їм успіхів у службі на благо України!`,
    content_en: `The National Academy of the Security Service of Ukraine held a ceremonial graduation for young officers.

Over 150 graduates received master's diplomas and lieutenant shoulder boards.

The top graduates were presented with awards and commendations from the leadership of the Security Service of Ukraine.

Congratulations to the graduates, and we wish them success in their service for the benefit of Ukraine!`,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop&q=80",
  },
  {
    slug: "kibernavchanna-2026",
    title_uk: "Проведено кібернавчання \u00abЩит-2026\u00bb",
    title_en: "Cyber Exercise \"Shield-2026\" Conducted",
    date: "2026-02-20",
    excerpt_uk:
      "На базі Академії проведено масштабні кібернавчання за участі провідних IT-компаній України.",
    excerpt_en:
      "Large-scale cyber exercises were conducted at the Academy with the participation of leading Ukrainian IT companies.",
    content_uk: `На базі Національної академії СБУ проведено масштабні кібернавчання «Щит-2026».

У навчаннях взяли участь понад 300 учасників — курсанти, викладачі та представники провідних IT-компаній України.

Сценарій навчань передбачав відпрацювання дій щодо виявлення та нейтралізації кібератак на об'єкти критичної інфраструктури.

Навчання підтвердили високий рівень підготовки фахівців Академії.`,
    content_en: `Large-scale cyber exercises "Shield-2026" were conducted at the National Academy of the SSU.

Over 300 participants took part in the exercises, including cadets, faculty, and representatives of leading Ukrainian IT companies.

The exercise scenario involved practising the detection and neutralisation of cyber attacks on critical infrastructure facilities.

The exercises confirmed the high level of training of the Academy's specialists.`,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&q=80",
  },
];
