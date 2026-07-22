export function IndexPage() {
  return (<div style={{ padding: '5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <a href='#/home-ui'>Home ui</a>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <a href='#/interests-ui'>Interests ui</a>
      <span>
        &emsp;<a href='#/one-interest-ui'>One Interest ui</a>
        &emsp;&emsp;&emsp;<a href='#/one-interest-ui-empty'>(empty)</a>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <a href='#/events-ui'>Events ui</a>
      <span>
        &emsp;<a href='#/one-event-ui'>One Event ui</a>
        &emsp;&emsp;&emsp;<a href='#/one-event-ui-empty'>(empty)</a>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <a href='#/communities-ui'>Communities ui</a>
      <span>
        &emsp;<a href='#/one-community-ui'>One Community ui</a>
        &emsp;&emsp;&emsp;<a href='#/one-community-ui-empty'>(empty)</a>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span>
        <a href='#/one-member-ui'>One Member ui public</a>
        &emsp;&emsp;&emsp;<a href='#/one-interest-ui-empty'>(empty)</a>
        &emsp;&emsp;&emsp;<a href='#/one-interest-ui-related'>(related)</a>
        &emsp;&emsp;&emsp;<a href='#/one-interest-ui-admin'>(admin)</a>
      </span>
    </div>
    
    <br/>
    <br/>
    <br/>
    <a href='#/login-ui'>Login ui</a>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span>
        <a href='#/signup-ui'>Signup ui</a>
        &emsp;&emsp;&emsp;<a href='#/signup-step2-ui'>(step-2)</a>
      </span>
    </div>
    <a href='#/create-community-ui'>Create community</a>
    <a href='#/create-event-ui'>Create event</a>
    <br/>
    <br/>
    <br/>
    <a href='#/prev-community-ui'>Prev Community page ui</a>
    <a href='#/prev-event-ui'>Prev Event page ui</a>
  </div>);
}
