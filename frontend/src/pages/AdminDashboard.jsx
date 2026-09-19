import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ChartCard from "../components/ChartCard";
import api from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    totalResidents: 0,
  });

  const [complaints, setComplaints] = useState([]);

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  const loadDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboard(response.data);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };


  // ==========================================
  // LOAD COMPLAINTS
  // ==========================================

  const loadComplaints = async () => {
    try {
      const response = await api.get("/complaints");

      setComplaints(response.data);

    } catch (error) {
      console.error("Error loading complaints:", error);
    }
  };


  // ==========================================
  // LOAD RESIDENT COUNT
  // ==========================================

  const loadResidentCount = async () => {
    try {

      const response = await api.get("/users");

      const users = response.data;

      // ONLY RESIDENTS
      const residentCount = users.filter(
        (user) =>
          user.role &&
          user.role.toUpperCase() === "RESIDENT"
      ).length;

      setDashboard((prev) => ({
        ...prev,
        totalResidents: residentCount,
      }));

    } catch (error) {

      console.error(
        "Error loading resident count:",
        error
      );

    }
  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    loadComplaints();

    loadDashboard();

    loadResidentCount();

  }, []);


  return (
    <Layout>

      <div className="admin-dashboard">

        <h1>
          Admin Dashboard
        </h1>


        {/* ==========================================
            DASHBOARD CARDS
        ========================================== */}

        <div className="admin-cards">


          {/* TOTAL RESIDENTS */}

          <div className="admin-card users">

            <h3>
              Total Residents
            </h3>

            <h2>
              {dashboard.totalResidents}
            </h2>

          </div>


          {/* TOTAL COMPLAINTS */}

          <div className="admin-card complaints">

            <h3>
              Total Complaints
            </h3>

            <h2>
              {dashboard.totalComplaints}
            </h2>

          </div>


          {/* PENDING */}

          <div className="admin-card pending">

            <h3>
              Pending
            </h3>

            <h2>
              {dashboard.pendingComplaints}
            </h2>

          </div>


          {/* RESOLVED */}

          <div className="admin-card resolved">

            <h3>
              Resolved
            </h3>

            <h2>
              {dashboard.resolvedComplaints}
            </h2>

          </div>

        </div>


        {/* ==========================================
            CHART
        ========================================== */}

        <ChartCard />


        {/* ==========================================
            RECENT COMPLAINTS
        ========================================== */}

        <div className="recent-table">

          <h2>
            Recent Complaints
          </h2>


          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Complaint
                </th>

                <th>
                  Category
                </th>

                <th>
                  Status
                </th>

                <th>
                  Priority
                </th>

              </tr>

            </thead>


            <tbody>

              {complaints.length > 0 ? (

                complaints.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.id}
                    </td>

                    <td>
                      {item.title}
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      {item.status}
                    </td>

                    <td>
                      {item.priority}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center"
                    }}
                  >
                    No Complaints Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ==========================================
            BOTTOM SECTION
        ========================================== */}

        <div className="bottom-section">

          {/* <RecentActivity /> */}

          {/* <QuickActions /> */}

        </div>

      </div>

    </Layout>
  );
}

export default AdminDashboard;