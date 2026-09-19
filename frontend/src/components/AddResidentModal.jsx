import { useState } from "react";

function AddResidentModal({ onClose, onSave })  {
  const [resident, setResident] = useState({
    name: "",
    email: "",
    mobile: "",
    flat: "",
  });

  const handleChange = (e) => {
    setResident({
      ...resident,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Resident</h2>

        <input
          type="text"
          name="name"
          placeholder="Resident Name"
          value={resident.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={resident.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={resident.mobile}
          onChange={handleChange}
        />

        <input
          type="text"
          name="flat"
          placeholder="Flat No"
          value={resident.flat}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button
            className="save-btn"
            onClick={() => onSave(resident)}
            >
            Save
            </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddResidentModal;