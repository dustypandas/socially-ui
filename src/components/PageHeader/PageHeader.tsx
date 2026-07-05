import './page-header.css';

type PageHeaderProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
};

export function PageHeader({
  title,
  backHref,
  backLabel = '←&thinsp;Back',
}: PageHeaderProps) {
  return (
    <div className="page-header">
      {backHref && (
        <a href={backHref} className="page-header__back" dangerouslySetInnerHTML={{ __html: backLabel }} />
      )}
      <h1 className="page-header__title">{title}</h1>
    </div>
  );
}
