import { CheckCircle2, Clock, Lightbulb } from 'lucide-react';

export const statusConfig = {
  completed: {
    label: 'completed',
    color: '#ff0000',
    icon: CheckCircle2,
    dot: 'bg-red-400',
  },
  'in-progress': {
    label: 'in-progress',
    color: '#f6efe6',
    icon: Clock,
    dot: 'bg-red-400',
  },
  planned: {
    label: 'planned',
    color: '#ff0000',
    icon: Lightbulb,
    dot: 'bg-white',
  },
};

export const tabs = [
  { id: 'readme', label: 'README.md', icon: '\u{1F4C4}' },
  { id: 'stack', label: 'package.json', icon: '\u{1F4E6}' },
  { id: 'links', label: 'links.sh', icon: '\u{1F517}' },
];

export const syntaxComment = 'rgba(106,153,85,0.9)';
export const syntaxKey = '#9cdcfe';
export const syntaxStr = '#ce9178';
export const syntaxPunct = '#d4d4d4';
export const syntaxKeyword = '#c586c0';
export const syntaxNum = '#b5cea8';
