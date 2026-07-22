/**
 * chatBot.ts
 * Knowledge base + reply engine for the About-page quick chat.
 * Auto-builds most of its knowledge from portfolioData, so adding a new
 * project/skill/job automatically makes the bot able to talk about it —
 * no need to hand-write a new Q&A entry for everything.
 *
 * Matching is keyword + fuzzy based (typo-tolerant via Levenshtein distance
 * and IDF-weighted scoring) — not a true LLM, but handles a wide range of
 * phrasing and small misspellings without collapsing into false positives.
 */
import { portfolioData } from '../data';

export type ChatRole = 'bot' | 'user';
export type Message = { role: ChatRole; text: string };

type KBEntry = {
  keywords: string[]; // single words matched fuzzily as tokens, or phrases (contain a space) matched as substrings
  answer: string;
  label?: string; // used for "did you mean" suggestions and follow-up context
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
  'that', 'this', 'it', 'there', 'also', 'any', 'have', 'has', 'can',
]);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s.]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Very light stemming so "skills"/"skill", "projects"/"project" etc. don't
// need separate keyword entries. Deliberately conservative — only strips a
// trailing 's' when it looks like a plural, not e.g. "js" or "css".
function stem(word: string): string {
  if (word.length > 3 && word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.length > 4 && word.endsWith('es') && !word.endsWith('ses')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

function tokenize(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean).map(stem);
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

// True if `token` is close enough to `keyword` to count as the same word.
// Substring containment now requires a real length margin (min 4 chars,
// and the shorter string must be at least half the longer one) so short
// keywords like "css"/"aws" stop false-matching inside unrelated tokens.
function isCloseMatch(token: string, keyword: string): boolean {
  if (token === keyword) return true;

  if (token.length >= 4 && keyword.length >= 4) {
    const [shorter, longer] = token.length <= keyword.length ? [token, keyword] : [keyword, token];
    if (longer.includes(shorter) && shorter.length / longer.length >= 0.5) return true;
  }

  const maxLen = Math.max(token.length, keyword.length);
  if (maxLen < 5) return false;
  const allowedDistance = maxLen <= 6 ? 1 : 2;
  return levenshtein(token, keyword) <= allowedDistance;
}

// ---------------------------------------------------------------------
// Dynamic KB — built from real portfolio data
// ---------------------------------------------------------------------

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
    keywords: dedupe(['role', 'job', 'work as']),
    answer: personal.bio,
  },
  {
    keywords: dedupe(['skill', 'tech', 'stack', 'tool', 'language', 'framework']),
    label: 'skills-overview',
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
    keywords: dedupe(['project', 'built', 'made', 'portfolio work']),
    label: 'projects-overview',
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
    keywords: dedupe(['experience', 'year', 'senior', 'junior', 'internship', 'intern']),
    label: 'experience-overview',
    answer: `Currently ${portfolioData.experience[0].position} at ${portfolioData.experience[0].company}. Ask about a specific company for details.`,
  },
  {
    keywords: dedupe(['education', 'degree', 'college', 'study', 'university']),
    answer: `${portfolioData.education[0].degree} at ${portfolioData.education[0].institution}.`,
  },
  {
    keywords: dedupe([
      'certification', 'certificate', 'achievement', 'hackathon',
    ]),
    answer: `${certifications.length}+ certifications and hackathons, including AWS, Azure, Oracle Cloud, and several national-level hackathons.`,
  },
  {
    keywords: dedupe(['thanks', 'thank', 'cool', 'nice', 'great', 'awesome']),
    answer: 'Glad that helped! Ask me anything else.',
  },
  {
    keywords: dedupe(['fun', 'fact', 'hobby']),
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

// ---------------------------------------------------------------------
// IDF weighting — keywords that appear in many entries (e.g. a project's
// tech stack word that's shared by ten other projects) are worth less
// than keywords that uniquely identify one entry. This is the single
// biggest accuracy fix: previously "react" or "python" pulled weight
// toward whichever entry happened to be scored first, since every
// occurrence counted the same regardless of how common the word was.
// ---------------------------------------------------------------------
const keywordDocFreq = new Map<string, number>();
for (const entry of knowledgeBase) {
  for (const kw of entry.keywords) {
    if (kw.includes(' ')) continue; // phrases weighted separately below
    keywordDocFreq.set(kw, (keywordDocFreq.get(kw) ?? 0) + 1);
  }
}
const TOTAL_ENTRIES = knowledgeBase.length;
function idfWeight(kw: string): number {
  const df = keywordDocFreq.get(kw) ?? 1;
  // +1 smoothing, floor at 0.35 so even very common words contribute a little
  return Math.max(0.35, Math.log((TOTAL_ENTRIES + 1) / (df + 1)) + 0.5);
}

function scoreEntry(tokens: string[], normalizedText: string, keywords: string[]): number {
  let score = 0;
  for (const kw of keywords) {
    if (kw.includes(' ')) {
      if (normalizedText.includes(kw)) {
        score += kw.split(' ').length * 2;
      }
      continue;
    }
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
    const weight = idfWeight(kw);
    if (exactHit) {
      score += weight * (1 + Math.min(kw.length / 4, 2));
    } else if (fuzzyHit) {
      score += weight * (0.6 + Math.min(kw.length / 5, 1.2));
    }
  }
  return score;
}

// ---------------------------------------------------------------------
// "Did you mean" fallback
// ---------------------------------------------------------------------
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
const MIN_SCORE = 1.1;

/**
 * `history` is optional and backward compatible — pass the running
 * conversation so far to let short follow-ups ("what about at Google?",
 * "any others?") inherit context from the previous bot answer instead of
 * being scored in a vacuum.
 */
export function getReply(input: string, history?: Message[]): string {
  let effectiveInput = input;

  // Lightweight follow-up handling: if this message is short (few real
  // tokens) and the previous turn matched a labeled entry, prepend that
  // label so pronoun-y follow-ups still carry the topic forward.
  const rawTokenCount = tokenize(input).filter((t) => !STOPWORDS.has(t)).length;
  if (history && history.length > 0 && rawTokenCount <= 2) {
    const lastBotText = [...history].reverse().find((m) => m.role === 'bot')?.text;
    if (lastBotText) {
      // Match against the actual answer text an entry would have produced
      // (exact match, or a prefix match for multi-intent combined answers)
      // rather than searching for the label inside the free-form text —
      // a project's own title is never mentioned in its own answer, so a
      // substring-of-label search silently latches onto whichever unrelated
      // entry's label happens to appear (e.g. a shared tech keyword).
      const priorMatch = knowledgeBase.find(
        (e) => e.answer === lastBotText || lastBotText.startsWith(`${e.answer}\n\n`),
      );
      if (priorMatch?.label) {
        effectiveInput = `${priorMatch.label} ${input}`;
      }
    }
  }

  const tokens = tokenize(effectiveInput);
  const normalizedText = normalize(effectiveInput);

  const scored = knowledgeBase
    .map((entry) => ({ entry, score: scoreEntry(tokens, normalizedText, entry.keywords) }))
    .filter((s) => s.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return fallbackAnswer(input);
  }

  // Multi-intent: if a second, clearly distinct entry scores close enough
  // to the top one, the question likely touches two topics ("react and
  // security projects?") — combine both instead of silently dropping one.
  const top = scored[0];
  const second = scored[1];
  if (second && second.score >= top.score * 0.75 && second.entry.answer !== top.entry.answer) {
    return `${top.entry.answer}\n\n${second.entry.answer}`;
  }

  return top.entry.answer;
}