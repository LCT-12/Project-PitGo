import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Loading from "../components/Loading";
import Error from "../components/Error";


const AllCar = () => {
  const { brandName } = useParams(); // Lấy tên hãng từ URL (nếu có)
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");

  const [cars, setCars] = useState([]);

  const [searchParams] = useSearchParams();
  const brandQuery = searchParams.get("brand")

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/car");
        setCars(response.data);
        
        if (brandQuery) {
          const filtered = response.data.filter(
            (car) => car.brand.toLowerCase() === brandQuery.toLowerCase()
          );
          setFilteredCars(filtered);
        } else {
          setFilteredCars(response.data);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchCars();
  }, [brandQuery]);

  // Cập nhật state khi URL thay đổi (ví dụ khi nhấn từ menu trang chủ vào một hãng cụ thể)
  useEffect(() => {
    if (brandName) {
      // Đảm bảo viết hoa chữ cái đầu để khớp với dữ liệu (ví dụ: ferrari -> Ferrari)
      const formattedBrand = brandName.charAt(0).toUpperCase() + brandName.slice(1);
      setSelectedBrand(formattedBrand);
    } else {
      setSelectedBrand("Tất cả");
    }
  }, [brandName]);

    useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/car");
        setCars(response.data);

        // Nếu có brand từ URL (ví dụ: ?brand=Lamborghini)
        if (brandQuery) {
          // Chuẩn hóa chữ đầu viết hoa để khớp với danh sách bộ lọc (Ví dụ: lamborghini -> Lamborghini)
          const formattedBrand = brandQuery.charAt(0).toUpperCase() + brandQuery.slice(1).toLowerCase();
          setSelectedBrand(formattedBrand);
        }
      } catch (error) {
        setError("Lỗi lấy dữ liệu - Sản phẩm. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [brandQuery]); // Chạy lại mỗi khi brand trên URL thay đổi

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  // Biến này sẽ tự động tính toán lại danh sách xe mỗi khi 'cars' hoặc 'selectedBrand' thay đổi
  const filteredCars = selectedBrand === "Tất cả"
    ? cars
    : cars.filter(car => car.brand.toLowerCase() === selectedBrand.toLowerCase());
  
    /* ================= STATES ================= */  
  if (loading) return <Loading message="LOADING..." />;
  if (error) return <Error message={error} />;

  return (
    <div className="allcar-container">
      <div className="breadcrumb">
        <Link to="/home" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text4">Sản phẩm</b>       
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text4">
          {selectedBrand === "" ? "" : `${selectedBrand}`}
        </b>
      </div>

      <h1 className="allcar-title">
        {selectedBrand === "Tất cả" ? "Tất cả dòng xe" : `Dòng xe ${selectedBrand}`}
      </h1>
      <div className="allcar-content">
        <aside className="filter-sidebar">
          
  <h3><img src="/images/logo-car.png" alt="Car Icon" className="car-icon"/>Bộ lọc - dòng xe</h3>
  <div className="filter-group">
    <ul className="brand-filter-list">
      {["Tất cả", "Ferrari", "Porsche", "Mercedes", "McLaren", "Lamborghini"].map((brand) => (
        <li key={brand}>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={selectedBrand === brand}
              onChange={() => handleBrandChange(brand)}
            />
            <span className="checkmark"></span>
            <span className="brand-name">{brand}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
</aside>

        <main className="car-display-grid">
  {filteredCars.map((car) => (
    <Link to={`/car/${car._id}`} key={car._id} className="car-item-link">
              <div className="car-item-card">
                <h3 className="car-name">{car.carName}</h3>
                <div className="car-image-wrapper">
                  <img src={car.image} alt={car.carName} />
                </div>
                <p className="car-price">{car.price.toLocaleString()}.000.000.000 VNĐ</p>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AllCar;