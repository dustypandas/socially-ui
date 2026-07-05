import IconContact from '../../../../assets/icon-email-outline.svg?react';
import type { CommunityOrganizer } from '../../../../data/dummyData';
import { nameAndOthersLabel } from '../../helpers';
import './community-organizers.css';

type CommunityOrganizersProps = {
  organizers: CommunityOrganizer[];
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
