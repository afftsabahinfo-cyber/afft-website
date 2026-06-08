type SectionTitleProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

export function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-afft-orange">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-semibold text-afft-ink md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-afft-ink/70 md:text-lg">{text}</p>}
    </div>
  );
}
