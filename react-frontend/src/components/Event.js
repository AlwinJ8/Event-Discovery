import { MdDeleteForever } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md';
import '../event.css';

const Event = ({ id, eventName, location, description, timeAndDate, handleDeleteEvent }) => {
    return (
        <div key= {id} className="event" >
            <div className='topPart'>
                <div className = "eventHeader">
                    <h4 className='hh'>{eventName}</h4>
                    <h4 className='hh'>{location}</h4>
                </div>
                <h4 className='hh'>Event Host: User Who Created Event</h4>
                <span>  {description} </span>
            </div>
                <div className = "eventFooter">
                    <small>   {timeAndDate} </small>
                    <div className='icons'>
                        <MdEditNote size = '1.5em'/>
                        <MdDeleteForever onClick={() => handleDeleteEvent(id)} className='deleteIcon' size='1.5em'/>
                    </div>
                </div>
        </div>
    );
};

export default Event;