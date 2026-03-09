import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  // 1. Khai báo state để giữ dữ liệu từ MongoDB
  const [generalData, setGeneralData] = useState({
    site_title: "",
    site_about: "",
    shutdown: false,
  });

  const [contactData, setContactData] = useState({
    address: "",
    gmap: "",
    pn1: "",
    pn2: "",
    email: "",
    fb: "",
    insta: "",
    tw: "",
  });

  const [tempData, setTempData] = useState({}); // Giữ dữ liệu tạm khi đang nhập
  const [showGeneralModal, setShowGeneralModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [tempContactData, setTempContactData] = useState({});
  const [loading, setLoading] = useState(true);

  // 2. Hàm gọi API từ Backend (Cổng 5000)
  const fetchSettings = async () => {
    try {
      // Lưu ý: Dùng đúng route /api/setting đã đăng ký ở server.js
      const response = await axios.get("http://localhost:5000/api/setting/");

      // Nếu có dữ liệu key "general_settings" trong MongoDB
      if (response.data.general_settings) {
        setGeneralData(response.data.general_settings);
        document.title =
          response.data.general_settings.site_title || "Project-SX";
      }

      if (response.data.contact_details) {
        setContactData(response.data.contact_details);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to retrieve data from the server.:", error);
      setLoading(false);
    }
  };

  // 3. Chạy hàm lấy dữ liệu ngay khi trang web vừa load
  useEffect(() => {
    fetchSettings();
  }, []);

  // Function to handle the "EDIT" button click
  const handleGeneralEditClick = () => {
    setTempData(generalData); // Populate tempData with current generalData
    setShowGeneralModal(true); // Show the modal
  };

  const handleContactEditClick = () => {
    setTempContactData(contactData); // Copy dữ liệu hiện tại vào bản tạm
    setShowContactModal(true);
};

  if (loading) return <div className="p-4">Loading data...</div>;

  const updateGeneralSettings = async () => {
    try {
      // Gửi dữ liệu đi với key là "general_settings" để khớp với logic fetch hiện tại
      const response = await axios.post(
        "http://localhost:5000/api/setting/update",
        {
          key: "general_settings",
          value: tempData,
        },
      );

      if (response.data) {
        // 1. Cập nhật lại data chính trên màn hình
        setGeneralData(tempData);
        document.title = tempData.site_title || "Project-SX";
        // 2. Đóng Modal
        setShowGeneralModal(false);
        // 3. Thông báo thành công (tùy chọn)
        alert("Settings updated successfully.");
      }
    } catch (error) {
      console.error("Error while updating settings:", error);
      alert("Unable to save changes. Please check the server!");
    }
  };

  const toggleShutdown = async (val) => {
    // Tạo một bản sao dữ liệu mới với giá trị shutdown thay đổi
    const updatedData = { ...generalData, shutdown: val };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/setting/update",
        {
          key: "general_settings",
          value: updatedData,
        },
      );

      if (response.data) {
        setGeneralData(updatedData); // Cập nhật state tại chỗ
        alert(`Website has been ${val ? "closed" : "reopened"} successfully!`);
      }
    } catch (error) {
      console.error("Error while changing shutdown status:", error);
      alert("Unable to change website status!");
    }
  };

  const updateContactDetails = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/setting/update', {
            key: 'contact_details', // Dùng key riêng biệt
            value: tempContactData
        });

        if (response.data) {
            setContactData(tempContactData);
            setShowContactModal(false);
            alert("Contact details updated successfully!");
        }
    } catch (error) {
        alert("Failed to update contact details.");
    }
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
        <h2>Settings</h2>
      </div>

    {/* General Settings Section */}
    <div className="settings-card">
        <div className="card-header">
            <h5 className="section-title">General Settings</h5>
            <button className="btn-edit" onClick={handleGeneralEditClick}>
                <i className="bi bi-pencil-square"></i> EDIT
            </button>
        </div>
        <div className="card-content">
            <h6 className="label">Site Title</h6>
            <p className="data-text">{generalData.site_title || "No title available"}</p>

            <h6 className="label">About us</h6>
            <p className="data-text">{generalData.site_about || "No description available"}</p>
        </div>
    </div>

    {/* Shutdown Website Section */}
    <div className="settings-card">
        <div className="card-header">
            <h5 className="section-title">Shutdown Website</h5>
            <div className="switch-container">
                <input
                    className="switch-input"
                    type="checkbox"
                    id="shutdown-switch"
                    checked={generalData.shutdown}
                    onChange={(e) => toggleShutdown(e.target.checked)}
                />
                <label className="switch-label" htmlFor="shutdown-switch"></label>
            </div>
        </div>
        <div className="card-content">
            <p className="text-muted">
                Enabling shutdown mode will prevent customers from accessing the website.
            </p>
        </div>
    </div>

    {/* Contact Details Section */}
    <div className="settings-card">
        <div className="card-header">
            <h5 className="section-title">Contact Settings</h5>
            <button className="btn-edit" onClick={handleContactEditClick}>
                <i className="bi bi-pencil-square"></i> EDIT
            </button>
        </div>
        <div className="card-content grid-2-col">
            <div className="contact-col">
                <h6 className="label">Address</h6>
                <p className="data-text">{contactData.address || "Not set"}</p>
                <h6 className="label">Google Maps Link</h6>
                <p className="data-text truncate">{contactData.gmap || "Not set"}</p>
                <h6 className="label">Phone Numbers</h6>
                <p className="data-text"><i className="bi bi-telephone-fill"></i> {contactData.pn1 || "N/A"}</p>
                <p className="data-text"><i className="bi bi-telephone-fill"></i> {contactData.pn2 || "N/A"}</p>
            </div>
            <div className="contact-col">
                <h6 className="label">Email</h6>
                <p className="data-text">{contactData.email || "Not set"}</p>
                <h6 className="label">Social Links</h6>
                <p className="data-text">Facebook: {contactData.fb || "N/A"}</p>
                <p className="data-text">Instagram: {contactData.insta || "N/A"}</p>
            </div>
        </div>
    </div>

    {/* General Modal */}
    {showGeneralModal && (
        <div className="custom-modal-overlay">
            <div className="custom-modal-dialog">
                <div className="modal-header">
                    <h5>Edit General Settings</h5>
                    <button className="btn-close-x" onClick={() => setShowGeneralModal(false)}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Site Title</label>
                        <input
                            type="text"
                            value={tempData.site_title}
                            onChange={(e) => setTempData({ ...tempData, site_title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>About us</label>
                        <textarea
                            rows="4"
                            value={tempData.site_about}
                            onChange={(e) => setTempData({ ...tempData, site_about: e.target.value })}
                        ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setShowGeneralModal(false)}>Cancel</button>
                    <button className="btn-save" onClick={updateGeneralSettings}>Save Changes</button>
                </div>
            </div>
        </div>
    )}

    {/* Contact Modal */}
    {showContactModal && (
        <div className="custom-modal-overlay">
            <div className="custom-modal-dialog modal-lg">
                <div className="modal-header">
                    <h5>Edit Contact Settings</h5>
                    <button className="btn-close-x" onClick={() => setShowContactModal(false)}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={tempContactData.address} onChange={(e) => setTempContactData({...tempContactData, address: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Google Maps Link</label>
                            <input type="text" value={tempContactData.gmap} onChange={(e) => setTempContactData({...tempContactData, gmap: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Phone Number 1</label>
                            <input type="number" value={tempContactData.pn1} onChange={(e) => setTempContactData({...tempContactData, pn1: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Phone Number 2</label>
                            <input type="number" value={tempContactData.pn2} onChange={(e) => setTempContactData({...tempContactData, pn2: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Instagram Link</label>
                            <input type="text" value={tempContactData.insta} onChange={(e) => setTempContactData({...tempContactData, insta: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Facebook Link</label>
                            <input type="text" value={tempContactData.fb} onChange={(e) => setTempContactData({...tempContactData, fb: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={tempContactData.email} onChange={(e) => setTempContactData({...tempContactData, email: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => setShowContactModal(false)}>Cancel</button>
                    <button className="btn-save" onClick={updateContactDetails}>Save Changes</button>
                </div>
            </div>
        </div>
    )}
</div>
  );
};

export default Settings;