import { motion } from 'framer-motion';
import type { Project } from '../../data';
import { LineNumbersSidebar } from './LineNumbers';
import { syntaxComment, syntaxKey, syntaxNum, syntaxPunct, syntaxStr } from './constants';

interface StackTabProps {
  project: Project;
}

export function StackTab({ project }: StackTabProps) {
  return (
    <div className="flex">
      <LineNumbersSidebar count={project.technologies.length + 8} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 px-4 py-5 text-sm"
        style={{ lineHeight: '1.75rem' }}
      >
        <div style={{ color: syntaxPunct }}>{'{'}</div>

        <div className="ml-5">
          <span style={{ color: syntaxKey }}>&quot;name&quot;</span>
          <span style={{ color: syntaxPunct }}>: </span>
          <span style={{ color: syntaxStr }}>&quot;{project.id}&quot;</span>
          <span style={{ color: syntaxPunct }}>,</span>
        </div>

        <div className="ml-5">
          <span style={{ color: syntaxKey }}>&quot;status&quot;</span>
          <span style={{ color: syntaxPunct }}>: </span>
          <span style={{ color: syntaxPunct }}>&quot;{project.status}&quot;</span>
          <span style={{ color: syntaxPunct }}>,</span>
        </div>

        <div className="ml-5">
          <span style={{ color: syntaxKey }}>&quot;dependencies&quot;</span>
          <span style={{ color: syntaxPunct }}>: {'{'}</span>
        </div>

        {project.technologies.map((tech, i) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            className="ml-10 flex items-center gap-2"
          >
            <span style={{ color: syntaxKey }}>&quot;{tech}&quot;</span>
            <span style={{ color: syntaxPunct }}>: </span>
            <span style={{ color: syntaxStr }}>&quot;latest&quot;</span>
            {i < project.technologies.length - 1 && (
              <span style={{ color: syntaxPunct }}>,</span>
            )}
          </motion.div>
        ))}

        <div className="ml-5" style={{ color: syntaxPunct }}>
          {'}'}
        </div>

        {project.priority && (
          <div className="ml-5">
            <span style={{ color: syntaxKey }}>&quot;priority&quot;</span>
            <span style={{ color: syntaxPunct }}>: </span>
            <span style={{ color: syntaxNum }}>&quot;{project.priority}&quot;</span>
          </div>
        )}

        <div style={{ color: syntaxPunct }}>{'}'}</div>

        <div className="mt-4 text-xs" style={{ color: syntaxComment }}>
          {`// ${project.technologies.length} dependencies \u00B7 ${project.status}`}
        </div>
      </motion.div>
    </div>
  );
}
