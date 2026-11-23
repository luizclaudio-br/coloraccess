import { CheckCircle2, XCircle } from 'lucide-react';

interface ContrastBadgeProps {
  label: string;
  minRatio: string;
  passed: boolean;
}

export function ContrastBadge({ label, minRatio, passed }: ContrastBadgeProps) {
  return (
    <div className={`contrast-badge ${passed ? 'badge-pass' : 'badge-fail'}`}>
      <div className="badge-header">
        {passed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
        <span>{label}</span>
      </div>
      <div className="badge-footer">
        <small> {minRatio}</small>
        <strong>{passed ? 'Aprovado' : 'Reprovado'}</strong>
      </div>
    </div>
  );
}