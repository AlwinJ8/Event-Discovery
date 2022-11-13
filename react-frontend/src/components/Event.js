import { MdDeleteForever } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import React from 'react';
import { nanoid } from 'nanoid'
import '../App.css';
import "../dashboard.css";
import EventsList from './EventsList';
import { useState, useContext } from 'react';
import EditEvent from './EditEvent';
import EventConfirmation from './EventConfirmation';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import ViewEvent from './ViewEvent';
import { Link } from "react-router-dom";
import '../event.css';
import { Context } from './Context';

import { render } from '@testing-library/react';
const Event = ({ id, host, hostid, eventName, location, description, timeAndDate, capacity, inviteOnly, handleDeleteEvent }) => {
    const [context, setContext] = useContext(Context);
    const [editEventPopup, setEventPopup] = useState(false);
    const [eventViewPopup, setEventViewPopup] = useState(false);
    const [editConfirmationPopup, setEditConfirmationPopup] = useState(false);

    const [desc, setDesc] = useState(description);
    const handleChangeDesc = (event) => {
        setDesc(event.target.value);
    };

    const [name, setName] = useState(eventName);
    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const [loc, setLoc] = useState(location);
    const handleChangeLoc = (event) => {
        setLoc(event.target.value);
    };

    const [timeDate, setTimeDate] = useState(timeAndDate);
    const handleChangeTimeDate = (event) => {
        setTimeDate(event.target.value);
    };

    const editEvent = (name, loc, desc, timeDate) => {
        setName(name);
        setDesc(desc);
        setTimeDate(timeDate);
        setLoc(loc);
        setEditConfirmationPopup(true)
    }

    return (
        <div key= {id} className="event" >
            <div className='topPart'>
                <div className = "eventHeader">
                    <ViewEvent  id={id} desc={description} host = {host} hostid = {hostid} name={eventName} loc={location} timeDate={timeAndDate} capacity={capacity} inviteOnly={inviteOnly} trigger={setEventViewPopup} isShown={eventViewPopup} handleEditEvent={editEvent}/>
                    <EditEvent  id={id} desc={description} host = {host} hostid = {hostid} name={eventName} loc={location} timeDate={timeAndDate} capacity={capacity} inviteOnly={inviteOnly} trigger={setEventPopup} isShown={editEventPopup} handleEditEvent={editEvent}/>
                    <EventConfirmation trigger={setEditConfirmationPopup} isShown={editConfirmationPopup}/>
                    <h4 className='hh'>{name}</h4>
                    <h4 className='hh'>{loc}</h4>
                </div>
                <h4 className='hh'>Event Host: {host}</h4>
                <span>  {desc} </span>
            </div>
                <div className = "eventFooter">
                    <small>   {timeDate} </small>
                    <div className='icons'>
                        <MdVisibility className = "editIcon" onClick={() => setEventViewPopup(true)} size = '1.3em'/>
                        <MdEditNote onClick={() => setEventPopup(true)} className = "editIcon" size = '1.5em'/>
                        <MdDeleteForever onClick={() => handleDeleteEvent(id)} className='deleteIcon' size='1.5em'/>
                    </div>

                </div>
        </div>
    );
}

export default Event;