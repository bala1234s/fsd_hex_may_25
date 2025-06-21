import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import OfficerSidebar from "./OfficerSidebar"

function OfficerDashboard() { 
    return (
        <div>
            <Navbar />
            <div className="dashboard-container pt-5">
                <div className="m-5 p-5" style={{ position: "fixed", zIndex: 1000 }}>
                    <OfficerSidebar />
                </div>
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default OfficerDashboard;