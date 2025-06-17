import React from 'react';

function SideBar() {
    return (
        <div className="sidebar">
            <h2>Dashboard Menu</h2>
            <ul>
                <li><a href="#all-policies">All Policies</a></li>
                <li><a href="#my-policies">My Policies</a></li>
                <li><a href="#claims">Claims</a></li>
                <li><a href="#profile">Profile</a></li>
                <li><a href="#support">Support</a></li>
            </ul>
        </div>
    );
}

export default SideBar;