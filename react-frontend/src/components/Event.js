import { MdDeleteForever } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md'
import '../event.css'
const Event = ({ id, eventName, location, description, timeAndDate }) => {
    return (
        <div className="event">
            <div className='topPart'>
                <div className = "eventHeader">
                    <h4 key={eventName.uniqueId} className='hh'>{eventName}</h4>
                    <h4 key={location.uniqueId} className='hh'>{location}</h4>
                </div>
                <h4 className='hh'>Event Host: User Who Created Event</h4>
                <span key={description.uniqueId} >  {description} </span>
            </div>
                <div className = "eventFooter">
                    <small key={timeAndDate.uniqueId} >   {timeAndDate} </small>
                    <div className='icons'>
                        <MdEditNote size = '1.5em'/>
                        <MdDeleteForever className='deleteIcon' size='1.5em'/>
                    </div>
                </div>
        </div>
    );
};

export default Event;