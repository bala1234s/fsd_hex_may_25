import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Profile() {
    let [profile, setProfile] = useState({});
    let [visible, setVisible] = useState(false);
    let [profilePic, setProfilePic] = useState("");

    // Token 
    let token = localStorage.getItem('token');

    useEffect(() => {
        // get customer details
        const getCustomerProfile = () => {
            axios.get("http://localhost:8080/api/customer/get-one", {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then((resp) => {
                    console.log(resp.data);
    
                    setProfile(resp.data);
                }).catch((err) => {
                    console.log(err);
    
                })
        }

        getCustomerProfile();//<-- calling customer details
    }, [])

    const uploadImage = () => { 
        const formData = new FormData();
        formData.append('file', profilePic);

        //upload profile pic
        axios.post(`http://localhost:8080/api/customer/upload/profile-pic/${profile.id}`, formData, {
            headers: {'Authorization':'Bearer '+token}
        }).then((resp) => { 
            console.log(resp.data.profilePic);
            setProfilePic(resp.data.profilePic); 
            setProfile(resp.data);
            alert('Uploaded Success');

        }).catch((err) => { 
            console.log(err);
            
        })

    }

    // edit the profile 
    const editProfile = (event) => {
        event.preventDefault();
        let formProfile = event.target;
        console.log(profile.id);

        let updatedProfile = {
            'name': formProfile.name.value,
            'contact': formProfile.contact.value,
            'address': formProfile.address.value,
            'dob': formProfile.dob.value,
            'panNumber': formProfile.panNumber.value,
            'addharNumber': formProfile.aadharNumber.value
        }
        console.log(updatedProfile);
        uploadImage();
        // Update profile using axios
        axios.put(`http://localhost:8080/api/customer/update/${profile.id}`, updatedProfile, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then((resp) => {
            console.log("Updated :" + resp.data);
            setVisible(false);
            setProfile(resp.data);
            setProfilePic(resp.data.profilePic);
        }).catch((err) => {
            console.log(err);

        })


    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor:"rgb(24, 66, 158)"}}> 
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>

                                <h4 style={{ color: 'white' }}><FaUser  />Profile</h4>
                                <Button label="Edit Profile" icon="pi pi-pencil" style={{backgroundColor:'white'}} className="p-button-outlined" onClick={() => setVisible(true)} />
                            </div>
                            {/* Dialog prime react */}
                            <Dialog header="Edit Profile" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <form onSubmit={editProfile}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" defaultValue={profile.name} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Contact</label>
                                        <input type="text" className="form-control" id="contact" defaultValue={profile.contact} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" defaultValue={profile.address} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">DOB</label>
                                        <input type="date" className="form-control" id="dob" defaultValue={profile.dob} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">PAN Number</label>
                                        <input type="text" className="form-control" id="panNumber" defaultValue={profile.panNumber} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Aadhar Number</label>
                                        <input type="text" className="form-control" id="aadharNumber" defaultValue={profile.aadharNumber} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Upload Profile</label>
                                        <input type="file" className="form-control" onChange={($e) => setProfilePic($e.target.files[0])} />
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" type="submit" >Save Changes</button>
                                    </div>
                                </form>
                            </Dialog>
                        </div>

                        <div className="card-body">
                            <strong>Profile Pic</strong>
                            {/* Display the Profile Details */}
                            <img src={`../ProfilePic/${profile.profilePic}`} alt="Profile" class="img-thumbnail" style={{
                                height:'200px', width:'200px',borderRadius:'50%'
                            }}/>

                            <p className="form-control"><strong>Name </strong>{profile.name}</p>
                            <p className="form-control"><strong>Contact </strong>{profile.contact}</p>
                            <p className="form-control"><strong>City </strong>{profile.address}</p>
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