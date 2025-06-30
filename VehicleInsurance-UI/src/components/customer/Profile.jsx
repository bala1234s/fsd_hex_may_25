import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function Profile() {
    let [profile, setProfile] = useState({});
    let [visible, setVisible] = useState(false);
    let [profilePic, setProfilePic] = useState("");
    let [aadharDoc, setAadharDoc] = useState("");
    let [panDoc, setPanDoc] = useState("");

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
    const editProfile = async (event) => {
        event.preventDefault(); // 
        const form = event.target;

        const updatedProfile = {
            name: form.name.value,
            contact: form.contact.value,
            address: form.address.value,
            dob: form.dob.value,
            panNumber: form.panNumber.value,
            aadharNumber: form.aadharNumber.value 
        };

        try {
            // Only upload if a file is selected
            if (profilePic && typeof profilePic !== "string") {
                const formData = new FormData();
                formData.append('file', profilePic);

                const uploadResp = await axios.post(
                    `http://localhost:8080/api/customer/upload/profile-pic/${profile.id}`,
                    formData,
                    { headers: { 'Authorization': 'Bearer ' + token } }
                );
                updatedProfile.profilePic = uploadResp.data.profilePic;
            }
            if (aadharDoc && typeof aadharDoc !== "string") {
                const formData = new FormData();
                formData.append('file', aadharDoc);

                const uploadResp = await axios.post(
                    `http://localhost:8080/api/customer/upload/aadhar/${profile.id}`,
                    formData,
                    { headers: { 'Authorization': 'Bearer ' + token } }
                );
                updatedProfile.profilePic = uploadResp.data.profilePic;
            }
            if (panDoc && typeof panDoc !== "string") {
                const formData = new FormData();
                formData.append('file', panDoc);

                const uploadResp = await axios.post(
                    `http://localhost:8080/api/customer/upload/pan/${profile.id}`,
                    formData,
                    { headers: { 'Authorization': 'Bearer ' + token } }
                );
                updatedProfile.profilePic = uploadResp.data.profilePic;
            }

            const updateResp = await axios.put(
                `http://localhost:8080/api/customer/update/${profile.id}`,
                updatedProfile,
                { headers: { 'Authorization': 'Bearer ' + token } }
            );

            setProfile(updateResp.data);
            setProfilePic(updateResp.data.profilePic);
            setVisible(false);
            alert('Profile updated successfully');

        } catch (error) {
            console.log("Update error:", error);
            alert('Error updating profile');
        }
    };
    
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
                                        <input type="file" className="form-control"  onChange={($e) => setProfilePic($e.target.files[0])} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Upload Aadhar</label>
                                        <input type="file" className="form-control" onChange={($e) => setAadharDoc($e.target.files[0])} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Upload Pan</label>
                                        <input type="file" className="form-control" onChange={($e) => setPanDoc($e.target.files[0])} />
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
                            <iframe
                                src={`../PanDoc/${profile.panDoc}`}
                                width="100%"
                                height="400px"
                                title="PDF Viewer"
                            />
                            <iframe
                                src={`../AadharDoc/${profile.aadharDoc}`}
                                width="100%"
                                height="400px"
                                title="PDF Viewer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile; 