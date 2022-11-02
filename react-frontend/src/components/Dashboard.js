import React from 'react';
import { nanoid } from 'nanoid'
import '../App.css';
import "../dashboard.css";
import EventsList from './EventsList';
import { useState, useContext, useEffect } from 'react';
import AddEvent from './AddEvent';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from './Context';
import UserServices from '../services/UserServices';


const Dashboard = () => {
    const [context, setContext] = useContext(Context);
    const [addEventPopup, setEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        UserServices.showEvents(context)
        .then((response) => response.data)
        .then((data) => {
            for (const entry of data) {
                const id = entry.id
                const eventName = entry.name
                const loc = entry.location
                const desc = entry.description
                const timeAndDate = entry.date
                //console.log(newEvent)
                //console.log(id)
                //console.log(eventName)
                //console.log(loc)
                //console.log(desc)
                //console.log(timeAndDate)
                //newEvents = [...events, newEvent];
                setEvents((events) => [...events, {id: id, eventName: eventName, location: loc, description: desc, timeAndDate: timeAndDate}])
            }
        });
    }

   
    const addEvent = (name, loc, desc, timeDate) => {
        UserServices.addEvent(context, name, loc, timeDate, desc)
        .then((response) => response.data)
        .then((data) => {
            const test = data.id
            const newEvent = {
                id: test,
                eventName: name,
                location: loc,
                description: desc,
                timeAndDate: timeDate
            }
            const newEvents = [...events, newEvent];
            setEvents(newEvents);
        })  
    }
    
    const handleDelete = (id) => {
        UserServices.removeEvent(context, id)
        .then((response) => response.data)
        .then((data) => {
            if (data.deleted) {
                const updateDelete = events.filter((event) =>
                    id != event.id)
                setEvents(updateDelete)
                alert("You have deleted the event")
            } else {
                alert("You do not have permissions to delete this event")
            }
        });
    }

    return <div className = "dashboard">
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
            <div className="eventspace">
                <EventsList events = {events} handleDeleteEvent= {handleDelete} />
            </div>
        </div>;
};

export default Dashboard