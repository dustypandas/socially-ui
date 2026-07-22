import './page-header.css';

type PageHeaderProps = {
  isSubtle?: boolean;
  isSticky?: boolean;
  hideExploreEvents?: boolean;
};

export function PageHeader(props: PageHeaderProps) {
  return (<header className={`header-wrapper gm-animated${props.isSubtle ? ' is-subtle' : ''}${props.isSticky ? ' is-sticky' : ''}`}>
    {/* <header className={`header-wrapper${!!hasScrolled ? ' has-border' : ''}`}> */}
    <div className='header-container'>
      <a href='#/home-ui' className='header-logo__link'>
        <div className='header-logo'></div>
      </a>
      <div className='header-right'>
        {!props.hideExploreEvents && (
          <a
            href='#'
            className='header__explore-events gm-link gm-animated header-link'
            style={{ height: '1.5rem' }}
          >
            <span className='gm-link__label'>Explore Events</span>
            <span className='gm-link__icon'>
              <svg style={{ width: '1rem', height: '1rem', verticalAlign: 'middle' }} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                <path d="M7 17 17 7M7 7h10v10"></path>
              </svg>
            </span>
          </a>
        )}
        <a
          href='#'
          className='header__sign-in gm-link-btn gm-animated header-link-btn'
        >
          <span className='gm-link-btn__label'>
            Sign In
          </span>
        </a>
      </div>
    </div>
  </header>);
}
