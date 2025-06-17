import React from 'react';
import AllPolicy from './AllPolicy';
import SideBar from './SideBar';

function CustomerDashboard() {
    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                <h1>Customer Dashboard</h1>
                <AllPolicy />
            </div>
        </div>
    );
}

export default CustomerDashboard;