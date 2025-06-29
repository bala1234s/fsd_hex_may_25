import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function OfficerHome() {
    const [proposals, setProposals] = useState([]);
    const [statusData, setStatusData] = useState({});
    const [policyCountData, setPolicyCountData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/policy-holder/getAll', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then((res) => {
                const data = res.data;
                setProposals(data);

                // Count policies by status
                const statusCounts = {};
                const policyNameCounts = {};

                data.forEach(item => {
                    const status = item.holder.status;
                    const policyName = item.holder.policy.policyName;

                    // Count policy status
                    statusCounts[status] = (statusCounts[status] || 0) + 1;

                    // Count how many times each policy is taken
                    policyNameCounts[policyName] = (policyNameCounts[policyName] || 0) + 1;
                });

                // setting the Status values for the chart
                setStatusData({
                    labels: Object.keys(statusCounts),
                    datasets: [
                        {
                            label: 'Policy Status Count',
                            data: Object.values(statusCounts),
                            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
                        }
                    ]
                });

                // setting the policy details for the chart
                setPolicyCountData({
                    labels: Object.keys(policyNameCounts),
                    datasets: [
                        {
                            label: 'Number of Policies Taken',
                            data: Object.values(policyNameCounts),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9575CD'],
                        }
                    ]
                });

            })
            .catch((err) => console.log("Error:", err));
    }, []);

    return (
        <div className="container mt-4 card p-2" >
            <h2 className="mb-4 text-primary text-center">Welcome Officer Dashboard</h2>

            <div className="row mb-5">
                <div className="col-md-7">
                    <h5 className="text-secondary">Policy Status Overview</h5>
                    {/* Bar chart for Status */}
                    <Chart type="bar" data={statusData} /> 
                </div>

                <div className="col-md-5">
                    <h5 className="text-secondary">Number of Customers per Policy</h5>
                    {/* Doughnut chart for policy taken */}
                    <Chart type="doughnut" data={policyCountData} style={{height:'20rem'}}/>
                </div>

            </div>

            <div className="row">
                {proposals.map((item, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <Card // <-- prime react Cart Component
                            title={item.holder.vehicle.customer.name}
                            subTitle={`Status: ${item.holder.status}`}
                        >
                            <p><strong>Email:</strong> {item.holder.vehicle.customer.user.username}</p>
                            <p><strong>Contact:</strong> {item.holder.vehicle.customer.contact}</p>
                            <p><strong>Vehicle:</strong> {item.holder.vehicle.vehicleModel} ({item.holder.vehicle.vehicleType})</p>
                            <p><strong>Reg No:</strong> {item.holder.vehicle.registrationNumber}</p>
                            <p><strong>Policy:</strong> {item.holder.policy.policyName} - ₹{item.holder.policy.price}</p>

                            <div>
                                <strong>Add-Ons:</strong>
                                <ul>
                                    {item.addOns.map((addon, i) => (
                                        <li key={i}>{addon.name} (₹{addon.price})</li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default OfficerHome;
