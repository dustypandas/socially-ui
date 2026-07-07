import './event-image.css';

type EventImageProps = {
  src: string;
  alt?: string;
};

export function EventImage({ src, alt = '' }: EventImageProps) {
  return (
    <div className="event-image">
      <div className="event-image__glow">
        <img className="event-image__img" src={src} alt="" />
      </div>
      <div className="event-image__wrapper">
        <img className="event-image__img" src={src} alt={alt} />
      </div>
    </div>
  );
}
