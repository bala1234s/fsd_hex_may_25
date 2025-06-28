import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddons } from "../../state/actions/AddOnsAction";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";

function AddOnsDetails() {
    const dispatch = useDispatch();
    const [addOns, setAddOns] = useState(useSelector(state => state.allAddOns.allAddOns));

    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedAddOn, setSelectedAddOn] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const token = localStorage.getItem("token");
    const itemsPerPage = 2;
    const [page, setPage] = useState(0);
    const paginatedAddOns = addOns.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    useEffect(() => {
        fetchAllAddons(dispatch);
    }, [dispatch]);

    const addAddOn = () => {
        const data = { name, description, price };
        axios.post("http://localhost:8080/api/addons/details/add", data, {
            headers: { Authorization: "Bearer " + token }
        }).then((resp) => {
            setAddOns(prev => [...prev, resp.data]);
            setVisible(false);
        }).catch(err => console.log(err));
    };

    const editAddOn = (addon) => {
        setSelectedAddOn(addon);
        setEditVisible(true);
    };

    const updateAddOn = () => {
        axios.put(`http://localhost:8080/api/addons/details/update/${selectedAddOn.id}`, selectedAddOn, {
            headers: { Authorization: "Bearer " + token }
        }).then(resp => {
            setAddOns(prev => prev.map(a => a.id === resp.data.id ? resp.data : a));
            setEditVisible(false);
        }).catch(err => console.log(err));
    };

    const deleteAddOn = (id) => {
        axios.delete(`http://localhost:8080/api/addons/details/delete/${id}`, {
            headers: { Authorization: "Bearer " + token }
        }).then(() => {
            setAddOns(prev => prev.filter(a => a.id !== id));
            alert("Add-on deleted successfully");
        }).catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h2>Add-Ons</h2>
                    <Button label="Add New Add-on" icon="pi pi-plus" onClick={() => setVisible(true)} />
                </div>
            </div>

            <div className="row mt-4" style={{ display: 'flex', gap: '20px',flexDirection:'row' }}>
                {paginatedAddOns.map((addon) => (
                    <div className="col-sm-6" key={addon.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{addon.name}</h5>
                                <p className="card-text">{addon.description}</p>
                                <p className="card-text">Price: ₹{addon.price}</p>
                            </div>
                            <div className="card-footer d-flex gap-2">
                                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => editAddOn(addon)} />
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteAddOn(addon.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <Button label="Previous" disabled={page === 0} onClick={() => setPage(page - 1)} />
                <Button label="Next" disabled={(page + 1) * itemsPerPage >= addOns.length} onClick={() => setPage(page + 1)} />
            </div>

            {/* Add Dialog */}
            <Dialog header="Add New Add-On" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="mb-3">
                    <label>Name</label>
                    <input className="form-control" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control" onChange={e => setPrice(e.target.value)} />
                </div>
                <Button label="Add Add-On" className="btn btn-primary" onClick={addAddOn} />
            </Dialog>

            {/* Edit Dialog */}
            <Dialog header="Edit Add-On" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                {selectedAddOn && (
                    <div>
                        <div className="mb-3">
                            <label>Name</label>
                            <input className="form-control" value={selectedAddOn.name} onChange={e => setSelectedAddOn({ ...selectedAddOn, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <textarea className="form-control" value={selectedAddOn.description} onChange={e => setSelectedAddOn({ ...selectedAddOn, description: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label>Price</label>
                            <input type="number" className="form-control" value={selectedAddOn.price} onChange={e => setSelectedAddOn({ ...selectedAddOn, price: e.target.value })} />
                        </div>
                        <Button label="Update Add-On" className="btn btn-primary" onClick={updateAddOn} />
                    </div>
                )}
            </Dialog>
        </div>
    );
}

export default AddOnsDetails;
