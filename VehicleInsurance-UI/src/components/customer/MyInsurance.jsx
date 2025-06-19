import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../css/MyInsurance.css'

function MyInsurance() {
    const [myInsurance, setMyInsurance] = useState([]);
    

    useEffect(() => {
        const getMyInsurance = () => {
            axios.get("http://localhost:8080/api/policy-holder/get", {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then((resp) => {
                    console.log(resp.data);
                    setMyInsurance(resp.data);
                }).catch((err) => {
                    console.log(err);
                });
        };
        getMyInsurance();
    }, []);

    // Template for nested vehicle type
    const vehicleTypeBodyTemplate = (rowData) => rowData.vehicle ? rowData.vehicle.vehicleType : "N/A";
    const vehicleModelBodyTemplate = (rowData) => rowData.vehicle ? rowData.vehicle.vehicleModel : "N/A";
    const regNumberBodyTemplate = (rowData) => rowData.vehicle ? rowData.vehicle.registrationNumber : "N/A";
    const vehicleValueBodyTemplate = (rowData) => rowData.vehicle ? `₹${rowData.vehicle.vehicleValue}` : "N/A";

    // Template for nested policy info
    const policyNameBodyTemplate = (rowData) => rowData.policy ? rowData.policy.policyName : "N/A";
    const policyTypeBodyTemplate = (rowData) => rowData.policy ? rowData.policy.policyType : "N/A";
    const policyDescBodyTemplate = (rowData) => rowData.policy ? rowData.policy.description : "N/A";
    const policyPriceBodyTemplate = (rowData) => rowData.policy ? `₹${rowData.policy.price}` : "N/A";
    const policyCreatedDateBodyTemplate = (rowData) => rowData.policy ? rowData.policy.createdDate : "N/A";

    // Template for active status badge
    const statusBodyTemplate = (rowData) => {
        return (
            <span className={`badge ${rowData.active ? 'bg-success' : 'bg-danger'}`}>
                {rowData.active ? 'Active' : 'Inactive'}
            </span>
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 text-primary">My Insurance Policies</h2>
            <DataTable value={myInsurance} paginator rows={5} scrollable scrollHeight="400px"
                tableStyle={{ minWidth: '120rem', tableLayout: 'auto', padding: '1rem' }} className="custom-header">

                <Column header="Policy Name" body={policyNameBodyTemplate} style={{ width: '10%' }} />
                <Column field="status" header="Status" style={{ width: '8%' }} />
                <Column field="startDate" header="Start Date" style={{ width: '8%' }} />
                <Column field="endDate" header="End Date" style={{ width: '8%' }} />
                <Column header="Vehicle Type" body={vehicleTypeBodyTemplate} style={{ width: '8%' }} />
                <Column header="Vehicle Model" body={vehicleModelBodyTemplate} style={{ width: '8%' }} />
                <Column header="Reg No" body={regNumberBodyTemplate} style={{ width: '8%' }} />
                <Column header="Vehicle Value" body={vehicleValueBodyTemplate} style={{ width: '8%' }} />
                <Column header="Policy Type" body={policyTypeBodyTemplate} style={{ width: '8%' }} />
                <Column header="Description" body={policyDescBodyTemplate} style={{ width: '10%' }} />
                <Column header="Price" body={policyPriceBodyTemplate} style={{ width: '8%' }} />
                <Column header="Created Date" body={policyCreatedDateBodyTemplate} style={{ width: '8%' }} />
                <Column header="Active Status" body={statusBodyTemplate} style={{ width: '8%' }} />
            </DataTable>
        </div>
    );
}

export default MyInsurance;
