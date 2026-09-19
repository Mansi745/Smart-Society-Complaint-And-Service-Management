import Layout from "../components/Layout";
import "./ManageResidents.css";
import { useState, useEffect } from "react";
import api from "../services/api";
import AddResidentModal from "../components/AddResidentModal";
import EditResidentModal from "../components/EditResidentModal";
import ResidentModal from "../components/ResidentModal";

function ManageResidents() {

  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState([]);
  const [editResident, setEditResident] = useState(null);
  const [selectedResident, setSelectedResident] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD RESIDENTS
  // =====================================================

  useEffect(() => {
    loadResidents();
  }, []);

  const loadResidents = async () => {

    try {

      setLoading(true);

      const response = await api.get("/users/residents");

      setResidents(response.data);

    } catch (error) {

      console.error("Error loading residents:", error);

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // ADD RESIDENT
  // =====================================================

  const addResident = async (resident) => {

    try {

      await api.post("/users/register", {
        ...resident,
        role: "RESIDENT"
      });

      await loadResidents();

      setShowModal(false);

    } catch (error) {

      console.error("Error adding resident:", error);

      alert(
        error.response?.data?.message ||
        "Unable to add resident"
      );
    }
  };

  // =====================================================
  // DELETE RESIDENT
  // =====================================================

  const deleteResident = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resident?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(`/users/${id}`);

      await loadResidents();

    } catch (error) {

      console.error("Error deleting resident:", error);

      alert(
        error.response?.data?.message ||
        "Unable to delete resident"
      );
    }
  };

  // =====================================================
  // UPDATE RESIDENT
  // =====================================================

  const updateResident = async (updatedResident) => {

    try {

      await api.put(
        `/users/${updatedResident.id}`,
        updatedResident
      );

      await loadResidents();

      setEditResident(null);

    } catch (error) {

      console.error("Error updating resident:", error);

      alert(
        error.response?.data?.message ||
        "Unable to update resident"
      );
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredResidents = residents.filter((resident) => {

    const searchText = search.toLowerCase();

    return (
      (resident.name || "")
        .toLowerCase()
        .includes(searchText) ||

      (resident.email || "")
        .toLowerCase()
        .includes(searchText) ||

      (resident.phone || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  // =====================================================
  // UI
  // =====================================================

  return (
    <Layout>

      <div className="resident-container">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="resident-header">

          <div>

            <h1>Manage Residents</h1>

            <p>
              View and manage all registered residents
            </p>

          </div>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Resident
          </button>

        </div>

        {/* ================================================= */}
        {/* SEARCH */}
        {/* ================================================= */}

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Resident..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Mobile</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  style={{ textAlign: "center" }}
                >
                  Loading residents...
                </td>

              </tr>

            ) : filteredResidents.length > 0 ? (

              filteredResidents.map((resident) => (

                <tr key={resident.id}>

                  <td>
                    {resident.id}
                  </td>

                  <td>
                    {resident.name}
                  </td>

                  <td>
                    {resident.email}
                  </td>

                  <td>
                    {resident.phone || "N/A"}
                  </td>

                  <td>

                    {/* VIEW */}

                    <button
                      className="view"
                      onClick={() =>
                        setSelectedResident(resident)
                      }
                    >
                      View
                    </button>

                    {/* EDIT */}

                    <button
                      className="edit"
                      onClick={() =>
                        setEditResident(resident)
                      }
                    >
                      Edit
                    </button>

                    {/* DELETE */}

                    <button
                      className="delete"
                      onClick={() =>
                        deleteResident(resident.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  style={{ textAlign: "center" }}
                >
                  No residents found
                </td>

              </tr>

            )}

          </tbody>

        </table>

        {/* ================================================= */}
        {/* ADD RESIDENT MODAL */}
        {/* ================================================= */}

        {showModal && (

          <AddResidentModal
            onClose={() => setShowModal(false)}
            onSave={addResident}
          />

        )}

        {/* ================================================= */}
        {/* EDIT RESIDENT MODAL */}
        {/* ================================================= */}

        {editResident && (

          <EditResidentModal
            resident={editResident}
            onClose={() => setEditResident(null)}
            onUpdate={updateResident}
          />

        )}

        {/* ================================================= */}
        {/* VIEW RESIDENT MODAL */}
        {/* ================================================= */}

        {selectedResident && (

          <ResidentModal
            resident={selectedResident}
            onClose={() => setSelectedResident(null)}
          />

        )}

      </div>

    </Layout>
  );
}

export default ManageResidents;