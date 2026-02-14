import React, { useState } from "react";
import { mockOrders } from "../mockData/mockOrders";
import { mockUsers } from "../mockData/mockUsers";
import { mockCars } from "../mockData/mockCars";

function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [customerType, setCustomerType] = useState("existing");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");

  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");

  const currentCustomer = mockUsers.find(
    (u) => u.id === parseInt(selectedCustomerId),
  );
  const currentCar = mockCars.find((c) => c.id === parseInt(selectedCarId));

  const generateOrderId = () => {
    // 1. Prefix
    const prefix = "PO";

    // 2. Date (YYYYMMDD)
    const today = new Date();
    const datePart = today.toISOString().split("T")[0].replace(/-/g, "");
    // 3. Sequence Number
    const nextNumber = orders.length + 1;

    // Format thành 4 chữ số: 0001, 0002, 0010...
    const numberPart = String(nextNumber).padStart(4, "0");

    return `${prefix}${datePart}${numberPart}`;
  };

  // Hàm mở Modal chi tiết
  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  // Hàm cập nhật trạng thái đơn hàng
  const updateStatus = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o,
    );
    setOrders(updated);
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();

    // Sử dụng hàm tạo ID mới
    const newOrderId = generateOrderId();

    const newOrder = {
      id: newOrderId, // Kết quả: ORD-20250225-X7Y2
      userId:
        customerType === "existing" ? parseInt(selectedCustomerId) : Date.now(),
      carId: parseInt(selectedCarId),
      quantity: 1,
      totalPrice: currentCar ? currentCar.price : 0,
      orderDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      paymentMethod: paymentMethod,
      tempCustomerName: customerType === "new" ? newCustomerName : null,
    };

    setOrders([newOrder, ...orders]);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedCustomerId("");
    setSelectedCarId("");
    setNewCustomerName("");
    setNewCustomerPhone("");
    setNewCustomerAddress("");
    setCustomerType("existing");
  };

  const getCustomer = (id) => mockUsers.find((u) => u.id === id);
  const getCar = (id) => mockCars.find((c) => c.id === id);

  return (
    <div style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Orders Management</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Create New Order
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Car Model</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  No customers yet
                </td>
              </tr>
            ) : (
            orders.map((order) => {
              const customer = getCustomer(order.userId);
              const car = getCar(order.carId);
              return (
                <tr key={order.id}>
                  <td>
                    <strong>#{order.id}</strong>
                  </td>
                  <td>{customer?.userName || order.tempCustomerName}</td>{" "}
                  {/* Hiển thị tên khách mới nếu có */}
                  <td>
                    {car?.carName}
                    <br />
                    <small>{car?.brand}</small>
                  </td>
                  <td style={{ color: "#118C4F", fontWeight: "700" }}>
                    ${order.totalPrice.toLocaleString()}
                  </td>
                  <td>{order.orderDate}</td>
                  <td>
                    <span
                      className={`badge-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => openDetails(order)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              )
            })
            )}
        </tbody>
      </table>

      {/* --- MODAL CHI TIẾT ĐƠN HÀNG --- */}
      {showDetails && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-box order-details-box">
            <div className="modal-header">
              <h3>Order Details: #{selectedOrder.id}</h3>
            </div>
            <div className="order-grid">
              <div className="info-section">
                <h4>Customer Information</h4>
                <p>
                  <strong>Name:</strong>{" "}
                  {getCustomer(selectedOrder.userId)?.userName ||
                    selectedOrder.tempCustomerName}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {getCustomer(selectedOrder.userId)?.phone}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {getCustomer(selectedOrder.userId)?.address}
                </p>
              </div>
              <div className="info-section">
                <h4>Car & Payment</h4>
                <p>
                  <strong>Model:</strong> {getCar(selectedOrder.carId)?.carName}
                </p>
                <p>
                  <strong>Brand:</strong> {getCar(selectedOrder.carId)?.brand}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {selectedOrder.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="status-update-section">
              <h4 style={{ paddingTop: "25px" }}>Update Order Status</h4>
              <div className="status-buttons">
                {["Pending", "Shipping", "Delivered", "Cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`status-btn ${status.toLowerCase()} ${selectedOrder.status === status ? "active" : ""}`}
                      onClick={() => updateStatus(selectedOrder.id, status)}
                    >
                      {status}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL TẠO ĐƠN HÀNG THỦ CÔNG --- */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box order-add-box">
            <form onSubmit={handleAddOrder} className="modal-form">
              <h3>Create New Order</h3>

              <div className="form-group">
                <div className="radio-group">
                  {/* Nhãn tiêu đề */}
                  <span className="radio-label">Customer Type</span>

                  {/* Nhóm các lựa chọn */}
                  <div className="radio-options">
                    <label className="radio-item">
                      <input
                        type="radio"
                        value="existing"
                        checked={customerType === "existing"}
                        onChange={() => setCustomerType("existing")}
                      />
                      Existing Customer
                    </label>

                    <label className="radio-item">
                      <input
                        type="radio"
                        value="new"
                        checked={customerType === "new"}
                        onChange={() => setCustomerType("new")}
                      />
                      New Customer
                    </label>
                  </div>
                </div>
              </div>

              <div className="order-grid" style={{ marginTop: "15px" }}>

                <div className="info-section">
                  <h4>Customer Info</h4>
                  {customerType === "existing" ? (
                    <>
                      <select
                        className="custom-select-order"
                        value={selectedCustomerId}
                        onChange={(e) => setSelectedCustomerId(e.target.value)}
                        required
                      >
                        <option value="">-- Select Customer --</option>
                        {mockUsers.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.userName}
                          </option>
                        ))}
                      </select>
                      {currentCustomer && (
                        <div className="auto-fill-info">
                          <p>
                            <strong>Phone:</strong> {currentCustomer.phone}
                          </p>
                          <p>
                            <strong>Address:</strong> {currentCustomer.address}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="new-customer-inputs">
                      <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        onChange={(e) => setNewCustomerPhone(e.target.value)}
                        required
                      />
                      <textarea
                        placeholder="Address"
                        onChange={(e) => setNewCustomerAddress(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </div>

                <div className="info-section">
                  <h4>Car Selection</h4>
                  <select
                    className="custom-select-order"
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Car --</option>
                    {mockCars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.carName}
                      </option>
                    ))}
                  </select>
                  {currentCar && (
                    <div className="auto-fill-info">
                      <p>
                        <strong>Brand:</strong> {currentCar.brand}
                      </p>
                      <p>
                        <strong>Price:</strong>{" "}
                        <span className="price-text">
                          ${currentCar.price.toLocaleString()}
                        </span>
                      </p>
                      <p>
                        <strong>Status:</strong> {currentCar.status}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Confirm & Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
