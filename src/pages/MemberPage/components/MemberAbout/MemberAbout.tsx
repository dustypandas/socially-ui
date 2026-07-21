import { SectionTitle } from '@src/components/SectionTitle/SectionTitle';
import type { MemberAbout as MemberAboutData } from '@src/data';
import './member-about.css';

type MemberAboutProps = {
  about: MemberAboutData;
};

export function MemberAbout({ about }: MemberAboutProps) {
  const entries = Object.entries(about);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="member-about">
      <SectionTitle title="About" moreHref="#" />
      <dl className="member-about__list">
        {entries.map(([key, value]) => (
          <div key={key} className="member-about__item">
            <dt className="member-about__key">{key}</dt>
            <dd className="member-about__value">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
