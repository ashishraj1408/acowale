import type { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

export function StatusCard({ title, value, description, icon }: StatusCardProps) {
  return (
    <section className="card">
      <div className="card-icon">{icon}</div>
      <div>
        <p className="eyebrow">{title}</p>
        <h3>{value}</h3>
        <p className="muted">{description}</p>
      </div>
    </section>
  );
}
