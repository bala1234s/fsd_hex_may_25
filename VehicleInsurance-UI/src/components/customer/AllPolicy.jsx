import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPolicies } from "../../state/actions/AllPolicyActions";
import { Link } from "react-router-dom";

function AllPolicy() {
    const dispatch = useDispatch();
    let [allPolicy, ] = useState(useSelector(state => state.allPolicy.allPolicy));
    console.log(allPolicy);
    
    
    useEffect(() => {
        fetchAllPolicies(dispatch); //<--- fetch all policy from Action (Redux)

        
    }, [dispatch]);

    return (
        <div>
            <Navbar />

            <div className="container mt-5 pt-5">
                <div className="row pt-5">
                    <div className="col-md-12 ">
                        <h1>All Policies</h1>
                        <p className="lead">Here is the list of all available policies.</p>
                    </div>

                </div>
                <div className="row">
                    {
                        allPolicy.map((p) => (

                            <div className="col-sm-6" key={p.id}>
                                <div className="card" >
                                    <div className="card-body">
                                        <h5 className="card-title">Policy: {p.policyName}</h5>
                                        <p className="card-text">Policy Type: {p.policyType}</p>
                                        <p className="card-text">Description: {p.description}</p>
                                        <p className="card-text">Price: {p.price}</p>
                                        <Link to={`/policyDetails/${p.id}`} className="btn btn-primary">Get Quote</Link>
                                    </div>
                                    <div className="card-footer">Created Date: {p.createdDate}</div>
                                   
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    )
}
export default AllPolicy;