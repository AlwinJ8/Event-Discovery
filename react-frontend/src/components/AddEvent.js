import '../event.css'
import { MdNoteAdd } from 'react-icons/md';
import '../AddEvent.css'
import { useEffect, useState, useRef } from 'react';

let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
    let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
        handler();
        }
    };

    document.addEventListener("mousedown", maybeHandler);

        return () => {
        document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};

function AddEvent(props) {
    const [eventDesc, setEventDesc] = useState("");
    const handleChangeDesc = (event) => {
        setEventDesc(event.target.value);
    };

    const [eventName, setEventName] = useState("");
    const handleChangeName = (event) => {
        setEventName(event.target.value);
    };

    const [eventLoc, setEventLoc] = useState("");
    const handleChangeLoc = (event) => {
        setEventLoc(event.target.value);
    };

    const [eventTimeDate, setEventTimeDate] = useState("");
    const handleChangeTimeDate = (event) => {
        setEventTimeDate(event.target.value);
    };

    const handleSaveClick = () => {
        props.trigger(false);
        props.handleAddEvent(eventName, eventLoc, eventDesc, eventTimeDate);
        setEventLoc("");
        setEventDesc("");
        setEventTimeDate("");
        setEventName("");
    }


    let domNode = useClickOutside(() => {
        props.trigger(false);
    });

    return (props.isShown) ? (
        <div className="popup">
            <div ref={domNode} className='popupInner'>
                <div className = "eventHeader">
                    <textarea
                        rows='1'
                        cols='20'
                        placeholder='Event Name'
                        value={eventName}
                        onChange={handleChangeName}
                    ></textarea>
                    <textarea
                        rows='1'
                        cols='10'
                        placeholder='Location'
                        value={eventLoc}
                        onChange={handleChangeLoc}
                    ></textarea>
                </div>
                <small>Event Host: User Who Created Event</small>
                <textarea
                    rows='8'
                    cols='10'
                    placeholder='Add event description'
                    value={eventDesc}
                    onChange={handleChangeDesc}
                ></textarea>
                <div className = "eventFooter">
                    <textarea
                        rows='1'
                        cols='40'
                        placeholder='Time and Date (Format 01/01/01 @12:00 AM)'
                        value={eventTimeDate}
                        onChange={handleChangeTimeDate}
                    ></textarea>
                    <MdNoteAdd className='addIcon' size='1.5em' onClick={handleSaveClick}
                    />
                </div>
            </div>
        </div>
    ) : (null);
}
export default AddEvent;
