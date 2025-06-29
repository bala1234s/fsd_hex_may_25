import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./css/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        // getting the review details
        const getReview = () => {
            axios.get(`http://localhost:8080/api/review/get-all`)
                .then((resp) => {
                    console.log(resp.data);
                    setReviews(resp.data);
                })
        }
        getReview();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="home-container">
                {/* Home Top section */}
                <div className="home-top">
                    <h1 className="home-title">Welcome to the Vehicle Insurance System</h1>
                    <p className="home-subtitle">Your trusted partner for securing your vehicle with the best insurance plans.</p>
                </div>
                {/*  Features of the Insurance*/}
                <div className="features-section">
                    <div className="feature-card">
                        <h5 className="feature-title">Get a Quote</h5>
                        <p className="feature-text">Calculate your premium easily and get instant quotes tailored to your vehicle.</p>
                        <Link className="custom-btn-outline">Get Quote</Link>
                    </div>
                    <div className="feature-card">
                        <h5 className="feature-title">File a Claim</h5>
                        <p className="feature-text">Submit your insurance claim hassle-free with step-by-step guidance.</p>
                        <Link className="custom-btn-outline">File Claim</Link>
                    </div>
                    <div className="feature-card">
                        <h5 className="feature-title">Contact Us</h5>
                        <p className="feature-text">Need help or have questions? Our support team is ready to assist you.</p>
                        <Link className="custom-btn-outline">Contact</Link>
                    </div>
                </div>
            {/* why choose section */}
                <div className="why-choose-section">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <ul className="benefits-list">
                        <li>✔️ Quick Policy Issuance</li>
                        <li>✔️ Affordable Premiums</li>
                        <li>✔️ 24/7 Claim Assistance</li>
                        <li>✔️ Trusted by Thousands of Vehicle Owners</li>
                    </ul>
                </div>
                {/* About Us */}
                <div className="about-section" id="about">
                    <div className="about-image">
                        <img src="../HomeImages/review.jpg" alt="Vehicle Insurance System" />
                    </div>
                    <div className="about-content">
                        <h2 className="section-title">About Us</h2>
                        <p>
                            Our Vehicle Insurance System is built to deliver fast, affordable, and secure insurance services. Whether you're a car, bike, or commercial vehicle owner, we provide customized policy coverage to fit your needs.
                        </p>
                        <ul>
                            <li> Quick policy approval process</li>
                            <li> Instant premium quote calculation</li>
                            <li> Simple claim request with damage photo upload</li>
                            <li> Aadhaar & PAN-based secure login</li>
                            <li> Add-on support like engine protection & roadside help</li>
                        </ul>
                        <p>
                            With digital documents, timely reminders, and officer-backed claim reviews, our system ensures you stay protected with zero hassle.
                        </p>
                    </div>
                </div>

                {/* Review */}
                <div className="testimonials-section" id="review">
                    <h2 className="section-title">Reviews</h2>
                    {
                        reviews.map((r) => (

                            <div className="testimonial-card">
                                <p>"{r.comments}"</p>
                                <span>- {r.policyHolder.vehicle.customer.name}</span>
                            </div>
                        ))
                    }

                </div>
                {/* Help and FAQ */}
                <div className="faq-section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-item">
                        <h4>How do I calculate my insurance premium?</h4>
                        <p>You can easily get a quote using our 'Get Quote' feature by providing your vehicle details.</p>
                    </div>
                    <div className="faq-item">
                        <h4>What documents are needed to file a claim?</h4>
                        <p>You'll need your policy number, vehicle registration, and a copy of the FIR if applicable.</p>
                    </div>
                </div>

                <div className="get-started-section">
                    <h2 className="section-title">Ready to Insure Your Vehicle?</h2>
                    <p className="get-started-text">Protect your vehicle and enjoy peace of mind with our comprehensive insurance plans.</p>
                    <a href="#" className="custom-btn-primary">Get Started Now</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
