export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6 space-y-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </header>
  );
}
