import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function OfficerProfile() {
    const [profile, setProfile] = useState({});
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        // get officer details
        axios.get("http://localhost:8080/api/officer/get", {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((resp) => {
                setProfile(resp.data);
                setName(resp.data.name);
                setContact(resp.data.contact);
            })
            .catch((err) => console.log(err));
    }, []);

    const editProfile = async () => {
        const updatedProfile = { name, contact };
        console.log(updatedProfile);
        console.log(profile.id);
        
        
        try {
            // edit or update the officer details
            const response = await axios.put(`http://localhost:8080/api/officer/update/${profile.id}`, updatedProfile, {
                headers: { 'Authorization': 'Bearer ' + token }
            });

            setProfile(response.data);
            setVisible(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header" style={{ backgroundColor: "rgb(24, 66, 158)" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ color: 'white' }}><FaUserShield /> Officer Profile</h4>
                        <Button label="Edit Profile" icon="pi pi-pencil" className="p-button-outlined" style={{ backgroundColor: 'white' }} onClick={() => setVisible(true)} />
                    </div>
                </div>
                <div className="card-body">
                    <p className="form-control"><strong>Name:</strong> {profile.name}</p>
                    <p className="form-control"><strong>Contact:</strong> {profile.contact}</p>
                </div>
            </div>
        {/* Dialog Edit the Officer details */}
            <Dialog header="Edit Officer Profile" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <Button label="Save Changes" className="btn btn-primary" onClick={()=>editProfile()} />
            </Dialog>
        </div>
    );
}

export default OfficerProfile;
