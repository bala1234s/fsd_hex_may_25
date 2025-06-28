import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [msg, setMsg] = useState("");

    // Navigator
    let navigate = useNavigate();

    // Toast message
    const toast = useRef(null);

    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    }
    const login = async () => {
        try {
            if (!username || !password) { 
                alert("Please fill all fields")
                return;
            }
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
            
            showSuccess("Login Success")// <-- Toast Message Login Success
            // set role
            localStorage.setItem('role', userDetails.data.user.role);
            setTimeout(() => { 

                // Navigate based on role
                switch (userDetails.data.user.role) {
                    case "CUSTOMER":
                        navigate("/customer/customerHome");
                        break;
                    case "OFFICER":
                        navigate("/officer/officerHome")
                        break;
                    default:
                        break;
                }
            },1000)


        } catch (error) {
            showError("Invaild Credentials");
            console.log(error);

        }



    }

    return (

        <div className="container" >
            <Toast style={{ zIndex: 1000 }} ref={toast} />
            {/* Giving space from top */}
            <div style={{ marginTop: "10%" }}></div>
            <div className="row ">
                {/* Giving space  */}
                <div className="col-md-3"></div>
                <div className="col-md-6" >
                    {/* Card Start */}
                    <div className="card">
                        <div className="card-header " style={{
                            backgroundColor: "rgb(24, 66, 158)",
                            color: "white",
                            fontSize: "20px"

                        }}>Login</div>
                        {/* Card Body Start */}
                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" placeholder="Enter username" onChange={($e) => setUsername($e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <input type="text" className="form-control" placeholder="Enter password" onChange={($e) => setPassword($e.target.value)} required/>
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-primary" style={{ backgroundColor: "rgb(24, 66, 158)" }} onClick={() => login()}>Login</button>

                            </div>

                        </div>
                        {/* Card Body end */}

                        <div className="card-footer">Don't have account? <Link to={"/customerRegister"}>sign up</Link> here</div>
                    </div>
                    {/* Card End */}
                </div>
                <div className="col-md-3"></div>

            </div>

        </div>
    )

}

export default Login;
