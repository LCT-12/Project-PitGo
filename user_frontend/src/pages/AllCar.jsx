import React, { useState } from 'react';
import '../index.css';
import { carsData } from '../mockData/mockPL.js'; 

const AllCar = () => {
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');

  // Logic lọc xe dựa trên checkbox bên trái
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const filteredCars = selectedBrand === 'Tất cả'
    ? carsData
    : carsData.filter(car => car.brand === selectedBrand);

  return (
    <div className="allcar-container">
      {/* Breadcrumb - Đường dẫn trang */}
      <div className="breadcrumb">
        Trang chủ | Sản phẩm &gt; <b>{selectedBrand === 'Tất cả' ? 'Tất cả' : `${selectedBrand}`}</b>
      </div>

      <h1 className="allcar-title">
        {selectedBrand === 'Tất cả' ? 'Tất cả dòng xe' : `Dòng xe ${selectedBrand}`}
      </h1>
      <p className="allcar-subtitle">
        Khám phá thế giới đa dạng về thương hiệu và mẫu xe của chúng tôi. Tại đây, bạn sẽ tìm thấy chiếc xe mơ ước của mình.
      </p>

      <div className="allcar-content">
        {/* Sidebar Bộ lọc bên trái */}
        <aside className="filter-sidebar">
          <h3>BỘ LỌC</h3>
          <div className="filter-group">
            <h4><img src="/images/logo-car.png" alt="Car Icon" className='car-icon'/>
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

        {/* Danh sách xe bên phải */}
        <main className="car-display-grid">
          {filteredCars.map((car) => (
            <div className="car-item-card" key={car.id}>
              <h3 className="car-name">{car.name}</h3>
              <div className="car-image-wrapper">
                <img src={car.img} alt={car.name} />
              </div>
              <p className="car-price">{car.price}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default AllCar;