import './section-header.css';

type SectionHeaderProps = {
  title: string;
  moreHref?: string;
  moreLabel?: string;
};

export function SectionHeader({
  title,
  moreHref = '#',
  moreLabel = 'more →',
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      <a href={moreHref} className="section-header__more">
        {moreLabel}
      </a>
    </div>
  );
}
