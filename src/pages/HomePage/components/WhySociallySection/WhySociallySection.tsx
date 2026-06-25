// import { SectionHeader } from '../../../../components/SectionHeader/SectionHeader';
import './why-socially-section.css';

const COLUMNS = [
  {
    title: 'Find your people <span class="why-socially-section__full-color">👫</span>',
    text: [
      'From dress-up running to drone-racing, poetry recitals to punk-rock jams...',
      'Somewhere out there is an interest we\'re yet to discover, and someone else looking to share the same activity, just like us.',
      'Socially is a place for finding and connecting through unexpected interests, with other international residents living in Madrid. <span class="why-socially-section__full-color">🎸</span>',
    ],
  },
  {
    title: 'By Expats, For Expats <span class="why-socially-section__full-color">🌍</span>',
    text: [
      'What does it mean to be a resident in a foreign city?',
      'How do we find the people who can walk and explore and dance alongside us, as we navigate the winding, fun, and sometimes unexpected turns of a new, unfamiliar world?',
      'Come Join us in our little experiment, made by fellow expats living in Madrid - to help us build the kind of community we want to be a part of, in our new home. <span class="why-socially-section__full-color">🦖</span>',
    ],
  },
  {
    title: 'Free, Forever <span class="why-socially-section__full-color">🎉</span>',
    text: [
      'Great communities take effort and energy, and the organizers are heroes, who help make this city a little more enjoyable to live in, for all of us!',
      'So Socially will always be free for creators of events and communities.',
      'Instead of being "customers", we\'re all in this together. Come be our comrade, become a friend! <span class="why-socially-section__full-color">🍔</span>',
    ],
  },
] as const;

export function WhySociallySection() {
  return (
    <section className="why-socially-section">
      <div className="width-container">
        <div className="why-socially-section__section-divider" />
        {/* <SectionHeader title="Why Socially" hideMore /> */}
        <div className="why-socially-section__grid">
          {COLUMNS.map(col => (
            <div key={col.title} className="why-socially-section__column">
              <h3 className="why-socially-section__column-title section-header__title" dangerouslySetInnerHTML={{ __html: col.title }} />
              <div className="why-socially-section__column-text">
                {col.text.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
