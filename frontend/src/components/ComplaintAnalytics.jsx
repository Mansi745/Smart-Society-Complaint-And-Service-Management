import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Pending", value: 5 },
  { name: "In Progress", value: 3 },
  { name: "Resolved", value: 7 },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

function ComplaintAnalytics() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        marginTop: "25px",
      }}
    >
      <h2>Complaint Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
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
  );
}

export default ComplaintAnalytics;