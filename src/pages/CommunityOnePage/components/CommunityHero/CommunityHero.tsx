import './community-hero.css';

type CommunityHeroProps = {
  image: string;
  name: string;
};

export function CommunityHero({ image, name }: CommunityHeroProps) {
  return (
    <div className="community-hero">
      <img className="community-hero__image" src={image} alt="" />
      <span className="community-hero__sr-title">{name}</span>
    </div>
  );
}
