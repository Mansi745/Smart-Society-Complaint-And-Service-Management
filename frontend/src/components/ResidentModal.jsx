function ResidentModal({ resident, onClose }) {
  if (!resident) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Resident Details</h2>

        <p>
          <strong>Name:</strong> {resident.name}
        </p>

        <p>
          <strong>Email:</strong> {resident.email}
        </p>

        <p>
          <strong>Mobile:</strong> {resident.mobile}
        </p>

        <p>
          <strong>Flat:</strong> {resident.flat}
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

export default ResidentModal;