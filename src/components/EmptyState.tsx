import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <FolderOpen size={48} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" className="btn btn-primary" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  );
}