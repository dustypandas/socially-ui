import type { MemberAvatar } from '@src/data';
import './event-hosts.css';

type EventHostsProps = {
  hosts: MemberAvatar[];
};

export function EventHosts({ hosts }: EventHostsProps) {
  return (
    <section className="event-hosts">
      <h3 className="event-hosts__title">Hosted by</h3>
      <div className="event-hosts__list">
        {hosts.map(host => (
          <a key={host.id} href={host.href} className="event-hosts__row">
            <img className="event-hosts__img" src={host.image} alt="" />
            <span className="event-hosts__name">{host.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
