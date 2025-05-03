import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import UserRegister from "./pages/UserRegister";
import CreateLead from "./pages/CreateLead";
import AboutUs from "./pages/AboutUs";
import ResetPassword from "./components/ResetPassword";
import DeanDashboard from "./pages/DeanDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />
          <Route path="/userRegister" element={<UserRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/coordinator" element={<CoordinatorDashboard />} />
          <Route path="/create-lead" element={<CreateLead />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dean" element={<DeanDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
