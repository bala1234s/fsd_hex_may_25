import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [msg, setMsg] = useState("");

    // Navigator
    let navigate = useNavigate();

    const login = async () => {
        try {
            // Encode the username and password in base64 format
            let encodeString = window.btoa(username + ":" + password);

            // Fetch token by encodedString
            const getToken = await axios.get("http://localhost:8080/api/user/get-token", {
                headers: { "Authorization": "Basic " + encodeString }
            });
            console.log(getToken);

            // set user token in localStorage
            localStorage.setItem('token', getToken.data.token)

            let userDetails = await axios.get("http://localhost:8080/api/user/details", {
                headers: { "Authorization": "Bearer " + getToken.data.token }
            });
            console.log(userDetails);

            // set user name in localStorage 
            localStorage.setItem('name', userDetails.data.name);

            // Navigate based on role
            switch (userDetails.data.user.role) {
                case "CUSTOMER":
                    navigate("/customer");
                    break;
                case "OFFICER":
                    break;
                default:
                    break;
            }
            setMsg("Login Success!!!")

        } catch (error) {
            setMsg("Invalid Credentials")
            console.log(error);

        }



    }

    return (

        <div className="container" >
            {/* Giving space from top */}
            <div style={{ marginTop: "10%" }}></div>
            <div className="row ">
                {/* Giving space  */}
                <div className="col-md-3"></div>
                <div className="col-md-6" >
                    {/* Card Start */}
                    <div className="card">
                        <div className="card-header " style={{
                            backgroundColor: "lightgreen",
                            color: "white",
                            fontSize: "20px"

                        }}>Login</div>
                        {/* Card Body Start */}
                        <div className="card-body">
                            {
                                msg !==""?
                                <div class="alert alert-primary">
                                    {msg}
                                </div>:""
                            } 
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" placeholder="Enter username" onChange={($e) => setUsername($e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <input type="text" className="form-control" placeholder="Enter password" onChange={($e) => setPassword($e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-primary" onClick={() => login()}>Login</button>
                            </div>

                        </div>
                        {/* Card Body end */}

                        <div className="card-footer">Don't have account? <a href="">sign up</a> here</div>
                    </div>
                    {/* Card End */}
                </div>
                <div className="col-md-3"></div>

            </div>

        </div>
    )

}

export default Login;
