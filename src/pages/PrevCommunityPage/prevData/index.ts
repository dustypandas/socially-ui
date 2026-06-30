export const members = {
  peter: {
    name: 'Peter C',
    img: './assets/member-peter.webp',
  },
  maria: {
    name: 'Maria M',
    img: './assets/member-maria.jpg',
  },
  achi: {
    name: 'Achi J',
    img: './assets/member-achi.avif',
  },
  olivia: {
    name: 'Olivia M',
    img: './assets/member-olivia.jpg',
  },
  caro: {
    name: 'Caro M',
    img: './assets/member-caro.jpg',
  },
  dom: {
    name: 'Dominik',
    img: './assets/member-dom.jpg',
  },
  chloe: {
    name: 'Chloe Dupont',
    img: './assets/member-chloe.jpg',
  },
  lucy: {
    name: 'Lucy Petroski',
    img: './assets/member-lucy.jpg',
  },
  sam: {
    name: 'Sam Harris',
    img: './assets/member-sam.jpg',
  },
};
export const membersArray = Object.values(members);

export const communities = {
  freshers: {
    name: 'Freshers of Madrid',
    img: './assets/community-freshers.avif',
    details: `<p>
                We are a community for <strong>recent arrivers and international residents</strong> from anywhere in the world, exploring and building our new lives in Madrid ☀️
              </p>
              <p>
                For connecting with others who are <strong>on a similar journey</strong> - join us for regular events designed around finding unexpected conversations.
              </p>
              <p>
                Get to know other <strong>students, expats & nomads</strong> living in Madrid who share uncommon stories - just like you 🌍💫
              </p>`,
    ratings: {
      rating: 4.8,
      count: 106,
      eventsCount: 10,
    },
    organizers: [
      members.peter,
    ],
    members: {
      profiles: [...Array(15).keys()].map(index => ({
        id: index,
        ...membersArray[index % membersArray.length],
      })),
      count: 360,
    },
  },
  polylogue: {
    name: 'Polylogue Madrid: share • learn • inspire',
    img: './assets/community-polylogue.avif',
    details: `<p>
                Polylogue is a community for meeting people who share diverse interests, eclectic curiosities, wayward stories and uncommon perspectives. 🎓📚💫
              </p>
              <p>
                Come join us for fortnightly "Lightning Talks" - where a number of speakers give 5 minute presentations about any topic of their choosing, followed by 5 minutes of open questions.
              </p>`,
    ratings: {
      rating: 4.7,
      count: 188,
      eventsCount: 25,
    },
    organizers: [
      members.achi,
      members.peter,
      members.maria,
    ],
    members: {
      profiles: [...Array(15).keys()].map(index => ({
        id: index,
        ...membersArray[index % membersArray.length],
      })),
      count: 841,
    },
  },
  conscious: {
    name: 'The Conscious Collective',
    img: './assets/community-conscious.avif',
    details: `<p>
                The Conscious Collective Madrid is an international community for explorers of counter-culture; psychedelics, an expression of certain values; and a connection to an alternative way of life.
              </p>
              <p>
                For sharing experiences and explorations of growth, philosophies, altered states of consciousness and spirituality... join us for semi-regular gatherings where we can expand and co-create some of this magic in Madrid. 😌🙏🌈
              </p>`,
    ratings: {
      rating: 4.9,
      count: 34,
      eventsCount: 37,
    },
    organizers: [
      members.lucy,
      members.dom,
    ],
    members: {
      profiles: [...Array(15).keys()].map(index => ({
        id: index,
        ...membersArray[index % membersArray.length],
      })),
      count: 258,
    },
  },
  dance: {
    name: 'Happy Feet',
    img: './assets/community-dance.avif',
    details: `<p>
                For Salsa, Bachata, Tango or Swing, Happy Feet is an international community for lovers of partner dancing in Madrid
              </p>`,
    ratings: {
      rating: 0, // rating: 4.9,
      count: 0, // count: 34,
      eventsCount: 2,
    },
    organizers: [
      members.olivia,
      members.dom,
    ],
    members: {
      profiles: [...Array(7).keys()].map(index => ({
        id: index,
        ...membersArray[index % membersArray.length],
      })),
      count: 7,
    },
  },
  philosophy: {
    name: 'Literature and Philosophy Reading Group',
    img: './assets/community-philosophy.webp',
    details: `<p>
                This group is for people interested in reading and discussing themes in philosophy and literature, aided by close readings of classics in both subjects. It’s really that simple—to meet and connect with people who share these interests for discussion on a wide range of topics/texts.
              </p>`,
    ratings: {
      rating: 4.8,
      count: 17,
      eventsCount: 8,
    },
    organizers: [
      members.caro,
      members.achi,
    ],
    members: {
      profiles: [...Array(15).keys()].map(index => ({
        id: index,
        ...membersArray[index % membersArray.length],
      })),
      count: 334,
    },
  },
  sketch: {
    name: 'The Madrid Sketch Squad',
    img: './assets/community-sketch.avif',
    details: `<p>
                🇬🇧 Welcome to Madrid Sketch Squad! We're a bilingual drawing group based in Madrid. Join us to discover the city and explore drawing techniques like pencils or watercolor. From capturing the city's architecture to sketching its landscapes, we'll let our creativity flow.
              </p>
              <p>
                No drawing experience? No worries! Madrid Sketch Squad is not a class; it's a free event where we practice together, share tips, and simply enjoy the process of creating art. Come join the squad, make friends, and have a fantastic time exploring Madrid!
              </p>`,
    ratings: {
      rating: 4.8,
      count: 367,
      eventsCount: 89,
    },
    organizers: [
      members.maria,
    ],
    members: {
      profiles: [...Array(15).keys()].map(index => ({
        id: index,
        ...membersArray[index % membersArray.length],
      })),
      count: 1456,
    },
  }
};
export const communitiesArray = Object.values(communities);

export const events = {
  lightning: {
    title: 'Lightning Talks @ Maria Pandora',
    img: './assets/event-lightning.avif',
    community: communities.polylogue,
    attendees: {
      count: 47,
    },
    date: {
      homeDateLabels: ['Tue, Feb 4', '7:10pm'],
    },
  },
  story: {
    title: 'Open Mic Storytelling @ Tropicana - "TRAVEL 🏞"',
    img: './assets/event-story.avif',
    community: communities.freshers,
    attendees: {
      count: 17,
    },
    date: {
      homeDateLabels: ['Tue, Feb 18', '7:00pm'],
    },
  },
  circle: {
    title: 'Psychedelic sharing circle',
    img: './assets/event-circle.avif',
    community: communities.conscious,
    attendees: {
      count: 9,
    },
    date: {
      homeDateLabels: ['Sat, Feb 15', '5:00pm'],
    },
  },
  sketch: {
    title: 'Urban sketching: CentroCentro',
    img: './assets/event-sketch.avif',
    community: communities.sketch,
    attendees: {
      count: 14,
    },
    date: {
      homeDateLabels: ['Wed, Feb 5', '7:30pm'],
    },
  },
  swing: {
    title: 'Open Air Lindy Hop Class',
    img: './assets/event-swing.avif',
    community: communities.dance,
    attendees: {
      count: 39,
    },
    date: {
      homeDateLabels: ['Sun, Feb 16', '1:00pm'],
    },
  },
};

export const sampleFullEvent = {
  ...events.lightning,
  location: 'Palacio',
  details: `<p>
              5 Speakers, 5 minute presentations, 5 diverse topics! 🙌⚡️
            </p>
            <p>
              Lightning Talks is a format where a number of speakers give <b>5 minute presentations</b> about <b>any topic of their choosing</b>, followed by 5 minutes of open questions.
            </p>
            <p>
              There will be <b>5-6 talks starting at 19:30</b>, followed by drinks and social.
            </p>
            <p>
              Come join us to hear and discuss some unexpected ideas across surprising topics, broaden our horizons and meet interesting people.
            </p>
            <p>
              You can find photos from some of our recent events here:<br/>
              <a href='#'><b>https://www.instagram.com/polylogue_madrid</b></a>
            </p>
            <p>
              or sign up here if you'd like to give a talk at our next event:<br/>
              <a href='#'><b>https://forms.gle/Nx2847ZENMxkBMut8</b></a>
            </p>`,
  community: communities.polylogue,
  hosts: [
    members.achi,
    members.peter,
  ],
  attendees: {
    profiles: [
      members.lucy,
      members.dom,
      members.maria,
      members.sam,
      members.olivia,
    ],
    count: 27,
  },
  date: {
    timelineLabels: [
      'Feb 4, 2025',
      'Tuesday, 7:10pm',
    ],
    pageLabels: {
      monthShort: 'Feb',
      dateShort: '04',
      dateLong: 'Tuesday, February 4, 2025',
      timeLong: '12:00pm - 1:00pm',
    }
  },
};
