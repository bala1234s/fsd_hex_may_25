import axios from "axios";
import { useState } from "react";

function CustomerRegister() {

   

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

        // formData.append("name", form.name.value);
        // formData.append("contact", form.contact.value);
        // formData.append("aadharNumber", form.aadhar.value);
        // formData.append("address", form.address.value);
        // formData.append("panNumber", form.panNumber.value);
        // formData.append("dob", form.dob.value);
        // formData.append("username", form.username.value);
        // formData.append("password", form.password.value);
        // formData.append("file", profilePic); // <-- Upload profile pic

        try {
            const resp = await axios.post("http://localhost:8080/api/customer/add", customerForm);
            
            console.log("Response:", resp.data);
            alert("Customer registered successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed!");
        }
    };

    return (
        <div className="container">
            <div style={{ marginBottom: "10%" }}></div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card" style={{ border: "1px solid blue" }}>
                        <div className="card-header" style={{
                            backgroundColor: "blue",
                            color: "white",
                            fontSize: "20px"
                        }}>Customer Registration</div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Contact</label>
                                        <input type="text" name="contact" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Aadhar Number</label>
                                        <input type="text" name="aadhar" className="form-control" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Pan Number</label>
                                        <input type="text" name="panNumber" className="form-control" required />
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
                                    
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Sign in</button>
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
