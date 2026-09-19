import { useEffect, useState } from "react";

function EditStaffModal({
  staff,
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    complaints: 0,
    status: "",
  });

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    }
  }, [staff]);

  if (!staff) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Staff Member</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Available">
            Available
          </option>

          <option value="Busy">
            Busy
          </option>
        </select>

        <div className="modal-buttons">

          <button
            className="save-btn"
            onClick={() => onUpdate(formData)}
          >
            Update
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


export default EditStaffModal;