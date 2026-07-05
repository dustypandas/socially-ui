import { SectionHeader } from '../SectionHeader/SectionHeader';
import './about-section.css';

export function AboutSection() {
  return (
    <section className="about-section">
      <div className="width-container">
        <div className="page__divider"></div>
        <SectionHeader title="Who We Are" hideMore />

        <div className="about-section__content">
          <div className="about-section__text">
            <p>
              This project was made by a small group of friends, all international residents, dancers, board gamers, wine-drinkers, living in Madrid.
            </p>
            <p>
              We wanted to play, and to experiment
            </p>
            <p>
              ...through engaging events, mindful sentiments
            </p>
            <p>
              ...to connect and to build
            </p>
            <p>
              ...a community colourful and fulfilled
            </p>
            <p>
              ...for people just like ourselves, gleeful elves.
            </p>
            <p>
              <br />
              If you too, empathize,<br/>
              come <a href="#connect-with-us">join us</a>, metamorphosize. 🌈
            </p>
          </div>
          <img
            src="../../../../assets/about-us.jpg"
            alt="Socially Madrid community"
            className="about-section__image"
          />
        </div>
      </div>
    </section>
  );
}
