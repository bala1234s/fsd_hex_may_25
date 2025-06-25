import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import "../css/ApprovePolicy.css"

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function ApprovePolicy() {

    // store Token
    let token = localStorage.getItem('token');
    const [payments, setPayments] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const toast = useRef(null);

    // fetching the payment details
    const fetchPayments = () => {
        axios.get('http://localhost:8080/api/payment/get-all', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((resp) => {
            const flat = resp.data.map(flattenPayment);
            setPayments(flat);
        }).catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {

        fetchPayments();
    }, []);

    // Confirm Toast message
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const flattenPayment = (payment) => {
        return {
            id: payment.id,
            paid: payment.paid,
            paidDate: payment.paidDate,
            premium: payment.quote.premium,
            addOnPrice: payment.quote.addOnPrice,
            total: payment.quote.total,
            policyHolderId: payment.quote.policyHolder.id,
            startDate: payment.quote.policyHolder.startDate,
            endDate: payment.quote.policyHolder.endDate,
            policyStatus: payment.quote.policyHolder.status,
            active: payment.quote.policyHolder.active,
            policyName: payment.quote.policyHolder.policy.policyName,
            policyPrice: payment.quote.policyHolder.policy.price,
            vehicleModel: payment.quote.policyHolder.vehicle.vehicleModel,
            vehicleType: payment.quote.policyHolder.vehicle.vehicleType,
            customerName: payment.quote.policyHolder.vehicle.customer.name,
            customerContact: payment.quote.policyHolder.vehicle.customer.contact
        };
    };

    const getStatusSeverity = (status) => {
        switch (status) {
            case 'PAID': return 'success';
            case 'QUOTE GENERATED': return 'info';
            default: return 'warning';
        }
    };

    const getActiveStatusSeverity = (status) => {
        switch (status) {
            case false: return 'danger';
            case true: return 'success';
            default: return 'warning';
        }
    };

    const customerBodyTemplate = (rowData) => (
        <>
            <div><strong>{rowData.customerName}</strong></div>
            <div>{rowData.customerContact}</div>
        </>
    );

    const vehicleBodyTemplate = (rowData) => (
        <>
            <div>{rowData.vehicleType}</div>
            <div>{rowData.vehicleModel}</div>
        </>
    );

    const policyBodyTemplate = (rowData) => (
        <>
            <div>{rowData.policyName}</div>
            <div>₹{rowData.policyPrice}</div>
        </>
    );

    const amountBodyTemplate = (rowData) => (
        <>
            <div>Premium: ₹{rowData.premium}</div>
            <div>AddOns: ₹{rowData.addOnPrice}</div>
            <div><strong>Total: ₹{rowData.total}</strong></div>
        </>
    );

    const statusTemplate = (rowData) => (
        <Tag value={rowData.policyStatus} severity={getStatusSeverity(rowData.policyStatus)} />
    );


    const activeStatusTemplate = (rowData) => (


        <Tag value={rowData.active === true ? "Active" : "In-active"} severity={getActiveStatusSeverity(rowData.active)} />
    );

    const dateBodyTemplate = (rowData) => (
        <div>
            <div>{rowData.startDate}</div>
            <div>{rowData.endDate}</div>
        </div>
    );

    const viewDetailsButton = (rowData) => (
        <Button
            label="Details"
            icon="pi pi-eye"
            onClick={() => {
                setSelectedPayment(rowData);
                setVisible(true);
            }}
            style={{
                backgroundColor: 'rgb(24, 66, 158)'
            }}
        />
    );

    // Approve or Activate the Policy
    const activatePolicy = (policyHolderId) => {
        // axios.put('http://localhost:8080/api/policy-holder/approve', policyHolderId)
        //     .then((resp) => { 
        //         console.log(resp);
        //     })
        confirmDialog({
            group: 'templating',
            header: 'Confirmation',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>Please confirm to proceed moving forward.</span>
                </div>
            ),
            accept: () => {
                axios.put(`http://localhost:8080/api/policy-holder/approve?policyHolderId=${policyHolderId}`, policyHolderId, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                    .then((resp) => {
                        console.log(resp);
                        fetchPayments(); //<-- render the fectchPayment to see updated data
                        setVisible(false); // <--- to close the popup of Details
                        toast.current.show({ // <--- Policy Acticate Toast message
                            severity: 'info',
                            summary: 'Policy Activate',
                            detail: 'Policy activated successfully'
                        });
                    }).catch((err) => {
                        console.log(err);

                    })
            },
            reject


        });


    }

    return (
        <div className="card approve-header" style={{ padding: '1rem', marginLeft: '6rem', width: '80rem' }} >
            <h3 className='text-center mb-4'>Approved Payments</h3>
            <Toast ref={toast} />
            <ConfirmDialog group="templating" />
            <DataTable value={payments} paginator rows={5} dataKey="id" emptyMessage="No Payments Found">
                <Column header="Customer" body={customerBodyTemplate} />
                <Column header="Vehicle" body={vehicleBodyTemplate} />
                <Column header="Policy" body={policyBodyTemplate} />
                <Column header="Amount" body={amountBodyTemplate} />
                <Column header="Status" body={statusTemplate} />
                <Column header="Active Status" body={activeStatusTemplate} />
                <Column header="Coverage" body={dateBodyTemplate} />
                <Column header="Action" body={viewDetailsButton} />
            </DataTable>

            <Dialog
                header="Payment Details"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                {selectedPayment && (
                    <div style={{ padding: '1rem', color: 'black' }}>
                        <h4>Customer: {selectedPayment.customerName} <Tag severity="success" value="Paid"></Tag></h4>
                        <p><strong>Contact:</strong> {selectedPayment.customerContact}</p>
                        <p><strong>Vehicle:</strong> {selectedPayment.vehicleType} - {selectedPayment.vehicleModel}</p>
                        <p><strong>Policy:</strong> {selectedPayment.policyName} (₹{selectedPayment.policyPrice})</p>
                        <p><strong>Status:</strong> {selectedPayment.policyStatus}</p>
                        <p><strong>Coverage Period:</strong> {selectedPayment.startDate} to {selectedPayment.endDate}</p>
                        <hr />
                        <p><strong>Premium:</strong> ₹{selectedPayment.premium}</p>
                        <p><strong>Add-On Charges:</strong> ₹{selectedPayment.addOnPrice}</p>
                        <p><strong>Total Paid:</strong> ₹{selectedPayment.total}</p>
                        <p><strong>Paid On:</strong> {selectedPayment.paidDate} </p>
                        {
                            selectedPayment.active === true ?
                                <p>
                                    <button className='btn btn-danger'
                                        onClick={() => deActivatePolicy(selectedPayment.policyHolderId)}>
                                        Deactivate Policy
                                    </button>
                                </p>
                                :
                                <p>
                                    <button className='btn btn-primary'
                                        onClick={() => activatePolicy(selectedPayment.policyHolderId)}>
                                        Activate Policy
                                    </button>
                                </p>
                        }
                       
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default ApprovePolicy;
