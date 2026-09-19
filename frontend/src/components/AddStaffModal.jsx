import { useState } from "react";

function AddStaffModal({ onClose, onSave }) {
  const [staff, setStaff] = useState({
    name: "",
    role: "",
    mobile: "",
    complaints: 0,
    status: "Available",
  });

  const handleChange = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Staff Member</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={staff.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={staff.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={staff.mobile}
          onChange={handleChange}
        />

        <select
          name="status"
          value={staff.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
        </select>

        <div className="modal-buttons">

          <button
            className="save-btn"
            onClick={() => onSave(staff)}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddStaffModal;