const initialState = {
    policyHolderDetails: {}
}
const GetPolicyHolderRender = (state = initialState, action) => {
    if (action.type === 'GET_POLICY_HOLDER_BY_ID_WITH_ADDONS') {
        return { policyHolderDetails: action.payload };
    }
    return state;
}

export default GetPolicyHolderRender;