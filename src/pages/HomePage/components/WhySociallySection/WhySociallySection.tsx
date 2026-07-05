// import { SectionHeader } from '../../../../components/SectionHeader/SectionHeader';
import './why-socially-section.css';

const COLUMNS = [
  {
    title: 'Find your people <span class="text--full-color">👫</span>',
    text: [
      'From improv-theatre to drone-racing, poetry recitals to punk-rock jams...',
      'Somewhere out there is a tribe that shares our passions and curiosity, or maybe a limerence we\'re yet to discover.',
      'Socially is a place for connecting through meaningful common interests, with other international residents living in Madrid. <span class="text--full-color">🎸</span>',
    ],
  },
  {
    title: 'By Expats, For Expats <span class="text--full-color">🌍</span>',
    text: [
      'What does it mean to be a resident in a foreign city, to build a new life from a fresh, blank canvas?',
      'How do we find the people who can walk and dance alongside us, as we navigate the wild, winding, sometimes unexpected turns of this new, unfamiliar journey?',
      'Come join us in our little experiment, made by fellow expats living in Madrid - to help build the kind of community we\'d love to be a part of, in our new home. <span class="text--full-color">🦖</span>',
    ],
  },
  {
    title: 'Free, Forever <span class="text--full-color">🎉</span>',
    text: [
      'Great communities take effort and energy, and the organizers are heroes, who help make this city feel just a little warmer, a little more enjoyable and fun, for all of us!',
      'So Socially will always be FREE for creators of our events and communities.',
      'Instead of being "customers" - we\'re all in this together. Come be a comrade, come be a friend! <span class="text--full-color">🍔</span>',
    ],
  },
] as const;

export function WhySociallySection() {
  return (
    <section className="why-socially-section">
      <div className="width-container">
        <div className="page__divider" />
        {/* <SectionHeader title="Why Socially" hideMore /> */}
        <div className="why-socially-section__grid">
          {COLUMNS.map(col => (
            <div key={col.title} className="why-socially-section__column">
              <h2 className="why-socially-section__column-title" dangerouslySetInnerHTML={{ __html: col.title }} />
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
