import './section-title.css';

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
        'section-title__more',
        `section-title__more--${variant}`,
        className,
      ].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}

type SectionTitleProps = {
  title: string;
  moreHref?: string;
  moreLabel?: string;
  hideMore?: boolean;
};

export function SectionTitle({
  title,
  moreHref = '#',
  moreLabel,
  hideMore = false,
}: SectionTitleProps) {
  return (
    <div className="section-title">
      <h2 className="section-title__title">{title}</h2>
      {!hideMore && (
        <SectionMoreLink href={moreHref} label={moreLabel} variant="inline" />
      )}
    </div>
  );
}
