import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserDetails from "./components/UserDetails"
import User from "./components/UserDetails"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"

function App() {
  return (
    // <div>

    //   <UserDetails ></UserDetails>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDetails />}></Route>
        <Route path="add-user" element={<AddUser />}></Route>
        <Route path="edit-user/:uid" element={<EditUser />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
