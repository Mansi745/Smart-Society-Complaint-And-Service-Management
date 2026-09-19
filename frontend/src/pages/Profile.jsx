import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./Profile.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    profession: "",
  });

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      console.log("Profile User ID:", userId);

      if (!userId || userId === "undefined" || userId === "null") {
        console.error("User ID not found in localStorage");
        return;
      }

      // Backend endpoint:
      // GET /api/users/{id}

      const response = await api.get(
        `/users/${userId}`
      );

      console.log("PROFILE API RESPONSE:", response.data);

      setUser({
        name: response.data.name || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        role: response.data.role || "",
        profession: response.data.profession || "",
      });

    } catch (error) {
      console.error(
        "Error loading profile:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );
    }
  };

  // ==========================================
  // CLOSE EDIT DIALOG
  // ==========================================

  const handleClose = () => {
    setOpenEdit(false);
  };

  // ==========================================
  // EDIT CHANGE
  // ==========================================

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      await api.put(
        `/users/${userId}`,
        {
          name: editData.name,
          phone: editData.phone,
        }
      );

      // Update localStorage name also
      localStorage.setItem(
        "userName",
        editData.name
      );

      alert(
        "Profile Updated Successfully"
      );

      await loadProfile();

      setOpenEdit(false);

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data ||
        "Unable to update profile"
      );
    }
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handleChangePassword = async () => {

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(
        "New Password and Confirm Password do not match"
      );
      return;
    }

    try {
      const userId =
        localStorage.getItem("userId");

      // Backend endpoint:
      // PUT /api/users/{id}/change-password

      const response = await api.put(
        `/users/${userId}/change-password`,
        {
          oldPassword,
          newPassword,
        }
      );

      alert(response.data);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setOpenPassword(false);

    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      alert(
        error.response?.data ||
        "Unable to change password"
      );
    }
  };

  return (
    <Layout>

      <div className="profile-container">

        <div className="profile-card">

          {/* ==========================================
              TITLE
          ========================================== */}

          <div className="profile-title">

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information
            </p>

          </div>


          {/* ==========================================
              PROFILE HEADER
          ========================================== */}

          <div className="profile-header">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
            />

            <h2>
              {user.name || "Loading..."}
            </h2>

            <span>
              {user.role || "User"} • Smart Society
            </span>

          </div>


          {/* ==========================================
              PERSONAL INFORMATION
          ========================================== */}

          <div className="section-title">
            Personal Information
          </div>


          <div className="profile-details">

            {/* FULL NAME */}

            <div className="detail">

              <label>
                👤 Full Name
              </label>

              <input
                type="text"
                value={user.name || ""}
                readOnly
              />

            </div>


            {/* EMAIL */}

            <div className="detail">

              <label>
                📧 Email Address
              </label>

              <input
                type="email"
                value={user.email || ""}
                readOnly
              />

            </div>


            {/* PHONE */}

            <div className="detail">

              <label>
                📱 Phone Number
              </label>

              <input
                type="text"
                value={user.phone || ""}
                readOnly
              />

            </div>


            {/* ROLE */}

            <div className="detail">

              <label>
                👥 Role
              </label>

              <input
                type="text"
                value={user.role || ""}
                readOnly
              />

            </div>


            {/* PROFESSION - STAFF ONLY */}

            {user.role === "STAFF" && (
              <div className="detail">

                <label>
                  🛠 Profession
                </label>

                <input
                  type="text"
                  value={user.profession || ""}
                  readOnly
                />

              </div>
            )}

          </div>


          {/* ==========================================
              SECURITY
          ========================================== */}

          <div className="security-section">

            <div className="section-title">
              🛡 Security
            </div>

            <div className="security-wrapper">

              {/* LEFT */}

              <div className="password-card">

                <div className="password-icon">
                  🔒
                </div>

                <h3>
                  Password
                </h3>

                <p>
                  Your password is securely encrypted
                  and cannot be viewed.
                </p>

              </div>


              <div className="security-divider"></div>


              {/* RIGHT */}

              <div className="security-info-card">

                <h3>
                  Keep Your Account Secure
                </h3>

                <p>
                  We strongly recommend using a strong
                  password and updating it regularly
                  to keep your Smart Society account
                  safe and protected.
                </p>

                <button
                  className="password-btn"
                  onClick={() =>
                    setOpenPassword(true)
                  }
                >
                  🔒 Change Password
                </button>

              </div>

            </div>

          </div>


          {/* ==========================================
              MANAGE PROFILE
          ========================================== */}

          <div className="manage-card">

            <div className="manage-content">

              <h3>
                Manage Your Profile
              </h3>

              <p>
                Update your personal information,
                phone number and account details to
                keep your profile up to date.
              </p>

            </div>

            <button
              className="edit-btn"
              onClick={() => {

                setEditData({
                  name: user.name || "",
                  phone: user.phone || "",
                });

                setOpenEdit(true);

              }}
            >
              ✏ Edit Profile
            </button>

          </div>


          {/* ==========================================
              EDIT PROFILE DIALOG
          ========================================== */}

          <Dialog
            open={openEdit}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
          >

            <DialogTitle
              sx={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              ✏ Edit Profile
            </DialogTitle>

            <DialogContent>

              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                value={user.email}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
              />

            </DialogContent>

            <DialogActions
              sx={{
                padding: "20px 24px",
              }}
            >

              <Button
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSave}
              >
                Save Changes
              </Button>

            </DialogActions>

          </Dialog>


          {/* ==========================================
              CHANGE PASSWORD DIALOG
          ========================================== */}

          <Dialog
            open={openPassword}
            onClose={() =>
              setOpenPassword(false)
            }
            fullWidth
            maxWidth="sm"
          >

            <DialogTitle
              sx={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              🔒 Change Password
            </DialogTitle>

            <DialogContent>

              <TextField
                fullWidth
                margin="normal"
                label="Current Password"
                type="password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </DialogContent>

            <DialogActions
              sx={{
                padding: "20px 24px",
              }}
            >

              <Button
                variant="outlined"
                onClick={() =>
                  setOpenPassword(false)
                }
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleChangePassword}
              >
                Update Password
              </Button>

            </DialogActions>

          </Dialog>

        </div>

      </div>

    </Layout>
  );
}

export default Profile;