import axios from "axios";
import { useEffect, useState } from "react";


function MyInsurance() {
    const [myInsurance, setMyInsurance] = useState([]);
    useEffect(() => {
        const getMyInsurance = () => {
            axios.get("http://localhost:8080/api/policy-holder/get", {
                headers: {'Authorization':'Bearer '+localStorage.getItem('token')}
            })
                .then((resp) => { 
                    console.log(resp.data);
                    setMyInsurance(resp.data);
                }).catch((err) => { 
                    console.log(err);
                    
                })
        }
        getMyInsurance();
    }, [])
    return (
        <div className="container ">
            <h2 className="text-center mb-4 text-primary">My Insurance Policies</h2>
            <div className="row">
                {myInsurance.length === 0 && (
                    <p className="text-center text-muted">No Insurance Policies Found.</p>
                )}
                {myInsurance.map((insurance, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm border-primary">
                            <div className="card-header bg-primary text-white">
                                <h5 className="card-title mb-0">{insurance.policy.policyName}</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Status:</strong> {insurance.status}</p>
                                <p><strong>Start:</strong> {insurance.startDate}</p>
                                <p><strong>End:</strong> {insurance.endDate}</p>
                                <hr />
                                <h6>Vehicle Details:</h6>
                                <ul className="list-unstyled">
                                    <li><strong>Type:</strong> {insurance.vehicle.vehicleType}</li>
                                    <li><strong>Model:</strong> {insurance.vehicle.vehicleModel}</li>
                                    <li><strong>Reg No:</strong> {insurance.vehicle.registrationNumber}</li>
                                    <li><strong>Value:</strong> ₹{insurance.vehicle.vehicleValue}</li>
                                </ul>
                                <hr />
                                <h6>Policy Info:</h6>
                                <ul className="list-unstyled">
                                    <li><strong>Type:</strong> {insurance.policy.policyType}</li>
                                    <li><strong>Desc:</strong> {insurance.policy.description}</li>
                                    <li><strong>Price:</strong> ₹{insurance.policy.price}</li>
                                    <li><strong>Created:</strong> {insurance.policy.createdDate}</li>
                                </ul>
                            </div>
                            <div className="card-footer bg-light text-center">
                                <strong>Status </strong>
                                {insurance.active ? (
                                    <span className="badge bg-success">Active</span>
                                ) : (
                                    <span className="badge bg-danger">Inactive</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyInsurance;