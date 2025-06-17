import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Logout() {
    let navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <button className="btn btn-danger" onClick={() => logOut()}>Logout <FaSignOutAlt /></button>
    )
}

export default Logout;