import '../eventConfirmation.css'
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

function EventConfirmation(props) {
    const handleSaveClick = () => {
        props.trigger(false);
    }

    let domNode = useClickOutside(() => {
        props.trigger(false);
    });

    return (props.isShown) ? (
        <div className="confirmationPopup">
            <div ref={domNode} className='confirmationPopupInner'>
                <small>Event Confirmed!</small>
            </div>
            <div className='addIcon' size='1.5em'></div>
        </div>
    ) : (null);
}

export default EventConfirmation;