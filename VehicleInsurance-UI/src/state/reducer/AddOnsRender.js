const initalState = {
    allAddOns:[]
}

const AddOnsRender = (state = initalState, action) => { 
    if (action.type === 'GET_ALL_ADD_ONS') { 
        console.log("Addon Render"+action.payload);
        
        return {
            ...state,
            allAddOns:action.payload
        }
    }
    return state;
}

export default AddOnsRender;