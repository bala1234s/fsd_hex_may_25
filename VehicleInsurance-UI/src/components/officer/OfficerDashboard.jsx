import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import OfficerSidebar from "./OfficerSidebar"
import { useEffect } from "react";
import axios from "axios";

function OfficerDashboard() { 
    const navigate = useNavigate();
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
                if (role !== "OFFICER") {
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