import { Overlay } from '@src/components';
import './community-join-overlay.css';

type CommunityJoinOverlayProps = {
  communityName: string;
  isOpen: boolean;
  onClose: () => void;
};

export function CommunityJoinOverlay({
  communityName,
  isOpen,
  onClose,
}: CommunityJoinOverlayProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="community-join-overlay__header">
        <h2 className="community-join-overlay__title">
          Join {communityName}
        </h2>
        <button
          type="button"
          className="community-join-overlay__close"
          onClick={onClose}
        >
          <span className="community-join-overlay__close-icon" />
        </button>
      </div>
      <div className="community-join-overlay__body" />
    </Overlay>
  );
}
