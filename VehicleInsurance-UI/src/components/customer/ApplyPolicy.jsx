import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';

function ApplyPolicy() {
    const param = useParams();
    const stepperRef = useRef(null);

    const [policyDetail, setPolicyDetail] = useState({});
    const [vehicleList, setVehicleList] = useState([]);
    const [addOnsList, setAddOnsList] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let navigate = useNavigate();


    useEffect(() => {
        // Fetch policy
        axios.get(`http://localhost:8080/api/policy/get-one/${param.pid}`)
            .then(resp => setPolicyDetail(resp.data))
            .catch(err => console.log(err));

        // Fetch vehicle
        axios.get('http://localhost:8080/api/vehicle/get', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(resp => setVehicleList(resp.data))
            .catch(err => console.log(err));

        // Fetch add-ons
        axios.get('http://localhost:8080/api/addons/details/get-all')
            .then(resp => setAddOnsList(resp.data))
            .catch(err => console.log(err));
    }, [param.pid]);

    const handleAddOnChange = (e) => {
        const selected = [...selectedAddOns];
        if (e.checked)
            selected.push(e.value);
        else
            selected.splice(selected.indexOf(e.value), 1);
        setSelectedAddOns(selected);
    };

    const submitPolicy = () => {
        if (!selectedVehicle || !startDate || !endDate) {
            alert("Please fill all required fields!");
            return;
        }

        const selectedVehicleObj = vehicleList.find(v => v.id === selectedVehicle);
        const customerId = selectedVehicleObj?.customer?.id;
        const vehicleId = selectedVehicle;

        // Remove 'id' from each addon
        const addOnsWithoutId = selectedAddOns.map(({ id, ...rest }) => rest);

        const postData = {
            holder: {
                planYear:selectedPlan,
                startDate: startDate,
                endDate: endDate
            },
            addOns: addOnsWithoutId
        };

        console.log("Submitting Policy Data:", postData);

        axios.post(`http://localhost:8080/api/policy-holder/apply?vehicleId=${vehicleId}&policyId=${param.pid}`, postData, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(resp => {
                alert("Policy Applied Successfully!");
                console.log(resp.data);
                navigate('/customer/my-insurance')
            })
            .catch(err => console.log(err));
    };

    // Plan years to date
    const handlePlanChange = (e) => {
        const years = parseInt(e.target.value);
        setSelectedPlan(years);

        const start = new Date();
        const end = new Date();
        end.setFullYear(end.getFullYear() + years);

        setStartDate(start.toISOString().split("T")[0]);
        setEndDate(end.toISOString().split("T")[0]);
    };
    

    return (
        <div className="container">

            <div className="row">
                <div className="col-12" style={{display:"flex",justifyContent:"space-between", alignItems:'center'}}>
                    <div>
                        <h2 className="my-4">Apply for Policy: {policyDetail.policyName}</h2>
                    </div>
                    <div className="col-3">
                        <Link to={'/customer/vehicle'} className="btn btn-primary">Add Vehicle</Link>
                    </div>

                </div>

                <div className="card flex justify-content-center p-4">

                    <Stepper ref={stepperRef} style={{ flexBasis: '10rem' }}>
                        <StepperPanel header="Select Vehicle">
                            <Dropdown
                                value={selectedVehicle}
                                onChange={(e) => setSelectedVehicle(e.value)}
                                options={vehicleList}
                                optionLabel="vehicleModel"
                                optionValue="id"
                                placeholder="Select a Vehicle"
                                className="w-full"
                            />
                            <div className="flex pt-4 justify-content-end">
                                <Button label="Next" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>

                        <StepperPanel header="Select Add-Ons">
                            {addOnsList.map(addon => (
                                <div key={addon.id} className="field-checkbox">
                                    <Checkbox
                                        inputId={addon.id}
                                        value={addon}
                                        onChange={handleAddOnChange}
                                        checked={selectedAddOns.includes(addon)}
                                    />
                                    <label htmlFor={addon.id}>{addon.name} - ₹{addon.price}</label>
                                </div>
                            ))}
                            <div className="flex pt-4 justify-content-between">
                                <Button label="Back" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Next" onClick={() => stepperRef.current.nextCallback()} />
                            </div>
                        </StepperPanel>

                        <StepperPanel header="Set Policy Period">
                            <div className="p-field mb-3">
                                <label>Policy Plan:</label>
                                <select className="form-control" onChange={handlePlanChange} value={selectedPlan || ""}>
                                    <option value="">Select Plan Duration</option>
                                    <option value="1">1 Year</option>
                                    <option value="2">2 Years</option>
                                    <option value="3">3 Years</option>
                                </select>
                            </div>

                            <div className="p-field mb-3">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" value={startDate} readOnly />
                            </div>

                            <div className="p-field mb-3">
                                <label>End Date:</label>
                                <input type="date" className="form-control" value={endDate} readOnly />
                            </div>

                            <div className="flex pt-4 justify-content-between">
                                <Button label="Back" onClick={() => stepperRef.current.prevCallback()} />
                                <Button label="Submit" onClick={()=>submitPolicy()} />
                            </div>
                        </StepperPanel>
                    </Stepper>
                </div>
            </div>


        </div>
    );
}

export default ApplyPolicy;
