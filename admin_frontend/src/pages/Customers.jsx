import React, { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Thông tin định danh & Liên lạc
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(""); // Thay cho brand
  const [password, setPassword] = useState(""); // Thay cho price
  const [phone, setPhone] = useState(""); // Thêm mới

  // Thông tin cá nhân & Địa chỉ
  const [dob, setDob] = useState(""); // Thay cho year (Ngày sinh)
  const [nationalId, setNationalId] = useState(""); // Thay cho condition (CCCD/ID Card)
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("Standard"); // Mặc định là khách hàng tiêu chuẩn, thay cho brand
  
  // Trạng thái & UI
  const [status, setStatus] = useState("Active"); // Active/Locked
  const [loading, setLoading] = useState(false);

  // State cho chức năng Edit/Delete
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.checked ? "Active" : "Locked");
  };

  // Cập nhật hàm handleSubmit để lưu thông tin khách hàng
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      id: editingUser ? editingUser.id : Date.now(),
      name: userName,
      email: email,
      phone: phone,
      dob: dob,
      nationalId: nationalId,
      country: country,
      address: address,
      password: password,
      status: status,
      role: role,
    };

    setTimeout(() => {
      if (editingUser) {
        setUsers(users.map((u) => (u.id === editingUser.id ? userData : u)));
      } else {
        setUsers((prev) => [...prev, userData]);
      }
      setLoading(false);
      setShowModal(false);
      resetForm();
    }, 500);
  };

  // Cập nhật hàm handleEdit để đổ dữ liệu khách hàng lên form
  const handleEdit = (user) => {
    setEditingUser(user);
    setUserName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPhone(user.phone);
    setDob(user.dob);
    setNationalId(user.nationalId);
    setCountry(user.country);
    setAddress(user.address);
    setStatus(user.status);
    setRole(user.role);
    setShowModal(true);
  };

  // Hàm resetForm chuẩn cho khách hàng
  const resetForm = () => {
    setEditingUser(null);
    setUserName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDob("");
    setNationalId("");
    setCountry("");
    setAddress("");
    setStatus("Active");
    setRole("Standard");
  };

  const confirmDelete = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== userToDelete));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div style={{ padding: "25px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Customers Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add Customer
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>ID Card</th>
              <th>Birthday</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  No customers yet
                </td>
              </tr>
            ) : (users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <strong>{user.name}</strong>
                </td>
                <td>
                  <span className={`role-badge ${user.role?.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.nationalId}</td>
                <td>{user.dob}</td>
                <td className="text-truncate" style={{ maxWidth: "150px" }}>
                  {user.address}
                </td>
                <td>
                  <span
                    className={`badge ${user.status === "Active" ? "green" : "red"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => confirmDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
         )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <form onSubmit={handleSubmit} className="modal-form">
              <h3>
                {editingUser ? "Update Customer Info" : "Add New Customer"}
              </h3>

              {/* Row 1: Full Name & Email & Password */}
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Row 2: DOB & Phone & National ID */}
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>National ID / ID Card</label>
                  <input
                    type="text"
                    placeholder="12-digit number"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Country & Role & Status */}
              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Customer Role</label>
                  <select
                    className="custom-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                      <option value="Standard">Standard</option>
                      <option value="VIP">V.I.P</option>
                      <option value="S-VIP">S-VIP</option>
                      <option value="Potential">Potential</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Account Status</label>
                  <div className="toggle-switch-wrapper">
                    <span
                      className={`status-text ${status === "Locked" ? "active" : ""}`}
                    >
                      Locked
                    </span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={status === "Active"}
                        onChange={(e) =>
                          setStatus(
                            e.target.checked ? "Active" : "Locked",
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                    <span
                      className={`status-text ${status === "Active" ? "active" : ""}`}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 5: Address */}
              <div className="form-group">
                <label>Address</label>
                <textarea
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="custom-textarea"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingUser ? "Update" : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box confirm-box">
            <div className="confirm-icon">⚠️</div>
            <h3>Are you sure?</h3>
            <p>
              Do you really want to delete this User? <br /> This action cannot be undone.
            </p>
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

export default Users;
