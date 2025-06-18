import Navbar from "./Navbar";


function Home() {

    return (
        <div >
            <Navbar />
            <div className="container mt-5 pt-5">

                <h1 className="text-center mb-4 mt-4 text-dark fw-bold">Welcome to the Vehicle Insurance System</h1>
                <p className="text-center text-secondary mb-5">Your trusted partner for securing your vehicle with the best insurance plans.</p>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary fw-semibold">Get a Quote</h5>
                                <p className="card-text text-muted">Calculate your premium easily and get instant quotes tailored to your vehicle.</p>
                                <a href="#" className="btn btn-outline-primary rounded-pill px-4">Get Quote</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary fw-semibold">File a Claim</h5>
                                <p className="card-text text-muted">Submit your insurance claim hassle-free with step-by-step guidance.</p>
                                <a href="#" className="btn btn-outline-primary rounded-pill px-4">File Claim</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4">
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary fw-semibold">Contact Us</h5>
                                <p className="card-text text-muted">Need help or have questions? Our support team is ready to assist you.</p>
                                <a href="#" className="btn btn-outline-primary rounded-pill px-4">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <h2 className="mb-3 fw-bold">Why Choose Us?</h2>
                    <ul className="list-group list-group-flush d-inline-block text-start shadow-sm rounded-4 bg-light">
                        <li className="list-group-item bg-transparent border-0">✔️ Quick Policy Issuance</li>
                        <li className="list-group-item bg-transparent border-0">✔️ Affordable Premiums</li>
                        <li className="list-group-item bg-transparent border-0">✔️ 24/7 Claim Assistance</li>
                        <li className="list-group-item bg-transparent border-0">✔️ Trusted by Thousands of Vehicle Owners</li>
                    </ul>
                </div>

                <div className="text-center mt-5">
                    <h2 className="mb-3 fw-bold">Ready to Insure Your Vehicle?</h2>
                    <p className="mb-4 text-muted">Protect your vehicle and enjoy peace of mind with our comprehensive insurance plans.</p>
                    <a href="#" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm mb-5">Get Started Now</a>
                </div>
            </div>
        </div>
    );
}




export default Home;