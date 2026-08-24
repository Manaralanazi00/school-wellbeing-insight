export const SCHOOL = {
  name: "Riverside High School",
  students: 2950,
  weeklyCheckIns: 1248,
  averageStress: 61,
  highStress: 42,
};

export const MIN_GROUP_SIZE = 10;

export type TimeRange = "7d" | "30d" | "semester";

export const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "semester", label: "This semester" },
];

export const STRESS_TREND_7D = [
  { label: "Monday", short: "Mon", stress: 54 },
  { label: "Tuesday", short: "Tue", stress: 57 },
  { label: "Wednesday", short: "Wed", stress: 59 },
  { label: "Thursday", short: "Thu", stress: 61 },
  { label: "Friday", short: "Fri", stress: 66 },
  { label: "Saturday", short: "Sat", stress: 63 },
  { label: "Sunday", short: "Sun", stress: 61 },
];

const STRESS_TREND_30D = [
  { label: "Week 1", short: "W1", stress: 48 },
  { label: "Week 2", short: "W2", stress: 52 },
  { label: "Week 3", short: "W3", stress: 55 },
  { label: "Week 4", short: "W4", stress: 61 },
];

const STRESS_TREND_SEMESTER = [
  { label: "September", short: "Sep", stress: 41 },
  { label: "October", short: "Oct", stress: 46 },
  { label: "November", short: "Nov", stress: 53 },
  { label: "December", short: "Dec", stress: 64 },
  { label: "January", short: "Jan", stress: 57 },
  { label: "February", short: "Feb", stress: 61 },
];

export type StressorKey =
  | "exams"
  | "workload"
  | "future"
  | "relationships"
  | "bullying"
  | "other";

export type StressorSlice = {
  key: StressorKey;
  name: string;
  value: number;
  responses: number;
  trend: number | null;
  detail: string;
  colorVar: string;
};

export const STRESS_SOURCES: StressorSlice[] = [
  {
    key: "exams",
    name: "Exams",
    value: 42,
    responses: 524,
    trend: 8,
    detail: "Exams are currently the largest reported source of stress.",
    colorVar: "var(--chart-1)",
  },
  {
    key: "workload",
    name: "Academic workload",
    value: 25,
    responses: 312,
    trend: 3,
    detail: "Academic workload remains one of the top reported stressors.",
    colorVar: "var(--chart-2)",
  },
  {
    key: "future",
    name: "Future / Career",
    value: 13,
    responses: 162,
    trend: 2,
    detail: "Future and career uncertainty is a steady background stressor.",
    colorVar: "var(--chart-3)",
  },
  {
    key: "relationships",
    name: "Relationships",
    value: 9,
    responses: 112,
    trend: -1,
    detail: "Relationship-related stress has slightly decreased this week.",
    colorVar: "var(--chart-6)",
  },
  {
    key: "bullying",
    name: "Bullying",
    value: 7,
    responses: 87,
    trend: 0,
    detail: "Reported bullying-related stress remains relatively stable.",
    colorVar: "var(--chart-4)",
  },
  {
    key: "other",
    name: "Other",
    value: 4,
    responses: 51,
    trend: null,
    detail: "Responses that did not fit the listed categories.",
    colorVar: "var(--chart-5)",
  },
];

/** Deliberately below MIN_GROUP_SIZE to demonstrate small-group privacy protection. */
export const SUPPRESSED_GROUPS = [
  { key: "grade-12-evening", name: "Grade 12 — Evening programme", responses: 6 },
  { key: "exchange", name: "Exchange students", responses: 4 },
];

export type RangeData = {
  averageStress: number;
  highStress: number;
  checkIns: number;
  trend: { label: string; short: string; stress: number }[];
  deltaStress: number;
  deltaHigh: number;
};

export const RANGE_DATA: Record<TimeRange, RangeData> = {
  "7d": {
    averageStress: 61,
    highStress: 42,
    checkIns: 1248,
    trend: STRESS_TREND_7D,
    deltaStress: 4,
    deltaHigh: 8,
  },
  "30d": {
    averageStress: 55,
    highStress: 36,
    checkIns: 4712,
    trend: STRESS_TREND_30D,
    deltaStress: 6,
    deltaHigh: 5,
  },
  semester: {
    averageStress: 53,
    highStress: 31,
    checkIns: 18904,
    trend: STRESS_TREND_SEMESTER,
    deltaStress: 12,
    deltaHigh: 9,
  },
};

export type Insight = {
  slug: string;
  title: string;
  current: number;
  previous: number;
  trendLabel: string;
  message: string;
  peaks: { label: string; value: number }[];
  actions: { title: string; description: string }[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "exam-stress",
    title: "Exam Stress",
    current: 42,
    previous: 34,
    trendLabel: "↑ 8%",
    message: "Exam-related stress is increasing compared with last week.",
    peaks: [
      { label: "Before exams", value: 58 },
      { label: "During exams", value: 31 },
      { label: "After exams", value: 11 },
    ],
    actions: [
      {
        title: "Exam Preparation Workshop",
        description: "Help students learn study planning and stress-management strategies.",
      },
      {
        title: "Study Planning Resources",
        description: "Provide students with practical planning resources before exam periods.",
      },
      {
        title: "Counselor Outreach",
        description: "Increase awareness of available school counseling resources.",
      },
    ],
  },
  {
    slug: "academic-workload",
    title: "Academic Workload",
    current: 25,
    previous: 22,
    trendLabel: "↑ 3%",
    message: "Academic workload remains one of the top reported stressors.",
    peaks: [
      { label: "When assignments pile up", value: 61 },
      { label: "Mid-term period", value: 27 },
      { label: "Regular weeks", value: 12 },
    ],
    actions: [
      {
        title: "Assignment Calendar Coordination",
        description: "Coordinate deadlines across departments to avoid workload clustering.",
      },
      {
        title: "Study Skills Sessions",
        description: "Short sessions on prioritisation and time planning for students.",
      },
      {
        title: "Teacher Check-in Guidance",
        description: "Share guidance with teachers on spotting workload pressure early.",
      },
    ],
  },
  {
    slug: "bullying",
    title: "Bullying",
    current: 7,
    previous: 7,
    trendLabel: "Stable",
    message: "Reported bullying-related stress remains relatively stable.",
    peaks: [
      { label: "When dealing with classmates", value: 64 },
      { label: "Break times", value: 24 },
      { label: "Online / after school", value: 12 },
    ],
    actions: [
      {
        title: "Peer Support Programme",
        description: "Train student peer supporters to create safer everyday spaces.",
      },
      {
        title: "Safe Reporting Awareness",
        description: "Remind students of the safe, confidential ways to raise concerns.",
      },
      {
        title: "Counselor Outreach",
        description: "Increase awareness of available school counseling resources.",
      },
    ],
  },
];

export const EMERGING_SIGNALS = INSIGHTS.map((i) => ({
  slug: i.slug,
  title: i.title,
  value: i.current,
  trendLabel: i.trendLabel,
  message: i.message,
  tone: i.slug === "exam-stress" ? "danger" : i.slug === "academic-workload" ? "warning" : "calm",
}));

export function getInsight(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}
