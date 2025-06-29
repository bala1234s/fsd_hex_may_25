import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {


    const [profilePic, setProfilePic] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault(); // prevent page reload

        const form = event.target;

        const customerForm = {
            'name': form.name.value,
            'contact': form.contact.value,
            'aadharNumber': form.aadhar.value,
            'address': form.address.value,
            'panNumber': form.panNumber.value,
            'dob': form.dob.value,
            'user': {
                'username': form.username.value,
                'password': form.password.value
            }
        };

        console.log("Form Data:", customerForm);


        // add customer api
        axios.post("http://localhost:8080/api/customer/add", customerForm)
            .then((resp) => {
                console.log("Response:", resp.data);
                const formData = new FormData();
                formData.append("file", profilePic); // <-- Upload profile pic
                // add image to the customer table api
                axios.post(`http://localhost:8080/api/customer/upload/profile-pic/${resp.data.id}`, formData)
                    .then((res) => console.log("Image Posted"))
                    .catch(err => console.log(err))
                alert("Customer registered successfully!");
                navigate('/login')
            }).catch((err) => {
                alert('Register Failed');
                console.log(err);
                
             })


    };

    return (
        <div className="container">
            <div style={{ marginBottom: "5%" }}></div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card" style={{ border: "1px solid blue" }}>

                        <div className="card-header" style={{
                            backgroundColor: "rgb(24, 66, 158)",
                            color: "white",
                            fontSize: "20px"
                        }}>Customer Registration</div>
                        <div className="card-body">
                            {/* Register Form */}
                            <form onSubmit={handleRegister}>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact</label>
                                        <input type="text" name="contact" className="form-control" pattern="\d{10}" maxlength="10" minlength="10" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Aadhar Number</label>
                                        <input type="text" name="aadhar" className="form-control" pattern="\d{12}" maxlength="12" minlength="12" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pan Number</label>
                                        <input type="text" name="panNumber" className="form-control" required pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" maxlength="10" minlength="10" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth</label>
                                        <input type="date" name="dob" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">City</label>
                                        <input type="text" name="address" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="username" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Upload Pic</label>
                                        <input type="file" className="form-control" onChange={($e)=>setProfilePic($e.target.files[0])} required />
                                    </div>

                                    <div className="col-12">
                                        <button type="submit" style={{ backgroundColor:'rgb(24, 66, 158)'}} className="btn btn-primary">Sign in</button>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}

export default CustomerRegister;
