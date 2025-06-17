import axios from "axios";
import { useEffect, useState } from "react";

function AllPolicy() {
    let [allPolicy, setAllPolicy] = useState([]);
    useEffect(() => {
        const getAllPolicy = async () => {
            try {
                // Fetching the All Policy
                const resp = await axios.get("http://localhost:8080/api/policy/get-all");
                // Store the List of policy 
                setAllPolicy(resp.data);

            } catch (error) {
                console.log(error);

            }

        }
        getAllPolicy();
    }, []);

    return (
        <div className="container">

            <div className="row">
                {
                    allPolicy.map((p) => (

                        <div className="col-sm-6" key={p.id}>
                            <div className="card" >
                                <div className="card-body">
                                    <h5 className="card-title">Policy: { p.policyName}</h5>
                                    <p className="card-text">Policy Type: {p.policyType}</p>
                                    <p className="card-text">Description: {p.description}</p>
                                    <p className="card-text">Price: {p.price}</p>
                                    <a href="#" className="btn btn-primary">Get Quote</a>
                                </div>
                                <div className="card-footer">Created Date: { p.createdDate}</div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}
export default AllPolicy;