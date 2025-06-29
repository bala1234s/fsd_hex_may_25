import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPolicies } from "../../state/actions/AllPolicyActions";
import { Link } from "react-router-dom";

function AllPolicy() {
    const dispatch = useDispatch();
    let [allPolicy,] = useState(useSelector(state => state.allPolicy.allPolicy));
    const itemsPerPage = 2; //<-- for each pagination will display two policy
    let [page, setPage] = useState(0);
    
    const paginatedPolicies = allPolicy.slice(page * itemsPerPage, (page + 1) * itemsPerPage); //<-- pagination slice by the total policy 
    console.log(allPolicy);
    
    useEffect(() => {
        fetchAllPolicies(dispatch); //<--- fetch all policy from Action (Redux)

        
    }, [dispatch]); //<-- for every event or state change the useEffect will render by the dispatch

    return (
        <div>
            <Navbar />

            <div className="container mt-5 pt-5">
                <div className="row pt-5">
                    {/* Header  */}
                    <div className="col-md-12 ">
                        <h1>All Policies</h1>
                        <p className="lead">Here is the list of all available policies.</p>
                    </div>

                </div>
                <div className="row">
                    {/* Policy Display */}
                    {
                        paginatedPolicies.map((p) => (
                            <div className="col-sm-6" key={p.id}>
                                <div className="card">
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

                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-secondary" onClick={() => {
                        if (page > 0) setPage(page - 1); //<--page count should not less than 0
                    }}>Previous</button>

                    <button className="btn btn-primary" onClick={() => {
                        if ((page + 1) * itemsPerPage < allPolicy.length) setPage(page + 1); //<--page count should not greater than size of policy
                    }}>Next</button>
                </div>


            </div>

           
        </div>
    )
}
export default AllPolicy;