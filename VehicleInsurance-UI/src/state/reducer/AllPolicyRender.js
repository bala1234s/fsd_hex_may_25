const initialState = {
    allPolicy:[]
}
const AllPolicyRender = (state = initialState, action) => { 
    if (action.type === "FETCH_ALL_POLICIES") {
        
        // Update the state with the fetched policies
        return {
            ...state,
            allPolicy: action.payload
        };
    }
    return state;
}
export default AllPolicyRender;