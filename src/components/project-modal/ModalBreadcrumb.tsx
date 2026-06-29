import { Terminal } from 'lucide-react';

interface ModalBreadcrumbProps {
  typedPath: string;
}

export function ModalBreadcrumb({ typedPath }: ModalBreadcrumbProps) {
  return (
    <div
      className="flex items-center gap-1 px-4 py-1.5 text-[10px] flex-shrink-0"
      style={{
        background: '#1e1e1e',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        color: 'rgba(204,204,204,0.35)',
      }}
    >
      <Terminal size={10} />
      <span className="ml-1" style={{ color: '#9cdcfe' }}>
        {typedPath}
      </span>
      <span className="animate-pulse">{'\u258B'}</span>
    </div>
  );
}
