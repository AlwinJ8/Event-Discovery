import React from 'react';
import '../App.css';
import DashboardHeader from '../components/DashboardHeader';
import "../dashboard.css";

class Dashboard extends React.Component {

    render() {
        return (
            <div classname = "dashboard">
                <DashboardHeader />
                <div>
                    Space for future events!
                </div>
            </div>
        );
    }
}


export default Dashboard