import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Cars() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [year, setYear] = useState("");
  const [origin, setOrigin] = useState("");
  const [condition, setCondition] = useState("New");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [preview, setPreview] = useState(null);

  const [editingCar, setEditingCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const API = "http://localhost:5000/api/car";

/* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(API);
        setCars(res.data);
      } catch (err) {
        setError("Unable to load cars. Please try again!");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.checked ? "In Stock" : "Out of Stock");
  };

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
      formData.append("carName", carName);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("year", year);
      formData.append("origin", origin);
      formData.append("condition", condition);
      formData.append("description", description);
      formData.append("status", status);
      if (image) formData.append("image", image);

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
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        alert("Failed to save car: " + err.response.data.message);
      }
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
    } catch {
      alert("Unable to delete car.");
    }
  };

 /* ================= EDIT ================= */
  const handleEdit = (car) => {
    setEditingCar(car);
    setCarName(car.carName);
    setBrand(car.brand);
    setPrice(car.price);
    setYear(car.year);
    setOrigin(car.origin);
    setCondition(car.condition);
    setDescription(car.description);
    setStatus(car.status);
    setPreview(`http://localhost:5000${car.image}`);
    setShowModal(true);
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setCarName("");
    setBrand("");
    setPrice("");
    setYear("");
    setOrigin("");
    setDescription("");
    setCondition("New");
    setStatus("In Stock");
    setPreview(null);
    setImage(null);
  };

  /* ================= STATES ================= */
  if (error) return <Error message={error} />;
  if (loading) return <Loading message="Loading cars..." />;

  /* ================= UI ================= */
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
        <h2>Cars Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add Car
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Car Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Year</th>
              <th>Origin</th>
              <th>Description</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  No cars yet
                </td>
              </tr>
            ) : (
              cars.map((car, index) => (
                <tr key={car._id}>
                  <td>{index + 1}</td>
                  <td><img src={car.image} width="80" alt="" style={{borderRadius: '4px'}} /></td>
                  <td>{car.carName}</td>
                  <td>{car.brand}</td>
                  <td>${car.price}</td>
                  <td>{car.year}</td>
                  <td>{car.origin}</td>
                  <td className="text-truncate">{car.description}</td>
                  <td>{car.condition}</td>
                  <td><span className={`badge ${car.status === "In Stock" ? "green" : "red"}`}>{car.status}</span></td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(car)}>Edit</button>
                    <button className="btn-delete" onClick={() => confirmDelete(car._id)}>Delete</button>
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
              <h3>{editingCar ? "Update Car Info" : "Add New Car"}</h3>

              {/* Row 1: Car Name */}
              <div className="form-group">
                <label>Car Name</label>
                <input
                  type="text"
                  placeholder="e.g. Civic RS"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
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
                      className={`status-text ${status === "Out of Stock" ? "active" : ""}`}
                    >
                      Out of Stock
                    </span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={status === "In Stock"}
                        onChange={(e) =>
                          setStatus(
                            e.target.checked ? "In Stock" : "Out of Stock",
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                    <span
                      className={`status-text ${status === "In Stock" ? "active" : ""}`}
                    >
                      In Stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Year, Origin & Condition */}
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
                  <label>Origin</label>
                  <input
                    type="text"
                    placeholder="e.g. Japan"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
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

              {/* Row 4: Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe the car features..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="custom-textarea"
                />
              </div>

              {/* Row 5: Car Image & Preview */}
              <div className="form-group">
                <label>Car Image</label>
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
                <button type="button" onClick={() => { setShowModal(false); setEditingCar(null); resetForm(); }} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Saving..." : (editingCar ? "Update Car" : "Add Car")}
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
            <p>Do you really want to delete this car? <br/> This action cannot be undone.</p>
            <div className="modal-actions confirm-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
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

export default Cars;
