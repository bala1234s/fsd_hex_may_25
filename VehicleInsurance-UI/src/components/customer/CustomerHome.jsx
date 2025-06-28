import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

function CustomerHome() {
    const name = localStorage.getItem('name');
    let token = localStorage.getItem('token');
    const [insurance, setInsurance] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [visible, setVisible] = useState(false);
    const [comments, setComments] = useState("");
    const [rating, setRating] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:8080/api/policy-holder/get", {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(res => {
                console.log(res.data);

                setInsurance(res.data);

                const allVehicles = res.data.map(item => item.vehicle);
                setVehicles(allVehicles);
            })
            .catch(err => console.error("Error fetching insurance:", err));
    }, []);

    const addReview = (customerId, policyId) => {
        const reviewObj = {
            'comments': comments,
            'rating': rating
        }
       
        axios.post(`http://localhost:8080/api/review/add/${customerId}/${policyId}`, reviewObj, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((resp) => {
            alert('Review Added');
            setVisible(false);
        }).catch(err => console.log(err))
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Welcome, {name}</h2>

            {/* Dashboard Summary */}
            <div className="row text-center mb-4 ">
                <div className="col-md-6">
                    <div className="card p-5">
                        <h4>Total Vehicles</h4>
                        <p className="fs-3 fw-bold text-info">{vehicles.length}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-5">
                        <h4>Total Policies</h4>
                        <p className="fs-3 fw-bold text-success">{insurance.length}</p>
                    </div>
                </div>
            </div>

            {/* Vehicles Section */}
            <div className="mb-4">
                <h5 className="text-dark"> Your Vehicles</h5>
                <div className="row">
                    {vehicles.length === 0 ? (
                        <p className="text-muted">No vehicles found.</p>
                    ) : (
                        vehicles.map((v, i) => (
                            <div className="col-md-4 mb-3" key={i}>
                                <div className="card p-4">
                                    <h5 className="text-primary">{v.vehicleModel}</h5>
                                    <p><strong>Type:</strong> {v.vehicleType}</p>
                                    <p><strong>Reg No:</strong> {v.registrationNumber}</p>
                                    <p><strong>Value:</strong> ₹{v.vehicleValue}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Policies Section */}
            <div>
                <h5 className="text-dark"> Your Policies</h5>
                <div className="row">
                    {insurance.map((item, index) => (
                        <div className="col-md-6 mb-3" key={index}>
                            <div className="card p-5">
                                <h5 className="mb-3 text-primary">{item.policy.policyName}</h5>

                                {/* Show policy status */}
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`badge bg-${item.status === "PAID" ? "success" : "warning"}`}>
                                        {item.status}
                                    </span>
                                </p>

                                {/* Show start and end dates */}
                                <p><strong>Start Date:</strong> {item.startDate}</p>
                                <p><strong>End Date:</strong> {item.endDate}</p>

                                {/* Plan year and price */}
                                <p><strong>Plan Year:</strong> {item.planYear}</p>
                                <p><strong>Price:</strong> ₹{item.policy.price}</p>

                                {/* Active or Inactive */}
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {item.active ? (
                                        <span className="text-success">Active</span>
                                    ) : (
                                        <span className="text-danger">Inactive</span>
                                    )}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={() => setVisible(true)} >Add Review</button>
                                <Dialog header="Review" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                    <div className="mb-2">
                                        <label >Comments</label>
                                        <textarea onChange={($e) => setComments($e.target.value)} className="form-control"></textarea>
                                    </div>
                                    <div className="mb-2">
                                        <label >Rating</label>
                                        <input type="number" onChange={($e) => setRating($e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-2">
                                        <button className="btn btn-primary" onClick={() => addReview(item.vehicle.customer.id, item.policy.id)}>Add Review</button>
                                    </div>
                                </Dialog>
                            </div>
                        </div>


                    ))
                        
                    
                    }

                    
                </div>
            </div>
        </div>
    );
}

export default CustomerHome;
