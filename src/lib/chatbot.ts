/**
 * chatBot.ts
 * Knowledge base + reply engine for the About-page quick chat.
 * Auto-builds most of its knowledge from portfolioData, so adding a new
 * project/skill/job automatically makes the bot able to talk about it —
 * no need to hand-write a new Q&A entry for everything.
 *
 * Matching is keyword + fuzzy based (typo-tolerant via Levenshtein distance
 * and substring matching) — not a true LLM, but handles a wide range of
 * phrasing and small misspellings.
 */
import { portfolioData } from '../data';

export type ChatRole = 'bot' | 'user';
export type Message = { role: ChatRole; text: string };

type KBEntry = {
  keywords: string[]; // single words matched fuzzily as tokens, or phrases (contain a space) matched as substrings
  answer: string;
  label?: string; // used only for "did you mean" suggestions
};

export const quickQuestions: string[] = [
  'What do you do?',
  'Main skills?',
  'Open for work?',
  'Where are you based?',
  'Any projects?',
  'How to contact you?',
];

// ---------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'in', 'on', 'for', 'to', 'is', 'are',
  'with', 'your', 'you', 'me', 'i', 'do', 'does', 'what', 'tell', 'about',
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s.]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean);
}

// Splits "React, TypeScript, Node.js" style titles/ids into clean keyword tokens,
// dropping generic filler words so they don't cause false-positive matches.
function keywordsFromPhrase(phrase: string): string[] {
  return tokenize(phrase).filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

// A handful of common aliases so "js"/"ts"/"node"/"py" etc. still match.
const ALIASES: Record<string, string[]> = {
  javascript: ['js'],
  typescript: ['ts'],
  'node.js': ['node', 'nodejs'],
  python: ['py'],
  postgresql: ['postgres', 'psql'],
  mongodb: ['mongo'],
  'express.js': ['express'],
  'github actions': ['ci', 'cicd'],
};

// ---------------------------------------------------------------------
// Fuzzy matching helpers
// ---------------------------------------------------------------------

// Classic edit-distance calculation — lets us catch small typos
// ("codesentinal" vs "codesentinel") without needing an exact match.
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

// True if `token` is close enough to `keyword` to count as the same word:
// exact match, one is a substring of the other, or edit-distance is small
// relative to word length. Minimum length raised to 5 to avoid short-word
// collisions like "name" vs "game".
function isCloseMatch(token: string, keyword: string): boolean {
  if (token === keyword) return true;
  if (token.length > 2 && keyword.length > 2) {
    if (token.includes(keyword) || keyword.includes(token)) return true;
  }
  const maxLen = Math.max(token.length, keyword.length);
  if (maxLen < 5) return false;
  const allowedDistance = maxLen <= 6 ? 1 : 2;
  return levenshtein(token, keyword) <= allowedDistance;
}

function scoreEntry(tokens: string[], normalizedText: string, keywords: string[]): number {
  let score = 0;
  for (const kw of keywords) {
    if (kw.includes(' ')) {
      // multi-word phrase keyword — checked as a substring of the full input
      if (normalizedText.includes(kw)) {
        score += kw.split(' ').length * 2;
      }
      continue;
    }
    // single-word keyword — check every token for exact / substring / fuzzy match
    let exactHit = false;
    let fuzzyHit = false;
    for (const token of tokens) {
      if (token === kw) {
        exactHit = true;
        break;
      }
      if (isCloseMatch(token, kw)) {
        fuzzyHit = true;
      }
    }
    if (exactHit) {
      score += 1 + Math.min(kw.length / 4, 2);
    } else if (fuzzyHit) {
      score += 0.75 + Math.min(kw.length / 5, 1.5);
    }
  }
  return score;
}

// ---------------------------------------------------------------------
// Dynamic KB — built from real portfolio data
// ---------------------------------------------------------------------

// One entry per project: matches on title words, id, and its listed technologies.
const projectEntries: KBEntry[] = portfolioData.projects.map((p) => {
  const techKeywords = p.technologies.flatMap((t: any) => {
    const base = keywordsFromPhrase(t);
    const alias = ALIASES[t.toLowerCase()] ?? [];
    return [...base, ...alias];
  });
  const keywords = dedupe([
    ...keywordsFromPhrase(p.title),
    ...keywordsFromPhrase(p.id.replace(/-/g, ' ')),
    ...techKeywords,
  ]);
  const firstSentence = p.description.split('. ')[0].replace(/\.$/, '');
  const link = p.liveUrl ?? p.githubUrl;
  return {
    keywords,
    label: p.title.split(' - ')[0],
    answer: `${firstSentence}. Built with ${p.technologies.slice(0, 4).join(', ')}${
      p.technologies.length > 4 ? '...' : ''
    }.${link ? ` Link: ${link}` : ''}`,
  };
});

// One entry per individual skill/tool (flattened across all categories).
const flatSkills = portfolioData.skills.flatMap((cat) =>
  cat.items.map((item: any) => ({ ...item, category: cat.category })),
);
const skillEntries: KBEntry[] = flatSkills.map((s) => {
  const alias = ALIASES[s.name.toLowerCase()] ?? [];
  return {
    keywords: dedupe([...keywordsFromPhrase(s.name), ...alias]),
    label: s.name,
    answer: `Yes — I work with ${s.name} (${s.category}).`,
  };
});

// One entry per job.
const experienceEntries: KBEntry[] = portfolioData.experience.map((e) => ({
  keywords: dedupe([
    ...keywordsFromPhrase(e.company),
    ...keywordsFromPhrase(e.position),
    'intern',
    'internship',
  ]),
  label: e.company,
  answer: `${e.position} at ${e.company} (${e.period}). ${e.description[0]}`,
}));

// One entry per school.
const educationEntries: KBEntry[] = portfolioData.education.map((ed) => ({
  keywords: dedupe([...keywordsFromPhrase(ed.institution), ...keywordsFromPhrase(ed.degree)]),
  label: ed.institution,
  answer: `${ed.degree} at ${ed.institution} (${ed.period}). ${ed.description}`,
}));

// ---------------------------------------------------------------------
// Static / general KB
// ---------------------------------------------------------------------
const { personal, projects, certifications } = portfolioData;

const staticEntries: KBEntry[] = [
  {
    keywords: dedupe(['hi', 'hello', 'hey', 'sup', 'yo']),
    answer: 'Hey! Ask me about skills, projects, work status, experience, or contact.',
  },
  {
    keywords: dedupe(['who', 'name']),
    answer: `I'm an assistant for ${personal.name}, a ${personal.title}.`,
  },
  {
    keywords: dedupe(['role', 'job', 'what do', 'work as']),
    answer: personal.bio,
  },
  {
    keywords: dedupe(['skill', 'tech', 'stack', 'tools', 'language', 'framework']),
    answer: `Main stack: ${flatSkills.slice(0, 8).map((s) => s.name).join(', ')}, and more.`,
  },
  {
    keywords: dedupe(['open', 'freelance', 'hire', 'available', 'collab', 'collaborate']),
    answer: 'Yes, open to work, freelance gigs, and collaborations.',
  },
  {
    keywords: dedupe(['where', 'based', 'location', 'live', 'city']),
    answer: `Based in ${personal.location}.`,
  },
  {
    keywords: dedupe(['project', 'projects', 'built', 'made', 'portfolio work']),
    answer: `${projects.length}+ projects including ${projects
      .filter((p) => p.priority === 'high')
      .slice(0, 3)
      .map((p) => p.title.split(' - ')[0])
      .join(', ')}. Ask about any one by name for details.`,
  },
  {
    keywords: dedupe(['contact', 'reach', 'connect']),
    answer: `Email: ${personal.email} · GitHub: ${personal.github} · LinkedIn: ${personal.linkedin}`,
  },
  {
    keywords: dedupe(['email', 'mail']),
    answer: `Email me at ${personal.email}.`,
  },
  {
    keywords: dedupe(['github']),
    answer: `GitHub: ${personal.github}`,
  },
  {
    keywords: dedupe(['linkedin']),
    answer: `LinkedIn: ${personal.linkedin}`,
  },
  {
    keywords: dedupe(['experience', 'years', 'senior', 'junior', 'internship', 'intern']),
    answer: `Currently ${portfolioData.experience[0].position} at ${portfolioData.experience[0].company}. Ask about a specific company for details.`,
  },
  {
    keywords: dedupe(['education', 'degree', 'college', 'study', 'university']),
    answer: `${portfolioData.education[0].degree} at ${portfolioData.education[0].institution}.`,
  },
  {
    keywords: dedupe([
      'certification', 'certifications', 'certificate', 'certificates',
      'achievement', 'achievements', 'hackathon', 'hackathons',
    ]),
    answer: `${certifications.length}+ certifications and hackathons, including AWS, Azure, Oracle Cloud, and several national-level hackathons.`,
  },
  {
    keywords: dedupe(['thanks', 'thank', 'cool', 'nice', 'great', 'awesome']),
    answer: 'Glad that helped! Ask me anything else.',
  },
  {
    keywords: dedupe(['fun', 'fact', 'hobby', 'hobbies']),
    answer: 'When not coding, I am usually breaking things on purpose to learn how to fix them.',
  },
  {
    keywords: dedupe(['security', 'cyber', 'cybersecurity', 'hacking']),
    answer: 'Cyber security is a core focus — from ML-based intrusion detection to scam-analysis platforms and CTF challenges.',
  },
];

// Order matters for tie-breaks: specific dynamic entries first so they
// win over generic static ones when scores are equal.
const knowledgeBase: KBEntry[] = [
  ...projectEntries,
  ...skillEntries,
  ...experienceEntries,
  ...educationEntries,
  ...staticEntries,
];

// Names used for "did you mean...?" suggestions when nothing scores well.
const allNames: string[] = [
  ...projects.map((p) => p.title.split(' - ')[0]),
  ...flatSkills.map((s) => s.name),
];

function closestNameSuggestion(rawInput: string): string | null {
  const inputTokens = tokenize(rawInput);
  if (inputTokens.length === 0) return null;

  let best: string | null = null;
  let bestDist = Infinity;

  for (const name of allNames) {
    const nameTokens = tokenize(name);
    for (const nt of nameTokens) {
      if (nt.length < 4) continue;
      for (const it of inputTokens) {
        if (it.length < 4) continue;
        const dist = levenshtein(it, nt);
        const maxLen = Math.max(it.length, nt.length);
        const threshold = maxLen <= 6 ? 2 : 3;
        if (dist <= threshold && dist < bestDist) {
          bestDist = dist;
          best = name;
        }
      }
    }
  }
  return best;
}

function fallbackAnswer(rawInput: string): string {
  const suggestion = closestNameSuggestion(rawInput);
  if (suggestion) {
    return `Did you mean "${suggestion}"? Try asking about it directly, or ask about skills, experience, education, or contact info.`;
  }
  return `Not sure about that one — try asking about skills (${flatSkills
    .slice(0, 3)
    .map((s) => s.name)
    .join(', ')}), a project (${projects
    .slice(0, 2)
    .map((p) => p.title.split(' - ')[0])
    .join(', ')}), experience, education, or contact info.`;
}

// ---------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------
export function getReply(input: string): string {
  const tokens = tokenize(input);
  const normalizedText = normalize(input);

  let bestEntry: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = scoreEntry(tokens, normalizedText, entry.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // require a minimum score so a single weak fuzzy hit doesn't produce a
  // confident-sounding but wrong answer
  if (bestEntry && bestScore >= 0.75) {
    return bestEntry.answer;
  }

  return fallbackAnswer(input);
}