function StaffModal({ staff, onClose }) {
  if (!staff) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Staff Details</h2>

        <p>
          <strong>Name:</strong> {staff.name}
        </p>

        <p>
          <strong>Role:</strong> {staff.role}
        </p>

        <p>
          <strong>Mobile:</strong> {staff.mobile}
        </p>

        <p>
          <strong>Assigned Complaints:</strong>{" "}
          {staff.complaints}
        </p>

        <p>
          <strong>Status:</strong> {staff.status}
        </p>

        <button
          className="cancel-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default StaffModal;