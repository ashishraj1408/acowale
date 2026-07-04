interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-600">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </section>
  );
}
