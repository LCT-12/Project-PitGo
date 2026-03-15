import React, { useState, useEffect } from 'react'; // Thêm useEffect
import '../index.css';
import { carsData } from '../mockData/mockPL.js'; 
import { Link, useParams } from 'react-router-dom'; // Thêm useParams

const AllCar = () => {
  const { brandName } = useParams(); // Lấy tên hãng từ URL (nếu có)
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');

  // Cập nhật state khi URL thay đổi (ví dụ khi nhấn từ menu trang chủ vào một hãng cụ thể)
  useEffect(() => {
    if (brandName) {
      // Đảm bảo viết hoa chữ cái đầu để khớp với dữ liệu (ví dụ: ferrari -> Ferrari)
      const formattedBrand = brandName.charAt(0).toUpperCase() + brandName.slice(1);
      setSelectedBrand(formattedBrand);
    } else {
      setSelectedBrand('Tất cả');
    }
  }, [brandName]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const filteredCars = selectedBrand === 'Tất cả'
    ? carsData
    : carsData.filter(car => car.brand === selectedBrand);

  return (
    <div className="allcar-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-text1">Trang chủ</Link>
        <span className="breadcrumb-separator"> | </span>
        <span className="breadcrumb-text2">Sản phẩm</span>
        <span className="breadcrumb-separator"> &gt; </span>
        <b className="breadcrumb-text3">
          {selectedBrand === 'Tất cả' ? 'Tất cả' : `${selectedBrand}`}
        </b>
      </div>

      <h1 className="allcar-title">
        {selectedBrand === 'Tất cả' ? 'Tất cả dòng xe' : `Dòng xe ${selectedBrand}`}
      </h1>

      <div className="allcar-content">
        <aside className="filter-sidebar">
          <h3>BỘ LỌC</h3>
          <div className="filter-group">
            <h4>
              <img src="/images/logo-car.png" alt="Car Icon" className='car-icon'/>
              HÃNG XE, DÒNG XE
            </h4>
            <ul>
              {['Tất cả', 'Ferrari', 'Porsche', 'Mercedes', 'Mclaren', 'Lamborghini'].map((brand) => (
                <li key={brand}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="car-display-grid">
          {filteredCars.map((car) => (
            /* BỔ SUNG: Bọc toàn bộ Card trong thẻ Link để đi tới trang chi tiết */
            <Link to={car.link} key={car.id} className="car-item-link">
              <div className="car-item-card">
                <h3 className="car-name">{car.name}</h3>
                <div className="car-image-wrapper">
                  <img src={car.img} alt={car.name} />
                </div>
                <p className="car-price">{car.price}</p>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AllCar;