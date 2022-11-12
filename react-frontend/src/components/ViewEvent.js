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
    const [eventTimeDate, setEventTimeDate] = useState(props.timeDate);
    const [open, setOpen] = useState(false);
    const [statusState, setStatusState] = useState("Will Attend")
    const [isInviteOnly, setisInviteOnly] = useState(false) //use for invite only
    const [guestCapacity, setGuestCapacity] = useState(10000); //initial cap is set at 10000
    const [isCapacityPromptOpen, setIsCapacityPromptOpen] = useState(false)

    const handleExitClick = () => {
        props.trigger(false);
    }

    //This is lists storing different attendance statuses
    const [willAttendList, setwillAttendList] = useState([]);
    const [perhapsList, setperhapsList] = useState([]);
    const [wontAttendList, setwontAttendList] = useState([]);
    const [lolList, setlolList] = useState([]);

    const handleWillAttend = () => {
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))

        const newWillAttendList = [...willAttendList, context];
        setwillAttendList(newWillAttendList)
    }
    const handlePerhaps = () => {
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))

        const newPerhapsList = [...perhapsList, context];
        setperhapsList(newPerhapsList)
    }
    const handleWontAttend = () => {
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))

        const newWontAttendList = [...wontAttendList, context];
        setwontAttendList(newWontAttendList)
    }
    const handleKicked = () => {
        setwillAttendList(removeItem(willAttendList, context))
        setperhapsList(removeItem(perhapsList, context))
        setwontAttendList(removeItem(wontAttendList, context))
        setlolList(removeItem(lolList, context))

        const newLolList = [...lolList, context];
        setlolList(newLolList)
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
                    <h5>Event Host: User Who Created Event</h5>
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
                    >Guest Capacity: {guestCapacity == 10000 ? "None" : {guestCapacity}}</h5>
                </div>
                <div className='headerTing'>
                    <div className='twoButtons'>
                        <div className="inviteOnlyButton" onClick={()=>{
                            setisInviteOnly(!isInviteOnly); //Should only work if user is host of event
                            }}>Toggle Invite-Only
                        </div>
                        <div className="inviteOnlyButton" onClick={()=>{
                            setIsCapacityPromptOpen(!isCapacityPromptOpen) //Should only work if user is host of event
                            }}>Set Capacity
                        </div>
                    </div>
                    <h5 className='sometext' > View Attendees by Status </h5>
                </div>
                <div className='selector'>
                    <div className={statusState === "Will Attend" ? "selected" : "button"}  onClick={()=>{setStatusState("Will Attend")}}>Will Attend </div>
                    <div className={statusState === "Perhaps" ? "selected" : "button"} onClick={()=>{setStatusState("Perhaps")}}>Perhaps</div>
                    <div className={statusState === "Won't Attend" ? "selected" : "button"} onClick={()=>{setStatusState("Won't Attend")}}>Won't Attend</div>
                    <div className={statusState === "No, lol" ? "selected" : "button"} onClick={()=>{setStatusState("No, lol")}}>Kicked</div>
                </div>
                <div className='displayedList'>
                    {statusState == "Will Attend" ? <text className='alist'>{willAttendList.map((user) => (
                            <div className='alistCell'>
                                {user}
                                <div className="removeButton" onClick={()=>{
                                    handleKicked()
                                }}>Remove Attendee</div>
                            </div>
                        ))}
                    </text> : null}

                    {statusState == "Perhaps" ? <text className='alist'>{perhapsList.map((user) => (
                            <div className='alistCell'>
                                {user}
                                <div className="removeButton" onClick={()=>{
                                    handleKicked()
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