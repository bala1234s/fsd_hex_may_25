import axios from "axios"

export const getPolicyHolderByIdWithAddons = (policyHolderId, dispatch) => {
    console.log(policyHolderId);
    
    axios.get(`http://localhost:8080/api/policy-holder/get-one-details/${policyHolderId}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    })
        .then((resp) => {
            console.log("Action " + resp.data);
            dispatch({
                'payload': resp.data,
                'type': 'GET_POLICY_HOLDER_BY_ID_WITH_ADDONS'
            })

        }).catch((err) => {
            console.log(err);

        })
}