import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Cars({ showAlert }) {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [year, setYear] = useState("");
  const [top_speed, setTopSpeed] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [engine, setEngine] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [origin, setOrigin] = useState("");
  const [isTrackOnly, setisTrackOnly] = useState(true);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Có sẵn");

  const [preview, setPreview] = useState(null);

  const [editingCar, setEditingCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");
  const itemsPerPage = 5;

  /* ================= LOGIC LỌC & PHÂN TRANG ================= */
  const filteredCars = cars.filter((car) => {
    const isTrack = String(car.isTrackOnly).toLowerCase() === "true";
    if (filterType === "track") return isTrack === true;
    if (filterType === "street") return isTrack === false;
    return true; 
  });

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const API = "http://localhost:5000/api/car";

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(API);
        setCars(res.data);
      } catch (err) {
        setError("Lỗi tải dữ liệu xe!");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      // Gửi cả name và carName để đảm bảo khớp với Backend Schema
      formData.append("name", carName); 
      formData.append("carName", carName);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("year", year);
      formData.append("horsePower", horsePower);
      formData.append("origin", origin);
      formData.append("top_speed", top_speed);
      formData.append("acceleration", acceleration);
      formData.append("engine", engine);
      formData.append("fuel_type", fuel_type);
      formData.append("isTrackOnly", isTrackOnly);
      formData.append("description", description);
      formData.append("status", status);
      
      // ĐIỂM CHỐT ĐỂ KHÔNG BỊ LỖI BACKEND: 
      // Ép gửi file dưới key là "images" dù chỉ có 1 ảnh
      if (image) {
        formData.append("images", image); 
      }

      let res;
      if (editingCar) {
        res = await axios.put(`${API}/${editingCar._id}`, formData);
        setCars(cars.map((c) => (c._id === editingCar._id ? res.data : c)));
      } else {
        res = await axios.post(API, formData);
        setCars((prev) => [...prev, res.data]);
      }

      setShowModal(false);
      setEditingCar(null);
      resetForm();
      showAlert("success", "Thao tác thành công!");
    } catch (err) {
      console.error(err);
      showAlert("danger", "Lỗi: " + (err.response?.data?.message || "Không thể tải ảnh"));
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = (id) => {
    setCarToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${carToDelete}`);
      setCars(cars.filter((c) => c._id !== carToDelete));
      setShowDeleteModal(false);
      showAlert("success", "Xóa thành công!");
    } catch {
      showAlert("danger", "Xóa thất bại. Vui lòng thử lại!");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (car) => {
    setEditingCar(car);
    setCarName(car.carName || car.name || "");
    setBrand(car.brand);
    setPrice(car.price);
    setYear(car.year);
    setTopSpeed(car.top_speed);
    setAcceleration(car.acceleration);
    setEngine(car.engine);
    setFuelType(car.fuel_type);
    setHorsePower(car.horsePower);
    setOrigin(car.origin);
    setisTrackOnly(car.isTrackOnly);
    setDescription(car.description);
    setStatus(car.status);
    
    // Xử lý lấy ảnh xem trước từ Database (Hỗ trợ cả chuẩn cũ và mới)
    const carImage = (car.images && car.images.length > 0) ? car.images[0] : car.image;
    setPreview(carImage || null);
    
    setShowModal(true);
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setCarName("");
    setBrand("");
    setPrice("");
    setYear("");
    setTopSpeed("");
    setAcceleration("");
    setEngine("");
    setFuelType("");
    setHorsePower("");
    setOrigin("");
    setDescription("");
    setisTrackOnly(true);
    setStatus("Có sẵn");
    setPreview(null);
    setImage(null);
  };

  /* ================= STATES ================= */
  if (error) return <Error message={error} />;
  if (loading) return <Loading message="LOADING..." />;

  /* ================= UI ================= */
  return (
    <div style={{ padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ margin: 0 }}>Quản lý Sản phẩm</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <strong><span>Bộ lọc:</span></strong>
            <button onClick={() => setFilterType("all")} className={`badge all ${filterType === "all" ? "active" : ""}`}>Tất cả</button>
            <button onClick={() => setFilterType("track")} className={`badge track ${filterType === "track" ? "active" : ""}`}>Xe Đua</button>
            <button onClick={() => setFilterType("street")} className={`badge street ${filterType === "street" ? "active" : ""}`}>Xe Đường Phố</button>
          </div>
          <button className="add-btn" onClick={() => { resetForm(); setEditingCar(null); setShowModal(true); }}>
            Thêm Xe Mới
          </button>
        </div>
      </div>

      <div className="table-responsive" style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Mẫu</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Năm</th>
              <th>Xuất xứ</th>
              <th>Loại</th>
              <th>Tình trạng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  Chưa có sản phẩm nào
                </td>
              </tr>
            ) : (
              currentCars.map((car, index) => {
                // Xử lý link ảnh an toàn
                const imgUrl = (car.images && car.images.length > 0) ? car.images[0] : car.image;
                return (
                  <tr key={car._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <div className="car-img-container">
                        <img src={imgUrl} alt={`Ảnh ${car.carName || car.name}`} className="car-thumbnail" />
                      </div>
                    </td>
                    <td>{car.carName || car.name}</td>
                    <td>{car.price} Tỷ</td>
                    <td>{car.year}</td>
                    <td>{car.origin}</td>
                    <td>
                      {String(car.isTrackOnly).toLowerCase() === "true" ? (
                        <span className="badge track">Xe Đua</span>
                      ) : (
                        <span className="badge street">Xe Đường Phố</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${car.status === "Có sẵn" ? "green" : "red"}`}>
                        {car.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(car)}>Edit</button>
                      <button className="btn-delete" onClick={() => confirmDelete(car._id)}>Xóa</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        
        <div className="pagination-container">
          <button className="page-btn" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)} className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}>
              {i + 1}
            </button>
          ))}
          <button className="page-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => paginate(currentPage + 1)}>Next</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <form onSubmit={handleSubmit} className="modal-form">
              <h3>{editingCar ? "Cập nhật xe" : "Thêm xe mới"}</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Tên Xe</label>
                  <input type="text" placeholder="e.g. Civic RS" value={carName} onChange={(e) => setCarName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Giá (VNĐ)</label>
                  <input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Vận tốc tối đa (km/h)</label>
                  <input type="text" placeholder="e.g 200 km/h" value={top_speed} onChange={(e) => setTopSpeed(e.target.value)} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hãng</label>
                  <select className="custom-select" value={brand} onChange={(e) => setBrand(e.target.value)} required>
                    <option value="" disabled>Lựa chọn hãng xe</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Mclaren">Mclaren</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Bugatti">Bugatti</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nhiên liệu</label>
                  <select className="custom-select" value={fuel_type} onChange={(e) => setFuelType(e.target.value)} required>
                    <option value="" disabled>Lựa chọn nhiên liệu</option>
                    <option value="Xăng">Xăng</option>
                    <option value="Điện">Điện</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tình trạng</label>
                  <div className="toggle-switch-wrapper">
                    <span className={`status-text ${status === "Hết Hàng" ? "active" : ""}`}>Hết Hàng</span>
                    <label className="switch">
                      <input type="checkbox" checked={status === "Có sẵn"} onChange={(e) => setStatus(e.target.checked ? "Có sẵn" : "Hết Hàng")} />
                      <span className="slider round"></span>
                    </label>
                    <span className={`status-text ${status === "Có sẵn" ? "active" : ""}`}>Có sẵn</span>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Năm Sản Xuất</label>
                  <input type="number" placeholder="e.g 2024" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Xuất xứ</label>
                  <input type="text" placeholder="e.g. Italy" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Loại Xe</label>
                  <div className="segmented-control">
                    <div className={`selection-slider ${isTrackOnly === false ? "is-used" : ""}`}></div>
                    <button type="button" className={isTrackOnly === true ? "active" : ""} onClick={() => setisTrackOnly(true)}>Xe Đua</button>
                    <button type="button" className={isTrackOnly === false ? "active" : ""} onClick={() => setisTrackOnly(false)}>Xe Đường Phố</button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mã lực</label>
                  <input type="number" placeholder="e.g 600 HP" value={horsePower} onChange={(e) => setHorsePower(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Động cơ</label>
                  <input type="text" placeholder="e.g. V8" value={engine} onChange={(e) => setEngine(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Gia tốc</label>
                  <input type="text" placeholder="e.g. 3.5s" value={acceleration} onChange={(e) => setAcceleration(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea rows="3" placeholder="Mô tả chi tiết về xe..." value={description} onChange={(e) => setDescription(e.target.value)} className="custom-textarea" />
              </div>

              <div className="form-group">
                <label>Hình ảnh Sản phẩm</label>
                <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                <div className="image-preview-container">
                  {preview ? (
                    <img src={preview} alt="Preview" className="img-fill" style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }} />
                  ) : (
                    <div className="no-image-placeholder">
                      <span>Chưa có hình ảnh nào được chọn</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => { setShowModal(false); setEditingCar(null); resetForm(); }} className="cancel-btn">Hủy</button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Saving..." : editingCar ? "Cập nhật Xe" : "Thêm Xe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box confirm-box">
            <div className="confirm-icon">⚠️</div>
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa xe này không? <br /> Hành động này không thể hoàn tác.</p>
            <div className="modal-actions confirm-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Hủy</button>
              <button className="delete-confirm-btn" onClick={handleDelete}>Xác nhận, xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;