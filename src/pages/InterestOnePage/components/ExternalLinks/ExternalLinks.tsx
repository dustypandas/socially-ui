import { useState } from 'react';
import type { RelatedLink } from '@src/data/dummyData.js';
import { useAppDispatch } from '@src/store/hooks';
import { addRelatedLink } from '@src/store/slices/interestsSlice.js';
import './external-links.css';

type ExternalLinksProps = {
  interestId: string;
  links: RelatedLink[];
};

function normalizeHref(href: string): string {
  const trimmed = href.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function ExternalLinks({ interestId, links }: ExternalLinksProps) {
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState('');
  const [href, setHref] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const trimmedLabel = label.trim();
  const trimmedHref = href.trim();
  const isSubmitDisabled = trimmedLabel.length === 0 || trimmedHref.length === 0;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    dispatch(addRelatedLink({
      interestId,
      label: trimmedLabel,
      href: normalizeHref(trimmedHref),
    }));
    setLabel('');
    setHref('');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <section className="external-links">
      <div className="external-links__header">
        <h3 className="external-links__title">External Links</h3>
      </div>
      <div className="external-links__content">
        <p className="external-links__description">
          A few other groups and links (not related to Socially) that could be of interest.
        </p>

        {links.length > 0 && (
          <ul className="external-links__list">
            {links.map(link => (
              <li key={`${link.label}-${link.href}`} className="external-links__list-item">
                <a
                  className="external-links__link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div
          className="external-links__input-container"
          onFocus={() => setIsInputFocused(true)}
          onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsInputFocused(false);
            }
          }}
        >
          <input
            type="text"
            className="external-links__input external-links__input--name"
            placeholder={isInputFocused ? 'link name...' : 'suggest a new link...'}
            value={label}
            onChange={event => setLabel(event.target.value)}
          />
          <div className="external-links__input-extra">
            <input
              type="url"
              className="external-links__input external-links__input--url"
              placeholder="link url..."
              value={href}
              onChange={event => setHref(event.target.value)}
            />
            <button
              type="button"
              className="external-links__submit"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
            >
              Add Link
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
