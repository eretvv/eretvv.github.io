import React from 'react';
import './filter.css';

function Filter({
  filterPrice,
  filterBrand,
  setFilterPrice,
  setFilterBrand,
  handleFilterSubmit,
  resetFilters,
}) {
  return (
    <form className="productList-filter" onSubmit={handleFilterSubmit}>
      <div className="productList-filter-box">
        <input
          type="range"
          id="priceRange"
          name="priceRange"
          min="0"
          max="100000"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
        <input
          type="number"
          id="priceInput"
          name="priceInput"
          className="productList-filter-input"
          placeholder="Введите цену"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
        <input
          type="text"
          className="productList-filter-input"
          placeholder="Введите бренд"
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
        />

        <div className="filter-btn-box">
          <button className="filter-btn" type="submit">
            Применить
          </button>
          <button className="filter-btn" type="button" onClick={resetFilters}>
            Сбросить
          </button>
        </div>
      </div>
    </form>
  );
}

export default Filter;
