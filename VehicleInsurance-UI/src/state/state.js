import { configureStore } from "@reduxjs/toolkit";
import AllPolicyRender from "./reducer/AllPolicyRender";
import GetPolicyHolderRender from "./reducer/GetPolicyHolderRender";
import ApprovedPolicyRender from "./reducer/ApprovedPolicyRender";

const store = configureStore({
    reducer: {
        allPolicy: AllPolicyRender,
        policyHolderDetails: GetPolicyHolderRender,
        approvedPolicy:ApprovedPolicyRender
    }
})

export default store;