import axios from "axios"

export const fetchAllPolicies = (dispatch) => {
    console.log("Action");
    
    //fetch all policies
    axios.get("http://localhost:8080/api/policy/get-all")
        .then((response) => {
            console.log(response.data);
            
            dispatch({
                'payload': response.data,
                'type': 'FETCH_ALL_POLICIES'
            })
        })
        .catch((error) => {
            console.log("Error fetching policies:", error);
            throw error;
        });
}