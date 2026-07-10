import { SectionHeader } from '@src/components/SectionHeader/SectionHeader';
import './home-about.css';

export function HomeAbout() {
  return (
    <section className="home-about">
      <div className="width-container">
        <div className="home-page__divider"></div>
        <SectionHeader title="Who We Are" hideMore />

        <div className="home-about__content">
          <div className="home-about__text">
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
            className="home-about__image"
          />
        </div>
      </div>
    </section>
  );
}
