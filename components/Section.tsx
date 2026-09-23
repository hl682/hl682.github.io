export function Section({
  id,
  kicker,
  children,
  short,
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
  short?: boolean;
}) {
  return (
    <section id={id} className={short ? "chapter chapter-short" : "chapter"} data-chapter={id}>
      <p className="kicker ledger">{kicker}</p>
      {children}
    </section>
  );
}
