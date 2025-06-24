import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() { 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    
    let param = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        // Fetch user by userid
        const getUser = async () => {
            try {
                let response = await axios.get(`https://gorest.co.in/public/v2/users/${param.uid}`);
                console.log(response.data);
                const data = response.data;
                setName(data.name);
                setEmail(data.email);
                setGender(data.gender);
                setStatus(data.status);

                
            } catch (error) {
                console.log("Error loading user:", error);
            }
        };
        getUser();
    }, []);

    const editedUser = async () => { 

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

            // edit user
            let resp = await axios.put(`https://gorest.co.in/public/v2/users/${param.uid}`, newUser, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            console.log(resp.data);
            alert('Successfully Edited')
            navigate('/');
            
        }
        catch (err) { 
            console.log(err);
            alert('Failed to Edit')
            
        }

    }

    return (
        <div className="container">
          
            <div className="row">
                <div className="col-md-12">
                    <h3 className="mt-4">Edit User Data</h3>

                    <div className="card p-3">
                        <div className="mb-2">
                            <label>Name:</label>
                            <input type="text"  value={name} className="form-control" onChange={($e) => setName($e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label>Email:</label>
                            <input type="email" value={email} className="form-control" onChange={($e) => setEmail($e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label>Gender:</label>
                            <select className="form-control" onChange={($e) => setGender($e.target.value)}>
                                <option value={gender}>{ gender}</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label>Status:</label>
                            <select className="form-control" onChange={($e) => setStatus($e.target.value)}>
                                <option value={status}>{ status}</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div>

                            <button className="btn btn-primary mt-2" onClick={() => editedUser()}>Add User</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditUser;