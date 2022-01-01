import React from "react"
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import LogIn from "../../View/Login"
import AdminPanel from "../../View/AdminPanel"
import Register from "../../View/Register"
import Home from "../../View/Home"
import OrderRoom from "../../View/OrderRoom"
import Navbar from "../../Utils/Navbar/index"
import HotelDetails from "../../View/HotelDetails"
export default function AppRouter(){
    return(
        <Router>
            
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/order" element={<OrderRoom />} />
                <Route path="/hotel/:id/hoteldetail" element={<HotelDetails />} />
            </Routes>
        </Router>
    )
}