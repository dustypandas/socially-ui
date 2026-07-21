import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import './community-about.css';

type CommunityAboutProps = {
  detailsHtml: string;
};

export function CommunityAbout({ detailsHtml }: CommunityAboutProps) {
  return (
    <section className="community-about">
      <SectionTitle title="Who We Are" hideMore />
      <div
        className="community-about__content"
        dangerouslySetInnerHTML={{ __html: detailsHtml }}
      />
    </section>
  );
}
