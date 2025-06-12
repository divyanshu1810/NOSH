interface StatCardProps {
  number: number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="stat">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}