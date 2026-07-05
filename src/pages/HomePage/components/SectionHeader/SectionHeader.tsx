import './section-header.css';

type SectionMoreLinkProps = {
  href: string;
  label?: string;
  variant?: 'inline' | 'footer';
  className?: string;
};

export function SectionMoreLink({
  href,
  label = 'more&thinsp;→',
  variant = 'inline',
  className,
}: SectionMoreLinkProps) {
  return (
    <a
      href={href}
      className={[
        'section-header__more',
        `section-header__more--${variant}`,
        className,
      ].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}

type SectionHeaderProps = {
  title: string;
  moreHref?: string;
  moreLabel?: string;
  hideMore?: boolean;
};

export function SectionHeader({
  title,
  moreHref = '#',
  moreLabel,
  hideMore = false,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {!hideMore && (
        <SectionMoreLink href={moreHref} label={moreLabel} variant="inline" />
      )}
    </div>
  );
}
