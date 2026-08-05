import { useEffect, useState } from 'react';
import type { CommunityEntryConditions } from '@src/common-libs/types';
import { Overlay } from '@src/components';
import { getSessionUserQuestionResponses, joinCommunity } from '@src/data';
import './community-join-overlay.css';

type FetchUserQuestionResponsesState = 'idle' | 'loading' | 'complete';
type JoinStatus = 'idle' | 'loading';

type CommunityJoinOverlayProps = {
  communityId: string;
  entryConditions?: CommunityEntryConditions;
  isOpen: boolean;
  onClose: () => void;
};

export function CommunityJoinOverlay({
  communityId,
  entryConditions,
  isOpen,
  onClose,
}: CommunityJoinOverlayProps) {
  const questions = entryConditions?.questions ?? [];
  const [fetchUserQuestionResponsesState, setFetchUserQuestionResponsesState] =
    useState<FetchUserQuestionResponsesState>('idle');
  const [joinStatus, setJoinStatus] = useState<JoinStatus>('idle');
  const [profileResponses, setProfileResponses] = useState<Record<string, string>>({});
  const [editingQuestionIds, setEditingQuestionIds] = useState<Set<string>>(() => new Set());
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const isSubmitting = joinStatus === 'loading';
  const isOverlayVisible = isOpen && fetchUserQuestionResponsesState === 'complete';

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setFetchUserQuestionResponsesState('idle');
      setJoinStatus('idle');
      setProfileResponses({});
      setEditingQuestionIds(new Set());
      setAnswers({});
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(() => {
      setFetchUserQuestionResponsesState('loading');

      getSessionUserQuestionResponses()
        .then(responses => {
          if (cancelled) {
            return;
          }

          const profileResponsesById = Object.fromEntries(
            responses.map(response => [response.id, response.response]),
          );
          const initialAnswers = Object.fromEntries(
            responses.map(response => [response.id, response.response]),
          );

          setProfileResponses(profileResponsesById);
          setAnswers(initialAnswers);
          setEditingQuestionIds(new Set());
          setFetchUserQuestionResponsesState('complete');
        })
        .catch(() => {
          if (!cancelled) {
            setFetchUserQuestionResponsesState('idle');
          }
        });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  function isShowingInput(questionId: string): boolean {
    return !profileResponses[questionId] || editingQuestionIds.has(questionId);
  }

  function getResolvedResponse(questionId: string): string {
    if (isShowingInput(questionId)) {
      return (answers[questionId] ?? '').trim();
    }

    return profileResponses[questionId] ?? '';
  }

  const isSubmitDisabled =
    isSubmitting
    || questions.some(
      question => question.isRequired && !getResolvedResponse(question.id),
    );

  const handleEdit = (questionId: string) => {
    setEditingQuestionIds(current => new Set(current).add(questionId));
    setAnswers(current => ({
      ...current,
      [questionId]: profileResponses[questionId] ?? current[questionId] ?? '',
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled) {
      return;
    }

    setJoinStatus('loading');

    try {
      await joinCommunity(
        communityId,
        questions.map(question => ({
          ...question,
          response: getResolvedResponse(question.id),
        })),
      );
      onClose();
    } catch {
      setJoinStatus('idle');
    }
  };

  return (
    <Overlay isOpen={isOverlayVisible} onClose={onClose}>
      <div className="community-join-overlay__header">
        <h2 className="community-join-overlay__title">
          Request to Join
        </h2>
        <button
          type="button"
          className="community-join-overlay__close"
          onClick={onClose}
        >
          <span className="community-join-overlay__close-icon" />
        </button>
      </div>
      <form
        className="community-join-overlay__form"
        onSubmit={handleSubmit}
      >
        {questions.map(question => (
          <div key={question.id} className="community-join-overlay__field">
            <label
              htmlFor={`community-join-${question.id}`}
              className="community-join-overlay__label"
            >
              {question.question}
              {question.isRequired && (
                <span className="community-join-overlay__label-required"> *</span>
              )}
            </label>
            {isShowingInput(question.id) ? (
              <input
                id={`community-join-${question.id}`}
                name={question.id}
                type="text"
                className="community-join-overlay__input"
                value={answers[question.id] ?? ''}
                onChange={event => setAnswers(current => ({
                  ...current,
                  [question.id]: event.target.value,
                }))}
                disabled={isSubmitting}
                required={question.isRequired}
              />
            ) : (
              <div className="community-join-overlay__response">
                <span className="community-join-overlay__response-text">
                  {profileResponses[question.id]}
                </span>
                <button
                  type="button"
                  className="community-join-overlay__edit"
                  onClick={() => handleEdit(question.id)}
                  disabled={isSubmitting}
                >
                  edit
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className={[
            'community-join-overlay__submit',
            isSubmitting && 'community-join-overlay__submit--loading',
          ].filter(Boolean).join(' ')}
          disabled={isSubmitDisabled}
        >
          Request to Join
        </button>
      </form>
    </Overlay>
  );
}
