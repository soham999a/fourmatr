export interface EngagementShape {
  id: string;
  letter: string;
  name: string;
  duration: string;
  body: string;
}

export const ENGAGEMENT_SHAPES: EngagementShape[] = [
  {
    id: "discovery",
    letter: "α",
    name: "Discovery",
    duration: "6 weeks",
    body: "Clarify the decision, the context and the conditions for trust.",
  },
  {
    id: "architecture",
    letter: "β",
    name: "Architecture",
    duration: "3 to 6 months",
    body: "Design the reasoning and integration layer around the work.",
  },
  {
    id: "embedded",
    letter: "γ",
    name: "Embedded",
    duration: "12 months",
    body: "Work alongside a team through a sustained period of change.",
  },
  {
    id: "counsel",
    letter: "δ",
    name: "Counsel",
    duration: "Ongoing",
    body: "A continuing conversation for difficult, consequential questions.",
  },
];

export const ENGAGEMENT_PROCESS = [
  "Initial Correspondence",
  "Discovery Call (45 minutes)",
  "Engagement Selection",
  "Studio Work",
  "Delivery and Handover",
];

export const ENGAGEMENT_AUDIENCES = [
  "Sovereign governments",
  "Cultural foundations",
  "Universities and labs",
  "Public-good companies",
  "Long-horizon investors",
  "Founders of singular conviction",
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What does a first correspondence include?",
    answer:
      "A short description of the decision, institution and horizon is enough.",
  },
  {
    question: "How many engagements do you take?",
    answer:
      "A small number of engagements each year. The door is narrow on purpose.",
  },
  {
    question: "Do you work with early-stage teams?",
    answer:
      "Yes. Begin with a correspondence describing the decision, the institution and the horizon; we will discuss fit on the discovery call.",
  },
  {
    question: "Where do engagements begin?",
    answer:
      "With initial correspondence, followed by a 45-minute discovery call and engagement selection.",
  },
];

export const ENGAGE_LEAD = "We begin with the decision, not the model.";
export const ENGAGE_INTRO =
  "A small number of engagements each year. The door is narrow on purpose.";
