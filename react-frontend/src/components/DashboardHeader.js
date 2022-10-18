import React from 'react';
import '../App.css';
import Logo from "../images/GT_logo.png";
import "../dashboardHeader.css";
import { Link } from "react-router-dom";

class DashboardHeader extends React.Component {

    render() {

        return (
            <div className="navbar">
            <div className="leftSide" >
                <img src={Logo} />
            </div>
            <div className='center'>
                Header
            </div>
            <div className="rightSide">
                <Link className="createline" to=""> Create Event </Link>
                <Link className="filterline" to=""> Filter Event </Link>

            </div>
            </div>
        );
    }
}

export default DashboardHeader