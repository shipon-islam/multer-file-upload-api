import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home1 from "../pages/Home1";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";

export default function Routers() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/login" element={<Login />} />

        <Route path="/mypost" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Logout />} />
      </Routes>
    </div>
  );
}
