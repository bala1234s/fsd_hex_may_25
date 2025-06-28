import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import '../css/Proposal.css';

function Proposal() {
    // State to hold all proposals
    const [proposals, setProposals] = useState([]);

    // Dialog control
    const [visible, setVisible] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);

    // Search filter
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        status: { value: null, matchMode: 'equals' }
    });

    // Fetch proposals from API
    useEffect(() => {
        axios.get('http://localhost:8080/api/policy-holder/getAll', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then((res) => {
                const data = res.data.map((proposal) => ({
                    id: proposal.holder.id,
                    customerName: proposal.holder.vehicle.customer.name,
                    customerContact: proposal.holder.vehicle.customer.contact,
                    vehicleType: proposal.holder.vehicle.vehicleType,
                    vehicleModel: proposal.holder.vehicle.vehicleModel,
                    policyName: proposal.holder.policy.policyName,
                    policyPrice: proposal.holder.policy.price,
                    status: proposal.holder.status,
                    startDate: proposal.holder.startDate,
                    endDate: proposal.holder.endDate,
                    addOns: proposal.addOns
                }));
                setProposals(data);
            })
            .catch((err) => console.log("Error:", err));
    }, []);

    // Status color
    const getStatusTag = (status) => {
        const colors = {
            'CLAIMED': 'success',
            'PENDING': 'warning',
            'QUOTE GENERATED': 'info'
        };
        return <Tag value={status} severity={colors[status] || null} />;
    };

    // Show quote dialog
    const showQuote = (proposal) => {
        setSelectedProposal(proposal);
        setVisible(true);
    };

    const statusRowFilterTemplate = (options) => {
        const statuses = ['APPROVED', 'QUOTE GENERATED', 'PENDING'];
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Select Status"
                showClear
            />
        );
    };

    // Send quote to backend
    const sendQuote = () => {
        const addonsPrice = selectedProposal.addOns.reduce((sum, addon) => sum + addon.price, 0);
        const quote = {
            premium: selectedProposal.policyPrice,
            addOnPrice: addonsPrice,
            total: selectedProposal.policyPrice + addonsPrice
        };

        axios.post(`http://localhost:8080/api/quote/send/${selectedProposal.id}`, quote, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then((resp) => {
                setVisible(false);
                setProposals((pre)=> [...pre,resp.data])
                alert('Quote Sent Successfully!');
            })
            .catch((err) => console.log("Error sending quote:", err));
    };

    return (
        <div className='proposal-container' style={{ padding: '1rem' }}>
            <h3 className="text-center">Policy Proposals</h3>

            {/* Global Search Input */}
            <InputText
                placeholder="Search"
                value={globalFilterValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setGlobalFilterValue(value);
                    setFilters({ ...filters, global: { value, matchMode: 'contains' } });
                }}
                style={{ marginBottom: '1rem' }}
            />

            {/* DataTable to show proposals */}
            <DataTable
                value={proposals}
                paginator
                rows={5}
                dataKey="id"
                filters={filters}
                globalFilterFields={['customerName', 'customerContact', 'vehicleType', 'vehicleModel', 'policyName']}
                emptyMessage="No proposals found"
            >
                <Column header="Customer" body={(row) => (
                    <>
                        <div><strong>{row.customerName}</strong></div>
                        <div>{row.customerContact}</div>
                    </>
                )} />

                <Column header="Vehicle" body={(row) => (
                    <>
                        <div>{row.vehicleType}</div>
                        <div>{row.vehicleModel}</div>
                    </>
                )} />

                <Column header="Policy" body={(row) => (
                    <>
                        <div>{row.policyName}</div>
                        <div>₹{row.policyPrice}</div>
                    </>
                )} />

                <Column
                    field="status"
                    header="Status"
                    body={(row) => getStatusTag(row.status)}
                    filter
                    showFilterMenu={false}
                    filterElement={statusRowFilterTemplate}
                    sortable
                />



                <Column header="Dates" body={(row) => (
                    <div>{row.startDate} - {row.endDate}</div>
                )} />

                <Column header="Quote" body={(row) => (
                    <Button label="Show" onClick={() => showQuote(row)} />
                )} />
            </DataTable>

            {/* Dialog box for Quote Details */}
            <Dialog header="Quote Details" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
                {selectedProposal && (
                    <div style={{ color: 'black' }}>
                        <h4>{selectedProposal.customerName}</h4>
                        <p><strong>Contact:</strong> {selectedProposal.customerContact}</p>
                        <p><strong>Vehicle:</strong> {selectedProposal.vehicleType} - {selectedProposal.vehicleModel}</p>
                        <p><strong>Policy:</strong> {selectedProposal.policyName} (₹{selectedProposal.policyPrice})</p>
                        <p><strong>Status:</strong> {selectedProposal.status}</p>
                        <p><strong>Dates:</strong> {selectedProposal.startDate} to {selectedProposal.endDate}</p>
                        <hr />
                        <h5>Add-Ons</h5>
                        {selectedProposal.addOns.length > 0 ? (
                            <ul>
                                {selectedProposal.addOns.map((addon, i) => (
                                    <li key={i}>{addon.name} - ₹{addon.price}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Add-Ons Selected</p>
                        )}
                        <hr />
                        <p><strong>Total Premium:</strong> ₹
                            {selectedProposal.policyPrice +
                                selectedProposal.addOns.reduce((sum, addon) => sum + addon.price, 0)}
                        </p>
                        <Button label="Send Quote" className='p-button-success' onClick={sendQuote} />
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default Proposal;
