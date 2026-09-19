import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import api from "../services/api";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

function ChartCard() {
  const [complaintStatus, setComplaintStatus] = useState([]);
  const [monthlyComplaints, setMonthlyComplaints] = useState([]);

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      const response = await api.get("/complaints");

      const complaints = response.data;

      const pending = complaints.filter(
        (c) => c.status === "Pending"
      ).length;

      const inProgress = complaints.filter(
        (c) => c.status === "In Progress"
      ).length;

      const resolved = complaints.filter(
        (c) => c.status === "Resolved"
      ).length;

      setComplaintStatus([
        { name: "Pending", value: pending },
        { name: "In Progress", value: inProgress },
        { name: "Resolved", value: resolved },
      ]);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyData = months.map((month) => ({
        month,
        complaints: 0,
      }));

      complaints.forEach((complaint) => {
        const index = new Date(
          complaint.createdAt
        ).getMonth();

        monthlyData[index].complaints += 1;
      });

      setMonthlyComplaints(monthlyData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        }}
      >
        <h3>Complaint Status</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={complaintStatus}
              dataKey="value"
              outerRadius={100}
              label
            >
              {complaintStatus.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        }}
      >
        <h3>Monthly Complaints</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyComplaints}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="complaints"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartCard;