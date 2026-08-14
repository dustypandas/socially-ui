import IconContact from '@src/assets/icon-email-outline.svg?react';
import type { MemberAvatar } from '@src/common-libs/types';
import { nameAndOthersLabel } from '@src/pages/CommunityPage/helpers';
import './community-organisers.css';

type CommunityOrganisersProps = {
  organisers: MemberAvatar[];
};

export function CommunityOrganisers({ organisers }: CommunityOrganisersProps) {
  const primaryOrganiser = organisers[0];

  return (
    <section className="community-organisers">
      <h3 className="community-organisers__title">Organised by</h3>
      <div className="community-organisers__content">
        {primaryOrganiser && (
          <img
            className="community-organisers__avatar"
            src={primaryOrganiser.image}
            alt=""
          />
        )}
        <div className="community-organisers__details">
          <div className="community-organisers__label">
            {nameAndOthersLabel(organisers)}
          </div>
          <a href={organisers[0].href} className="community-organisers__contact">
            <IconContact className="community-organisers__contact-icon" />
            <span>contact</span>
          </a>
        </div>
      </div>
    </section>
  );
}
