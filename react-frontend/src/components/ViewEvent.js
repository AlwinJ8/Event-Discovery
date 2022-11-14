import '../ViewEvent.css'
import { useEffect, useState, useRef, useContext} from 'react';
import { Context } from "./Context";
import UserServices from '../services/UserServices';
import { MdArrowBack } from 'react-icons/md';
import { wait } from '@testing-library/user-event/dist/utils';


//Use this function to remove a user from list on frontend
// NOTE THAT "context" IS THE ID OF THE CURRENT USER!!!!!
function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function ViewEvent(props) {
    const [context, setContext] = useContext(Context);
    let [eventDesc, setEventDesc] = useState(props.desc);
    let [eventName, setEventName] = useState(props.name);
    const [eventLoc, setEventLoc] = useState(props.loc);
    const [eventID, setEventID] = useState(props.id)
    const [eventHost, setEventHost] = useState(props.host)
    const [eventTimeDate, setEventTimeDate] = useState(props.timeDate);
    const [open, setOpen] = useState(false);
    const [statusState, setStatusState] = useState("Will Attend")
    const [isInviteOnly, setisInviteOnly] = useState(props.inviteOnly); //use for invite only


    const [guestCapacity, setGuestCapacity] = useState(""); //initial cap is set at 10000
    const [permGuestCapacity, setPermGuestCapacity] = useState(10000); // This is the actual guestCapacity
    const handleSubmit = () => {
        setPermGuestCapacity(parseInt(guestCapacity));
        setGuestCapacity("");
    };

    const [inviteUser, setInviteUser] = useState(""); //initial cap is set at 10000
    const [invitedUsers, setInvitedUsers] = useState([]);
    const handleSubmit2 = () => {
        setInvitedUsers([...invitedUsers, parseInt(inviteUser)])
        setInviteUser("");
    };


    const [isCapacityPromptOpen, setIsCapacityPromptOpen] = useState(false)
    const [isInvitePrompt, setIsInvitePromptOpne] = useState(false)

    const handleExitClick = () => {
        props.trigger(false);
    }

    //This is lists storing different attendance statuses
    const [willAttendList, setwillAttendList] = useState([]);
    const [perhapsList, setperhapsList] = useState([]);
    const [wontAttendList, setwontAttendList] = useState([]);
    const [lolList, setlolList] = useState([]);

    useEffect(() => {
        getPeeps();
        getMPeeps();
        getNPeeps();
        getLPeeps();
    }, []);

    const getPeeps = () => {
        UserServices.getPeople(context, eventID, "Will Attend")
        .then((response) => response.data)
        .then((data) => {
            let add = []
            for (const entry of data) {
                add = [...add, entry.id]
            }
            setwillAttendList([...willAttendList, ...add])
        });
    }

    const getMPeeps = () => {
        UserServices.getPeople(context, eventID, "Perhaps")
        .then((response) => response.data)
        .then((data) => {
            let add1 = []
            for (const entry of data) {
                add1 = [...add1, entry.id]
            }
            setperhapsList([...perhapsList, ...add1])
        });
    }

    const getNPeeps = () => {
        UserServices.getPeople(context, eventID, "Won't Attend")
        .then((response) => response.data)
        .then((data) => {
            let add2 = []
            for (const entry of data) {
                add2 = [...add2, entry.id]
            }
            setwontAttendList([...wontAttendList, ...add2])
        });
    }

    const getLPeeps = () => {
        UserServices.getPeople(context, eventID, "No, lol")
        .then((response) => response.data)
        .then((data) => {
            let add3 = []
            for (const entry of data) {
                add3 = [...add3, entry.id]
            }
            setlolList([...lolList, ...add3])
        });
    }


    const handleWillAttend = () => {
        UserServices.checkRsvp(context, eventID)
        .then((response) => response.data)
        .then((data) => {
            if (data.hasRSVP == true) {
                UserServices.editRsvp(context, eventID, "Will Attend")
            } else {
                UserServices.rsvpEvent(context, eventID, "Will Attend")
            }
        });
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))
        const newWillAttendList = [...willAttendList, context];
        setwillAttendList(newWillAttendList)
    }

    const handlePerhaps = () => {
        UserServices.checkRsvp(context, eventID)
        .then((response) => response.data)
        .then((data) => {
            if (data.hasRSVP == true) {
                UserServices.editRsvp(context, eventID, "Perhaps")
            } else {
                UserServices.rsvpEvent(context, eventID, "Perhaps")
            }
        });
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))
        const newPerhapsList = [...perhapsList, context];
        setperhapsList(newPerhapsList)
    }
    const handleWontAttend = () => {
        UserServices.checkRsvp(context, eventID)
        .then((response) => response.data)
        .then((data) => {
            if (data.hasRSVP == true) {
                UserServices.editRsvp(context, eventID, "Won't Attend")
            } else {
                UserServices.rsvpEvent(context, eventID, "Won't Attend")
                .then((response) => response.data)
                .then((data) => {
                    if (data.size() == 2) {
                        console.log("lalalala")
                        alert("You can't register for this because you are bad")
                    } else {
                        console.log("asdfasdfasdf")
                        alert("You have successfully given your rsvp.")
                        setwillAttendList(removeItem(willAttendList, context))
                        setperhapsList(removeItem(perhapsList, context))
                        setwontAttendList(removeItem(wontAttendList, context))
                        setlolList(removeItem(lolList, context))
                        const newWontAttendList = [...wontAttendList, context];
                        setwontAttendList(newWontAttendList)
                    }
                });
            }
        });
    }
    const handleLol = () => {
        UserServices.checkRsvp(context, eventID)
        .then((response) => response.data)
        .then((data) => {
            if (data.hasRSVP == true) {
                UserServices.editRsvp(context, eventID, "No, lol")
            } else {
                UserServices.rsvpEvent(context, eventID, "No, lol")
            }
        });
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))
        const newLolList = [...lolList, context];
        setlolList(newLolList)
    }
    const handleKicked = (user) => {
        UserServices.removeRsvp(context, eventID, user)
        .then((response) => response.data)
        .then((data) => {
            if (data.success == true) {
                setwillAttendList(removeItem(willAttendList, user))
                setperhapsList(removeItem(perhapsList, user))
                setwontAttendList(removeItem(wontAttendList, user))
                setlolList(removeItem(lolList, user))
            } else {
                alert("You don't have permisisons")
            }
        });
    }

    return (props.isShown) ? (
        <div className="popup">
            <MdArrowBack className = "backIcon" size = '2rem' onClick={handleExitClick}/>
            <div className='popupInner'>
                <div className='upperBox'>
                    <div className = "eventHeader">
                        <h5 className='h5'
                            rows='1'
                            cols='20'
                        >{eventName}</h5>
                        <h5 className='h5'
                            rows='1'
                            cols='10'
                        >{eventLoc}</h5>
                    </div>
                    <h5>Event Host: {eventHost} </h5>
                    <small
                        rows='8'
                        cols='10'
                    >{eventDesc}</small>
                </div>
                <div className = "eventFooter">
                    <small
                        rows='1'
                        cols='40'
                    >{eventTimeDate}</small>
                    <small>Current Status: Will Attend</small>
                    <div className='leftSideFooter'>

                    <div className="button" onClick={()=>{setOpen(!open)}}><span>Change Status</span></div>
                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                            <small className='status' onClick={handleWillAttend}>Will Attend</small>
                            <small className='status' onClick={handlePerhaps}>Perhaps</small>
                            <small className='status' onClick={handleWontAttend}>Won't Attend</small>
                            <small className='status' onClick={handleLol}>Lol, no</small>
                        </div>
                    </div>
                </div>

            </div>
            <div className = 'rsvpPopup'>
                <div className = "eventHeader">
                    <h5
                        rows='1'
                        cols='15'
                    >Current Attendees: {willAttendList.length + perhapsList.length}</h5>
                    <h5
                        rows='1'
                        cols='20'
                    >RSVP List</h5>
                    <h5
                        rows='1'
                        cols='10'
                    >Guest Capacity: {permGuestCapacity == 10000 ? "None" : {permGuestCapacity}}</h5>
                </div>
                <div className='headerTing'>
                    <div className='twoButtons'>
                        <div className="inviteOnlyButton" onClick={()=>{
                            if (props.hostid == context) {
                                UserServices.editEvent(context, props.id, eventName, eventLoc, eventTimeDate, eventDesc, !isInviteOnly, props.capacity)
                                setisInviteOnly(!isInviteOnly)
                            } else {
                                alert("You dont have permissions to do this!")
                            }
                            }}>Invite Only: {String(isInviteOnly)}
                        </div>

                        <div className="inviteOnlyButton" onClick={()=>{
                            setIsInvitePromptOpne(!setIsInvitePromptOpne)
                            //alert(isCapacityPromptOpen) //Should only work if user is host of event
                            }}>Invite User
                        </div>

                        {isInvitePrompt ?
                            <div className = 'promptDiv'>
                                <textarea className='capacityPrompt'
                                    required
                                    placeholder='User ID'
                                    value = {inviteUser}
                                    onChange = {(e) => setInviteUser(e.target.value)}>
                                </textarea>
                                <div className="removeButton" onClick={()=>{
                                        handleSubmit2()
                                        }}>Submit
                                </div>
                            </div>
                            : null}

                        <div className="inviteOnlyButton" onClick={()=>{
                            setIsCapacityPromptOpen(!isCapacityPromptOpen)
                            //alert(isCapacityPromptOpen) //Should only work if user is host of event
                            }}>Set Capacity
                        </div>

                        {isCapacityPromptOpen ?
                            <div className = 'promptDiv'>
                                <textarea className='capacityPrompt'
                                    required
                                    value = {guestCapacity}
                                    onChange = {(e) => setGuestCapacity(e.target.value)}>
                                </textarea>
                                <div className="removeButton" onClick={()=>{
                                        handleSubmit()
                                        }}>Submit
                                </div>
                            </div>
                            : null}

                    </div>
                    <h5 className='sometext' > View Attendees by Status </h5>
                </div>
                <div className='selector'>
                    <div className={statusState === "Will Attend" ? "selected" : "button"}  onClick={()=>{setStatusState("Will Attend")}}>Will Attend </div>
                    <div className={statusState === "Perhaps" ? "selected" : "button"} onClick={()=>{setStatusState("Perhaps")}}>Perhaps</div>
                    <div className={statusState === "Won't Attend" ? "selected" : "button"} onClick={()=>{setStatusState("Won't Attend")}}>Won't Attend</div>
                    <div className={statusState === "No, lol" ? "selected" : "button"} onClick={()=>{setStatusState("No, lol")}}>No, lol</div>
                </div>
                <div className='displayedList'>
                    {statusState == "Will Attend" ? <text className='alist'>{willAttendList.map((user) => (
                            <div className='alistCell'>
                                {user}
                                <div className="removeButton" onClick={()=>{
                                    handleKicked(user)
                                }}>Remove Attendee</div>
                            </div>
                        ))}
                    </text> : null}

                    {statusState == "Perhaps" ? <text className='alist'>{perhapsList.map((user) => (
                            <div className='alistCell'>
                                {user}
                                <div className="removeButton" onClick={()=>{
                                    handleKicked(user)
                                }}>Remove Attendee</div>
                            </div>
                        ))}
                    </text> : null}
                    {statusState == "Won't Attend" ? <text className='alist'>{wontAttendList.map((user) => (
                            <div className='alistCell'>
                                {user}
                            </div>
                        ))}
                    </text> : null}

                    {statusState == "No, lol" ? <text className='alist'>{lolList.map((user) => (
                            <div className='alistCell'>
                                {user}
                            </div>
                        ))}
                    </text> : null}
                </div>
            </div>
        </div>
    ): (null);
}

export default ViewEvent;