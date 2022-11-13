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
					hostid = {event.hostid}
					eventName={event.eventName}
					location={event.location}
                    description={event.description}
                    timeAndDate={event.timeAndDate}
					capacity={event.capacity}
					inviteOnly ={event.inviteOnly}
					handleDeleteEvent= {handleDeleteEvent}
				/>
			))}
		</div>
	);
};
export default EventsList;