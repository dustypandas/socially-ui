import './page-title.css';

type PageTitleProps = {
  title: string;
  backHref?: string;
  backLabel?: string;
};

export function PageTitle({
  title,
  backHref,
  backLabel = '←&thinsp;Back',
}: PageTitleProps) {
  return (
    <div className="page-title">
      {backHref && (
        <a href={backHref} className="page-title__back" dangerouslySetInnerHTML={{ __html: backLabel }} />
      )}
      <h1 className="page-title__title">{title}</h1>
    </div>
  );
}
