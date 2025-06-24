import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserDetails() {

    
    const [userDetail, setUserDetail] = useState([]);

    // token
    let token = '0becbc26928c1e9a2a9262f089c595fdbb033c5709441b6cd249bfaae9a53d4c';
    localStorage.setItem('token', token);


    // Fetch users 
    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get('https://gorest.co.in/public/v2/users');
                console.log(response.data);

                setUserDetail(response.data); 
            } catch (err) {
                console.log(err);
                
            }
        };
        getPost();
    }, []);



    // Delete user
    const onDelete = async (uid) => {
        try {
            await axios.delete(`https://gorest.co.in/public/v2/users/${uid}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let temp = userDetail.filter(u => u.id !== uid);
            setUserDetail(temp);
           
            alert("User deleted successfully");
        } catch (err) {
            console.log(err);
           
        }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', padding:'1rem'}} >
                <div>

                    <h1>User Details</h1>
                </div>
                <div>

                    <Link to={"/add-user"} className="btn btn-primary">Add User</Link>
                </div>
            </div>

            <div className="row">
                {/* Table */}
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetail.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td><Link to={ `edit-user/${user.id}`} className="btn btn-primary">Edit</Link></td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => onDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetails;
