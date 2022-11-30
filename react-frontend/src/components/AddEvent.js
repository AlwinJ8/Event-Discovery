import '../event.css'
import { MdNoteAdd } from 'react-icons/md';
import '../AddEvent.css'
import { useEffect, useState, useRef, useContext } from 'react';
import { Context } from './Context';
import { MdArrowBack } from 'react-icons/md';


function AddEvent(props) {
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


    const [context, setContext] = useContext(Context);
    const [eventDesc, setEventDesc] = useState("");
    const handleChangeDesc = (event) => {
        setEventDesc(event.target.value);
    };

    const [eventName, setEventName] = useState("");
    const handleChangeName = (event) => {
        setEventName(event.target.value);
    };

    const [eventHost, setEventHost] = useState("");
    const handleChangeHost = (event) => {
        setEventHost(event.target.value);
    };

    const [eventLoc, setEventLoc] = useState("");
    const handleChangeLoc = (event) => {
        setEventLoc(event.target.value);
    };

    const [eventTimeDate, setEventTimeDate] = useState("");
    const handleChangeTimeDate = (event) => {
        setEventTimeDate(event.target.value);
    };

    const handleExitClick = () => {
        props.trigger(false);
    }

    const handleSaveClick = () => {
        if (locationToCoords.hasOwnProperty(eventLoc)) {
            props.trigger(false);
            props.handleAddEvent(eventName, eventLoc, eventDesc, eventTimeDate);
            setEventLoc("");
            setEventHost(context)
            setEventDesc("");
            setEventTimeDate("");
            setEventName("");
        } else {
            alert("Enter Valid Location!")
        }
    }

    return (props.isShown) ? (
        <div className="popup">
            <MdArrowBack className = "backIcon" size = '2rem' onClick={handleExitClick}/>
            <div className='poopupInner'>
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
                <div className='minihead'>
                    <small className='boom'> Event Host: You</small>
                    <small
                        className='locLinker'
                        onClick={() =>
                        alert("Valid Locations:\nRoe Stamps Field, Campus Recreation Center, Exhibition Hall,"
                        + " Instructional Center, Student Center, Tech Green, Van Leer, Prince Gilbert,"
                        + " CULC, Crosland Tower, Skiles, D.M. Smith, College of Computing, Howey Building,"
                        + " Klaus, Bio Quad, Kendeda, Burger Bowl, Willage Dining Hall, The Feds,"
                        + " Waffle House, Scheller, George's Apt, Glen-Towers Lawn, NAV Dining Hall,"
                        + " Bobby Dodd, Tech Tower, Trap House, Cookout, Boggs , Brittain Dining Hall(ew)")
                        }> View Valid Locations</small>
                </div>
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
