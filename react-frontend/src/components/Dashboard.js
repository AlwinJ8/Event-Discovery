import React from 'react';
import '../App.css';
import "../dashboard.css";
import EventsList from './EventsList';
import { useState, useContext, useEffect } from 'react';
import Event from './Event'
import AddEvent from './AddEvent';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from './Context';
import UserServices from '../services/UserServices';
import Pagination from './Pagination';

const Dashboard = () => {
    const navigate = useNavigate();
    const [context, setContext] = useContext(Context);
    const [addEventPopup, setEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = events.slice(firstPostIndex, lastPostIndex);


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        UserServices.showEvents(context)
        .then((response) => response.data)
        .then((data) => {
            for (const entry of data) {
                const id = entry.id
                const host = entry.host
                const hostid = entry.hostid
                const eventName = entry.name
                const loc = entry.location
                const desc = entry.description
                const timeAndDate = entry.date
                const capacity = entry.capacity
                const inviteOnly = entry.inviteOnly
                //console.log(newEvent)
                //console.log(id)
                //console.log(eventName)
                //console.log(loc)
                //console.log(desc)
                //console.log(timeAndDate)
                //newEvents = [...events, newEvent];
                setEvents((events) => [...events, {id: id, host: host, hostid: hostid, eventName: eventName, location: loc, description: desc, timeAndDate: timeAndDate, capacity: capacity, inviteOnly: inviteOnly}])
            }
        });
    }


    /*const edit = (newEvent) => {
        const newEvents = [...events, newEvent];
        // let nEvents = []
        // if (events.length != 0) {
        //     for (let i = 0; i < events.length - 1; i++) {
        //         nEvents[i] = events[i]
        //     }
        // }
        console.log("hi")
        setEvents(newEvents);
    }*/

    const addEvent = (name, loc, desc, timeDate) => {
        UserServices.addEvent(context, name, loc, timeDate, desc, false, 2330)
        .then((response) => response.data)
        .then((data) => {
            const test = data.id
            const hoster = data.host
            const newEvent = {
                id: test,
                host: context,
                eventName: name,
                location: loc,
                description: desc,
                timeAndDate: timeDate,
                capacity: 2330,
                inviteOnly: false
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
                <b> Hello, User {context}!</b>
            </div>
            <div className="rightSide">
                <Link className="Logout" to="/"> Logout </Link>
                <Link className="createline" onClick={() => setEventPopup(true)}> Create Event </Link>
                <Link className="filterline" to=""> Filter Event </Link>

            </div>
            </div>
            <AddEvent trigger={setEventPopup} isShown={addEventPopup} handleAddEvent={addEvent}/>
            <div className="eventspace">
                <EventsList events = {currentPosts} handleDeleteEvent= {handleDelete} />

            </div>
            <Pagination
                totalPosts={events.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>;
};

export default Dashboard