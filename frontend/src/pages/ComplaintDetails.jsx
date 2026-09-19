import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import "./ComplaintDetails.css";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/complaints/${id}?userId=${userId}`);
      setComplaint(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!complaint) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="details-container">
        <h1>Complaint Details</h1>

        <div className="details-card">

          <p>
            <strong>ID:</strong> {complaint.id}
          </p>

          <p>
            <strong>Complaint:</strong> {complaint.title}
          </p>

          <p>
            <strong>Description:</strong> {complaint.description}
          </p>

          <p>
            <strong>Category:</strong> {complaint.category}
          </p>

          <p>
            <strong>Priority:</strong> {complaint.priority}
          </p>

          <p>
            <strong>Status:</strong> {complaint.status}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              complaint.createdAt
            ).toLocaleString()}
          </p>

        </div>
      </div>
    </Layout>
  );
}

export default ComplaintDetails;