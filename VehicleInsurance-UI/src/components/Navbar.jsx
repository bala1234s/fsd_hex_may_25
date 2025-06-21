import { Link } from "react-router-dom";
import "./css/Navbar.css"; 
import Logout from "./Logout";

function Navbar() { 


   
    return (
        <div>
            <nav className="navbar navbar-expand-lg " >
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ color:"rgb(24, 66, 158)"}}>Vehicle Insurance</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ justifyContent: "space-between" }}>
                        <div className="navbar-nav">
                            
                            <div><Link to={"/"} className="nav-link active" aria-current="page" href="#">Home</Link></div>
                            <div><Link to={"/getAllPolicy"} className="nav-link" href="#">Policy</Link></div>
                            <div><Link className="nav-link" href="#">Contact</Link></div>
                            
                            
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
            </nav>
        </div>
    )
}





export default Navbar;