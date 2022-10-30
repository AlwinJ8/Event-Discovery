import Event from './Event';
import '../eventsList.css';

const EventsList = ({
	events,
}) => {
	return (
		<div className='eventsList'>
			{events.map((event) => (
				<Event
					key={event.id}
					eventName={event.eventName}
					location={event.location}
                    description={event.description}
                    timeAndDate={event.timeAndDate}
				/>
			))}
		</div>
	);
};
export default EventsList;