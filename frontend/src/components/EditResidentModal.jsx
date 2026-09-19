import { useState, useEffect } from "react";

function EditResidentModal({ resident, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    flat: "",
  });

  useEffect(() => {
    if (resident) {
      setFormData(resident);
    }
  }, [resident]);

  if (!resident) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Resident</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <input
          type="text"
          name="flat"
          value={formData.flat}
          onChange={handleChange}
        />

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

export default EditResidentModal;