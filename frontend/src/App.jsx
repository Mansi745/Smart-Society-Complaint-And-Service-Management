import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Profile from "./pages/Profile";
import ManageComplaints from "./pages/ManageComplaints";
import ManageResidents from "./pages/ManageResidents";
import ManageStaff from "./pages/ManageStaff";
import Notifications from "./pages/Notifications";
import ComplaintDetails from "./pages/ComplaintDetails";
import ForgotPassword from "./pages/ForgotPassword";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
  
      <Routes>
        {/* Public routes */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route 
    path="/forgot-password" 
    element={<ForgotPassword/>}
/>
         <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute
              allowedRoles={["RESIDENT"]}
            >
              <Dashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/raise-complaint"
          element={
            <RoleProtectedRoute
              allowedRoles={["RESIDENT"]}
            >
              <RaiseComplaint />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <RoleProtectedRoute
              allowedRoles={["RESIDENT"]}
            >
              <MyComplaints />
            </RoleProtectedRoute>
          }
        />

        {/* Admin routes */}

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/manage-complaints"
          element={
            <RoleProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <ManageComplaints />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/manage-residents"
          element={
            <RoleProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <ManageResidents />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/manage-staff"
          element={
            <RoleProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <ManageStaff />
            </RoleProtectedRoute>
          }
        />

        {/* Staff routes */}

        <Route
          path="/staff"
          element={
            <RoleProtectedRoute
              allowedRoles={["STAFF"]}
            >
              <StaffDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Common routes */}

        <Route
          path="/profile"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
                "STAFF",
                "RESIDENT",
              ]}
            >
              <Profile />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
                "STAFF",
                "RESIDENT",
              ]}
            >
              <Notifications />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "ADMIN",
                "STAFF",
                "RESIDENT",
              ]}
            >
              <ComplaintDetails />
            </RoleProtectedRoute>
          }
        />
      </Routes>
   
  );
}

export default App;
