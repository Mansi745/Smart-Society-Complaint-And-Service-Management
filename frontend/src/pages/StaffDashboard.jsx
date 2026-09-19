import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./StaffDashboard.css";

function StaffDashboard() {

    const [complaints, setComplaints] = useState([]);

    // ==========================================
    // LOAD ASSIGNED COMPLAINTS
    // ==========================================

    useEffect(() => {
        loadComplaints();
    }, []);

    const loadComplaints = async () => {

        try {

            const staffId = localStorage.getItem("staffId");

            if (!staffId) {
                console.error("Staff ID not found");
                return;
            }

            const response = await api.get(
                `/complaints/staff/${staffId}`
            );

            setComplaints(response.data);

        } catch (error) {

            console.error(
                "Error loading assigned complaints:",
                error
            );
        }
    };


    // ==========================================
    // UPDATE COMPLAINT STATUS
    // ==========================================

    const updateStatus = async (id, status) => {

        try {

            const complaint = complaints.find(
                (item) => item.id === id
            );

            if (!complaint) {
                return;
            }

            await api.put(
                `/complaints/${id}`,
                {
                    ...complaint,
                    status: status,
                }
            );

            await loadComplaints();

        } catch (error) {

            console.error(
                "Error updating complaint:",
                error
            );
        }
    };


    // ==========================================
    // COUNTS
    // ==========================================

    const totalComplaints = complaints.length;

    const pending = complaints.filter(
        (item) =>
            item.status?.toLowerCase() === "pending"
    ).length;

    const inProgress = complaints.filter(
        (item) =>
            item.status?.toLowerCase() === "in progress"
    ).length;

    const resolved = complaints.filter(
        (item) =>
            item.status?.toLowerCase() === "resolved" ||
            item.status?.toLowerCase() === "completed"
    ).length;


    // ==========================================
    // UI
    // ==========================================

    return (

        <Layout>

            <div className="staff-dashboard">

                <h1>
                    Staff Dashboard
                </h1>


                {/* =================================
                    DASHBOARD CARDS
                ================================= */}

                <div className="staff-cards">

                    {/* TOTAL COMPLAINTS */}

                    <div className="staff-card total">

                        <h3>
                            Total Complaints
                        </h3>

                        <h2>
                            {totalComplaints}
                        </h2>

                    </div>


                    {/* PENDING */}

                    <div className="staff-card pending">

                        <h3>
                            Pending
                        </h3>

                        <h2>
                            {pending}
                        </h2>

                    </div>


                    {/* IN PROGRESS */}

                    <div className="staff-card progress">

                        <h3>
                            In Progress
                        </h3>

                        <h2>
                            {inProgress}
                        </h2>

                    </div>


                    {/* RESOLVED */}

                    <div className="staff-card resolved">

                        <h3>
                            Resolved
                        </h3>

                        <h2>
                            {resolved}
                        </h2>

                    </div>

                </div>


                {/* =================================
                    ASSIGNED COMPLAINTS
                ================================= */}

                <div className="staff-table-container">

                    <h2>
                        Assigned Complaints
                    </h2>

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>
                                    Complaint
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Priority
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Update
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
                                            {item.priority}
                                        </td>

                                        <td>
                                            {item.status}
                                        </td>

                                        <td>

                                            {item.status !== "Resolved" &&
                                                item.status !== "Completed" && (

                                                    <>

                                                        <button
                                                            className="progress-btn"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "In Progress"
                                                                )
                                                            }
                                                        >
                                                            In Progress
                                                        </button>


                                                        <button
                                                            className="complete-btn"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "Resolved"
                                                                )
                                                            }
                                                        >
                                                            Complete
                                                        </button>

                                                    </>

                                                )}

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        No complaints assigned.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default StaffDashboard;