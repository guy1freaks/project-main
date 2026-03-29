/** מבחן התאמה — ניקוד לפי קטגוריות (מפתחות יציבים לקוד) */
export const CATEGORY_IDS = ['combat', 'tech', 'intelligence', 'logistics']

export function emptyScores() {
  return {
    combat: 0,
    tech: 0,
    intelligence: 0,
    logistics: 0,
  }
}

/** סדר קבוע — במקרה של תיקו נבחר הראשון ברשימה */
export function winningCategory(scores) {
  let best = CATEGORY_IDS[0]
  let max = -1
  for (const id of CATEGORY_IDS) {
    const v = scores[id] ?? 0
    if (v > max) {
      max = v
      best = id
    }
  }
  return best
}

export const quizIntro = {
  title: 'בחן את עצמך',
  lead:
    'כמה שאלות קצרות שיעזרו לך להרגיש כיוון כללי — לא מגיוס רשמי ולא מחליף לשכה. מתאים למי שרוצה נקודת פתיחה לחשיבה על עולמות תוכן בצה״ל.',
}

export const categoryResultCopy = {
  combat: {
    headline: 'מתאים לך כיווני לחימה ושירות שטח',
    explanation:
      'נראה שאתה נמשך למשימה פיזית, לצוות בשטח ולמוכנות מבצעית. עולמות כמו חי״ר, לוחמה ימית או תפקידי שטח בזרועות אחרות יכולים להתאים לפרופיל הזה — תלוי בגזרה ובקב״ים.',
  },
  tech: {
    headline: 'מתאים לך תפקידים טכנולוגיים',
    explanation:
      'מבחינת ההעדפות שלך, עולמות של מחשבים, מערכות, תקשורת וסייבר בולטים. זה מתחבר לאגף התקשוב, לטכנאות בזרועות השונות ולתפקידי היגוי טכנולוגי — לפי הכשרה ומסגרת.',
  },
  intelligence: {
    headline: 'מתאים לך כיווני מודיעין וחשיבה אנליטית',
    explanation:
      'יש לך נטייה לעבודה ממוקדת, לאיסוף ולעיבוד מידע. חיל המודיעין ותפקידים עם דגש על ניתוח וסודיות יכולים להתאים — בהתאם לתנאי הקבלה והגזרה.',
  },
  logistics: {
    headline: 'מתאים לך כיווני לוגיסטיקה ותמיכה',
    explanation:
      'נראה שאתה מתחבר לארגון, לאספקה ולתפקידים שמזינים את מערך הלחימה. אגף הטכנולוגיה והלוגיסטיקה, תומכי לחימה ורפואה צבאית הם כיוונים אופייניים — לפי התאמה אישית.',
  },
}

/**
 * קישורים לדוגמאות מתוך idfRoles — parentId + subId לעוגן בעמוד היחידה
 */
export const categoryRoleExamples = {
  combat: [
    { parentId: 'chayal', subId: 'lochem' },
    { parentId: 'chayal', subId: 'makak' },
    { parentId: 'navy', subId: 'locshem-yam' },
  ],
  tech: [
    { parentId: 'tikshuv', subId: 'matzpen' },
    { parentId: 'tikshuv', subId: 'maslol' },
    { parentId: 'air', subId: 'technai' },
  ],
  intelligence: [
    { parentId: 'modiin', subId: 'osek' },
    { parentId: 'modiin', subId: 'siyur' },
  ],
  logistics: [
    { parentId: 'logistics', subId: 'sapak' },
    { parentId: 'logistics', subId: 'refua' },
    { parentId: 'tomchei', subId: 'matab' },
  ],
}

export const quizQuestions = [
  {
    id: 'physical-vs-desk',
    prompt: 'האם אתה מעדיף עבודה פיזית או מחשבתית?',
    answers: [
      {
        label: 'פיזית — אני אוהב תנועה, מאמץ ושטח',
        points: { combat: 3, logistics: 1 },
      },
      {
        label: 'שילוב — גם וגם, תלוי במשימה',
        points: { combat: 1, tech: 1, logistics: 1 },
      },
      {
        label: 'מחשבתית — אני מעדיף חשיבה, ניתוח ומסכים',
        points: { tech: 2, intelligence: 2 },
      },
      {
        label: 'בעיקר שקט מול מחשב — עומק וריכוז',
        points: { tech: 3, intelligence: 1 },
      },
    ],
  },
  {
    id: 'combat-service',
    prompt: 'עד כמה חשוב לך שירות קרבי?',
    answers: [
      {
        label: 'מאוד — זה חלק מרכזי בשבילי',
        points: { combat: 3 },
      },
      {
        label: 'חשוב, אבל לא הכל או לא',
        points: { combat: 2, intelligence: 1 },
      },
      {
        label: 'פחות חשוב — אני פתוח לאופציות',
        points: { tech: 1, logistics: 2, intelligence: 1 },
      },
      {
        label: 'אני מעדיף תפקידים לא־קרביים אם מתאים',
        points: { tech: 2, intelligence: 2, logistics: 1 },
      },
    ],
  },
  {
    id: 'tech-affinity',
    prompt: 'האם אתה אוהב טכנולוגיה ומחשבים?',
    answers: [
      {
        label: 'כן — זה מעניין אותי מאוד',
        points: { tech: 3 },
      },
      {
        label: 'באופן בינוני — כלי עבודה, לא תחביב',
        points: { tech: 2, intelligence: 1 },
      },
      {
        label: 'לא במיוחד — אני מסתדר אבל לא נמשך',
        points: { combat: 1, logistics: 2 },
      },
      {
        label: 'אני מעדיף להתרחק ממסכים',
        points: { combat: 2, logistics: 2 },
      },
    ],
  },
  {
    id: 'team-vs-solo',
    prompt: 'האם אתה מעדיף לעבוד בצוות או לבד?',
    answers: [
      {
        label: 'בצוות — אנרגיה של קבוצה ומשימה משותפת',
        points: { combat: 2, logistics: 2 },
      },
      {
        label: 'שילוב — צוות כשצריך, לבד כשצריך',
        points: { combat: 1, intelligence: 1, tech: 1 },
      },
      {
        label: 'לבד — עם תמיכה מרחוק כשצריך',
        points: { intelligence: 2, tech: 2 },
      },
      {
        label: 'עצמאי — עבודה ממוקדת לבד',
        points: { intelligence: 2, tech: 1 },
      },
    ],
  },
  {
    id: 'field-vs-office',
    prompt: 'האם אתה אוהב שטח או משרד?',
    answers: [
      {
        label: 'שטח ותנועה — ככל שהרחוק מהמשרד יותר טוב',
        points: { combat: 3, logistics: 1 },
      },
      {
        label: 'בעיקר שטח — גם אם יש גם מבנה',
        points: { combat: 2, intelligence: 1 },
      },
      {
        label: 'שילוב — גם פגישות וגם יציאה',
        points: { logistics: 1, intelligence: 1, tech: 1 },
      },
      {
        label: 'משרד ומבנה — סביבה מסודרת',
        points: { tech: 2, intelligence: 2 },
      },
      {
        label: 'משרד עם מחשב — שגרה יציבה',
        points: { tech: 3, intelligence: 1 },
      },
    ],
  },
]
