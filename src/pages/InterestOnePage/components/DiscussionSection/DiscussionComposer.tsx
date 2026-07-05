import { useState } from 'react';
import './discussion-composer.css';

type DiscussionComposerProps = {
  placeholder: string;
  submitLabel: string;
  onSubmit: (body: string) => void;
};

export function DiscussionComposer({
  placeholder,
  submitLabel,
  onSubmit,
}: DiscussionComposerProps) {
  const [body, setBody] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const trimmedBody = body.trim();
  const isSubmitDisabled = trimmedBody.length === 0;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    onSubmit(trimmedBody);
    setBody('');
  };

  return (
    <div className="discussion-composer">
      <div
        className={[
          'discussion-composer__field',
          isFocused && 'discussion-composer__field--expanded',
        ].filter(Boolean).join(' ')}
      >
        <textarea
          className="discussion-composer__input"
          placeholder={placeholder}
          value={body}
          rows={isFocused ? 3 : 1}
          onChange={event => setBody(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={placeholder}
        />
        <button
          type="button"
          className="discussion-composer__submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
