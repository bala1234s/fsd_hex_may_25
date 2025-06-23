import Navbar from "./Navbar";
import "./css/Home.css";

function Home() {
    return (
        <div>
            <Navbar />
            <div className="home-container">

                <div className="home-top">
                    <h1 className="home-title">Welcome to the Vehicle Insurance System</h1>
                    <p className="home-subtitle">Your trusted partner for securing your vehicle with the best insurance plans.</p>
                </div>

                <div className="features-section">
                    <div className="feature-card">
                        <h5 className="feature-title">Get a Quote</h5>
                        <p className="feature-text">Calculate your premium easily and get instant quotes tailored to your vehicle.</p>
                        <a href="#" className="custom-btn-outline">Get Quote</a>
                    </div>
                    <div className="feature-card">
                        <h5 className="feature-title">File a Claim</h5>
                        <p className="feature-text">Submit your insurance claim hassle-free with step-by-step guidance.</p>
                        <a href="#" className="custom-btn-outline">File Claim</a>
                    </div>
                    <div className="feature-card">
                        <h5 className="feature-title">Contact Us</h5>
                        <p className="feature-text">Need help or have questions? Our support team is ready to assist you.</p>
                        <a href="#" className="custom-btn-outline">Contact</a>
                    </div>
                </div>

                <div className="why-choose-section">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <ul className="benefits-list">
                        <li>✔️ Quick Policy Issuance</li>
                        <li>✔️ Affordable Premiums</li>
                        <li>✔️ 24/7 Claim Assistance</li>
                        <li>✔️ Trusted by Thousands of Vehicle Owners</li>
                    </ul>
                </div>

                <div className="about-section">
                    <h2 className="section-title">About Us</h2>
                    <p className="about-text">
                        We are committed to providing the best vehicle insurance solutions tailored to your needs. Our dedicated team ensures smooth policy processing, affordable premiums, and reliable claim settlement support.
                    </p>
                </div>

                <div className="testimonials-section">
                    <h2 className="section-title">Testimonials</h2>
                    <div className="testimonial-card">
                        <p>"Best insurance service ever! Quick and hassle-free claims."</p>
                        <span>- Rahul, Bangalore</span>
                    </div>
                    <div className="testimonial-card">
                        <p>"Affordable plans with excellent customer support."</p>
                        <span>- Priya, Chennai</span>
                    </div>
                </div>

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
