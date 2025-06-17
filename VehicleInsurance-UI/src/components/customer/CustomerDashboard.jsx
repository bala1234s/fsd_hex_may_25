import React, { useEffect } from 'react';
import SideBar from './SideBar';
import '../css/CustomerDashboard.css';
import Logout from '../Logout';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

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
        <div>
           
            <div className="dashboard-container ">
            <SideBar />
            <Outlet />

            </div>
        </div>
        
    );
};

export default CustomerDashboard;