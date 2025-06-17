import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import AllPolicy from "./components/customer/AllPolicy"
import CustomerDashboard from "./components/customer/CustomerDashboard"
import CustomerRegister from "./components/customer/CustomerRegister"
import CustomerHome from "./components/customer/CustomerHome"
import Home from "./components/Home"
import PolicyDetails from "./components/customer/PolicyDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="getAllPolicy" element={<AllPolicy />}></Route>
        <Route path="policyDetails/:pid" element={<PolicyDetails />}></Route>
        <Route path="/customer" element={<CustomerDashboard />}>
          <Route path="customerHome" element={<CustomerHome />}></Route>
        
        </Route>
        <Route path="customerRegister" element={<CustomerRegister />}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
