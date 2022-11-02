import Event from './Event';
import '../eventsList.css';

const EventsList = ({
	events, handleDeleteEvent 
}) => {
	return (
		<div className='eventsList'>
			{events.map((event) => (
				<Event
					key={event.id}
					id={event.id}
					host={event.host}
					eventName={event.eventName}
					location={event.location}
                    description={event.description}
                    timeAndDate={event.timeAndDate}
					handleDeleteEvent= {handleDeleteEvent}
				/>
			))}
		</div>
	);
};
export default EventsList;