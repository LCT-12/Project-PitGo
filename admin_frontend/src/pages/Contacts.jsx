import React, { useState, useEffect } from "react";
import axios from "axios";
import starFilled from "../assets/icons/important-filled.png";
import starOutline from "../assets/icons/important-outline.png";
import copy from "../assets/copy.svg";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Contacts({ showAlert }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("messages");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [mgToDelete, setMgToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const API = "http://localhost:5000/api/contact";

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(API);
        setContacts(response.data);
        setError(null);
      } catch (err) {
        setError("Unable to retrieve messages. Please check the server!");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  /* ================= FILTER DATA SEARCH ================= */
  const filteredData = contacts.filter((item) => {
    const matchesTab =
      activeTab === "messages" ? !item.isDeleted : item.isDeleted;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Các hàm chức năng
  const handleView = async (msg) => {
  setSelectedMsg(msg);
  if (msg.status === "Unread") {
    try {
      const response = await axios.patch(`${API}/${msg._id}`, {
        status: "Read"
      });
      setContacts(contacts.map((m) => (m._id === msg._id ? response.data : m)));
      showAlert("success", "Message marked as read!");
    } catch (error) {
      showAlert("danger", "Failed to update read status");
    }
  }
};

  const toggleStatus = (id, newStatus) => {
    setContacts(
      contacts.map((m) => (m._id === id ? { ...m, status: newStatus } : m)),
    );
    if (selectedMsg?._id === id)
      setSelectedMsg({ ...selectedMsg, status: newStatus });
  };

  const toggleImportant = async (id, currentStatus) => {
  try {
    const response = await axios.patch(`${API}/${id}`, {
      isImportant: !currentStatus
    });
    setContacts(contacts.map(m => m._id === id ? response.data : m));
    showAlert("success", `Message marked as ${response.data.isImportant ? "important" : "not important"}`);
  } catch (error) {
    showAlert("danger", "Failed to update important status");
  }
};

  /* ================= DELETE ================= */
  const confirmDelete = (id) => {
    setMgToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (mgToDelete) {
      try {
        // Gọi API PATCH để cập nhật isDeleted: true lên MongoDB
        await axios.patch(`${API}/${mgToDelete}`, {
          isDeleted: true
        });
        
        // Cập nhật lại giao diện ngay lập tức
        setContacts(contacts.map(m => m._id === mgToDelete ? { ...m, isDeleted: true } : m));
        setShowDeleteModal(false);
        setMgToDelete(null);

        showAlert("success", "Message deleted successfully!");
      } catch (error) {
        showAlert('danger', "Unable to delete message. Please try again!");
      }
    }
  };

  /* ================= COPY EMAIL ================= */
  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    showAlert('success', "Email copied!");
  };

  /* ================= UNDO DELETE ================= */
  const handleUndo = async (id) => {
  try {
    const response = await axios.patch(`${API}/${id}`, {
      isDeleted: false
    });
    // Cập nhật state bằng dữ liệu thật từ Server trả về
    setContacts(contacts.map((m) => (m._id === id ? response.data : m)));
    showAlert('success', "Message restored!");
  } catch (error) {
    showAlert('danger', "Unable to restore message!");
  }
};

  /* ================= STATES ================= */
  if (error) return <Error message={error} />;
  if (loading) return <Loading message="Loading messages..." />;

  /* ================= UI ================= */
  return (
    <div style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Customer Messages</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search name, email, subject..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
              type="button"
            >
              X
            </button>
          )}
        </div>
      </div>

      {/* Tabs Header */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Inbox (
          {contacts.filter((m) => !m.isDeleted && m.status === "Unread").length}
          )
        </button>
        <button
          className={`tab-btn ${activeTab === "trash" ? "active" : ""}`}
          onClick={() => setActiveTab("trash")}
        >
          Trash
        </button>
      </div>
      
      <div className="table-responsive">
          <table className="admin-table">
        <thead>
          <tr>
            <th>
              <img src={starFilled} alt="important" width={18} />
            </th>
            <th>Name</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((msg) => (
              <tr
                key={msg._id}
                className={msg.status === "Unread" ? "unread-row" : ""}
              >
                <td
                  onClick={() => toggleImportant(msg._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={msg.isImportant ? starFilled : starOutline}
                    alt="important"
                    className="important-icon"
                  />
                </td>
                <td>{msg.name}</td>
                <td>{msg.subject}</td>
                <td>{msg.date}</td>
                <td>
                  <span
                    className={`badge-contact-status ${msg.status.toLowerCase()}`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td>
                  <button className="btn-view" onClick={() => handleView(msg)}>
                    View
                  </button>
                  {activeTab === "messages" ? (
                    <button
                      className="btn-delete"
                      onClick={() => confirmDelete(msg._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn-undo"
                      onClick={() => handleUndo(msg._id)}
                    >
                      Undo
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                {searchTerm.trim() !== "" 
                  ? `No messages found matching "${searchTerm}"` 
                  : "No message yet"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    
      {/* Modal chi tiết */}
      {selectedMsg && (
        <div className="modal-overlay">
          <div className="modal-box contact-detail-box">
            <div className="modal-header">
              <h3>Message Details</h3>
              <br />
              <h4>Subject: {selectedMsg.subject}</h4>
            </div>

            <div className="order-grid">
              <div className="info-section">
                <p>
                  <strong>From:</strong> {selectedMsg.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedMsg.email}
                  <button
                    className="copy-btn"
                    onClick={() => copyEmail(selectedMsg.email)}
                    style={{ marginLeft: "5px" }}
                  >
                    <img src={copy} alt="important" width={18} />
                  </button>
                </p>
                <p>
                  <strong>Date:</strong> {selectedMsg.date}
                </p>
              </div>
              <div className="info-section">
                <p>
                  <strong>Status:</strong>
                  <select
                    className="custom-select-status"
                    value={selectedMsg.status}
                    onChange={(e) =>
                      toggleStatus(selectedMsg._id, e.target.value)
                    }
                    style={{ marginLeft: "10px" }}
                  >
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                  </select>
                </p>
                <label className="important-toggle">
                  <input
                    className="checkbox-important"
                    type="checkbox"
                    checked={selectedMsg.isImportant}
                    onChange={() => toggleImportant(selectedMsg._id)}
                  />
                  <span className="slider-contact"></span>
                  <span className="label-text">Important</span>
                </label>
              </div>
            </div>

            <div className="message-content-box">
              <p className="msg-text">{selectedMsg.message}</p>
            </div>

            <div className="modal-actions">
              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                className="submit-btn"
                style={{ textDecoration: "none", textAlign: "center" }}
                onClick={() => toggleStatus(selectedMsg._id, "Replied")}
              >
                Reply via Email (Gmail)
              </a>
              <button
                className="cancel-btn"
                onClick={() => setSelectedMsg(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box confirm-box">
            <div className="confirm-icon">⚠️</div>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this message?</p>
            <div className="modal-actions confirm-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDelete}>
                Yes, Delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;