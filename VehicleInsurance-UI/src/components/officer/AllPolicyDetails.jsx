import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPolicies } from "../../state/actions/AllPolicyActions";
import { Button } from "primereact/button";
import axios from "axios";

import { Dialog } from 'primereact/dialog';

function AllPolicyDetails() {

    // Token 
    let token = localStorage.getItem('token');
    
    const [policyName, setPolicyName] = useState("");
    const [policyType, setPolicyType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const [policy, setPolicy] = useState(useSelector(state => state.allPolicy.allPolicy));
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [editVisible, setEditVisible] = useState(false);


    const itemsPerPage = 2;
    let [page, setPage] = useState(0);

    const paginatedPolicies = policy.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    // console.log(allPolicy);
    useEffect(() => {
        fetchAllPolicies(dispatch);
    }, [dispatch])

    const addPolicy = () => { 
        let policyData = {
            'policyName': policyName,
            'policyType': policyType,
            'description': description,
            'price':price
        }

        axios.post('http://localhost:8080/api/policy/add', policyData, {
            headers: { "Authorization":'Bearer '+token}
        }).then((resp) =>{
            setPolicy(prev => [...prev, resp.data]);
            setVisible(false);
           
        }).catch(err=>console.log(err))
    }


    const editPolicy = (policy) => {
        setSelectedPolicy(policy);
        setEditVisible(true);
    };

    const deletePolicy = (id) => {
        axios.delete(`http://localhost:8080/api/policy/delete/${id}`, {
            headers: { "Authorization": 'Bearer ' + token }
        }).then(() => {
            setPolicy(prev => prev.filter(p => p.id !== id));
            alert("Policy deleted successfully!");
        }).catch(err => console.log(err));
    };
    
    const updatePolicy = () => {
        axios.put(`http://localhost:8080/api/policy/update/${selectedPolicy.id}`, selectedPolicy, {
            headers: { "Authorization": 'Bearer ' + token }
        }).then(resp => {
            setPolicy(prev => prev.map(p => p.id === resp.data.id ? resp.data : p));
            setEditVisible(false);
            setSelectedPolicy(null);
            fetchAllPolicies(dispatch);
            alert("Policy updated successfully!");
        }).catch(err => console.log(err));
    };
    
    
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 " style={{display:'flex',justifyContent:'space-between'}}>
                    <div>

                        <h1>All Policies</h1>
                    </div>
                    <div>

                        <button style={{ backgroundColor: 'rgb(24, 66, 158)' }} className="btn btn-primary" onClick={() => setVisible(true)}>Add Policy</button>

                    </div>
                </div>
                <div className="col-md-12" style={{ display: 'flex', justifyContent: 'space-between' , gap:'20px'}}>
                    {
                        paginatedPolicies.map((p) => (

                            <div className="col-sm-6" key={p.id}  >
                                <div className="card" >
                                    <div className="card-body">
                                        <h5 className="card-title">Policy: {p.policyName}</h5>
                                        <p className="card-text">Policy Type: {p.policyType} </p>
                                        <p className="card-text">Description: {p.description}</p>
                                        <p className="card-text">Price: {p.price}</p>
                                        <div className="card-text">Created Date: {p.createdDate}</div>
                                    </div>
                                    <div className="card-footer">
                                        <Button
                                            icon="pi pi-pencil"
                                            className="p-button-rounded p-button-info"
                                            onClick={() => editPolicy(p)}
                                        />
                                        <Button
                                            icon="pi pi-trash"
                                            className="p-button-rounded p-button-danger ml-2"
                                            onClick={() => deletePolicy(p.id)}
                                        />

                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" onClick={() => {
                    if (page > 0) setPage(page - 1);
                }}>Previous</button>

                <button className="btn btn-primary" onClick={() => {
                    if ((page + 1) * itemsPerPage < policy.length) setPage(page + 1);
                }}>Next</button>
            </div>
            
           
            <Dialog header="Policy" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                
                    <div className="mb-3">
                        <label >Enter the Policy Name</label>
                        <input type="text" className="form-control" onChange={($e)=>setPolicyName($e.target.value)} />
                        
                    </div>
                    <div className="mb-3">
                        <label >Enter the Policy Type</label>
                        <input type="text" className="form-control" onChange={($e) => setPolicyType($e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label >Decription</label>
                        <textarea className="form-control" onChange={($e) => setDescription($e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label >Policy Price</label>
                        <input type="number" className="form-control" onChange={($e) => setPrice($e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button style={{ backgroundColor: 'rgb(24, 66, 158)' }} className="btn btn-primary" onClick={()=>addPolicy()}>Add Policy</button>
                    </div>
               
            </Dialog>
            <Dialog header="Edit Policy" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                {selectedPolicy && (
                    <div className="p-fluid">
                        <div className="mb-3">
                            <label>Policy Name</label>
                            <input type="text" className="form-control"
                                value={selectedPolicy.policyName}
                                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, policyName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Policy Type</label>
                            <input type="text" className="form-control"
                                value={selectedPolicy.policyType}
                                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, policyType: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <textarea className="form-control"
                                value={selectedPolicy.description}
                                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, description: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Price</label>
                            <input type="number" className="form-control"
                                value={selectedPolicy.price}
                                onChange={(e) => setSelectedPolicy({ ...selectedPolicy, price: e.target.value })}
                            />
                        </div>
                        <Button label="Update Policy" className="btn btn-primary" onClick={updatePolicy} />
                    </div>
                )}
            </Dialog>

        </div>
    )
}

export default AllPolicyDetails;