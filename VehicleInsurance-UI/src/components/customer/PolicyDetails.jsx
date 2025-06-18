import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Rating } from "primereact/rating";
function PolicyDetails() {
    const param = useParams();
    const [policyDetail, setPolicyDetail] = useState({});
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const getPolicyDetails = () => {
            axios.get(`http://localhost:8080/api/policy/get-one/${param.pid}`)
                .then((resp) => {
                    console.log(resp);
                    setPolicyDetail(resp.data);

                }).catch((error) => {
                    console.log(error);

                })
        }

        const getReview = () => {
            axios.get(`http://localhost:8080/api/review/get/${param.pid}`)
                .then((resp) => { 
                    console.log(resp.data);
                    setReviews(resp.data);
                })
        }

        getPolicyDetails();
        getReview();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container my-5 pt-5">
                <h2 className="text-center mb-4">Policy Details</h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-gradient " style={{ background: 'linear-gradient(to right, #007bff, #00c6ff)' }}>
                                <h4 className="mb-0">{policyDetail.policyName }</h4>
                            </div>
                            <div className="card-body">
                                <p><strong>Policy Name:</strong> {policyDetail.policyName}</p>
                                <p><strong>Type:</strong> {policyDetail.policyType}</p>
                                <p><strong>Description:</strong> {policyDetail.description}</p>
                                <p><strong>Price:</strong> ₹{policyDetail.price}</p>
                                <p><strong>Created Date:</strong> {policyDetail.createdDate}</p>
                            </div>
                            <div className="card-footer text-center bg-light">
                                <Link to="/login" className="btn btn-primary btn-lg apply-btn">
                                    Apply for Policy
                                </Link>
                            </div>
                        </div>

                        <div className="accordion mt-4" id="reviewAccordion">
                            <h4 className="text-center mb-3">Customer Reviews</h4>
                            {reviews.length === 0 && <p className="text-center text-muted">No reviews available for this policy.</p>}
                            {reviews.map((review, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                            Review by {review.policyHolder.vehicle.customer.name}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#reviewAccordion">
                                        <div className="accordion-body">
                                            <p><strong>Name:</strong> {review.policyHolder.vehicle.customer.name}</p>
                                            <p><strong>Vehicle:</strong> {review.policyHolder.vehicle.vehicleType}</p>
                                            <p><strong>Comment:</strong> {review.comments}</p>
                                            <p><Rating value={review.rating} readOnly cancel={false} /></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyDetails;