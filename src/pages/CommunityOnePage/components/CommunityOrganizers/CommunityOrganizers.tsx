import IconContact from '@src/assets/icon-email-outline.svg?react';
import type { MemberAvatar } from '@src/data';
import { nameAndOthersLabel } from '@src/pages/CommunityOnePage/helpers';
import './community-organizers.css';

type CommunityOrganizersProps = {
  organizers: MemberAvatar[];
};

export function CommunityOrganizers({ organizers }: CommunityOrganizersProps) {
  const primaryOrganizer = organizers[0];

  return (
    <section className="community-organizers">
      <h3 className="community-organizers__title">Organised by</h3>
      <div className="community-organizers__content">
        {primaryOrganizer && (
          <img
            className="community-organizers__avatar"
            src={primaryOrganizer.image}
            alt=""
          />
        )}
        <div className="community-organizers__details">
          <div className="community-organizers__label">
            {nameAndOthersLabel(organizers)}
          </div>
          <a href="#" className="community-organizers__contact">
            <IconContact className="community-organizers__contact-icon" />
            <span>contact</span>
          </a>
        </div>
      </div>
    </section>
  );
}
