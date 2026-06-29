import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../data';
import { LineNumbersSidebar } from './LineNumbers';
import { syntaxComment, syntaxKey, syntaxKeyword, syntaxPunct, syntaxStr } from './constants';

interface LinksTabProps {
  project: Project;
}

export function LinksTab({ project }: LinksTabProps) {
  return (
    <div className="flex">
      <LineNumbersSidebar count={20} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 px-4 py-5 text-sm"
        style={{ lineHeight: '1.75rem' }}
      >
        <div style={{ color: syntaxComment }}>#!/bin/bash</div>
        <div style={{ color: syntaxComment }} className="mb-4">
          {`# Project links for ${project.id}`}
        </div>

        {project.githubUrl ? (
          <>
            <div>
              <span style={{ color: syntaxKeyword }}>echo </span>
              <span style={{ color: syntaxStr }}>&quot;Opening GitHub repository...&quot;</span>
            </div>
            <div className="mb-3">
              <span style={{ color: syntaxKey }}>GITHUB_URL</span>
              <span style={{ color: syntaxPunct }}>=</span>
              <span style={{ color: syntaxStr }}>&quot;{project.githubUrl}&quot;</span>
            </div>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm mb-4 transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cccccc',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.25)';
                (e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.04)';
              }}
            >
              <Github size={16} style={{ color: '#cccccc' }} />
              <span>github.com/{project.githubUrl.split('github.com/')[1]}</span>
              <ExternalLink
                size={12}
                style={{ color: 'rgba(204,204,204,0.4)', marginLeft: 'auto' }}
              />
            </motion.a>
          </>
        ) : (
          <div className="mb-3" style={{ color: syntaxComment }}>
            {`# No GitHub URL configured`}
          </div>
        )}

        {project.liveUrl ? (
          <>
            <div>
              <span style={{ color: syntaxKeyword }}>echo </span>
              <span style={{ color: syntaxStr }}>&quot;Opening live deployment...&quot;</span>
            </div>
            <div className="mb-3">
              <span style={{ color: syntaxKey }}>LIVE_URL</span>
              <span style={{ color: syntaxPunct }}>=</span>
              <span style={{ color: syntaxStr }}>&quot;{project.liveUrl}&quot;</span>
            </div>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: 'rgba(0,122,204,0.08)',
                border: '1px solid rgba(0,122,204,0.25)',
                color: '#9cdcfe',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(0,122,204,0.5)';
                (e.currentTarget as HTMLElement).style.background =
                  'rgba(0,122,204,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(0,122,204,0.25)';
                (e.currentTarget as HTMLElement).style.background =
                  'rgba(0,122,204,0.08)';
              }}
            >
              <ExternalLink size={16} />
              <span>{project.liveUrl}</span>
              <ExternalLink
                size={12}
                style={{ color: 'rgba(156,220,254,0.4)', marginLeft: 'auto' }}
              />
            </motion.a>
          </>
        ) : (
          <div style={{ color: syntaxComment }}>{`# No live deployment URL`}</div>
        )}

        {!project.githubUrl && !project.liveUrl && (
          <div>
            <div style={{ color: syntaxComment }}>
              {`# No external links configured for this project`}
            </div>
            <div className="mt-2" style={{ color: syntaxComment }}>{`# exit 1`}</div>
          </div>
        )}

        <div
          className="mt-8 flex items-center gap-2 text-xs"
          style={{ color: 'rgba(204,204,204,0.3)' }}
        >
          <span style={{ color: '#22c55e' }}>nithin@portfolio</span>
          <span>:</span>
          <span style={{ color: '#9cdcfe' }}>~/{project.id}</span>
          <span>$</span>
          <span className="animate-pulse">{'\u258B'}</span>
        </div>
      </motion.div>
    </div>
  );
}
