import { MdDeleteForever } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md'
import React from 'react';
import { nanoid } from 'nanoid'
import '../App.css';
import "../dashboard.css";
import EventsList from './EventsList';
import { useState } from 'react';
import EditEvent from './EditEvent';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import Dash from "./Dashboard"
import { Link } from "react-router-dom";
import '../event.css'
const Event = ({ id, eventName, location, description, timeAndDate }) => {
    const [editEventPopup, setEventPopup] = useState(false);

    const editEvent = (name, loc, desc, timeDate) => {
        const currEvent = {
            id: id,
            eventName: name,
            location: loc,
            description: desc,
            timeAndDate: timeDate
        }
        // let nEvents = []
        // if (events.length != 0) {
        //     for (let i = 0; i < events.length - 1; i++) {
        //         nEvents[i] = events[i]
        //     }
        // }
        // const newEvents = [Dash.getInstance.events, currEvent];
        // Dash.getInstance.setEvents(newEvents);
        const newEvents = [Dash.getInstance.events, currEvent];
        Dash.getInstance.setEvents(newEvents)
    }

    return (
        <div className="event">
            <div className='topPart'>
                <div className = "eventHeader">
                    <h4 className='hh'>{eventName}</h4>
                    <h4 className='hh'>{location}</h4>
                </div>
                <h4 className='hh'>Event Host: User Who Created Event</h4>
                <span> {description} </span>
            </div>
                <div className = "eventFooter">
                    <small>  {timeAndDate} </small>
                    <div className='icons'>
                        <Link className="createline" onClick={() => setEventPopup(true)}> <MdEditNote size = '1.5em'/> </Link>
                        <MdDeleteForever className='deleteIcon' size='1.5em'/>
                    </div>
                    <EditEvent desc={description} name={eventName} loc={location} timeDate={timeAndDate} trigger={setEventPopup} isShown={editEventPopup} handleEditEvent={editEvent}/>
                </div>
        </div>
    );
};

export default Event;