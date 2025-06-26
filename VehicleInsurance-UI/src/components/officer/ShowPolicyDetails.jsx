import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolicyHolderByIdWithAddons } from "../../state/actions/GetPolicyHolderAction";

import { Tag } from 'primereact/tag';


function ShowPolicyDetails({ policyHolderId }) {
    const dispatch = useDispatch();

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

    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', color: 'black' }}>
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
            <p><strong>Status:</strong> <Tag severity="success" value={holder.status} ></Tag></p>
            <p><strong>Coverage Period:</strong> {holder.startDate} to {holder.endDate}</p>
            <p><strong>Active Status:</strong> {holder.active ?
                                            <Tag severity="primary" value="Active" ></Tag>
                                            : <Tag severity="danger" value="In-active" ></Tag>}</p>
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
    );
}

export default ShowPolicyDetails;

