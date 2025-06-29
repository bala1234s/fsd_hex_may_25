
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from "axios";

function AddVehicle({ visible, setVisible, customerId }) { // <-- props , getting the values inside the obj
    // const [visible, setVisible] = useState(false);

    console.log("Add vehcile Component");
    console.log("Customer ID:", customerId);
    // Add vehicle method
    const handleAddVehicle = (event) => {
        event.preventDefault();
        let vehicle = event.target;

        let vehicleObj = {
            'vehicleType': vehicle.vehicleType.value,
            'vehicleModel': vehicle.vehicleModel.value,
            'registrationNumber': vehicle.registrationNumber.value,
            'vehicleValue': vehicle.vehicleValue.value,
            'purchaseDate': vehicle.purchaseDate.value,
        }
        // add vehicle API
        axios.post(`http://localhost:8080/api/vehicle/add/${customerId}`, vehicleObj, {
            headers: { 'Authorization': 'Bearer ' +localStorage.getItem('token')}
        })
            .then((resp) => { 
                console.log(resp.data);
                setVisible(false)
                
            }).catch((error) => { 
                console.log(error);
                
            })

    }
    
    return (
        <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            {/* Prime React Dialog */}
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {/* Vehicle Register Form */}
                 <form action="" onSubmit={handleAddVehicle}>
                    <div className="mb-3">
                        <label htmlFor="vehicleType" className="form-label">Vehicle Type</label>
                        <input type="text" className="form-control" id="vehicleType" placeholder="Enter vehicle type" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vehicleModel" className="form-label">Vehicle Model</label>
                        <input type="text" className="form-control" id="vehicleModel" placeholder="Enter vehicle model" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
                        <input type="text" className="form-control" id="registrationNumber" placeholder="Enter registration number" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vehicleValue" className="form-label">Vehicle Value</label>
                        <input type="number" className="form-control" id="vehicleValue" placeholder="Enter vehicle value" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                        <input type="date" className="form-control" id="purchaseDate" />
                    </div>
                    <div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}


export default AddVehicle;