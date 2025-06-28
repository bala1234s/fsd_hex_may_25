import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import OfficerSidebar from "./OfficerSidebar"

function OfficerDashboard() { 
    return (
        <div>
            <Navbar />
            <div className="dashboard-container pt-5 dashboard-content">
                <div style={{ position: "fixed", zIndex: 100, paddingTop:'4rem'}}>

                    <OfficerSidebar className="m-5 p-5"  />
                </div>
                <div style={{marginTop:'3rem',width:'100%'}}>
                    <Outlet  />

                </div>
           
             
            </div>

        </div>
    )
}

export default OfficerDashboard;