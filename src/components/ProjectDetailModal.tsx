import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data';
import {
  ModalTitleBar,
  ModalActivityBar,
  ModalTabBar,
  ModalBreadcrumb,
  ModalStatusBar,
  ReadmeTab,
  StackTab,
  LinksTab,
  statusConfig,
} from './project-modal';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'stack' | 'links'>('readme');
  const [typedPath, setTypedPath] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    setActiveTab('readme');
    if (!project) return;
    const path = `~/projects/${project.id}/`;
    setTypedPath('');
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTypedPath(path.slice(0, i));
      if (i >= path.length) clearInterval(t);
    }, 35);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const html = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    document.body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [project]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight) return;
    e.preventDefault();
    el.scrollTop += e.deltaY;
  };

  if (!project) return null;

  const status = statusConfig[project.status] ?? statusConfig.completed;
  const StatusIcon = status.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          onWheel={handleWheel}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl overflow-hidden"
          style={{
            background: '#1e1e1e',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05)',
            fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
          }}
        >
          <ModalTitleBar
            project={project}
            onClose={onClose}
            statusDot={status.dot}
            statusColor={status.color}
            statusLabel={status.label}
          />

          <div className="flex flex-1 overflow-hidden">
            <ModalActivityBar activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-hidden">
              <ModalTabBar activeTab={activeTab} onTabChange={setActiveTab} />
              <ModalBreadcrumb typedPath={typedPath} />

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto project-modal-scroll"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.1) transparent',
                }}
              >
                {activeTab === 'readme' && <ReadmeTab project={project} />}
                {activeTab === 'stack' && <StackTab project={project} />}
                {activeTab === 'links' && <LinksTab project={project} />}
              </div>
            </div>
          </div>

          <ModalStatusBar
            status={project.status}
            StatusIcon={StatusIcon}
            activeTab={activeTab}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
