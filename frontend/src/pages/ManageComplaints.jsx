import Layout from "../components/Layout";
import "./ManageComplaints.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditComplaintModal from "../components/EditComplaintModal";
import api from "../services/api";

function ManageComplaints() {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [editComplaint, setEditComplaint] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // =====================================================
  // FETCH COMPLAINTS
  // =====================================================

  const fetchComplaints = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(
        `/complaints?userId=${userId}`
      );

      console.log("COMPLAINTS:", response.data);

      setComplaints(response.data);
    } catch (error) {
      console.error(
        "Error fetching complaints:",
        error
      );
    }
  };

  // =====================================================
  // FETCH STAFF
  // =====================================================

  const fetchStaff = async () => {
    try {
      const response = await api.get("/staff");

      console.log("STAFF API RESPONSE:", response.data);

      setStaffList(response.data);
    } catch (error) {
      console.error(
        "Error fetching staff:",
        error
      );
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchComplaints();
    fetchStaff();
  }, []);

  // =====================================================
  // CATEGORY → STAFF PROFESSION MATCHING
  // =====================================================
const isProfessionMatch = (staff, category) => {
  if (!staff || !category) {
    return false;
  }

  const categoryValue = category
    .toString()
    .trim()
    .toLowerCase();

  const roleValue = (staff.role || "")
    .toString()
    .trim()
    .toLowerCase();

  const professionValue = (staff.profession || "")
    .toString()
    .trim()
    .toLowerCase();

  const categoryRoleMap = {
    plumbing: ["plumber", "plumbing"],
    electrical: ["electrician", "electrical"],
    cleaning: ["cleaner", "cleaning"],
    maintenance: ["maintenance"],
    security: ["security", "security guard"],
    parking: ["parking"],
  };

  const allowedRoles =
    categoryRoleMap[categoryValue] || [];

  return (
    allowedRoles.includes(roleValue) ||
    allowedRoles.includes(professionValue)
  );
};
  // =====================================================
  // SELECT STAFF
  // =====================================================

  const handleStaffChange = (
    complaintId,
    staffId
  ) => {
    setSelectedStaff((prev) => ({
      ...prev,
      [complaintId]: staffId,
    }));
  };

  // =====================================================
  // ASSIGN COMPLAINT
  // =====================================================

  const assignComplaint = async (complaintId) => {
    const staffId = selectedStaff[complaintId];

    if (!staffId) {
      alert("Please select a staff member");
      return;
    }

    try {
      await api.put(
        `/complaints/${complaintId}/assign/${staffId}`
      );

      alert("Complaint assigned successfully");

      await fetchComplaints();
      await fetchStaff();

      setSelectedStaff((prev) => ({
        ...prev,
        [complaintId]: "",
      }));
    } catch (error) {
      console.error(
        "Assignment failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to assign complaint"
      );
    }
  };

  // =====================================================
  // DELETE COMPLAINT
  // =====================================================

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/complaints/${id}`);

      await fetchComplaints();
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );
    }
  };

  // =====================================================
  // UPDATE COMPLAINT
  // =====================================================

  const updateComplaint = async (
    updatedComplaint
  ) => {
    try {
      await api.put(
        `/complaints/${updatedComplaint.id}`,
        updatedComplaint
      );

      await fetchComplaints();

      setEditComplaint(null);
    } catch (error) {
      console.error(
        "Update complaint failed:",
        error
      );
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredComplaints =
    complaints.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(
            searchKeyword.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All Status" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // =====================================================
  // UI
  // =====================================================

  return (
    <Layout>

      <div className="manage-complaints">

        <h1>Manage Complaints</h1>

        {/* =========================
            TOP BAR
        ========================= */}

        <div className="top-bar">

          <input
            type="text"
            placeholder="🔍 Search Complaint..."
            value={searchKeyword}
            onChange={(e) =>
              setSearchKeyword(
                e.target.value
              )
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="All Status">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Assigned">
              Assigned
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

        {/* =========================
            TABLE
        ========================= */}

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Complaint</th>

              <th>Category</th>

              <th>Priority</th>

              <th>Status</th>

              <th>Assign Staff</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredComplaints.length > 0 ? (

              filteredComplaints.map((item) => {

                // =================================================
                // AVAILABLE STAFF + CATEGORY MATCH
                // =================================================

               const availableStaff = staffList.filter(
  (staff) => {

    const status = (staff.status || "")
      .toString()
      .trim()
      .toLowerCase();

    const isAvailable = status === "available";

    const professionMatches =
      isProfessionMatch(
        staff,
        item.category
      );

    return (
      isAvailable &&
      professionMatches
    );
  }
);
                console.log(
                  "Complaint:",
                  item.category,
                  "Available matching staff:",
                  availableStaff
                );

                return (

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

                    {/* =========================
                        ASSIGN STAFF
                    ========================= */}

                    <td>

                      {item.status ===
                      "Pending" ? (

                        availableStaff.length >
                        0 ? (

                          <div className="assign-box">

                            <select
                              value={
                                selectedStaff[
                                  item.id
                                ] || ""
                              }
                              onChange={(e) =>
                                handleStaffChange(
                                  item.id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Select Staff
                              </option>

                              {availableStaff.map(
                                (staff) => (

                                  <option
                                    key={
                                      staff.id
                                    }
                                    value={
                                      staff.id
                                    }
                                  >
                                    {staff.name}
                                    {" - "}
                                    {staff.role}
                                  </option>

                                )
                              )}

                            </select>

                            <button
                              className="assign"
                              onClick={() =>
                                assignComplaint(
                                  item.id
                                )
                              }
                            >
                              Assign
                            </button>

                          </div>

                        ) : (

                          <span>
                            No available staff
                          </span>

                        )

                      ) : (

                        <span>

                          {item.status ===
                          "Assigned"
                            ? "Assigned"
                            : item.status ===
                              "In Progress"
                            ? "Assigned"
                            : "-"}

                        </span>

                      )}

                    </td>

                    {/* =========================
                        ACTION
                    ========================= */}

                    <td>

                      <button
                        className="view"
                        onClick={() =>
                          navigate(
                            `/complaint/${item.id}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        className="edit"
                        onClick={() =>
                          setEditComplaint(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete"
                        onClick={() =>
                          deleteComplaint(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                );
              })

            ) : (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                  }}
                >
                  No complaints found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

        {/* =========================
            EDIT MODAL
        ========================= */}

        {editComplaint && (

          <EditComplaintModal
            complaint={editComplaint}
            onClose={() =>
              setEditComplaint(null)
            }
            onUpdate={updateComplaint}
          />

        )}

      </div>

    </Layout>
  );
}

export default ManageComplaints;