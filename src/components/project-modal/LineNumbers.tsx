interface LineNumbersProps {
  count: number;
}

export function LineNumbers({ count }: LineNumbersProps) {
  return (
    <div
      className="flex-shrink-0 px-3 py-5 text-right select-none"
      style={{
        color: 'rgba(204,204,204,0.2)',
        fontSize: 12,
        lineHeight: '1.75rem',
        minWidth: 44,
        background: '#1e1e1e',
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}

interface LineNumbersSidebarProps {
  count: number;
}

export function LineNumbersSidebar({ count }: LineNumbersSidebarProps) {
  return (
    <div
      className="flex-shrink-0 px-3 py-5 text-right select-none"
      style={{
        color: 'rgba(204,204,204,0.2)',
        fontSize: 12,
        lineHeight: '1.75rem',
        minWidth: 44,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  );
}
