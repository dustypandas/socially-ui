import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import './community-about.css';

type CommunityAboutProps = {
  detailsHtml: string;
};

export function CommunityAbout({ detailsHtml }: CommunityAboutProps) {
  return (
    <section className="community-about">
      <SectionHeader title="Who We Are" hideMore />
      <div
        className="community-about__content"
        dangerouslySetInnerHTML={{ __html: detailsHtml }}
      />
    </section>
  );
}
