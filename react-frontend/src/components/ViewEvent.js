import '../ViewEvent.css'
import { useEffect, useState, useRef, useContext} from 'react';
import { Context } from "./Context";
import UserServices from '../services/UserServices';
import { MdArrowBack } from 'react-icons/md';

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


    const [guestCapacity, setGuestCapacity] = useState(props.capacity); //initial cap is set at 10000
    const handleSubmit = () => {
        if (context == props.hostid) {
            setGuestCapacity(parseInt(guestCapacity));
            UserServices.editEvent(context, props.id, eventName, eventLoc, eventTimeDate, eventDesc, isInviteOnly, guestCapacity)
        } else {
            alert("You do not have the permissions to do this!");
        }
    };

    const [inviteUser, setInviteUser] = useState(""); //initial cap is set at 10000
    const [invitedUsers, setInvitedUsers] = useState([]);
    const handleSubmit2 = () => {
        if (context == props.hostid) {
            setInvitedUsers([...invitedUsers, parseInt(inviteUser)])
            UserServices.inviteUser(context, eventID, inviteUser);
        } else {
            alert("You do not have the permissions to do this!");
        }
    };


    const [isCapacityPromptOpen, setIsCapacityPromptOpen] = useState(false)
    const [isInvitePrompt, setIsInvitePromptOne] = useState(false)

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
                alert("You are newly registered")
                const updatePerhaps = perhapsList.filter((curr) =>
                    context != curr)
                setperhapsList(updatePerhaps)
                const updateWont = wontAttendList.filter((curr) =>
                    context != curr)
                setwontAttendList(updateWont)
                const updateLol = lolList.filter((curr) =>
                    context != curr)
                setlolList(updateLol)
                const newWillAttendList = [...willAttendList, context];
                setwillAttendList(newWillAttendList)
            } else {
                UserServices.rsvpEvent(context, eventID, "Will Attend")
                .then((response) => response.data)
                .then((data) => {
                    if (!data.rsvpSuccess) {
                        console.log("lalalala")
                        alert("You can't register for this because: " + data.reason)
                    } else {
                        console.log("asdfasdfasdf")
                        alert("You have successfully given your rsvp.")
                        setwillAttendList(removeItem(willAttendList, context))
                        setperhapsList(removeItem(perhapsList, context))
                        setwontAttendList(removeItem(wontAttendList, context))
                        setlolList(removeItem(lolList, context))
                        const newWillAttendList = [...willAttendList, context];
                        setwillAttendList(newWillAttendList)
                    }
                });
            }
        });
    }

    const handlePerhaps = () => {
        UserServices.checkRsvp(context, eventID)
        .then((response) => response.data)
        .then((data) => {
            if (data.hasRSVP == true) {
                UserServices.editRsvp(context, eventID, "Perhaps")
                alert("You are newly registered")
                const updateAttend = willAttendList.filter((curr) =>
                    context != curr)
                setwillAttendList(updateAttend)
                const updateWont = wontAttendList.filter((curr) =>
                    context != curr)
                setwontAttendList(updateWont)
                const updateLol = lolList.filter((curr) =>
                    context != curr)
                setlolList(updateLol)
                const newPerhapsList = [...perhapsList, context];
                setperhapsList(newPerhapsList)
            } else {
                UserServices.rsvpEvent(context, eventID, "Perhaps")
                .then((response) => response.data)
                .then((data) => {
                    if (!data.rsvpSuccess) {
                        alert("You can't register for this because: " + data.reason)
                    } else {
                        alert("You have successfully given your rsvp.")
                        setwillAttendList(removeItem(willAttendList, context))
                        setperhapsList(removeItem(perhapsList, context))
                        setwontAttendList(removeItem(wontAttendList, context))
                        setlolList(removeItem(lolList, context))
                        const newPerhapsList = [...perhapsList, context];
                        setperhapsList(newPerhapsList)
                    }
                });
            }
        });
    }

    const handleWontAttend = () => {
        UserServices.checkRsvp(context, eventID)
        .then((response) => response.data)
        .then((data) => {
            if (data.hasRSVP == true) {
                UserServices.editRsvp(context, eventID, "Won't Attend")
                alert("You are newly registered")
                const updateAttend = willAttendList.filter((curr) =>
                    context != curr)
                setwillAttendList(updateAttend)
                const updatePerhaps = perhapsList.filter((curr) =>
                    context != curr)
                setperhapsList(updatePerhaps)
                const updateLol = lolList.filter((curr) =>
                    context != curr)
                setlolList(updateLol)
                const newWontAttendList = [...wontAttendList, context];
                setwontAttendList(newWontAttendList)
            } else {
                UserServices.rsvpEvent(context, eventID, "Won't Attend")
                .then((response) => response.data)
                .then((data) => {
                    if (!data.rsvpSuccess) {
                        alert("You can't register for this because: " + data.reason)
                    } else {
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
                alert("You are newly registered")
                const updateAttend = willAttendList.filter((curr) =>
                    context != curr)
                setwillAttendList(updateAttend)
                const updatePerhaps = perhapsList.filter((curr) =>
                    context != curr)
                setperhapsList(updatePerhaps)
                const updateWont = wontAttendList.filter((curr) =>
                    context != curr)
                setwontAttendList(updateWont)
                const newLolList = [...lolList, context];
                setlolList(newLolList)
            } else {
                UserServices.rsvpEvent(context, eventID, "No, lol")
                .then((response) => response.data)
                .then((data) => {
                    if (!data.rsvpSuccess) {
                        alert("You can't register for this because: " + data.reason)
                    } else {
                        alert("You have successfully given your rsvp.")
                        setwillAttendList(removeItem(willAttendList, context))
                        setperhapsList(removeItem(perhapsList, context))
                        setwontAttendList(removeItem(wontAttendList, context))
                        setlolList(removeItem(lolList, context))
                        const newLolList = [...lolList, context];
                        setlolList(newLolList)
                    }
                });
            }
        });
    }

    const handleKicked = (user) => {
        UserServices.removeRsvp(context, eventID, user)
        .then((response) => response.data)
        .then((data) => {
            if (data.success == true) {
                alert("Deleted!")
                const updateAttend = willAttendList.filter((curr) =>
                    user != curr)
                setwillAttendList(updateAttend)
                const updatePerhaps = perhapsList.filter((curr) =>
                    user != curr)
                setperhapsList(updatePerhaps)
                const updateWont = wontAttendList.filter((curr) =>
                    user != curr)
                setwontAttendList(updateWont)
                const updateLol = lolList.filter((curr) =>
                    user != curr)
                setlolList(updateLol)
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
                    <small></small>
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
                    >Current Attendees: {willAttendList.length}</h5>
                    <h5
                        rows='1'
                        cols='20'
                    >RSVP List</h5>
                    <h5
                        rows='1'
                        cols='10'
                    >Guest Capacity: {guestCapacity == 10000 ? "None" : guestCapacity}</h5>
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
                            if (context == props.hostid) {
                                setIsInvitePromptOne(!isInvitePrompt)
                            } else {
                                alert("You do not have the permissions to do this")
                            }
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
                            if (context == props.hostid) {
                                setIsCapacityPromptOpen(!isCapacityPromptOpen)
                            } else {
                                alert("You do not have the permissions to do this")
                            }
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