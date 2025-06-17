import { configureStore } from "@reduxjs/toolkit";
import AllPolicyRender from "./reducer/AllPolicyRender";

const store = configureStore({
    reducer: {
        allPolicy: AllPolicyRender
    }
})

export default store;