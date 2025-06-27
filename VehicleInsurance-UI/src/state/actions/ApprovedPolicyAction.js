import axios from "axios"

export const getPolicyHolderWithApproved = (dispatch) => { 
    axios.get('http://localhost:8080/api/policy-holder/get', {
        headers:{'Authorization':'Bearer '+ localStorage.getItem('token')}
    }).then((resp) => { 
        dispatch({
            'payload': resp.data.filter((res)=>res.status === 'APPROVED'),
            'type':'GET_APPROVED_POLICY'
        })
    }).catch(err => console.log(err))
}