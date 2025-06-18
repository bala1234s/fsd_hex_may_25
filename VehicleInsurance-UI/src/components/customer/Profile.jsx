import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

function Profile() { 
    let [profile, setProfile] = useState({})

    useEffect(() => { 
        const getCustomerProfile = () => { 
            axios.get("http://localhost:8080/api/customer/get-one", {
                headers: {'Authorization':'Bearer '+ localStorage.getItem('token')}
            })
                .then((resp) => { 
                    console.log(resp.data);
                    
                    setProfile(resp.data);
                }).catch((err) => { 
                    console.log(err);
                    
                })
        }

        getCustomerProfile();
    },[])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header"><h4><FaUser />Profile</h4></div>
                        <div className="card-body">
                            <p className="form-control"><strong>Name </strong>{profile.name}</p>
                            <p className="form-control"><strong>Contact </strong>{profile.contact}</p>
                            <p className="form-control"><strong>Address </strong>{profile.address}</p>
                            <p className="form-control"><strong>DOB </strong>{profile.dob}</p>
                            <p className="form-control"><strong>Age </strong>{profile.age}</p>
                            <p className="form-control"><strong>Pan Number </strong>{profile.panNumber}</p>
                            <p className="form-control"><strong>Aadhar Number </strong>{profile.aadharNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;