// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/admin/dashboard";
import User_dashboard from "./components/user/user_dashboard";
import Usermanagement from "./components/admin/usermanagement";
import Ownermanagement from "./components/admin/ownermanagement";
import Navbar from "./components/admin/navbar";
import Header from "./components/admin/header";
import Legal from "./components/admin/legal";
import Settings from "./components/admin/settings";
import LegalDashboard from "./components/legal/legalDashboard";
import Ownersdashboard from "./components/owner/ownersdashboard";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
     
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/admin-dashboard" element={<PrivateRoute element={<Dashboard/>} allowedRoles={['Admin']} />} />
        <Route path="/user-management" element={<PrivateRoute element={<Usermanagement/>} allowedRoles={['Admin']} />} />
        <Route path="/user-dashboard" element={ <PrivateRoute element={<User_dashboard/>} allowedRoles={['user']} />} />
        <Route path="/owner" element={ <PrivateRoute element={<Ownermanagement/>} allowedRoles={['Admin']} />} />
        <Route path="/legal" element={ <PrivateRoute element={<Legal/>} allowedRoles={['Admin']} />} />
        <Route path="/admin-settings" element={ <PrivateRoute element={<Settings/>} allowedRoles={['Admin']} />} />
        <Route path="/legal-team-dashboard" element={ <PrivateRoute element={<LegalDashboard/>} allowedRoles={['LegalTeam']} />} />
        <Route path="/owner-dashboard" element={ <PrivateRoute element={<Ownersdashboard/>} allowedRoles={['Owner']} />} />
        
        <Route path="/lead-generation-dashboard" element={ <PrivateRoute element={<div>Lead Generation Dashboard</div>} allowedRoles={['lead_generation_specialist']} />} />
        <Route path="/property-manager-dashboard" element={ <PrivateRoute element={<div>Property Manager Dashboard</div>} allowedRoles={['property_manager']} />} />
        <Route path="/facility-manager-dashboard" element={ <PrivateRoute element={<div>Facility Manager Dashboard</div>} allowedRoles={['facility_manager']} />} />
        <Route path="/finance-team-dashboard" element={ <PrivateRoute element={<div>Finance Team Dashboard</div>} allowedRoles={['finance_team_member']} />} />
        <Route path="/manager-dashboard" element={ <PrivateRoute element={<div>Manager Dashboard</div>} allowedRoles={['manager']} />} />
        <Route path="/tenant-dashboard" element={ <PrivateRoute element={<div>Tenant Dashboard</div>} allowedRoles={['tenant']} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
