import { useState } from 'react';
import type { RelatedLink } from '../../../../data/dummyData.js';
import { useAppDispatch } from '../../../../store/hooks';
import { addRelatedLink } from '../../../../store/slices/interestsSlice.js';
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
        <h2 className="external-links__title">External Links</h2>
      </div>
      <div className="external-links__content">
        <p className="external-links__description">
          A list of other groups and links (not related to Socially) that could be of interest.
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

        <div className="external-links__input-container">
          <input
            type="url"
            className="external-links__input external-links__input--url"
            placeholder="add new link?"
            value={href}
            onChange={event => setHref(event.target.value)}
            aria-label="Link URL"
          />
          <div className="external-links__input-extra">
            <input
              type="text"
              className="external-links__input"
              placeholder="link name?"
              value={label}
              onChange={event => setLabel(event.target.value)}
              aria-label="Link name"
            />
            <button
              type="button"
              className="global-btn global-btn--purple-white external-links__submit"
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
