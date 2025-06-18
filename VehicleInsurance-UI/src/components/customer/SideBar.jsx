import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../css/SideBar.css'; // Optional: for styling
import Logout from '../Logout';
import { Link } from 'react-router-dom';
import { IoDocumentAttach } from 'react-icons/io5';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

const SideBar = () => {
    let [visible, setVisible] = useState("");
    return (
        // <div className="sidebar ">
        //     <h2 className="sidebar-logo">MyApp</h2>
        //     <ul className="sidebar-nav">
        //         <Link to="/customer/customerHome"> <li><FaHome style={{ marginRight: "8px" }} /> Dashboard</li></Link>
        //         <Link to={"/customer/my-insurance"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} /> My Insurance</li></Link>
        //         <Link><li><FaUser style={{ marginRight: "8px" }} /> Profile</li></Link>
        //         <Link> <li><FaCog style={{ marginRight: "8px" }} /> Settings</li></Link>
        //          <Logout/>
        //     </ul>
        // </div>

        <div>

            <Button icon="pi pi-bars" onClick={(e) => setVisible(true)} aria-controls={visible ? 'sbar' : null} aria-expanded={visible ? true : false} />

            <Sidebar id="sidebar" visible={visible} onHide={() => setVisible(false)} role="region">
                <ul className="sidebar-nav">
                        <Link to="/customer/customerHome"> <li><FaHome style={{ marginRight: "8px" }} /> Dashboard</li></Link>
                        <Link to={"/customer/my-insurance"}> <li><IoDocumentAttach style={{ marginRight: "8px" }} /> My Insurance</li></Link>
                        <Link to={"/customer/profile"}><li><FaUser style={{ marginRight: "8px" }} /> Profile</li></Link>
                        <Link> <li><FaCog style={{ marginRight: "8px" }} /> Settings</li></Link>
                        <Logout/>
                   </ul>
            </Sidebar>
        </div>
    );
};

export default SideBar;