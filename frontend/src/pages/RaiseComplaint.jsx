import { useState } from "react";
import Layout from "../components/Layout";
import "./RaiseComplaint.css";
import api from "../services/api";

function RaiseComplaint() {
  const [formData, setFormData] = useState({
  title: "",
  category: "",
  priority: "Low",
  description: "",
  image: null,
});
const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        !formData.title ||
        !formData.category ||
        !formData.description
    ) {
        alert("Please fill all required fields.");
        return;
    }

    try {
        const userId = localStorage.getItem("userId");

        const complaintData = {
            title: formData.title,
            category: formData.category,
            priority: formData.priority,
            description: formData.description,
            status: "Pending",
            user: { id: userId }
        };

        await api.post("/complaints", complaintData);

        alert("Complaint submitted successfully!");

        setFormData({
            title: "",
            category: "",
            priority: "Low",
            description: "",
            image: null,
        });

    } catch (error) {
        console.error(error);
        alert("Unable to submit complaint.");
    }
};
  return (
    <Layout>
      <div className="raise-container">
        <h1>Raise New Complaint</h1>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Complaint Title</label>
            <input type="text" placeholder="Enter complaint title" value={formData.title} onChange={(e) =>setFormData({
      ...formData,
      title: e.target.value,
    })
  }
/>
          </div>

          <div className="form-group">
            <label>Category</label>

           <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Security">Security</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Parking">Parking</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="6" placeholder="Describe your complaint..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

          </div>
            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  })
                }
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  style={{
                    width: "220px",
                    marginTop: "15px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />
              )}
            </div>
          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default RaiseComplaint;