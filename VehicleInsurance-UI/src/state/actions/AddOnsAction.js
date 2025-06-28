import axios from "axios"

export const fetchAllAddons = (dispatch) => { 
    axios.get('http://localhost:8080/api/addons/details/get-all', {
        headers: {'Authorization':'Bearer '+localStorage.getItem('token')}
    }).then((resp) => {     
       
        
        dispatch({
            'payload': resp.data,
            'type':'GET_ALL_ADD_ONS'
        })
    }).catch(err=>console.log(err))
}
