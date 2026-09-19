import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

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

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <Layout>
      <div className="dashboard">
        <h1>Resident Dashboard</h1>

        <div className="cards">
          <div className="card total">
            <h3>Total Complaints</h3>
            <h2>{total}</h2>
          </div>

          <div className="card pending">
            <h3>Pending</h3>
            <h2>{pending}</h2>
          </div>

          <div className="card progress">
            <h3>In Progress</h3>
            <h2>{progress}</h2>
          </div>

          <div className="card resolved">
            <h3>Resolved</h3>
            <h2>{resolved}</h2>
          </div>
        </div>

        <div className="table-container">
          <h2>Recent Complaints</h2>

          <table>
            <thead>
              <tr>
                <th>Complaint</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td>{item.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;