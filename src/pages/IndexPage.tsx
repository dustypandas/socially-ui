export function IndexPage() {
  return (<div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <a href='#/home-ui'>Home ui</a>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <a href='#/interests-ui'>Interests ui</a>
      <span>
        &emsp;<a href='#/interest-one-ui'>One interest ui</a>
        &emsp;&emsp;&emsp;<a href='#/interest-one-ui-empty'>(empty)</a>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <a href='#/events-ui'>Events ui</a>
      <span>
        &emsp;<a href='#/event-one-ui'>Event one ui</a>
        &emsp;&emsp;&emsp;<a href='#/event-one-ui-empty'>(empty)</a>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <a href='#/communities-ui'>Communities ui</a>
      <span>
        &emsp;<a href='#/community-one-ui'>One Community ui</a>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span>
        <a href='#/member-one-ui'>One Member ui public</a>
        &emsp;&emsp;&emsp;<a href='#/interest-one-ui-empty'>(empty)</a>
        &emsp;&emsp;&emsp;<a href='#/interest-one-ui-related'>(related)</a>
        &emsp;&emsp;&emsp;<a href='#/interest-one-ui-admin'>(admin)</a>
      </span>
    </div>
    
    <br/>
    <br/>
    <br/>
    <a href='#/prev-community-ui'>Prev Community page ui</a>
    <a href='#/prev-event-ui'>Prev Event page ui</a>
  </div>);
}
