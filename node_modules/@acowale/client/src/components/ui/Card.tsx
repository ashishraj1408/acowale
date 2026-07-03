interface CardProps {
  title: string;
  value: string;
  description: string;
}

export function Card({ title, value, description }: CardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/30">
      <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{title}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{value}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}
