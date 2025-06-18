import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import '../css/CustomerDashboard.css';
import Logout from '../Logout';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';


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
            <Navbar />

            <div className="dashboard-container pt-5">

                <div className="m-5 p-5" style={{ position:"fixed",zIndex:1000}}>
                    <SideBar  />
                    
                    
                    
                </div>


                <div className="dashboard-content">

                    <Outlet />
                </div>

            </div>
        </div>

    );
};

export default CustomerDashboard;