import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import './community-section-about.css';

type CommunitySectionAboutProps = {
  detailsHtml: string;
};

export function CommunitySectionAbout({ detailsHtml }: CommunitySectionAboutProps) {
  return (
    <section className="community-section-about">
      <SectionTitle title="Who We Are" hideMore />
      <div
        className="community-section-about__content"
        dangerouslySetInnerHTML={{ __html: detailsHtml }}
      />
    </section>
  );
}
