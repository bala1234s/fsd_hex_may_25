import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../css/MyInsurance.css'
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

function MyInsurance() {
    const [myInsurance, setMyInsurance] = useState([]);
    let [visible, setVisible] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [quoteDetails, setQuoteDetails] = useState({});
    const [payment, setPayment] = useState(undefined);

    const toast = useRef(null);

    

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
        if (visible === true) { 
            
            qoute(selectedQuote);
        }
        getMyInsurance();
    }, [visible]);

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
        if (rowData.status === 'QUOTE GENERATED') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="badge bg-warning text-dark">QUOTE GENERATED</span>
                    <button
                        className="btn btn-primary btn-sm mt-2"
                        onClick={() => { setSelectedQuote(rowData); setVisible(true);   }}
                    >
                        View Quote
                    </button>
                </div>
            );
        } else {
            return (
                <span className={`badge ${rowData.active ? 'bg-success' : 'bg-danger'}`}>
                    {rowData.active ? 'Active' : 'Inactive'}
                </span>
            );
        }
    };
    
    const qoute = (selected) => { 
        console.log(selected);
        
        axios.get(`http://localhost:8080/api/quote/get-one/${selected.id}`, {
            headers: {'Authorization':'Bearer '+ localStorage.getItem('token')}
        }).then((resp) => { 
            console.log(resp);
            setQuoteDetails(resp.data);
        }).catch((err) => { 
            console.log(err);
            
        })
        
    }
    //payment process
    const paymentProcess = () => {
        let paymentObj = {
            'paid': payment
        };
        console.log(payment + " " + quoteDetails.total);
        
        if (payment == quoteDetails.total) {
            
            axios.post(`http://localhost:8080/api/payment/pay/${selectedQuote.id}`, paymentObj, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }).then((resp) => {
                toast.current.show({ severity: 'success', summary: 'Payment Success', detail: 'Payment Completed Successfully', life: 3000 });
                setVisible(false);
            }).catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Payment Failed', detail: 'Something went wrong', life: 3000 });
            });
        } else { 
            toast.current.show({ severity: 'warn', summary: 'Insufficent Payment', detail: 'You cancelled the payment', life: 3000 });
        }
    };

    const confirmPayment = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed with payment?',
            header: 'Payment Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: paymentProcess,
            reject: () => { toast.current.show({ severity: 'warn', summary: 'Payment Cancelled', detail: 'You cancelled the payment', life: 3000 }); }
        });
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

            <Toast ref={toast} />
            <ConfirmDialog />

            <Dialog header="Quote Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {selectedQuote && (
                    <div>
                        <p><strong>Policy Name:</strong> {selectedQuote.policy?.policyName}</p>
                        <p><strong>Vehicle Model:</strong> {selectedQuote.vehicle?.vehicleModel}</p>
                        <p><strong>Premium: </strong>{quoteDetails.premium}</p>
                        <p><strong>Add-on: </strong>{quoteDetails.addOnPrice}</p>
                        <p><strong>Total: </strong>{quoteDetails.total}</p>

                        <input type="number" className="form-control" placeholder="Enter Payment" onChange={($e) => setPayment($e.target.value)} />
                        <br />
                        <Button className="btn btn-primary" onClick={confirmPayment}>Pay Now</Button>
                    </div>
                )}
            </Dialog>

        </div>
    );
}

export default MyInsurance;
