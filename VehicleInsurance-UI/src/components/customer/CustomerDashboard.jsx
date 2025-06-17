import React, { useEffect } from 'react';
import SideBar from './SideBar';
import '../css/CustomerDashboard.css';
import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
    // Navigate Hook
    let navigate = useNavigate();
    let name = localStorage.getItem('name');
    useEffect(() => { 
        let token = localStorage.getItem('token');
        if (token == null || token == "" || token == undefined) { 
            navigate('/');
        }
        

    })
    return (
        <div className="dashboard-container">
            <SideBar />
            <div className="dashboard-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12"><h1>Welcome, {name}</h1></div>
                   
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default CustomerDashboard;