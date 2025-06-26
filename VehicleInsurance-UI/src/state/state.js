import { configureStore } from "@reduxjs/toolkit";
import AllPolicyRender from "./reducer/AllPolicyRender";
import GetPolicyHolderRender from "./reducer/GetPolicyHolderRender";

const store = configureStore({
    reducer: {
        allPolicy: AllPolicyRender,
        policyHolderDetails:GetPolicyHolderRender
    }
})

export default store;