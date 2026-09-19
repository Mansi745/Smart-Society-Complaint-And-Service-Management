import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import ComplaintModal from "../components/ComplaintModal";
import EditComplaintModal from "../components/EditComplaintModal";
import "./MyComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editComplaint, setEditComplaint] = useState(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/complaints?userId=${userId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/complaints/${id}`);

      setComplaints(complaints.filter((complaint) => complaint.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateComplaint = (updatedComplaint) => {
    setComplaints(
      complaints.map((item) =>
        item.id === updatedComplaint.id ? updatedComplaint : item,
      ),
    );

    setEditComplaint(null);
  };

  const filteredComplaints = complaints.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="complaints-container">
        <h1>My Complaints</h1>

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search Complaint..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Staff</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.priority}</td>

                <td>
                  <span
                    className={`status ${item.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
  {item.assignedStaff ? (
    <div>
      <strong>{item.assignedStaff.name}</strong>
      <br />
      <small>{item.assignedStaff.role}</small>
    </div>
  ) : (
    "Not Assigned"
  )}
</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                <td>
                  <button
                    className="view"
                    onClick={() => setSelectedComplaint(item)}
                  >
                    View
                  </button>

                  <button
                    className="edit"
                    onClick={() => setEditComplaint(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteComplaint(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedComplaint && (
          <ComplaintModal
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        )}

        {editComplaint && (
          <EditComplaintModal
            complaint={editComplaint}
            onClose={() => setEditComplaint(null)}
            onUpdate={updateComplaint}
          />
        )}
      </div>
    </Layout>
  );
}

export default MyComplaints;
