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

    let [page, setPage] = useState(0);
    let [size, setSize] = useState(10);
    let [count, setCount] = useState(0);

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


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 " style={{display:'flex',justifyContent:'space-between'}}>
                    <div>

                        <h1>All Policies</h1>
                    </div>
                    <div>

                        <button style={{backgroundColor:'rgb(24, 66, 158)'}} className="btn btn-primary"  onClick={() => setVisible(true)}>Add New Policy</button>
                    </div>
                </div>
                <div className="col-md-12" style={{ display: 'flex', justifyContent: 'space-between' , gap:'20px'}}>
                    {
                        policy?.map((p) => (

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
                                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => editVehicle(rowData)} />
                                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ml-2" onClick={() => deleteVehicle(rowData.id)} />
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="row">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><button class="page-link" href="#">Previous</button></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><button class="page-link" href="#">Next</button></li>
                    </ul>
                </nav>
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
        </div>
    )
}

export default AllPolicyDetails;