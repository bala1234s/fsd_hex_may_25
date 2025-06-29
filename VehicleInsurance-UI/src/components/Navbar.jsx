import { Link } from "react-router-dom";
import "./css/Navbar.css";
import Logout from "./Logout";

function Navbar() {

    let role = localStorage.getItem('role');

    return (
        <div>
            <nav className="navbar navbar-expand-lg " >
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand" style={{ color: "rgb(24, 66, 158)" }}>Vehicle Insurance</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ justifyContent: "space-between" }}>
                        <div className="navbar-nav">

                            <div><Link to={"/"} className="nav-link active" aria-current="page" >Home</Link></div>
                            <div><Link to={"/getAllPolicy"} className="nav-link" >Policy</Link></div>
                            <div><Link to="/#review" className="nav-link">Review</Link></div>
                            <div><Link to="/#about" className="nav-link">About Us</Link></div>


                        </div>
                        <div style={{display:'flex',gap:'20px'}}>

                            <div>
                                {/* Dashboard Button will display based on the roles */}
                                {
                                    role != null && role != "" && role != undefined
                                        ? role == 'CUSTOMER' ? <Link to={'/customer/customerHome'} className="btn btn-primary">Dashboard</Link>
                                            : <Link to={'/officer/officerHome'} className="btn btn-primary">Dashboard</Link>

                                        : ""
                                }
                            </div>
                            <div>

                                {
                                    localStorage.getItem("token") !== null && localStorage.getItem("token") !== "" && localStorage.getItem("token") !== undefined
                                        ? <Logout />
                                        : <Link to={"/login"} className="btn btn-primary">Login</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}





export default Navbar;