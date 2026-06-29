import { Code2, Layers, Link2 } from 'lucide-react';

interface ModalActivityBarProps {
  activeTab: string;
  onTabChange: (tab: 'readme' | 'stack' | 'links') => void;
}

const activityIcons = [
  { icon: Code2, tab: 'readme' as const },
  { icon: Layers, tab: 'stack' as const },
  { icon: Link2, tab: 'links' as const },
];

export function ModalActivityBar({ activeTab, onTabChange }: ModalActivityBarProps) {
  return (
    <div
      className="flex flex-col items-center gap-5 py-4 px-2 flex-shrink-0"
      style={{
        background: '#333333',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        width: 48,
      }}
    >
      {activityIcons.map(({ icon: Icon, tab }) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="p-1.5 rounded transition-colors"
          style={{
            color: activeTab === tab ? '#cccccc' : 'rgba(204,204,204,0.4)',
            borderLeft: activeTab === tab ? '2px solid #cccccc' : '2px solid transparent',
          }}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}
