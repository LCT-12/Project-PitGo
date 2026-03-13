import React, { useState } from "react";

function Orders({ showAlert }) {
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
    <div style={{ padding: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Orders Management</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Tạo Đơn Hàng Mới
        </button>
      </div>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Mẫu xe</th>
              <th>Giá</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  Chưa có Đơn hàng mới
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
                    <td>{customer?.userName || order.tempCustomerName}</td>
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
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHI TIẾT ĐƠN HÀNG --- */}
      {showDetails && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-box order-details-box">
            <div className="modal-header">
              <h3>Chi tiết Đơn Hàng: #{selectedOrder.id}</h3>
            </div>
            <div className="order-grid">
              <div className="info-section">
                <h4>Thông tin Khách hàng</h4>
                <p>
                  <strong>Tên:</strong>{" "}
                  {getCustomer(selectedOrder.userId)?.userName ||
                    selectedOrder.tempCustomerName}
                </p>
                <p>
                  <strong>SĐT:</strong>{" "}
                  {getCustomer(selectedOrder.userId)?.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong>{" "}
                  {getCustomer(selectedOrder.userId)?.address}
                </p>
              </div>
              <div className="info-section">
                <h4>Thông tin Xe và Phương thức Thanh toán</h4>
                <p>
                  <strong>Mẫu:</strong> {getCar(selectedOrder.carId)?.carName}
                </p>
                <p>
                  <strong>Hãng:</strong> {getCar(selectedOrder.carId)?.brand}
                </p>
                <p>
                  <strong>Tổng cộng:</strong>
                  {selectedOrder.totalPrice.toLocaleString()} VNĐ
                </p>
              </div>
            </div>
            <div className="status-update-section">
              <h4 style={{ paddingTop: "25px" }}>Update Order Status</h4>
              <div className="status-buttons">
                {["Chưa xử lý", "Đang giao", "Đã giao", "Đã hủy"].map(
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
                Đóng
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
              <h3>Tạo Đơn Hàng Mới</h3>

              <div className="form-group">
                <div className="radio-group">
                  {/* Nhãn tiêu đề */}
                  <span className="radio-label">Loại Khách hàng</span>

                  {/* Nhóm các lựa chọn */}
                  <div className="radio-options">
                    <label className="radio-item">
                      <input
                        type="radio"
                        value="existing"
                        checked={customerType === "existing"}
                        onChange={() => setCustomerType("existing")}
                      />
                      Khách hàng Hiện hữu
                    </label>

                    <label className="radio-item">
                      <input
                        type="radio"
                        value="new"
                        checked={customerType === "new"}
                        onChange={() => setCustomerType("new")}
                      />
                      Khách hàng Mới
                    </label>
                  </div>
                </div>
              </div>

              <div className="order-grid" style={{ marginTop: "15px" }}>
                <div className="info-section">
                  <h4>Thông tin Khách hàng</h4>
                  {customerType === "existing" ? (
                    <>
                      <select
                        className="custom-select-order"
                        value={selectedCustomerId}
                        onChange={(e) => setSelectedCustomerId(e.target.value)}
                        required
                      >
                        <option value="">-- Lựa chọn --</option>
                        {mockUsers.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.userName}
                          </option>
                        ))}
                      </select>
                      {currentCustomer && (
                        <div className="auto-fill-info">
                          <p>
                            <strong>SĐT:</strong> {currentCustomer.phone}
                          </p>
                          <p>
                            <strong>Địa chỉ:</strong> {currentCustomer.address}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="new-customer-inputs">
                      <input
                        type="text"
                        placeholder="Họ & tên"
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="SĐT"
                        onChange={(e) => setNewCustomerPhone(e.target.value)}
                        required
                      />
                      <textarea
                        placeholder="Địa chỉ"
                        onChange={(e) => setNewCustomerAddress(e.target.value)}
                      ></textarea>
                    </div>
                  )}
                </div>

                <div className="info-section">
                  <h4>Thông tin Mẫu xe</h4>
                  <select
                    className="custom-select-order"
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    required
                  >
                    <option value="">-- Lựa chọn --</option>
                    {mockCars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.carName}
                      </option>
                    ))}
                  </select>
                  {currentCar && (
                    <div className="auto-fill-info">
                      <p>
                        <strong>Hãng:</strong> {currentCar.brand}
                      </p>
                      <p>
                        <strong>Giá:</strong>{" "}
                        <span className="price-text">
                          {currentCar.price.toLocaleString()} VNĐ
                        </span>
                      </p>
                      <p>
                        <strong>Trạng thái:</strong> {currentCar.status}
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
                  Hủy
                </button>
                <button type="submit" className="submit-btn">
                  Xác nhận & Tạo Đơn hàng
                </button>
                showAlert('success', "Đơn hàng được tạo thành công!");
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;