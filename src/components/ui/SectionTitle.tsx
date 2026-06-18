type SectionTitleProps = {
  children: React.ReactNode;
};

export function SectionTitle({
  children,
}: SectionTitleProps) {
  return <h2 className="section-title">{children}</h2>;
}