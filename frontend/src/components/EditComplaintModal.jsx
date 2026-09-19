import { useState, useEffect } from "react";
import api from "../services/api";

function EditComplaintModal({
  complaint,
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        title: complaint.title || "",
        category: complaint.category || "",
        priority: complaint.priority || "",
        status: complaint.status || "",
      });
    }
  }, [complaint]);

  if (!complaint) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await api.put(
        `/complaints/${complaint.id}`,
        {
          ...complaint,
          ...formData,
        }
      );

      alert("Complaint updated successfully!");

      if (onUpdate) {
        onUpdate(response.data);
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to update complaint.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Complaint</h2>

        <label>Complaint</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Category</label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label>Priority</label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Resolved">
            Resolved
          </option>
        </select>

        <div className="modal-buttons">
          <button
            className="save-btn"
            onClick={handleSave}
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

export default EditComplaintModal;