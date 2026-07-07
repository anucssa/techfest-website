import Icon from './Icon';
import ShareButton from './ShareButton';
import { asset } from '@/lib/data';

// The action row on every event page: registration (when live), Google Maps,
// add-to-calendar (.ics generated at build time), and share.
export default function EventActions({ event, venue }) {
  return (
    <div className="flex flex-wrap gap-3">
      {event.links?.humanitix ? (
        <a className="btn-trail" href={event.links.humanitix} target="_blank" rel="noopener noreferrer">
          Register on Humanitix <Icon name="external" className="h-4 w-4" />
        </a>
      ) : null}
      {event.links?.rubric ? (
        <a className="btn-trail" href={event.links.rubric} target="_blank" rel="noopener noreferrer">
          Register on Rubric <Icon name="external" className="h-4 w-4" />
        </a>
      ) : null}
      {!event.links?.humanitix && !event.links?.rubric ? (
        <span className="btn-ghost cursor-default text-sm !font-semibold opacity-80">Registration link coming soon</span>
      ) : null}
      <a className="btn-ghost text-sm" href={venue.gmaps} target="_blank" rel="noopener noreferrer">
        <Icon name="pin" className="h-4 w-4" /> Google Maps
      </a>
      <a className="btn-ghost text-sm" href={asset(`/calendar/${event.slug}.ics`)} download>
        <Icon name="calendar" className="h-4 w-4" /> Add to calendar
      </a>
      <ShareButton title={event.title} path={`/events/${event.slug}/`} />
    </div>
  );
}
