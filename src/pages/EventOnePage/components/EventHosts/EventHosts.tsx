import './event-hosts.css';

type Host = {
  name: string;
  img: string;
};

type EventHostsProps = {
  hosts: Host[];
};

export function EventHosts({ hosts }: EventHostsProps) {
  return (
    <section className="event-hosts">
      <h3 className="event-hosts__title">Hosted by</h3>
      <div className="event-hosts__list">
        {hosts.map(host => (
          <a key={host.name} href="#" className="event-hosts__row">
            <img className="event-hosts__img" src={host.img} alt="" />
            <span className="event-hosts__name">{host.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
