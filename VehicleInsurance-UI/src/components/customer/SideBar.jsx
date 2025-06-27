import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaCarSide } from 'react-icons/fa';
import '../css/SideBar.css'; // Optional: for styling
import Logout from '../Logout';
import { Link } from 'react-router-dom';
import { IoDocumentAttach } from 'react-icons/io5';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

const SideBar = () => {
    let [visible, setVisible] = useState("");

    return (


        <div>

            <Button icon="pi pi-bars" style={{ backgroundColor: "rgb(24, 66, 158)" }} onClick={(e) => setVisible(true)} aria-controls={visible ? 'sbar' : null} aria-expanded={visible ? true : false} />

            <Sidebar id="sidebar" visible={visible} onHide={() => setVisible(false)} role="region">
                <ul className="sidebar-nav">
                    <Link to="/customer/customerHome"> <li><FaHome style={{ marginRight: "8px" }} /> Dashboard</li></Link>
                    <Link to={"/getAllPolicy"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} />Apply Insurance</li></Link>
                    <Link to={"/customer/my-insurance"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} /> My Insurance</li></Link>
                    <Link to={"/customer/claim-policy"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} />Claim Insurance</li></Link>

                    <Link to={"/customer/profile"}><li><FaUser style={{ marginRight: "8px" }} /> Profile</li></Link>
                    <Link to={"/customer/vehicle"}><li><FaCarSide style={{ marginRight: "8px" }} /> My Vehicle</li></Link>
                    <Link> <li><FaCog style={{ marginRight: "8px" }} /> Settings</li></Link>
                    <Logout />
                </ul>
            </Sidebar>
        </div>
    );
};

export default SideBar;