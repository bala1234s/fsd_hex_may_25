import { configureStore } from "@reduxjs/toolkit";
import AllPolicyRender from "./reducer/AllPolicyRender";
import GetPolicyHolderRender from "./reducer/GetPolicyHolderRender";
import ApprovedPolicyRender from "./reducer/ApprovedPolicyRender";
import AddOnsRender from "./reducer/AddOnsRender";

const store = configureStore({
    reducer: {
        allPolicy: AllPolicyRender,
        policyHolderDetails: GetPolicyHolderRender,
        approvedPolicy: ApprovedPolicyRender,
        allAddOns:AddOnsRender
    }
})

export default store;