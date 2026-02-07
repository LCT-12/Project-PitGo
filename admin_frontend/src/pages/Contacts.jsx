import React, { useState } from "react";
import { mockContacts } from "../mockData/mockContacts";
import starFilled from "../assets/icons/important-filled.png";
import starOutline from "../assets/icons/important-outline.png";
import copy from "../assets/copy.svg";

function Contacts() {
  const [contacts, setContacts] = useState(mockContacts);
  const [activeTab, setActiveTab] = useState("messages"); // "messages" hoặc "trash"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [mgToDelete, setMgToDelete] = useState(null);

  // 1. Logic lọc dữ liệu
  const filteredData = contacts.filter((item) => {
    const matchesTab =
      activeTab === "messages" ? !item.isDeleted : item.isDeleted;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // 2. Các hàm chức năng
  const handleView = (msg) => {
    setSelectedMsg(msg);
    // Tự động chuyển Unread -> Read
    if (msg.status === "Unread") {
      const updated = contacts.map((m) =>
        m.id === msg.id ? { ...m, status: "Read" } : m,
      );
      setContacts(updated);
    }
  };

  const toggleStatus = (id, newStatus) => {
    setContacts(
      contacts.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
    );
    if (selectedMsg?.id === id)
      setSelectedMsg({ ...selectedMsg, status: newStatus });
  };

  const toggleImportant = (id) => {
    setContacts(
      contacts.map((m) =>
        m.id === id ? { ...m, isImportant: !m.isImportant } : m,
      ),
    );
    if (selectedMsg?.id === id)
      setSelectedMsg({ ...selectedMsg, isImportant: !selectedMsg.isImportant });
  };

  // Hàm Delete và Modal xác nhận
  const confirmDelete = (id) => {
    setMgToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (mgToDelete) {
      setContacts(
        contacts.map((m) =>
          m.id === mgToDelete ? { ...m, isDeleted: true } : m,
        ),
      );
      setShowDeleteModal(false);
      setMgToDelete(null);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Hàm copy email
  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert("Email copied!");
  };

  // Hàm Undo Delete
  const handleUndo = (id) => {
    setContacts(
      contacts.map((m) => (m.id === id ? { ...m, isDeleted: false } : m)),
    );
  };

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
                key={msg.id}
                className={msg.status === "Unread" ? "unread-row" : ""}
              >
                <td
                  onClick={() => toggleImportant(msg.id)}
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
                      onClick={() => confirmDelete(msg.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn-undo"
                      onClick={() => handleUndo(msg.id)}
                    >
                      Undo
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No messages found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
                      toggleStatus(selectedMsg.id, e.target.value)
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
                    onChange={() => toggleImportant(selectedMsg.id)}
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
                onClick={() => toggleStatus(selectedMsg.id, "Replied")}
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
