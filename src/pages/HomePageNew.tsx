import {
  EventsSection,
  Header,
  Hero,
  InterestsGrid,
  SectionHeader,
} from '../components';
import './home-page-new.css';

export function HomePageNew() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <main className="home-page__main">
        <section className="home-page__section">
          <div className="width-container">
            <SectionHeader title="Popular Interests" />
            <InterestsGrid />
          </div>
        </section>
        <EventsSection />
      </main>
    </div>
  );
}
