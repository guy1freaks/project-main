/**
 * Generic IDF branches (parent) and representative subroles inside each unit.
 * Copy is illustrative; verify details with your recruitment office.
 *
 * `theme` — צבעי ממשק לכל ענף (מופיעים בגלילה ובניווט). עדכן לפי הצבעים הרשמיים
 * של היחידה אם יש לך קודי hex מדויקים.
 */
export const idfRoles = [
  {
    id: 'chayal',
    emoji: '🪖',
    nameHe: 'חי"ר',
    theme: {
      accent: '#3d6b3a',
      accentSoft: '#e4f0e2',
      accentHover: '#2d5230',
      border: '#c8dcc4',
      surface: '#f7fbf6',
      shadow: 'rgba(45, 62, 42, 0.08)',
    },
    summary:
      'זרוע היבשה: יחידות לחימה, אימון והגנה שמבוססות על רגלים, רכב קרבי ולוגיסטיקה צמודה לשדה.',
    subroles: [
      {
        id: 'lochem',
        nameHe: 'לוחם',
        whatTheyDo:
          'מבצע משימות לחימה בשטח, שומר על כשירות אישית וצוותית, ומתאמן לפי תורת החי"ר.',
      },
      {
        id: 'makak',
        nameHe: 'מפקד כיתה',
        whatTheyDo:
          'מוביל כיתה קטנה בטירונות ובשגרה, מסביר משימות ודואג לרווחת המגויסים תחתיו.',
      },
      {
        id: 'nahag',
        nameHe: 'נהג קרבי',
        whatTheyDo:
          'מפעיל כלי רכב צבאי, מבצע הובלה וליווי לוגיסטי ושומר על בטיחות בנסיעה.',
      },
      {
        id: 'kashar',
        nameHe: 'קַשַׁר',
        whatTheyDo:
          'מפעיל קשר רדיו ומערכות תקשורת שטח, מחבר בין יחידות ומעביר הודעות מבצעיות.',
      },
    ],
  },
  {
    id: 'air',
    emoji: '✈️',
    nameHe: 'חיל האוויר',
    theme: {
      accent: '#1565c0',
      accentSoft: '#e3f2fd',
      accentHover: '#0d47a1',
      border: '#bbdefb',
      surface: '#f5faff',
      shadow: 'rgba(21, 101, 192, 0.08)',
    },
    summary:
      'אחראי על הגנה אווירית, תקיפה, סיוע מודיעיני ולוגיסטיקה של מטוסים, מסוקים ומערכות נשק.',
    subroles: [
      {
        id: 'technai',
        nameHe: 'טכנאי מערכות',
        whatTheyDo:
          'מתחזק מערכות אלקטרוניקה, מנועים או נשק במטוסים ובבסיסים לפי התמחות.',
      },
      {
        id: 'mabat',
        nameHe: 'מב״ט / בקרה',
        whatTheyDo:
          'עוקב אחרי מצב אווירי, מסייע בהכוונת כלי טיס ובתיאום בין חוליות הגנה.',
      },
      {
        id: 'munat',
        nameHe: 'מפעיל מערכת נשק',
        whatTheyDo:
          'מפעיל מערכות יירוט ונשק נגד מטוסים במסגרת הגנת שמיים ומוכנות מבצעית.',
      },
    ],
  },
  {
    id: 'navy',
    emoji: '⚓',
    nameHe: 'חיל הים',
    theme: {
      accent: '#0d47a1',
      accentSoft: '#e3f2fd',
      accentHover: '#082c64',
      border: '#90caf9',
      surface: '#f3f8fd',
      shadow: 'rgba(13, 71, 161, 0.09)',
    },
    summary:
      'מבצע סיור, הגנה על חופים ונתיבי שיט, לוחמה בים ותמיכה לוגיסטית בספינות ובבסיסים.',
    subroles: [
      {
        id: 'sapan',
        nameHe: 'ספן',
        whatTheyDo:
          'מפעיל כלי שיט, נושא בתפקידי ניווט, מנוע ומשמרות בים ובחוף.',
      },
      {
        id: 'locshem-yam',
        nameHe: 'לוחם בספינה',
        whatTheyDo:
          'מבצע משימות לחימה ואבטחה על גבי ספינות ומוכן לתרחישים בים.',
      },
      {
        id: 'technai-yam',
        nameHe: 'טכנאי ימי',
        whatTheyDo:
          'מתקן מערכות חשמל, מכונות ונשק על כלי שיט ושומר על כשירות הכלי.',
      },
    ],
  },
  {
    id: 'oref',
    emoji: '🛡️',
    nameHe: 'פיקוד העורף',
    theme: {
      accent: '#c45c26',
      accentSoft: '#fdeee6',
      accentHover: '#9e4518',
      border: '#f5ccb0',
      surface: '#fffaf7',
      shadow: 'rgba(196, 92, 38, 0.08)',
    },
    summary:
      'מתמקד בהגנה על האוכלוסייה, התרעה, חילוץ והצלה, והכוונה אזרחית במצבי חירום.',
    subroles: [
      {
        id: 'mekadem',
        nameHe: 'מחפש והצלה',
        whatTheyDo:
          'מגיע לאירועים עם ציוד, מסייע בחילוץ לכודים ותומך בכוחות הביטחון.',
      },
      {
        id: 'harta',
        nameHe: 'התרעה והכוונה',
        whatTheyDo:
          'מסביר לציבור כללי התנהגות במצבי חירום ומשתתף בפעילות הסברה שטחית.',
      },
    ],
  },
  {
    id: 'mp',
    emoji: '👮',
    nameHe: 'המשטרה הצבאית',
    theme: {
      accent: '#37474f',
      accentSoft: '#eceff1',
      accentHover: '#263238',
      border: '#cfd8dc',
      surface: '#fafbfc',
      shadow: 'rgba(55, 71, 79, 0.09)',
    },
    summary:
      'אוכפת סדר ומשמעת בבסיסים, מבצעת אבטחה, ביקורת כניסה וטיפול באירועים פנים־צבאיים.',
    subroles: [
      {
        id: 'samal',
        nameHe: 'סמל תנועה / שטח',
        whatTheyDo:
          'מסייע בסדר תנועה בבסיס, בביקורת כניסה ובשמירה על בטיחות אנשים ורכוש.',
      },
      {
        id: 'choker',
        nameHe: 'בוחן שטח',
        whatTheyDo:
          'בודק עמידה בנהלים, מדווח על חריגות ומסייע בשמירה על אווירת שירות.',
      },
    ],
  },
  {
    id: 'modiin',
    emoji: '🔍',
    nameHe: 'חיל המודיעין',
    theme: {
      accent: '#5e35b1',
      accentSoft: '#ede7f6',
      accentHover: '#4527a0',
      border: '#d1c4e9',
      surface: '#faf8fd',
      shadow: 'rgba(94, 53, 177, 0.08)',
    },
    summary:
      'אוסף ומעבד מידע מבצעי, תומך בהחלטות פיקוד ומספק תמונת מצב לגזרות שונות.',
    subroles: [
      {
        id: 'osek',
        nameHe: 'אוסף מודיעין',
        whatTheyDo:
          'מעבד חומר גלם, מסווג מידע ומכין תוצרים לפיקוד לפי נהלים.',
      },
      {
        id: 'siyur',
        nameHe: 'סיור / איסוף שטחי',
        whatTheyDo:
          'משתתף במשימות איסוף לפי הכשרה, תוך הקפדה על ביטחון מידע וסודיות.',
      },
    ],
  },
  {
    id: 'tikshuv',
    emoji: '💻',
    nameHe: 'אגף התקשוב וההגנה בסייבר',
    theme: {
      accent: '#00695c',
      accentSoft: '#e0f2f1',
      accentHover: '#004d40',
      border: '#b2dfdb',
      surface: '#f3fcfb',
      shadow: 'rgba(0, 105, 92, 0.08)',
    },
    summary:
      'מפעיל תשתיות תקשורת, הגנה מסייבר ומערכות מידע שמחברות בין יחידות צה"ל.',
    subroles: [
      {
        id: 'maslol',
        nameHe: 'מפעיל מערכות תקשורת',
        whatTheyDo:
          'מתפעל ציוד קשר ורשתות, פותר תקלות שטח ומסייע בחיבור יחידות.',
      },
      {
        id: 'matzpen',
        nameHe: 'מגן סייבר',
        whatTheyDo:
          'מנטר אירועים, מיישם נהלי אבטחת מידע ומסייע בהגנה על מערכות.',
      },
    ],
  },
  {
    id: 'logistics',
    emoji: '📦',
    nameHe: 'אגף הטכנולוגיה והלוגיסטיקה',
    theme: {
      accent: '#8d6e63',
      accentSoft: '#efebe9',
      accentHover: '#6d4c41',
      border: '#d7ccc8',
      surface: '#fdfcfa',
      shadow: 'rgba(109, 76, 65, 0.08)',
    },
    summary:
      'מספק אספקה, תחזוקה, רפואה צבאית ותשתיות שמאפשרות לצבא לפעול ברצף.',
    subroles: [
      {
        id: 'sapak',
        nameHe: 'ספק לוגיסטי',
        whatTheyDo:
          'מנהל מלאי, הובלה וחלוקה של ציוד, מזון ותרופות לפי צורך היחידה.',
      },
      {
        id: 'refua',
        nameHe: 'תומך רפואה',
        whatTheyDo:
          'מסייע בבתי חולים צבאיים ובמרפאות בתפעול, סידור וסיוע למטופלים.',
      },
    ],
  },
  {
    id: 'tomchei',
    emoji: '🛠️',
    nameHe: 'תומכי לחימה',
    theme: {
      accent: '#b8860b',
      accentSoft: '#faf6e8',
      accentHover: '#8f6a08',
      border: '#ecd9a4',
      surface: '#fffdf7',
      shadow: 'rgba(184, 134, 11, 0.08)',
    },
    summary:
      'תפקידים מגוונים שמזינים את מערך הלחימה: מטבחים, משק, מינהל ושירותים.',
    subroles: [
      {
        id: 'matab',
        nameHe: 'מטבח צבאי',
        whatTheyDo:
          'מכין ארוחות לפי תפריט, שומר על תקינות מזון ועמידה בנהלי תברואה.',
      },
      {
        id: 'shlav',
        nameHe: 'משק / שמירה',
        whatTheyDo:
          'מטפח שטח הבסיס, משתתף בשמירות ובתחזוקת מתקנים יומיומית.',
      },
    ],
  },
]

export function parentAnchorId(parentId) {
  return `role-parent-${parentId}`
}

export function subroleAnchorId(parentId, subId) {
  return `role-${parentId}-${subId}`
}
