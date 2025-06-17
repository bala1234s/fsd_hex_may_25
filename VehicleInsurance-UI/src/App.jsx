import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import AllPolicy from "./components/customer/AllPolicy"
import CustomerDashboard from "./components/customer/CustomerDashboard"
import CustomerRegister from "./components/customer/CustomerRegister"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="getAllPolicy" element={<AllPolicy />}></Route>
        <Route path="customer" element={<CustomerDashboard />}></Route>
        <Route path="customerRegister" element={<CustomerRegister />}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
