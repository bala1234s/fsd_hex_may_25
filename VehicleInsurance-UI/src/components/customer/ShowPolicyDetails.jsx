import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolicyHolderByIdWithAddons } from "../../state/actions/GetPolicyHolderAction";

import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import jsPDF from 'jspdf';

function ShowPolicyDetails({ policyHolderId }) {
    const dispatch = useDispatch();
    const policyRef = useRef();

    const policyDetails = useSelector(state => state.policyHolderDetails.policyHolderDetails);

    useEffect(() => {
        if (policyHolderId) {
            getPolicyHolderByIdWithAddons(policyHolderId, dispatch);
        }
    }, [dispatch, policyHolderId]);

    if (!policyDetails || !policyDetails.holder) return <p>No policy data found.</p>;

    const { holder, addOns } = policyDetails;
    const customer = holder.vehicle.customer;
    const vehicle = holder.vehicle;
    const policy = holder.policy;
// PDF Generation
    const downloadPDF = () => {
        const { holder, addOns } = policyDetails;
        const customer = holder.vehicle.customer;
        const vehicle = holder.vehicle;
        const policy = holder.policy;

        const doc = new jsPDF();
        let y = 10;

        const addLine = (text) => {
            doc.text(text, 10, y);
            y += 8;
        };

        doc.setFontSize(14);
        doc.text("Policy Document", 80, y);
        y += 10;

        doc.setFontSize(12);
        addLine("Customer Details");
        addLine(`Name: ${customer.name}`);
        addLine(`Contact: ${customer.contact}`);
        addLine(`Aadhar Number: ${customer.aadharNumber}`);
        addLine(`PAN Number: ${customer.panNumber}`);
        addLine(`Address: ${customer.address}`);
        y += 5;

        addLine("Vehicle Details");
        addLine(`Type: ${vehicle.vehicleType}`);
        addLine(`Model: ${vehicle.vehicleModel}`);
        addLine(`Registration No: ${vehicle.registrationNumber}`);
        addLine(`Value: Rs.${vehicle.vehicleValue}`);
        addLine(`Purchase Date: ${vehicle.purchaseDate}`);
        y += 5;

        addLine("Policy Details");
        addLine(`Policy Name: ${policy.policyName}`);
        addLine(`Type: ${policy.policyType}`);
        addLine(`Description: ${policy.description}`);
        addLine(`Price: Rs.${policy.price}`);
        addLine(`Status: ${holder.status}`);
        addLine(`Coverage Period: ${holder.startDate} to ${holder.endDate}`);
        addLine(`Active Status: ${holder.active ? "Active" : "Inactive"}`);
        y += 5;

        addLine("Add-Ons");
        if (addOns && addOns.length > 0) {
            addOns.forEach(addOn => {
                addLine(`- ${addOn.name} (Rs.${addOn.price})`);
                addLine(`  ${addOn.description}`);
            });
        } else {
            addLine("No add-ons selected.");
        }

        doc.save(`Policy_${policyHolderId}.pdf`);
    };
    

    return (
        <div style={{ padding: '2rem' }}>
            <div ref={policyRef} style={{ maxWidth: '700px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', padding: '2rem', color: 'black' }}>
                <h2 className="text-center mb-4">Policy Document</h2>

                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Contact:</strong> {customer.contact}</p>
                <p><strong>Aadhar Number:</strong> {customer.aadharNumber}</p>
                <p><strong>PAN Number:</strong> {customer.panNumber}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <hr />

                <h4>Vehicle Details</h4>
                <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                <p><strong>Model:</strong> {vehicle.vehicleModel}</p>
                <p><strong>Registration No:</strong> {vehicle.registrationNumber}</p>
                <p><strong>Value:</strong> ₹{vehicle.vehicleValue}</p>
                <p><strong>Purchase Date:</strong> {vehicle.purchaseDate}</p>
                <hr />

                <h4>Policy Details</h4>
                <p><strong>Policy Name:</strong> {policy.policyName}</p>
                <p><strong>Type:</strong> {policy.policyType}</p>
                <p><strong>Description:</strong> {policy.description}</p>
                <p><strong>Price:</strong> ₹{policy.price}</p>
                <p><strong>Status:</strong> <Tag severity="success" value={holder.status}></Tag></p>
                <p><strong>Coverage Period:</strong> {holder.startDate} to {holder.endDate}</p>
                <p><strong>Active Status:</strong> {holder.active ?
                    <Tag severity="primary" value="Active" />
                    : <Tag severity="danger" value="In-active" />}
                </p>
                <hr />

                <h4>Add-Ons</h4>
                {addOns && addOns.length > 0 ? (
                    <ul>
                        {addOns.map(addOn => (
                            <li key={addOn.id}>
                                <strong>{addOn.name}</strong> - ₹{addOn.price}
                                <br />
                                <em>{addOn.description}</em>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No add-ons selected.</p>
                )}
            </div>

            <div className="text-center mt-4">
                <Button label="Download as PDF" icon="pi pi-download" onClick={()=>downloadPDF()} />
            </div>
        </div>
    );
}

export default ShowPolicyDetails;
