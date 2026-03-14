import { getStatusConfig } from '../../data/mockData';

export default function StatusBadge({ status, size = 'md', pulse = false }) {
  const cfg = getStatusConfig(status);

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${cfg.bg} ${cfg.text} border ${cfg.border} ${sizes[size]}`}>
      <span className={`rounded-full flex-shrink-0 ${cfg.dot} ${dotSizes[size]} ${pulse && status === 'available' ? 'status-pulse' : ''}`} />
      {cfg.label}
    </span>
  );
}
