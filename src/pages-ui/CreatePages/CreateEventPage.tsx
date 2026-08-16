import { PageLayout } from '@src/components';
import './create-page.css';

export function CreateEventPage() {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageLayout hasStaticHeader>
      <section className="create-page">
        <div className="width-container create-page__content">
          <h1 className="auth-page__title">Create event</h1>
          <form className="create-page__form" onSubmit={handleSubmit}>
            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="create-event-title">
                Title
              </label>
              <input
                id="create-event-title"
                name="title"
                type="text"
                className="create-page__input"
                required
              />
            </div>

            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="create-event-start-time">
                Date &amp; time
              </label>
              <input
                id="create-event-start-time"
                name="startTime"
                type="datetime-local"
                className="create-page__input create-page__input--datetime"
                required
              />
            </div>

            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="create-event-location">
                Location
              </label>
              <input
                id="create-event-location"
                name="location"
                type="text"
                className="create-page__input"
                required
              />
            </div>

            <div className="auth-form__field">
              <label className="auth-form__label" htmlFor="create-event-description">
                Description
              </label>
              <textarea
                id="create-event-description"
                name="description"
                rows={5}
                className="create-page__textarea"
                required
              />
            </div>

            <button type="submit" className="auth-form__submit">
              Create event
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
