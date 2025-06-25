import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import axios from 'axios';
import "../css/Proposal.css";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function Proposal() {
    const [proposals, setProposals] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [totalPremium, setTotalPremium] = useState(0);
    
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    useEffect(() => {
        axios.get('http://localhost:8080/api/policy-holder/getAll', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then((resp) => {
            const flattened = resp.data.map(flattenProposal);
            setProposals(flattened);
        }).catch((err) => console.log(err));
    }, []);

    const flattenProposal = (proposal) => {
        return {
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
            addOnsList: proposal.addOns.map(addon => <div key={addon.id}>{addon.name} - ₹{addon.price}</div>),
            addOns: proposal.addOns
        };
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'CLAIMED': return 'success';
            case 'PENDING': return 'warning';
            case 'QUOTE GENERATED': return 'info';
            default: return null;
        }
    };

    const customerBodyTemplate = (rowData) => (
        <div>
            <div><strong>{rowData.customerName}</strong></div>
            <div>{rowData.customerContact}</div>
        </div>
    );

    const vehicleBodyTemplate = (rowData) => (
        <div>
            <div>Type: {rowData.vehicleType}</div>
            <div>Model: {rowData.vehicleModel}</div>
        </div>
    );

    const policyBodyTemplate = (rowData) => (
        <div>
            <div>{rowData.policyName}</div>
            <div>₹{rowData.policyPrice}</div>
        </div>
    );

    const addOnsBodyTemplate = (rowData) => (
        <div>{rowData.addOnsList}</div>
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );

    const statusRowFilterTemplate = (options) => {
        const statuses = ['CLAIMED', 'PENDING', 'QUOTE GENERATED'];
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

    const dateBodyTemplate = (rowData) => (
        <div>
            <div>Start: {rowData.startDate}</div>
            <div>End: {rowData.endDate}</div>
        </div>
    );

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-center ">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                    />
                </IconField>
            </div>
        );
    };

    // Proper per-row button to show the dialog
    const generateQuoteButton = (rowData) => {
        console.log(rowData.addOns);
        let addons = 0;
        // for (let i = 0; i < rowData.addOns.length; i++) {
        //     console.log(rowData.addOns[i]);


        // }
        console.log(addons);

        return (
            <Button
                label="Show"
                icon="pi pi-external-link"
                onClick={() => {
                    setSelectedProposal(rowData);
                    setVisible(true);
                }}
                style={{ backgroundColor: 'rgb(24, 66, 158)' }}
            />
        );
    };

    // send quotes
    const sendQuote = (selectedPolicy) => { 
        console.log(selectedPolicy);
        let addons = (selectedProposal.addOns && selectedProposal.addOns.length > 0
            ? selectedProposal.addOns.reduce((sum, addon) => sum + addon.price, 0)
            : 0);
        let quoteObj = {
            'premium': selectedPolicy.policyPrice,
            'addOnPrice': addons,
            'total': selectedPolicy.policyPrice+addons
        }
        console.log(quoteObj);
        
        axios.post(`http://localhost:8080/api/quote/send/${selectedPolicy.id}`, quoteObj, {
            headers: { 'Authorization': 'Bearer ' +localStorage.getItem('token')}
        }).then((resp) => { 
            console.log("sended Quote");
            setVisible(false);
        }).catch((err) => { 
            console.log(err);
            
        })
    }

    const header = renderHeader();

    return (
        <div>
            <DataTable
                value={proposals}
                paginator
                rows={3}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                globalFilterFields={['customerName', 'customerContact', 'vehicleType', 'vehicleModel', 'policyName', 'addOnsList']}
                header={header}
                emptyMessage="No proposals found."
                className='proposal-header'
                style={{ padding: '1rem' }}
            >
                <Column header="Customer Details" body={customerBodyTemplate} style={{ width: '12rem' } } />
                <Column header="Vehicle Details" body={vehicleBodyTemplate} style={{ width: '12rem' }} />
                <Column header="Policy" body={policyBodyTemplate} style={{ width: '12rem' }} />
                <Column header="Add-Ons" body={addOnsBodyTemplate} style={{ width: '21rem' }} />
                <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                    showFilterMenu={false}
                    filter  
                    filterElement={statusRowFilterTemplate}
                />
                <Column header="Start & End Date" body={dateBodyTemplate} style={{ width: '15rem' }} />
                <Column header="Quote" body={generateQuoteButton} />
            </DataTable>


            <Dialog header="Quote Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                {

                    selectedProposal ? (
                        <div className='card' style={{
                            padding: '1rem',
                            maxWidth: '500px',
                            margin: '0 auto',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '2px 3px 5px rgba(0,0,0,0.1)',
                            color:'black'
                        
                        }}>
                            <div className="card-body">
                                <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Insurance Quote Summary</h3>

                                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                    <tbody >
                                        <tr >
                                            <td><strong>Customer:</strong></td>
                                            <td >{selectedProposal.customerName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Contact:</strong></td>
                                            <td>{selectedProposal.customerContact}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Vehicle:</strong></td>
                                            <td>{selectedProposal.vehicleType} - {selectedProposal.vehicleModel}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Policy:</strong></td>
                                            <td>{selectedProposal.policyName} (₹{selectedProposal.policyPrice})</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Status:</strong></td>
                                            <td>{selectedProposal.status}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Coverage Dates:</strong></td>
                                            <td>{selectedProposal.startDate} TO {selectedProposal.endDate}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Add-Ons:</strong></td>
                                            <td>
                                                {selectedProposal.addOns && selectedProposal.addOns.length > 0 ? (
                                                    <table style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th style={{ textAlign: 'left' }}>Name</th>
                                                                <th style={{ textAlign: 'right'}}>Price (₹)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedProposal.addOns.map((addon, idx) => (
                                                                <tr key={idx}>
                                                                    <td>{addon.name}</td>
                                                                    <td style={{ textAlign: 'right', color: 'blue' }}>{addon.price}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : <span>No Add-Ons Selected</span>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Total Premium:</strong></td>
                                            <td style={{color:'green'}}><strong>₹{
                                                selectedProposal.policyPrice +
                                                (selectedProposal.addOns && selectedProposal.addOns.length > 0
                                                    ? selectedProposal.addOns.reduce((sum, addon) => sum + addon.price, 0)
                                                    : 0)
                                            }</strong></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="card-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
                                    <button className='btn btn-primary' onClick={()=>sendQuote(selectedProposal)}>Send Quote</button>
                                </div>
                            </div>
                        </div>

                    ) : <p>No data available.</p>}
            </Dialog>
        </div>
    );

}

export default Proposal;
