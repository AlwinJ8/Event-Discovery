import React from 'react';
import { nanoid } from 'nanoid'
import '../App.css';
import "../dashboard.css";
import EventsList from './EventsList';
import { useState } from 'react';
import AddEvent from './AddEvent';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [addEventPopup, setEventPopup] = useState(false);
    const [events, setEvents] = useState([
    ]);

    const addEvent = (name, loc, desc, timeDate) => {
        const newEvent = {
            id: nanoid(),
            eventName: name,
            location: loc,
            description: desc,
            timeAndDate: timeDate
        }
        const newEvents = [...events, newEvent];
        setEvents(newEvents);
    }

    return <div classname = "dashboard">
            <div className="navbar">
            <div className="leftSide" >
                <img src={Logo} />
            </div>
            <div className="rightSide">
                <Link className="createline" onClick={() => setEventPopup(true)}> Create Event </Link>
                <Link className="filterline" to=""> Filter Event </Link>

            </div>
            </div>
            <AddEvent trigger={setEventPopup} isShown={addEventPopup} handleAddEvent={addEvent}/>
            <div>
                <EventsList events = {events} />
            </div>
        </div>;
};


export default Dashboard