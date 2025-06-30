import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../css/MyVehicle.css';
import { CgAdd } from "react-icons/cg";
import AddVehicle from "./AddVehicle";
import { Dialog } from 'primereact/dialog';


function MyVehicle() {
    let token = localStorage.getItem('token');
    let [vehicle, setVehicle] = useState([]);
    let [customer, setCustomer] = useState({});
    const [showAddDialog, setShowAddDialog] = useState(false);
    let [selectedVehicle, setSelectedVehicle] = useState({});
    const [visible, setVisible] = useState(false);

    // Function to fetch customer and vehicle data
    const getCustomerAndVehicle = () => {
        axios.get("http://localhost:8080/api/customer/get-one", {
            headers: { 'Authorization': 'Bearer ' + token}
        })
            .then((resp) => {
                console.log("Customer Data:", resp.data);
                setCustomer(resp.data);

                // Now fetch vehicle after customer data is available
                return axios.get(`http://localhost:8080/api/vehicle/get-one/${resp.data.id}`, {
                    headers: { 'Authorization': 'Bearer ' + token }
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

    useEffect(() => {

        getCustomerAndVehicle(); //<--- get the customer an vehicle in the fetch API
    }, []);


    // making the cuatomer in the 
    const customerNameBodyTemplate = (rowData) => {
        return rowData.customer ? rowData.customer.name : "N/A";
    };

    const editVehicle = (vehicle) => {
        console.log("Edit Vehicle:", vehicle);
        setSelectedVehicle(vehicle);
        setVisible(true);
    };
    

    const deleteVehicle = (id) => {
        // Placeholder: API call to delete the vehicle
        console.log("Delete Vehicle ID:", id);
        axios.delete(`http://localhost:8080/api/vehicle/delete/${id}`, {
            headers: {'Authorization':'Bearer '+token}
        }).then((resp) => { 
            console.log(resp);
            getCustomerAndVehicle();
            alert(resp.data);

        }).catch(err=>console.log(err) )
    };

    const updateVehicle = () => {
        /// update the vehicle API
        axios.put(`http://localhost:8080/api/vehicle/update/${selectedVehicle.id}`, selectedVehicle, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(resp => {
            alert("Vehicle updated successfully");
            setVisible(false);
            getCustomerAndVehicle(); // refresh
        }).catch(err => console.log(err));
    };
    

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="p-3 col-md-12" style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                        <h4>My Vehicles</h4>
                        <button className="btn btn-primary " style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setShowAddDialog(true)}>
                            <CgAdd /> Add New Vehicle
                        </button>
                        {
                            showAddDialog === true ?
                                <AddVehicle visible={showAddDialog} setVisible={setShowAddDialog} customerId={customer.id} />
                                : ""
                        }
                    </div>

                    {/* Table prime react */}
                    <DataTable value={vehicle} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} className="vehicle-header">
                        <Column header="#" body={(data, index) => index.rowIndex + 1}></Column>
                        <Column field="vehicleType" header="Type" style={{ width: '15%' }}></Column>
                        <Column field="vehicleModel" header="Model" style={{ width: '15%' }}></Column>
                        <Column field="registrationNumber" header="Reg. Number" style={{ width: '20%' }}></Column>
                        <Column field="vehicleValue" header="Value" style={{ width: '10%' }}></Column>
                        <Column field="purchaseDate" header="Purchase Date" style={{ width: '15%' }}></Column>
                        <Column header="Customer Name" body={customerNameBodyTemplate} style={{ width: '15%' }}></Column>
                        <Column header="Edit" body={(rowData) => (
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-info"
                                onClick={() => editVehicle(rowData)}
                            />
                        )}>
                        </Column>

                        
                        <Column header="Delete" body={(rowData) => (
                            <Button
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger"
                                onClick={() => deleteVehicle(rowData.id)}
                            />)}>
                            
                            </Column>

                    </DataTable>

                </div>
            </div>

            {/* Dialog prime react */}
            <Dialog header="Edit Vehicle" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {selectedVehicle && (
                    <div className="p-fluid">
                        <div className="field">
                            <label>Vehicle Type</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedVehicle.vehicleType}
                                onChange={($e) => setSelectedVehicle({ ...selectedVehicle, vehicleType: $e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Vehicle Model</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedVehicle.vehicleModel}
                                onChange={($e) => setSelectedVehicle({ ...selectedVehicle, vehicleModel: $e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Registration Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedVehicle.registrationNumber}
                                onChange={($e) => setSelectedVehicle({ ...selectedVehicle, registrationNumber: $e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Vehicle Value</label>
                            <input
                                type="number"
                                className="form-control"
                                value={selectedVehicle.vehicleValue}
                                onChange={($e) => setSelectedVehicle({ ...selectedVehicle, vehicleValue: $e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label>Purchase Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={selectedVehicle.purchaseDate}
                                onChange={($e) => setSelectedVehicle({ ...selectedVehicle, purchaseDate: $e.target.value })}
                            />
                        </div>

                        <Button
                            label="Update Vehicle"
                            icon="pi pi-check"
                            className="mt-3"
                            onClick={()=>updateVehicle()}
                        />
                    </div>
                )}
            </Dialog>


            
        </div>
    )
}

export default MyVehicle;