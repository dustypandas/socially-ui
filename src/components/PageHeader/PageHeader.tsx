import './page-header.css';

type PageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
};

export function PageHeader({
  title,
  backHref,
  backLabel = '← Interests',
}: PageHeaderProps) {
  return (
    <div className="page-header">
      {backHref && (
        <a href={backHref} className="page-header__back">
          {backLabel}
        </a>
      )}
      <h1 className="global-heading-text page-header__title">{title}</h1>
    </div>
  );
}
