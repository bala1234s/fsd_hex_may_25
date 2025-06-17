import { Link } from "react-router-dom";
import "./css/Navbar.css"; 
function Navbar() { 
    return (
        <div>
            <nav className="navbar navbar-expand-lg " style={{
                backgroundColor: "skyblue",
                padding: "10px 20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                position:"fixed",
                top: 0,
                width: "100%",
                zIndex: 1000
            }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Vehicle Insurance</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            
                            <div><Link to={"/"} className="nav-link active" aria-current="page" href="#">Home</Link></div>
                            <div><Link to={"/getAllPolicy"} className="nav-link" href="#">Policy</Link></div>
                            <div><Link className="nav-link" href="#">Contact</Link></div>
                            
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;