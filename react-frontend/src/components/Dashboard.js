import React from 'react';
import '../App.css';
import "../dashboard.css";
import EventsList from './EventsList';
import { useState, useContext, useEffect } from 'react';
import AddEvent from './AddEvent';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from './Context';
import UserServices from '../services/UserServices';
import Pagination from './Pagination';
import "mapbox-gl/dist/mapbox-gl.css";
import ViewEvent from './ViewEvent';
import { GiPositionMarker } from "react-icons/gi";
import { MdArrowBack } from 'react-icons/md';
import Map, {
    Marker,
    NavigationControl,
    Popup,
    FullscreenControl,
    GeolocateControl,
} from "react-map-gl";

const Dashboard = () => {
    // Contains Valid Locations to be inputted
    const locationToCoords =
    {"Roe Stamps Field": [33.776785, -84.403706],
    "Campus Recreation Center" : [33.775551, -84.403935],
    "Exhibition Hall" : [33.774582, -84.401673],
    "Instructional Center" : [33.775421, -84.401317],
    "Student Center" : [33.774093, -84.398794],
    "Tech Green" : [33.774674, -84.397332],
    "Van Leer" : [33.775955, -84.397136],
    "Prince Gilbert" : [33.774310, -84.395740],
    "CULC" : [33.774638, -84.396410],
    "Crosland Tower" : [33.774154, -84.395175],
    "Skiles" : [33.773573, -84.395969],
    "D.M. Smith" : [33.773614, -84.395157],
    "College of Computing" : [33.777367, -84.397326],
    "Howey Building" : [33.777426, -84.398660],
    "Klaus" : [33.777182, -84.396348],
    "Bio Quad" : [33.778808, -84.396577],
    "Kendeda" : [33.778639, -84.399523],
    "Burger Bowl" : [33.778425, -84.402886],
    "Willage Dining Hall" : [33.779278, -84.404846],
    "The Feds" : [33.781201, -84.403356],
    "Waffle House" : [33.776615, -84.389431],
    "Scheller" : [33.776537, -84.388015],
    "George's Apt" : [33.779959, -84.389396],
    "Glen-Towers Lawn" : [33.773266, -84.391332],
    "NAV Dining Hall" : [33.771020, -84.391341],
    "Bobby Dodd" : [33.772457, -84.392868],
    "Tech Tower" : [33.772426, -84.394687],
    "Trap House" : [33.782045, -84.406285],
    "Cookout" : [33.785325, -84.407839],
    "Boggs" : [33.775608, -84.399844],
    "Brittain Dining Hall(ew)" : [33.772411, -84.391273]}

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [filterList, setFilterList] = useState([]);
    const [context, setContext] = useContext(Context);
    const [addEventPopup, setEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = events.slice(firstPostIndex, lastPostIndex);

    const [mapMode, setMapMode] = useState(false)
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [isFiltered, setIsFiltered] = useState(false);

    const [hostFilter, setHostFilter] = useState("");
    const [filteredHosts, setFilteredHosts] = useState([]);
    const handleSubmitHost = () => {
        setFilteredHosts([...filteredHosts, parseInt(hostFilter)])
        console.log(filteredHosts)
    };
    const [dateFilter, setDateFilter] = useState("");
    const [filteredDates, setFilteredDates] = useState([]);
    const handleSubmitDate = () => {
        console.log(filterList)
        setFilteredDates([...filteredDates, (dateFilter)])

    };
    const repeats = new Set();
    const [locationFilter, setLocationFilter] = useState("");
    const [filteredLocations, setFilteredLocations] = useState([]);
    const handleSubmitLocation = () => {
        if (locationToCoords.hasOwnProperty(locationFilter)) {
            setFilteredLocations([...filteredLocations, (locationFilter)])
        } else {
            alert("Enter Valid Location!")
        }
    };
    const currentFilteredPosts = filterList.slice(firstPostIndex, lastPostIndex);
    const handleApplyFilters = () => {
        if (isFiltered) {
            alert("Must clear previous filters first")
        } else {
        const set1 = new Set(filteredLocations)
        const set2 = new Set(filteredDates)
        const set3 = new Set(filteredHosts)
        if (set1.size > 0 && set2.size > 0 && set3.size > 0) {
            for (let i = 0; i < events.length; i++) {
                if (set1.has(events[i].location) && set2.has(events[i].timeAndDate) && set3.has(events[i].hostid)) {
                    filterList.push(events[i])
                }
            }
        } else if (set1.size > 0 && set2.size > 0) {
            for (let i = 0; i < events.length; i++) {
                if (set1.has(events[i].location) && set2.has(events[i].timeAndDate)) {
                    filterList.push(events[i])
                }
            }
        } else if (set1.size > 0 && set3.size > 0) {
            for (let i = 0; i < events.length; i++) {
                if (set1.has(events[i].location) && set3.has(events[i].hostid)) {
                    filterList.push(events[i])
                }
            }
        } else if (set2.size > 0 && set3.size > 0) {
            for (let i = 0; i < events.length; i++) {
                if (set2.has(events[i].timeAndDate) && set3.has(events[i].hostid)) {
                    filterList.push(events[i])
                }
            }
        } else if (set1.size > 0) {
            console.log(set1)
            for (let i = 0; i < events.length; i++) {
                if (set1.has(events[i].location)) {
                    filterList.push(events[i])
                }
                console.log(filterList)
            }
        } else if (set2.size > 0) {
            for (let i = 0; i < events.length; i++) {
                if (set2.has(events[i].timeAndDate)) {
                    filterList.push(events[i])
                }
            }
        } else if (set3.size > 0) {
            for (let i = 0; i < events.length; i++) {
                if (set3.has(events[i].hostid)) {
                    filterList.push(events[i])
                }
            }
        } else{
            setFilterList(events)
        }
        setIsFiltered(true)
    }
    };
    const handleClearFilters = () => {
        setFilterList([])
        setFilteredLocations([])
        setFilteredDates([])
        setFilteredHosts([])
        setIsFiltered(false)
    };


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

    const handleExitClick = () => {
        setOpen(false)
        setIsOpen(false)
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
                <Link className="filterline" onClick={()=>{setOpen(!open)}}><span>Change Filters</span></Link>
                <Link className='mapMode' onClick={() => setMapMode(!mapMode)}> Toggle Map </Link>
                <Link className='myEvents' to="/my-events"> View My Events </Link>
            </div>
            </div>
            <AddEvent trigger={setEventPopup} isShown={addEventPopup} handleAddEvent={addEvent}/>
            <div className="eventspace">
                    {mapMode ?
                        <div>
                            <Map
                                mapboxAccessToken="pk.eyJ1IjoiZ3ZsYWR5MyIsImEiOiJjbGFycng4dWExdnhlM3htaWh1anZsOWN6In0.CSRK3skXXe3e0MttIdXz2A"
                                style={{
                                    width: "99.5vw",
                                    height: "89vh",
                                    border: "2px solid black",
                                }}
                                initialViewState={{
                                    latitude: 33.775279,
                                    longitude:-84.396769,
                                    zoom: 16
                                }}
                                mapStyle="mapbox://styles/mapbox/streets-v9" >
                                {(isFiltered? filterList : events).map(event => ( //Hmmmmmm
                                    <div>
                                        <Marker
                                            latitude={locationToCoords[event.location][0]}
                                            longitude={locationToCoords[event.location][1]}>
                                            <GiPositionMarker
                                            size = '2.25em'
                                            className="marker-btn"
                                            onClick={() => setSelectedEvent(event)}
                                            >
                                            </GiPositionMarker>
                                        </Marker>
                                    </div>
                                ))}
                            </Map>
                            {selectedEvent ?
                                <ViewEvent
                                id={selectedEvent.id}
                                desc={selectedEvent.description}
                                host = {selectedEvent.host}
                                hostid = {selectedEvent.hostid}
                                name={selectedEvent.eventName}
                                loc={selectedEvent.location}
                                timeDate={selectedEvent.timeAndDate}
                                capacity={selectedEvent.capacity}
                                inviteOnly={selectedEvent.inviteOnly}
                                trigger={setSelectedEvent}
                                isShown={selectedEvent}
                                />
                            : null}
                        </div>
                    :
                    <EventsList events={isFiltered? currentFilteredPosts : currentPosts} handleDeleteEvent={handleDelete}/>}

            </div>
            {mapMode || open ? null: <Pagination
                totalPosts={isFiltered? currentFilteredPosts.length : events.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            /> }

        {open ?
            <div className='filterPopup'>
                <MdArrowBack className = "backIcon" size = '2rem' onClick={handleExitClick}/>
                <div className='filterInner'>
                    <div className='upperBox'>
                        <div className = "eventHeader">
                            <h5 className='h5'
                                rows='1'
                                cols='20'
                            >Set Filters</h5>
                        </div>
                        <div className='prompt'>
                            <small className='filterName'>By Host:</small>
                            <textarea className='hostPrompt'
                                rows='1'
                                cols='23'
                                required
                                placeholder='Valid User ID'
                                value = {hostFilter}
                                onChange = {(e) => setHostFilter(e.target.value)}>
                            </textarea>
                            <div className="butt" onClick={()=>{
                                handleSubmitHost()
                                setHostFilter("")
                                }}>Submit
                            </div>
                        </div>
                        <div className='prompt'>
                            <small className='filterName'>By Date:</small>
                            <textarea className='hostPrompt'
                                rows='1'
                                cols='23'
                                required
                                placeholder='Valid Date'
                                value = {dateFilter}
                                onChange = {(e) => setDateFilter(e.target.value)}>
                            </textarea>
                            <div className="butt" onClick={()=>{
                                handleSubmitDate()
                                setDateFilter("")
                                }}>Submit
                            </div>
                        </div>
                        <div className='prompt'>
                            <small className='filterName'>By Location:</small>
                            <textarea className='hostPrompt'
                                rows='1'
                                cols='20'
                                required
                                placeholder='Valid Location'
                                value = {locationFilter}
                                onChange = {(e) => setLocationFilter(e.target.value)}>
                            </textarea>
                            <div className="butt" onClick={()=>{
                                handleSubmitLocation()
                                setLocationFilter("")
                                }}>Submit
                            </div>
                        </div>
                        <div className='doom'>
                            <div className="applyFilter" onClick={()=>{
                                handleApplyFilters()
                                }}>Apply Filters
                            </div>
                            <div className="applyFilter" onClick={()=>{
                                handleClearFilters()
                                }}>Clear Filters
                            </div>
                            <Link
                                className='locLink'
                                onClick={() =>
                                alert("Valid Locations:\nRoe Stamps Field, Campus Recreation Center, Exhibition Hall,"
                                + " Instructional Center, Student Center, Tech Green, Van Leer, Prince Gilbert,"
                                + " CULC, Crosland Tower, Skiles, D.M. Smith, College of Computing, Howey Building,"
                                + " Klaus, Bio Quad, Kendeda, Burger Bowl, Willage Dining Hall, The Feds,"
                                + " Waffle House, Scheller, George's Apt, Glen-Towers Lawn, NAV Dining Hall,"
                                + " Bobby Dodd, Tech Tower, Trap House, Cookout, Boggs , Brittain Dining Hall(ew)")
                                }> View Valid Locations</Link>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>;
};

export default Dashboard