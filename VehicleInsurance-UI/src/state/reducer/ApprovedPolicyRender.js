const initialStage = {
    approvedPolicy: []
}
const ApprovedPolicyRender = (state= initialStage, action) => {
    if (action.type === 'GET_APPROVED_POLICY') { 
        return {
            ...state,
           approvedPolicy: action.payload
        }
            
    }
    return state;
}
 
export default ApprovedPolicyRender;