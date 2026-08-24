import { useMemo, useState, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { content as resetPasswordContent, subject as resetPasswordSubject } from './ResetPasswordCode';
import { content as signupVerifyContent, subject as signupVerifySubject } from './SignupVerifyCode';
import './email-preview.css';

type EmailPreviewEntry<P> = {
  id: string;
  label: string;
  subject: (props: P) => string;
  content: (props: P) => ReactNode;
  sampleProps: P;
};

type RegisteredEmailPreview = {
  id: string;
  label: string;
  subjectLine: string;
  markup: ReactNode;
};

function registerEmailPreview<P>(entry: EmailPreviewEntry<P>): RegisteredEmailPreview {
  return {
    id: entry.id,
    label: entry.label,
    subjectLine: entry.subject(entry.sampleProps),
    markup: entry.content(entry.sampleProps),
  };
}

const templates = [
  registerEmailPreview({
    id: 'signup-verify-code',
    label: 'Signup verification code',
    subject: signupVerifySubject,
    content: signupVerifyContent,
    sampleProps: { code: '482913' },
  }),
  registerEmailPreview({
    id: 'reset-password-code',
    label: 'Send reset code',
    subject: resetPasswordSubject,
    content: resetPasswordContent,
    sampleProps: { code: '482913' },
  }),
];

function wrapEmailDocument(markup: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f4f2ee;">
${markup}
</body>
</html>`;
}

export function EmailPreviewPage() {
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const [copyLabel, setCopyLabel] = useState('Copy HTML');

  const selected = templates.find(template => template.id === selectedId) ?? templates[0];
  const srcDoc = useMemo(
    () => wrapEmailDocument(renderToStaticMarkup(selected.markup)),
    [selected],
  );

  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(srcDoc);
    setCopyLabel('Copied');
    window.setTimeout(() => setCopyLabel('Copy HTML'), 1500);
  };

  return (
    <div className="email-preview">
      <a className="email-preview__back" href="#/">
        Back to index
      </a>
      <h1 className="email-preview__title">Email templates</h1>

      <div className="email-preview__list">
        {templates.map(template => (
          <button
            key={template.id}
            type="button"
            className={[
              'email-preview__tab',
              template.id === selected.id && 'email-preview__tab--selected',
            ].filter(Boolean).join(' ')}
            onClick={() => setSelectedId(template.id)}
          >
            {template.label}
          </button>
        ))}
      </div>

      <div className="email-preview__subject">
        <span className="email-preview__subject-label">Subject</span>
        {selected.subjectLine}
      </div>

      <iframe
        className="email-preview__frame"
        srcDoc={srcDoc}
        title={selected.label}
      />

      <button
        type="button"
        className="email-preview__copy"
        onClick={() => void handleCopyHtml()}
      >
        {copyLabel}
      </button>
    </div>
  );
}
