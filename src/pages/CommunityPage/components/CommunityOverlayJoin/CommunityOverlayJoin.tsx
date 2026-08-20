import { useEffect, useState } from 'react';
import type { CommunityEntryConditions } from '@src/common-libs/types';
import { Overlay } from '@src/components';
import { getSessionUserQuestionResponses, joinCommunity } from '@src/data';
import './community-overlay-join.css';

type FetchUserQuestionResponsesState = 'idle' | 'loading' | 'complete';
type JoinStatus = 'idle' | 'loading';

type CommunityOverlayJoinProps = {
  communityId: string;
  entryConditions?: CommunityEntryConditions;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onJoinSuccess?: () => void;
};

export function CommunityOverlayJoin({
  communityId,
  entryConditions,
  isOpen,
  title,
  onClose,
  onJoinSuccess,
}: CommunityOverlayJoinProps) {
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

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
      onJoinSuccess?.();
      onClose();
    } catch {
      setJoinStatus('idle');
    }
  };

  return (
    <Overlay isOpen={isOverlayVisible} onClose={onClose} title={title}>
      {/* <div className="community-overlay-join__subtitle">
        Tell us a little more about you, to join this community.
      </div> */}
      <form
        className="community-overlay-join__form"
        onSubmit={handleSubmit}
      >
        {questions.map(question => (
          <div key={question.id} className="community-overlay-join__field">
            <label
              htmlFor={`community-join-${question.id}`}
              className="community-overlay-join__label"
            >
              {question.question}
              {question.isRequired && (
                <span className="community-overlay-join__label-required"> *</span>
              )}
            </label>
            {isShowingInput(question.id) ? (
              <input
                id={`community-join-${question.id}`}
                name={question.id}
                type="text"
                className="community-overlay-join__input"
                value={answers[question.id] ?? ''}
                onChange={event => setAnswers(current => ({
                  ...current,
                  [question.id]: event.target.value,
                }))}
                disabled={isSubmitting}
                required={question.isRequired}
              />
            ) : (
              <div className="community-overlay-join__response">
                <span className="community-overlay-join__response-text">
                  {profileResponses[question.id]}
                </span>
                <button
                  type="button"
                  className="community-overlay-join__edit"
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
            'community-overlay-join__submit',
            isSubmitting && 'community-overlay-join__submit--loading',
          ].filter(Boolean).join(' ')}
          disabled={isSubmitDisabled}
        >
          Request to Join
        </button>
      </form>
    </Overlay>
  );
}
