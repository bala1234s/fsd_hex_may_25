import React from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../css/SideBar.css'; // Optional: for styling
import Logout from '../Logout';

const SideBar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-logo">MyApp</h2>
            <ul className="sidebar-nav">
                <li><FaHome /> Dashboard</li>
                <li><FaUser /> Profile</li>
                <li><FaCog /> Settings</li>
                 <Logout/>
            </ul>
        </div>
    );
};

export default SideBar;