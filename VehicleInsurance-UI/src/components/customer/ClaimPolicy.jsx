import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolicyHolderWithApproved } from "../../state/actions/ApprovedPolicyAction";
import axios from "axios";
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom";

function ClaimPolicy() {
    // token 
    let token = localStorage.getItem('token');
    const [description, setDescription] = useState("");
    const [damagePic, setDamagePic] = useState("");
    // Redux
    const [approvedPolicy, setApprovedPolicy] = useState(useSelector(state => state.approvedPolicy.approvedPolicy));
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        getPolicyHolderWithApproved(dispatch);
    }, [dispatch])



    // claim policy
    const claimPolicy = (policyHolderId) => {
        const claimData = {
            'description': description
        }
        console.log(claimData);
        console.log(policyHolderId);


        // Api to post the Claim
        axios.post(`http://localhost:8080/api/claim/request/${policyHolderId}`, claimData, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((resp) => {
            console.log("Claim Post");

            const formData = new FormData();
            formData.append('file', damagePic);
            // Api to post Damage Image
            axios.post(`http://localhost:8080/api/claim/upload-damage-pic/${resp.data.policyHolder.id}`, formData, {
                headers: { 'Authorization': 'Bearer ' + token }
            }).then(resp => {
                console.log("Image Post");
                getPolicyHolderWithApproved(dispatch);
                setVisible(false);
            }).catch(err => console.log(err))
            getPolicyHolderWithApproved(dispatch);

        }).catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="row">
                <h3 style={{ textAlign: 'center' }}>Claim My Insurance</h3>
                <div className="col-md-12" style={{ paddingLeft: '22rem' }}>
                    {   
                        // check the approved array is empty
                        approvedPolicy.length === 0 ? (
                            <h3 style={{ width: '30rem', padding: '2rem' }} className="card">Your Policy still not approved</h3>
                        ) : (
                            approvedPolicy.map((p) => (

                                <div className="card" key={p.id} style={{ display: 'flex', flexDirection: 'row', width: '40rem', justifyContent: 'space-between' }}>
                                    <div className="card-body pl-5">
                                        <div>
                                            <strong >Policy Name: </strong>
                                            {p.policy.policyName}
                                        </div>
                                        <div>
                                            <strong>Policy Type: </strong>
                                            {p.policy.policyType}
                                        </div>
                                        <div>
                                            <strong>Price: </strong>
                                            {p.policy.price}
                                        </div>
                                        <div>
                                            <strong>Duration: </strong>
                                            {p.startDate} TO {p.endDate}
                                        </div>
                                        <div>
                                            <strong>Status: </strong>
                                            {p.status}
                                        </div>
                                    </div>
                                    <div className="card-body pl-5">
                                        {
                                            new Date(p.endDate) < new Date() ? (
                                                <p className="text-danger mt-3"><strong>Policy Expired</strong></p>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => setVisible(true)}>Claim</button>
                                            )
                                        }
                                    </div>

                                    {/* Claim form dialog */}
                                    <Dialog header="Claim" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                        <div>
                                            <label >Description</label>
                                            <textarea type="text" className="form-control" onChange={($e) => setDescription($e.target.value)} />
                                        </div>
                                        <div className="mt-5 mb-5">
                                            <label >Upload Damage Image</label>
                                            <input type="file" className="form-control" onChange={($e) => setDamagePic($e.target.files[0])} />
                                        </div>
                                        <div>
                                            <button className="btn btn-primary" onClick={() => claimPolicy(p.id)}>Apply Claim</button>
                                        </div>
                                    </Dialog>
                                </div>
                            )))
                    }
                </div>
            </div>

        </div>
    )
}
export default ClaimPolicy;
