import { PageLayout } from '@src/components';
import './create-page.css';

export function CreateCommunityPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageLayout hasStaticHeader>
      <section className="create-page">
        <div className="width-container create-page__content">
          <h1 className="signup-page__title">Create community</h1>
          <form className="create-page__form" onSubmit={handleSubmit}>
            <div className="signup-page__field">
              <label className="signup-page__label" htmlFor="create-community-name">
                Name
              </label>
              <input
                id="create-community-name"
                name="name"
                type="text"
                className="create-page__input"
                required
              />
            </div>

            <div className="signup-page__field">
              <label className="signup-page__label" htmlFor="create-community-description">
                Description
              </label>
              <textarea
                id="create-community-description"
                name="description"
                rows={5}
                className="create-page__textarea"
                required
              />
            </div>

            <div className="signup-page__field">
              <label className="signup-page__label" htmlFor="create-community-interests">
                Interests
              </label>
              <input
                id="create-community-interests"
                name="interests"
                type="text"
                className="create-page__input"
                placeholder="comma-separated..."
              />
            </div>

            <button type="submit" className="signup-page__submit">
              Create community
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
