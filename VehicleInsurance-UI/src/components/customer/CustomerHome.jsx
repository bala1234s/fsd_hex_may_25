function CustomerHome() { 
    let name = localStorage.getItem('name');
    return (
        <div className="dashboard-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-12"><h1>Welcome, {name}</h1></div>

                </div>
            </div>

        </div>
    )
}
export default CustomerHome;