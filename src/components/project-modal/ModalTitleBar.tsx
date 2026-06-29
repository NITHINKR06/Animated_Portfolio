import { X } from 'lucide-react';
import type { Project } from '../../data';

interface ModalTitleBarProps {
  project: Project;
  onClose: () => void;
  statusDot: string;
  statusColor: string;
  statusLabel: string;
}

export function ModalTitleBar({
  project,
  onClose,
  statusDot,
  statusColor,
  statusLabel,
}: ModalTitleBarProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 flex-shrink-0 select-none"
      style={{
        background: '#323233',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-1.5">
        <button
          onClick={onClose}
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center group"
        >
          <X size={6} className="opacity-0 group-hover:opacity-100 text-[#4a0000]" />
        </button>
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="flex-1 text-center">
        <span className="text-xs" style={{ color: 'rgba(204,204,204,0.5)' }}>
          {project.id} — VS Code
        </span>
      </div>

      <div
        className="flex items-center gap-1.5 px-2 py-0.5 rounded"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
        <span className="text-[10px]" style={{ color: statusColor }}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
