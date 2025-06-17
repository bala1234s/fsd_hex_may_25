import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function CustomerRegister() {
    let [name, setName] = useState("");
    let [contact, setContact] = useState("");
    let [address, setAddress] = useState("");
    let [aadhar, setAadhar] = useState("");
    let [panNumber, setPanNumber] = useState("");
    let [dob, setDob] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let register = async () => {
        let form = {
            'name': name,
            'contact': contact,
            'aadharNumber': aadhar,
            'address':address,
            'panNumber': panNumber,
            'DOB': dob,
            'user': {
                'username': username,
                'password': password
            }
        }

        console.log(form);
        try {
            
            const resp = await axios.post("http://localhost:8080/api/customer/add",form);
            console.log(resp);
            
        } catch (error) {
            console.log(error);
            
        }

    }




    return (
        <div className="container">
            <div style={{marginBottom:"10%"}}></div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">

                    <div className="card" style={{border:"1px solid blue"}}>
                        <div className="card-header" style={{
                            backgroundColor: "blue",
                            color: "white",
                            fontSize: "20px"
                        }}>Customer Registration</div>
                        <div className="card-body">
                            {/* Form start */}
                            <div className="row g-3" >
                                <div className="col-md-6">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" onChange={($e) => setName($e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Contact</label>
                                    <input type="text" className="form-control" onChange={($e) => setContact($e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Aadhar Number</label>
                                    <input type="text" className="form-control" onChange={($e) => setAadhar($e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Pan Number</label>
                                    <input type="text" className="form-control" onChange={($e) => setPanNumber($e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Date of Birth</label>
                                    <input type="date" className="form-control" onChange={($e) => setDob($e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" onChange={($e) => setAddress($e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" onChange={($e) => setUsername($e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" onChange={($e) => setPassword($e.target.value)} />
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-primary" onClick={() => register()}>Sign in</button>
                                </div>
                            </div>
                            {/* Form end */}
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )

}
export default CustomerRegister;