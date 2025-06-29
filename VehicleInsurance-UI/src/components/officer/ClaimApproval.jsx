import axios from "axios";
import { useEffect, useState } from "react";

function ClaimApproval() {
    // TOken
    let token = localStorage.getItem('token');

    const [claim, setClaim] = useState([]);

    // get the claim details
    const getAllClaim = () => {
        axios.get('http://localhost:8080/api/claim/get-all', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((resp) => {
            console.log(resp.data);

            setClaim(resp.data.filter((data)=>data.policyHolder.status != "CLAIMED"));
        }).catch(err => console.log(err))
    }
    useEffect(() => {

        getAllClaim();
    }, []) 

    // Approve the claim
    const approveClaim = (policyHolderId) => { 
        console.log(policyHolderId);
        
        axios.put(`http://localhost:8080/api/claim/approve?policyHolderId=${policyHolderId}`, policyHolderId, {
            headers:{'Authorization':'Bearer '+ token}
        }).then((resp) => { 
            console.log(resp);
            getAllClaim();
            setClaim((pre) => [...pre, resp.data]);

        }).catch(err=>console.log(err))
    }
    return (
        <div className="container">
                    <div className="row">
                        <div className="col-md-12" style={{paddingLeft:'12rem'}}>
                        {
                        claim.length === 0 ? (
                            <h3>No Claim Data</h3>
                        ) : (
                            claim.map((p) => (
                                <div className="card" key={p.id} style={{ display: 'flex', flexDirection: 'row', width: '60rem', justifyContent: 'space-between' }}>
                                    {/* Display the claim details */}
                                    <div className="card-body" >
                                        <img src={`../ClaimImages/${p.image}`} alt="" />
                                    </div>
                                    <div className="card-body ml-5">
                                        <div><strong>Customer Name: </strong>{p.policyHolder.vehicle.customer.name}</div>
                                        <div><strong>Policy Name: </strong>{p.policyHolder.policy.policyName}</div>
                                        <div><strong>Policy Type: </strong>{p.policyHolder.policy.policyType}</div>
                                        <div><strong>Price: </strong>{p.policyHolder.policy.price}</div>
                                        <div><strong>Duration: </strong>{p.policyHolder.startDate} TO {p.policyHolder.endDate}</div>
                                        <div><strong>Status: </strong>{p.status}</div>
                                        <hr />
                                        <div><strong>Reason of Claim: </strong>{p.description}</div>
                                    </div>
                                    <div className="card-body ml-5">
                                        <button className="btn btn-primary" onClick={() => approveClaim(p.policyHolder.id)}>Approve</button>
                                    </div>
                                </div>
                            ))
                        )
                    }

                        </div>
                    </div>
                    
                </div>
    )
}
export default ClaimApproval;