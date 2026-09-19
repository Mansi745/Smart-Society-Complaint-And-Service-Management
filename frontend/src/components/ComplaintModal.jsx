function ComplaintModal({ complaint, onClose }) {

  if (!complaint) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Complaint Details</h2>

        <p><strong>ID:</strong> {complaint.id}</p>

        <p><strong>Complaint:</strong> {complaint.title}</p>

        <p><strong>Category:</strong> {complaint.category}</p>

        <p><strong>Priority:</strong> {complaint.priority}</p>

        <p><strong>Status:</strong> {complaint.status}</p>

        <p><strong>Date:</strong> {complaint.date}</p>

        <button onClick={onClose}>
          Close
        </button>

      </div>

    </div>
  );
}

export default ComplaintModal;