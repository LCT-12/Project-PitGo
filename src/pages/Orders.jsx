import React, { useState } from "react";
import { mockOrders } from "../mockData/mockOrders";
import { mockUsers } from "../mockData/mockUsers";
import { mockCars } from "../mockData/mockCars";

function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu đơn hàng đang xem chi tiết
  const [showDetails, setShowDetails] = useState(false);

  const getCustomer = (id) => mockUsers.find((u) => u.id === id);
  const getCar = (id) => mockCars.find((c) => c.id === id);

  // Hàm cập nhật trạng thái đơn hàng
  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((ord) =>
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    setOrders(updatedOrders);
    // Cập nhật lại đơn hàng đang xem để hiển thị ngay trên Modal
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>Orders Management</h2>
      
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
          {orders.map((order) => {
            const customer = getCustomer(order.userId);
            const car = getCar(order.carId);
            return (
              <tr key={order.id}>
                <td><strong>#{order.id}</strong></td>
                <td>{customer?.userName}</td>
                <td>
                    {car?.carName} {/* Tên từ mockCars */}
                    <br />
                    <small style={{ color: "#666" }}>{car?.brand}</small>
                  </td>
                <td style={{ color: "#118C4F", fontWeight: "700"}}>${order.totalPrice.toLocaleString()}</td>
                <td>{order.orderDate}</td>
                <td>
                  <span className={`badge-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="btn-view" onClick={() => openDetails(order)}>Details</button>
                  <button className="btn-edit">Update</button>
                </td>
              </tr>
            );
          })}
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
              {/* Cột 1: Thông tin khách hàng */}
              <div className="info-section">
                <h4><i className="fa fa-user"></i> Customer Information</h4>
                <p><strong>Name:</strong> {getCustomer(selectedOrder.userId)?.userName}</p>
                <p><strong>Phone:</strong> {getCustomer(selectedOrder.userId)?.phone}</p>
                <p><strong>Email:</strong> {getCustomer(selectedOrder.userId)?.email}</p>
                <p><strong>Address:</strong> {getCustomer(selectedOrder.userId)?.address}</p>
              </div>

              {/* Cột 2: Thông tin sản phẩm & Thanh toán */}
              <div className="info-section">
                <h4><i className="fa fa-car"></i> Car & Payment</h4>
                <p><strong>Model:</strong> {getCar(selectedOrder.carId)?.carName}</p>
                <p><strong>Brand:</strong> {getCar(selectedOrder.carId)?.brand}</p>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Total Amount:</strong> <span className="price-text">${selectedOrder.totalPrice.toLocaleString()}</span></p>
              </div>
            </div>

            <hr />

            {/* Phần cập nhật trạng thái */}
            <div className="status-update-section">
              <h4>Update Order Status</h4>
              <div className="status-buttons">
                {["Pending", "Shipping", "Delivered", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    className={`status-btn ${status.toLowerCase()} ${selectedOrder.status === status ? "active" : ""}`}
                    onClick={() => updateStatus(selectedOrder.id, status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDetails(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;