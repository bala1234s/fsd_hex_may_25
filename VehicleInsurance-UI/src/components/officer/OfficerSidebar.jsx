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
                    <Link to="/officer/officerHome"> <li><FaHome style={{ marginRight: "8px" }} /> Dashboard</li></Link>
                    <Link to={"/officer/proposal"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} />Proposal</li></Link>
                    <Link to={"/officer/approve"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} /> Approval</li></Link>
                    <Link to={"/officer/policy-details"}><li><FaCarSide style={{ marginRight: "8px" }} /> Policy Details</li></Link>
                    <Link to={"/officer/claim-approval"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} />Claim Approval</li></Link>
                    <Link to={"/officer/addons"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} />Add Ons</li></Link>
                    <Link to={"/customer/profile"}><li><FaUser style={{ marginRight: "8px" }} /> Profile</li></Link>
                    <Link> <li><FaCog style={{ marginRight: "8px" }} /> Settings</li></Link>
                    <Logout />
                </ul>
            </Sidebar>
        </div>
    );
};

export default SideBar;