import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import '../css/MyInsurance.css';

function MyInsurance() {
    const [insurances, setInsurances] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [quoteDetails, setQuoteDetails] = useState({});
    const [payment, setPayment] = useState(0);
    const toast = useRef(null);

    // Fetch insurance list
    const fetchInsuranceList = () => {
        axios.get("http://localhost:8080/api/policy-holder/get", {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(res => {
            setInsurances(res.data);
        }).catch(err => console.error("Error fetching insurance:", err));
    };

    // Fetch quote details when dialog opens
    useEffect(() => {
        if (showDialog && selectedPolicy) {
            axios.get(`http://localhost:8080/api/quote/get-one/${selectedPolicy.id}`, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }).then(res => {
                setQuoteDetails(res.data);
            }).catch(err => console.error("Error fetching quote:", err));
        }

        fetchInsuranceList(); // refresh the list on load and after payment
    }, [showDialog]);

    // Handle view quote button
    const handleViewQuote = (policy) => {
        setSelectedPolicy(policy);
        setShowDialog(true);
    };

    // payment process
    const paymentProcess = () => {
        let paymentObj = {
            paid: payment
        };

        console.log(payment + " " + quoteDetails.total);

        if (payment == quoteDetails.total) {
            axios.post(`http://localhost:8080/api/payment/pay/${selectedPolicy.id}`, paymentObj, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }).then(() => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Payment Success',
                    detail: 'Payment Completed Successfully',
                    life: 3000
                });
                fetchInsuranceList();   // Refresh data
                setVisible(false);  // Close dialog
            }).catch((err) => {
               console.log(err);
                
            });
        } else {
            toast.current.show({
                severity: 'warn',
                summary: 'Insufficient Payment',
                detail: 'Entered amount is not correct',
                life: 3000
            });
        }
    };

    // confirm dialog before payment
    const confirmPayment = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed with payment?',
            header: 'Payment Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: paymentProcess,
            reject: () => {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Payment Cancelled',
                    detail: 'You cancelled the payment',
                    life: 3000
                });
            }
        });
    };


    // Status column content
    const statusTemplate = (policy) => {
        if (policy.status === "QUOTE GENERATED") {
            return (
                <div className="text-center">
                    <span className="badge bg-warning text-dark">QUOTE GENERATED</span>
                    <Button label="View Quote" className="mt-2" onClick={() => handleViewQuote(policy)} />
                </div>
            );
        }
        return (
            <span className={`badge ${policy.active ? 'bg-success' : 'bg-danger'}`}>
                {policy.active ? "Active" : "Inactive"}
            </span>
        );
    };

    return (
        <div className="mt-4 ml-5" style={{ width: '90rem' }}>
            <h2 className="text-center text-primary mb-4">My Insurance Policies</h2>

            <DataTable value={insurances} tableStyle={{ width: '120rem', tableLayout: 'auto', padding: '1rem' }} paginator rows={5} scrollable scrollHeight="400px">
                <Column header="Policy Name" body={(row) => row.policy.policyName} />
                <Column field="status" header="Status" />
                <Column field="startDate" header="Start Date" />    
                <Column field="endDate" header="End Date" />
                <Column header="Vehicle Type" body={(row) => row.vehicle.vehicleType} />
                <Column header="Model" body={(row) => row.vehicle.vehicleModel } />
                <Column header="Reg No" body={(row) => row.vehicle.registrationNumber } />
                <Column header="Vehicle Value" body={(row) =>   `₹${row.vehicle.vehicleValue}` } />
                <Column header="Policy Type" body={(row) => row.policy.policyType } />
                <Column header="Description" body={(row) => row.policy.description} />
                <Column header="Price" body={(row) =>   `₹${row.policy.price}` } />
                <Column header="Created" body={(row) => row.policy.createdDate } />
                <Column header="Active Status" body={statusTemplate} />
            </DataTable>

            {/* Toast for messages */}
            <Toast ref={toast} />
            <ConfirmDialog />

            {/* Payment Dialog */}
            <Dialog header="Quote Details" visible={showDialog} onHide={() => setShowDialog(false)} style={{ width: '40vw' }}>
                {selectedPolicy && (
                    <div style={{ color: 'black' }}>
                        <p><strong>Policy:</strong> {selectedPolicy.policy?.policyName}</p>
                        <p><strong>Vehicle:</strong> {selectedPolicy.vehicle?.vehicleModel}</p>
                        <p><strong>Premium:</strong> ₹{quoteDetails.premium}</p>
                        <p><strong>Add-On:</strong> ₹{quoteDetails.addOnPrice}</p>
                        <p><strong>Total:</strong> ₹{quoteDetails.total}</p>

                        <input
                            type="number"
                            className="form-control my-2"
                            placeholder="Enter payment amount"
                            value={payment  }
                            onChange={(e) => setPayment(e.target.value)}
                        />

                        <Button label="Pay Now" className="btn btn-primary" onClick={confirmPayment} />
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default MyInsurance;
