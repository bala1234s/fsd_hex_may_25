import React, { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import '../css/CustomerDashboard.css';
import Logout from '../Logout';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import axios from 'axios';


const CustomerDashboard = () => {
    // Navigate Hook
    let navigate = useNavigate();
    let name = localStorage.getItem('name');
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        // If token missing, navigate immediately
        if (!token) {
            navigate('/login');
            return;
        }

        // Check user details only if token exists
        axios.get("http://localhost:8080/api/user/details", {
            headers: { "Authorization": "Bearer " + token }
        }).then((resp) => {
            const role = resp.data.user.role;
            console.log("User role:", role);
            if (role !== "CUSTOMER") {
                navigate('/login');
            }
        }).catch((err) => {
            console.log(err);
            navigate('/login'); // if error (maybe token expired), redirect to login
        });

    }, [navigate]);
    
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