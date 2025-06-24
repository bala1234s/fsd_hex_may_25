import axios from "axios";
import { useState } from "react";

function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    // Add user
    const addPost = async () => {

        try {
            // simple validation
            if (!name || !email || !gender || !status) {
                alert("All fields are required!");
                return;
            }
            const newUser = {
                'name': name,
                'email': email,
                'gender': gender,
                'status': status

            };
            console.log(newUser);
            // post api for user
            const response = await axios.post('https://gorest.co.in/public/v2/users', newUser, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            console.log(response);

            alert("User added successfully");
        } catch (err) {
            console.log(err);
            alert("Operation failed");
        }
    };

    return (
        <div className="container">
            <h1>Hello</h1>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="mt-4">Post User Data</h3>

                    <div className="card p-3">
                        <div className="mb-2">
                            <label>Name:</label>
                            <input type="text" className="form-control" onChange={($e) => setName($e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <label>Email:</label>
                            <input type="email" className="form-control" onChange={($e) => setEmail($e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <label>Gender:</label>
                            <select className="form-control" onChange={($e) => setGender($e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label>Status:</label>
                            <select className="form-control" onChange={($e) => setStatus($e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div>

                            <button className="btn btn-primary mt-2" onClick={() => addPost()}>Add User</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddUser;