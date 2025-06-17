import React from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../css/SideBar.css'; // Optional: for styling
import Logout from '../Logout';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-logo">MyApp</h2>
            <ul className="sidebar-nav">
                <li><Link to="/customer/customerHome"> <FaHome /> Dashboard</Link></li>
                <li><Link>My Insurance</Link></li>
                <li><Link><FaUser /> Profile</Link></li>
                <li><Link><FaCog /> Settings</Link></li>
                 <Logout/>
            </ul>
        </div>
    );
};

export default SideBar;