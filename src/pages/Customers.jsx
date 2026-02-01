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

  // Trạng thái & UI
  const [status, setStatus] = useState("Active"); // Active/Locked
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // State cho chức năng Edit/Delete
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.checked ? "Active" : "Locked");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      id: editingUser ? editingUser.id : Date.now(),
      name: userName,
      brand,
      price,
      year,
      country,
      address,
      condition,
      status,
      image: image
        ? URL.createObjectURL(image)
        : editingUser
          ? editingUser.image
          : "https://via.placeholder.com/80",
    };

    setTimeout(() => {
      if (editingUser) {
        // Logic Cập nhật
        setUsers(users.map((c) => (c.id === editingUser.id ? userData : c)));
      } else {
        // Logic Thêm mới
        setUsers((prev) => [...prev, userData]);
      }

      // Reset và đóng modal
      setLoading(false);
      setShowModal(false);
      setEditingUser(null); // Quan trọng: Xóa trạng thái đang edit
      resetForm();
    }, 500);
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

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserName(user.name);
    setBrand(user.brand);
    setPrice(user.price);
    setYear(user.year);
    setCountry(user.country);
    setCondition(user.condition);
    setAddress(user.address);
    setStatus(user.status);
    setShowModal(true);
  };

  // Hàm reset form tiện ích
  const resetForm = () => {
    setUserName("");
    setBrand("");
    setPrice("");
    setYear("");
    setCountry("");
    setAddress("");
    setCondition("New");
    setStatus("Active");
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
              <th>Image</th>
              <th>User Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Year</th>
              <th>From</th>
              <th>Condition</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="11"
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "20px",
                    fontWeight: "500",
                  }}
                >
                  No customer yet
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.image}
                      width="80"
                      alt=""
                      style={{ borderRadius: "4px" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.brand}</td>
                  <td>${user.price}</td>
                  <td>{user.year}</td>
                  <td>{user.country}</td>
                  <td className="text-truncate">{user.address}</td>
                  <td>{user.condition}</td>
                  <td>
                    <span
                      className={`badge ${user.status === "Active" ? "green" : "red"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                    >
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
              <h3>{editingUser ? "Update User Info" : "Add New User"}</h3>

              {/* Row 1: User Name */}
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Smith"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              {/* Row 2: Brand, Price & Status */}
              <div className="form-row">
                <div className="form-group">
                  <label>Brand</label>
                  <select
                    className="custom-select"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a brand
                    </option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Mclaren">Mclaren</option>
                    <option value="Lamborghini">Lamborghini</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
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
                          setStatus(e.target.checked ? "Active" : "Locked")
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

              {/* Row 3: Year, Country & Condition */}
              <div className="form-row">
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="number"
                    placeholder="e.g 2024"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="e.g. Vietnam"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <div className="segmented-control">
                    <div
                      className={`selection-slider ${condition === "Used" ? "is-used" : ""}`}
                    ></div>

                    <button
                      type="button"
                      className={condition === "New" ? "active" : ""}
                      onClick={() => setCondition("New")}
                    >
                      New
                    </button>

                    <button
                      type="button"
                      className={condition === "Used" ? "active" : ""}
                      onClick={() => setCondition("Used")}
                    >
                      Used
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 4: Address */}
              <div className="form-group">
                <label>Address</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe the user features..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="custom-textarea"
                />
              </div>

              {/* Row 5: User Image & Preview */}
              <div className="form-group">
                <label>User Image</label>
                <input
                  type="file"
                  className="file-input"
                  onChange={handleImageChange}
                />

                {/* Khung Preview nằm ngay dưới Input File */}
                <div className="image-preview-container">
                  {preview ? (
                    <img src={preview} alt="Preview" className="img-fill" />
                  ) : (
                    <div className="no-image-placeholder">
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading
                    ? "Saving..."
                    : editingUser
                      ? "Update User"
                      : "Add User"}
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
              Do you really want to delete this User? <br /> This action cannot
              be undone.
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
