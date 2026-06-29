import type { LucideIcon } from 'lucide-react';

interface ModalStatusBarProps {
  status: string;
  StatusIcon: LucideIcon;
  activeTab: string;
}

const tabLanguages: Record<string, string> = {
  readme: 'Markdown',
  stack: 'JSON',
  links: 'Shell Script',
};

export function ModalStatusBar({ status, StatusIcon, activeTab }: ModalStatusBarProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-1 flex-shrink-0 text-[10px]"
      style={{
        background: '#0b1120',
        borderTop: '1px solid rgba(148,163,184,0.4)',
        color: 'rgba(249,250,251,0.9)',
      }}
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <StatusIcon size={10} />
          {status}
        </span>
        <span>{'\u2386'} main</span>
      </div>
      <div className="flex items-center gap-4">
        <span>{tabLanguages[activeTab] ?? activeTab}</span>
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
