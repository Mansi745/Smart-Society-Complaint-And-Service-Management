import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "./ManageStaff.css";
import api from "../services/api";
import AddStaffModal from "../components/AddStaffModal";
import EditStaffModal from "../components/EditStaffModal";
import StaffModal from "../components/StaffModal";

function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editStaff, setEditStaff] = useState(null);

  useEffect(() => {
  console.log("ManageStaff loaded");
  loadStaff();
}, []);
  const loadStaff = async () => {
  try {
    console.log("Calling /staff API...");

    const response = await api.get("/staff");

    console.log("API RESPONSE:", response.data);
    console.log("STAFF STATUS:", response.data[0]?.status);
    setStaff(response.data);
  } catch (error) {
    console.error("STAFF API ERROR:", error);
  }
};

  const addStaff = async (staffMember) => {
    try {
      await api.post("/staff", staffMember);
      loadStaff();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStaff = async (updatedStaff) => {
    try {
      await api.put(`/staff/${updatedStaff.id}`, updatedStaff);
      loadStaff();
      setEditStaff(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStaff = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/staff/${id}`);
      loadStaff();
    } catch (error) {
      console.error(error);
    }
  };
const approveStaff = async (id) => {
  try {
    await api.put(`/staff/${id}/approve`);
    loadStaff();
  } catch (error) {
    console.error(error);
  }
};
  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.mobile.includes(search)
  );

  return (
    <Layout>
      <div className="staff-container">
        <div className="staff-header">
          <h1>Manage Staff</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Staff
          </button>
        </div>

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Mobile</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
           {filteredStaff.length > 0 ? (
  filteredStaff.map((member) => (
    <tr key={member.id}>
      <td>{member.id}</td>
      <td>{member.name}</td>
      <td>{member.role}</td>
      <td>{member.mobile}</td>
      <td>{member.complaints}</td>

      <td>
        <span
          className={
            member.status === "AVAILABLE"
              ? "available"
              : member.status === "PENDING"
              ? "pending"
              : "busy"
          }
        >
          {member.status}
        </span>
      </td>

      <td>
        <button
          className="view"
          onClick={() => setSelectedStaff(member)}
        >
          View
        </button>

        {member.status === "PENDING" && (
          <button
            className="approve"
            onClick={() => approveStaff(member.id)}
          >
            Approve
          </button>
        )}

        <button
          className="edit"
          onClick={() => setEditStaff(member)}
        >
          Edit
        </button>

        <button
          className="delete"
          onClick={() => deleteStaff(member.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="7" style={{ textAlign: "center" }}>
      No staff members found.
    </td>
  </tr>
)}
          </tbody>
        </table>

        {showModal && (
          <AddStaffModal
            onClose={() => setShowModal(false)}
            onSave={addStaff}
          />
        )}

        {editStaff && (
          <EditStaffModal
            staff={editStaff}
            onClose={() => setEditStaff(null)}
            onUpdate={updateStaff}
          />
        )}
        {selectedStaff && (
    <StaffModal
        staff={selectedStaff}
        onClose={() => setSelectedStaff(null)}
    />
)}
      </div>
    </Layout>
  );
}

export default ManageStaff;