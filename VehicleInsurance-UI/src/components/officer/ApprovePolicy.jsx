import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// PrimeReact UI components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

import '../css/ApprovePolicy.css';

function ApprovePolicy() {
    // Token stored in browser
    const token = localStorage.getItem('token');

    // State variables
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const toast = useRef(null);

    // Load payment details from backend
    const fetchPayments = () => {
        axios.get('http://localhost:8080/api/payment/get-all', {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then((response) => {
                const paymentList = response.data.map(mapToPaymentObject);
                setPayments(paymentList);
            })
            .catch((error) => {
                console.log("Error loading payments:", error);
            });
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // Map API response to a cleaner object
    // making structure for reusage
    const mapToPaymentObject = (payment) => ({
        id: payment.id,
        paidDate: payment.paidDate,
        premium: payment.quote.premium,
        addOnPrice: payment.quote.addOnPrice,
        total: payment.quote.total,

        policyHolderId: payment.quote.policyHolder.id,
        policyStatus: payment.quote.policyHolder.status,
        active: payment.quote.policyHolder.active,
        startDate: payment.quote.policyHolder.startDate,
        endDate: payment.quote.policyHolder.endDate,

        policyName: payment.quote.policyHolder.policy.policyName,
        policyPrice: payment.quote.policyHolder.policy.price,

        vehicleModel: payment.quote.policyHolder.vehicle.vehicleModel,
        vehicleType: payment.quote.policyHolder.vehicle.vehicleType,

        customerName: payment.quote.policyHolder.vehicle.customer.name,
        customerContact: payment.quote.policyHolder.vehicle.customer.contact
    });

    // Display status with colors
    const getStatusTag = (status) => {
        let severity = 'warning';
        if (status === 'PAID') severity = 'success';
        if (status === 'QUOTE GENERATED') severity = 'info';
        return <Tag value={status} severity={severity} />;
    };

    const getActiveTag = (active) => {
        return (
            <Tag value={active ? 'Active' : 'Inactive'} severity={active ? 'success' : 'danger'} />
        );
    };

    // Approve/Activate Policy
    const activatePolicy = (policyHolderId) => {
        confirmDialog({
            message: 'Are you sure you want to activate this policy?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',

            accept: () => { //<-- if i give 'yes'
                axios.put(`http://localhost:8080/api/policy-holder/approve?policyHolderId=${policyHolderId}`, {}, {
                    headers: { Authorization: 'Bearer ' + token }
                })
                    .then(() => {
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Policy activated' });
                        fetchPayments();      // Refresh list
                        setShowDialog(false); // Close details popup
                    })
                    .catch((error) => {
                        console.log("Activation error:", error);
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Could not activate policy' });
                    });
            }
        });
    };

    // Deactivate policy
    const deactivatePolicy = (policyHolderId) => {
        confirmDialog({
            message: 'Are you sure you want to activate this policy?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { //<-- if i give 'yes'
                axios.put(`http://localhost:8080/api/policy-holder/deactivate?policyHolderId=${policyHolderId}`, {}, {
                    headers: { Authorization: 'Bearer ' + token }
                })
                    .then(() => {
                        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Policy Deactivate' });
                        fetchPayments();      // Refresh list
                        setShowDialog(false); // Close details popup
                    })
                    .catch((error) => {
                        console.log("Deactivation error:", error);
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Could not deactivate policy' });
                    });
            }
        });
    };

    return (
        <div className="card" style={{ padding: '1rem', margin: 'auto', width: '90%' }}>
            <h3 className="text-center">Approved Payments</h3>

            <Toast ref={toast} />
            <ConfirmDialog />
            {/* Table to display the Policy details */}
            <DataTable value={payments} paginator rows={4} emptyMessage="No payments found" className='approve-header'>
                <Column header="Customer" body={(row) => (
                    <div>
                        <strong>{row.customerName}</strong><br />
                        {row.customerContact}
                    </div>
                )} />

                <Column header="Vehicle" body={(row) => (
                    <div>{row.vehicleType} - {row.vehicleModel}</div>
                )} />

                <Column header="Policy" body={(row) => (
                    <div>{row.policyName} (₹{row.policyPrice})</div>
                )} />

                <Column header="Amount" body={(row) => (
                    <div>
                        Premium: ₹{row.premium} <br />
                        Add-Ons: ₹{row.addOnPrice} <br />
                        <strong>Total: ₹{row.total}</strong>
                    </div>
                )} />

                <Column header="Status" body={(row) => getStatusTag(row.policyStatus)} />
                <Column header="Active" body={(row) => getActiveTag(row.active)} />

                <Column header="Dates" body={(row) => (
                    <div>{row.startDate} TO {row.endDate}</div>
                )} />

                <Column header="Action" body={(row) => (
                    <Button label="Details" icon="pi pi-eye" onClick={() => {
                        setSelectedPayment(row);
                        setShowDialog(true);
                    }} />
                )} />
            </DataTable>

            {/* Policy Detail Dialog */}
            <Dialog header="Policy Details" visible={showDialog} style={{ width: '40vw' }} onHide={() => setShowDialog(false)}>
                {selectedPayment && (
                    <div>
                        <h4>{selectedPayment.customerName} <Tag value="Paid" severity="success" /></h4>
                        <p><strong>Contact:</strong> {selectedPayment.customerContact}</p>
                        <p><strong>Vehicle:</strong> {selectedPayment.vehicleType} - {selectedPayment.vehicleModel}</p>
                        <p><strong>Policy:</strong> {selectedPayment.policyName} (₹{selectedPayment.policyPrice})</p>
                        <p><strong>Status:</strong> {selectedPayment.policyStatus}</p>
                        <p><strong>Coverage:</strong> {selectedPayment.startDate} to {selectedPayment.endDate}</p>
                        <p><strong>Paid On:</strong> {selectedPayment.paidDate}</p>
                        <p><strong>Total Paid:</strong> ₹{selectedPayment.total}</p>

                        {selectedPayment.active === true ? (
                            <p>
                                <button className='btn btn-danger' onClick={() => deactivatePolicy(selectedPayment.policyHolderId)}>
                                    Deactivate Policy
                                </button>
                            </p>
                        ) : (
                            <p>
                                <button className='btn btn-primary' onClick={() => activatePolicy(selectedPayment.policyHolderId)}>
                                    Activate Policy
                                </button>
                            </p>
                        )}
                    </div>
                )}
                  
              
            </Dialog>
        </div>
    );
}

export default ApprovePolicy;
