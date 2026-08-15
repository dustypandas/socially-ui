import type { MouseEvent } from 'react';
import './section-title.css';

type SectionMoreLinkProps = {
  href: string;
  label?: string;
  variant?: 'inline' | 'footer';
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function SectionMoreLink({
  href,
  label = 'more&thinsp;→',
  variant = 'inline',
  className,
  onClick,
}: SectionMoreLinkProps) {
  return (
    <a
      href={href}
      className={[
        'section-title__more',
        `section-title__more--${variant}`,
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}

type SectionTitleProps = {
  title: string;
  moreHref?: string;
  moreLabel?: string;
  hideMore?: boolean;
  onMoreClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function SectionTitle({
  title,
  moreHref = '#',
  moreLabel,
  hideMore = false,
  onMoreClick,
}: SectionTitleProps) {
  return (
    <div className="section-title">
      <h2 className="section-title__title">{title}</h2>
      {!hideMore && (
        <SectionMoreLink
          href={moreHref}
          label={moreLabel}
          variant="inline"
          onClick={onMoreClick}
        />
      )}
    </div>
  );
}
