import Navbar from "./Navbar";

function Home() {

    return (
        <div >
            <Navbar />
            <div className="container mt-5 pt-5">

                <h1 className="text-center mb-4">Welcome to the Vehicle Insurance System</h1>
                <p className="text-center text-muted mb-5">Your trusted partner for securing your vehicle with the best insurance plans.</p>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">Get a Quote</h5>
                                <p className="card-text">Calculate your premium easily and get instant quotes tailored to your vehicle.</p>
                                <a href="#" className="btn btn-outline-primary mt-2">Get Quote</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">File a Claim</h5>
                                <p className="card-text">Submit your insurance claim hassle-free with step-by-step guidance.</p>
                                <a href="#" className="btn btn-outline-primary mt-2">File Claim</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary">Contact Us</h5>
                                <p className="card-text">Need help or have questions? Our support team is ready to assist you.</p>
                                <a href="#" className="btn btn-outline-primary mt-2">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <h2 className="mb-3">Why Choose Us?</h2>
                    <ul className="list-group list-group-flush d-inline-block text-start">
                        <li className="list-group-item">✔️ Quick Policy Issuance</li>
                        <li className="list-group-item">✔️ Affordable Premiums</li>
                        <li className="list-group-item">✔️ 24/7 Claim Assistance</li>
                        <li className="list-group-item">✔️ Trusted by Thousands of Vehicle Owners</li>
                    </ul>
                </div>

                <div className="text-center mt-5">
                    <h2 className="mb-3">Ready to Insure Your Vehicle?</h2>
                    <p className="mb-4">Protect your vehicle and enjoy peace of mind with our comprehensive insurance plans.</p>
                    <a href="#" className="btn btn-primary btn-lg">Get Started Now</a>
                </div>
            </div>
        </div>
    );
}




export default Home;