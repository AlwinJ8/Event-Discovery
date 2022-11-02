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
    const [events, setEvents] = useState([
    ]);

    /*useEffect(() => {
        getEvents();
    });

    const getEvents = () => {
        UserServices.showEvents(context)
        .then((response) => response.data)
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const newEvent = {
                    id: data[i].id, 
                    eventName: data[i].name,
                    loc: data[i].location,
                    desc: data[i].description, 
                    timeAndDate: data[i].date
                }
                const newEvents = [...events, newEvent];
                setEvents(newEvents);
            }
        })
    }*/

   

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
                <EventsList events = {events} />
            </div>
        </div>;
};

export default Dashboard