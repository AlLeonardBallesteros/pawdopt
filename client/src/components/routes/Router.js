import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import About from '../pages/About'
import ItemsDonated from "../pages/ItemsDonated";
import SuccessfullyAdopted from "../pages/SuccessfullyAdopted";
import FriendNeedsHome from "../pages/FriendNeedsHome";
import Contacts from '../pages/Contacts'
import How from '../pages/How'
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import JoinUs from '../pages/JoinUs'
import Help from "../pages/Help";
import ForgotPassword from '../pages/ForgotPassword';
import NewSubmit from "../pages/NewSubmit";
import AdminDashboard from "../adminpanel/dashboard/AdminDashboard";






function Router() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About/>} />
        <Route path="items-donated" element={<ItemsDonated />} />
        <Route path="successful-adopted" element={<SuccessfullyAdopted />} />
        <Route path="available-to-adopt" element={<FriendNeedsHome />} />
        <Route path="contact-us" element={<Contacts />} />
        <Route path="how-to" element={<How />} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="join-us" element={<JoinUs/>} />
        <Route path="help-us" element={<Help/>} />
        <Route path="forgot-password" element ={<ForgotPassword/>} />
        <Route path="otp" element ={<NewSubmit/>} />
        <Route path="admin-dashboard/*" element ={<AdminDashboard/>} />
      </Routes>
    </div>
  )
}

export default Router
