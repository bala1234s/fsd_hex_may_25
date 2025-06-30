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

   
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [editVisible, setEditVisible] = useState(false);

    const [policy, setPolicy] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2); // items per page
    

    // const paginatedPolicies = policy.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    // console.log(allPolicy);
    
    const fetchPolicy = () => {
        axios.get(`http://localhost:8080/api/policy/get-all?page=${page}&size=${size}`)
            .then((response) => {
                console.log(response.data);
                setPolicy(response.data); // Fix here
            })
            .catch((error) => {
                console.log("Error fetching policies:", error);
            });
    };
    
    useEffect(() => {
        //fetch all policies
        fetchPolicy();
    }, [page])

    const addPolicy = () => {
        let policyData = {
            'policyName': policyName,
            'policyType': policyType,
            'description': description,
            'price': price
        }

        // Add new policy API
        axios.post('http://localhost:8080/api/policy/add', policyData, {
            headers: { "Authorization": 'Bearer ' + token }
        }).then((resp) => {
            console.log(resp.data);

            setPolicy(prev => [...prev, resp.data]);
            fetchPolicy();
            setVisible(false);

        }).catch(err => console.log(err))
    }


    const editPolicy = (policy) => {
        setSelectedPolicy(policy);
        setEditVisible(true);
    };

    const deletePolicy = (id) => {
        // Delete policy By id
        axios.delete(`http://localhost:8080/api/policy/delete/${id}`, {
            headers: { "Authorization": 'Bearer ' + token }
        }).then(() => {
            setPolicy(prev => prev.filter(p => p.id !== id));
            fetchPolicy();
            alert("Policy deleted successfully!");
        }).catch(err => console.log(err));
    };

    const updatePolicy = () => {
        // edit policy by id
        axios.put(`http://localhost:8080/api/policy/update/${selectedPolicy.id}`, selectedPolicy, {
            headers: { "Authorization": 'Bearer ' + token }
        }).then(resp => {
            setPolicy(prev => prev.map(p => p.id === resp.data.id ? resp.data : p));
            setEditVisible(false);
            setSelectedPolicy(null);
            fetchPolicy();
            alert("Policy updated successfully!");
        }).catch(err => console.log(err));
    };



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 " style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>

                        <h1>All Policies</h1>
                    </div>
                    <div>

                        <button style={{ backgroundColor: 'rgb(24, 66, 158)' }} className="btn btn-primary" onClick={() => setVisible(true)}>Add Policy</button>

                    </div>
                </div>
                <div className="col-md-12" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    {/* Display the policy */}
                    {
                        policy.map((p) => (
                        <div className="col-sm-6" key={p.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Policy: {p.policyName}</h5>
                                    <p className="card-text">Policy Type: {p.policyType}</p>
                                    <p className="card-text">Description: {p.description}</p>
                                    <p className="card-text">Price: {p.price}</p>
                                    <div className="card-text">Created Date: {p.createdDate}</div>
                                </div>
                                <div className="card-footer">
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => editPolicy(p)} />
                                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ml-2" onClick={() => deletePolicy(p.id)} />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>
                    Previous
                </button>

                <button className="btn btn-primary"
                    // disabled={policy.length <= page}
                    onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>

             {/*Dialog for Add the Policy  */}
            <Dialog header="Policy" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>

                <div className="mb-3">
                    <label >Enter the Policy Name</label>
                    <input type="text" className="form-control" onChange={($e) => setPolicyName($e.target.value)} />

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
                    <button style={{ backgroundColor: 'rgb(24, 66, 158)' }} className="btn btn-primary" onClick={() => addPolicy()}>Add Policy</button>
                </div>

            </Dialog>

            {/*Dialog for edit the Policy  */}
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