import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../css/MyVehicle.css';
import { CgAdd } from "react-icons/cg";
import AddVehicle from "./AddVehicle";


function MyVehicle() {
    let [vehicle, setVehicle] = useState([]);
    let [customer, setCustomer] = useState({});
    const [showAddDialog, setShowAddDialog] = useState(false);

    useEffect(() => {
        const getCustomerAndVehicle = () => {
            axios.get("http://localhost:8080/api/customer/get-one", {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then((resp) => {
                    console.log("Customer Data:", resp.data);
                    setCustomer(resp.data);

                    // Now fetch vehicle after customer data is available
                    return axios.get(`http://localhost:8080/api/vehicle/get-one/${resp.data.id}`, {
                        headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
                    });
                })
                .then((resp) => {
                    console.log("Vehicle Data:", resp.data);
                    setVehicle(resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getCustomerAndVehicle();
    }, []);
    
    const customerNameBodyTemplate = (rowData) => {
        return rowData.customer ? rowData.customer.name : "N/A";
    };

    // State to control AddVehicle dialog
    const [showAddVehicle, setShowAddVehicle] = useState(false);

    // Button handler:
    const addVehicle = (status) => {
        console.log("Add Vehicle Method");
        setShowAddVehicle(status);
        if (status) {
           return <AddVehicle />
        }
    };

    const editVehicle = (vehicle) => {
        // Placeholder: You can implement modal or navigation to edit form here
        console.log("Edit Vehicle:", vehicle);
    };

    const deleteVehicle = (id) => {
        // Placeholder: API call to delete the vehicle
        console.log("Delete Vehicle ID:", id);
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="p-3 col-md-12" style={{display:'flex',gap:'10px',justifyContent:'space-between'}}>
                        <h4>My Vehicles</h4>
                        <button className="btn btn-primary " style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setShowAddDialog(true)}>
                            <CgAdd /> Add New Vehicle
                        </button>
                        { 
                            showAddDialog === true ?
                                <AddVehicle visible={showAddDialog} setVisible={setShowAddDialog} customerId ={ customer.id }/>
                                :""
                        }
                    </div>
                   

                        <DataTable value={vehicle} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '60rem' }} className="vehicle-header">
                            <Column field="id" header="Vehicle ID" style={{ width: '10%' }}></Column>
                            <Column field="vehicleType" header="Type" style={{ width: '15%' }}></Column>
                            <Column field="vehicleModel" header="Model" style={{ width: '15%' }}></Column>
                            <Column field="registrationNumber" header="Reg. Number" style={{ width: '20%' }}></Column>
                            <Column field="vehicleValue" header="Value" style={{ width: '10%' }}></Column>
                            <Column field="purchaseDate" header="Purchase Date" style={{ width: '15%' }}></Column>
                            <Column header="Customer Name" body={customerNameBodyTemplate} style={{ width: '15%' }}></Column>
                            <Column header="Edit" body={(<Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => editVehicle(rowData)} />)} ></Column>
                            <Column header="Delete" body={(<Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteVehicle(rowData.id)} />)}></Column>

                        </DataTable>
                    
                </div>
            </div>

        </div>
    )
}

export default MyVehicle;