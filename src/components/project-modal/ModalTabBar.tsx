import { tabs } from './constants';

interface ModalTabBarProps {
  activeTab: string;
  onTabChange: (tab: 'readme' | 'stack' | 'links') => void;
}

export function ModalTabBar({ activeTab, onTabChange }: ModalTabBarProps) {
  return (
    <div
      className="flex items-center flex-shrink-0 overflow-x-auto"
      style={{ background: '#2d2d2d', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as 'readme' | 'stack' | 'links')}
          className="flex items-center gap-2 px-4 py-2.5 text-xs whitespace-nowrap transition-colors flex-shrink-0 relative"
          style={{
            color: activeTab === tab.id ? '#cccccc' : 'rgba(204,204,204,0.45)',
            background: activeTab === tab.id ? '#1e1e1e' : 'transparent',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            borderTop:
              activeTab === tab.id ? '1px solid #007acc' : '1px solid transparent',
          }}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
