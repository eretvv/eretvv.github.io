import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../Home/Header/Header';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import Filter from '../Filter/Filter';
import Sort from '../Filter/Sort';
import Pagination from '../Pagination/Pagination';
import { calculateOffset, generateAuthHeader, removeDuplicates } from '../../constants';
import { useProductListStates } from '../../state/State';
import '../ProductList/productlist.css';

function ProductList() {
  const {
    products,
    currentPage,
    isLoading,
    filterPrice,
    filterBrand,
    filteredPrice,
    filteredBrand,
    sortOrder,
    setProducts,
    setCurrentPage,
    setIsLoading,
    setFilterPrice,
    setFilterBrand,
    setFilteredPrice,
    setFilteredBrand,
    setSortOrder,
    password,
    apiUrl,
    limit,
    ACTION_GET_IDS,
    ACTION_GET_ITEMS,
    ACTION_FILTER,
  } = useProductListStates();

  const goToPrevPage = useCallback(() => {
    setIsLoading(true);
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setIsLoading(false);
  }, [setIsLoading, setCurrentPage]);

  const goToNextPage = useCallback(() => {
    setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  }, [setIsLoading, setCurrentPage]);

  useEffect(() => {
    if (filteredPrice.trim()) {
      fetchFilteredProductsByPrice(parseFloat(filteredPrice));
    } else if (filteredBrand.trim()) {
      fetchFilteredProductsByBrand(filteredBrand.trim());
    } else {
      fetchProductIds();
    }
  }, [currentPage, filteredPrice, filteredBrand, sortOrder]);

  function fetchProductIds() {
    setIsLoading(true);
  
    const params = {
      offset: calculateOffset(currentPage, limit),
      limit: limit,
    };
  
    if (filteredPrice.trim()) {
      params.price = parseFloat(filteredPrice);
    }
  
    if (filteredBrand.trim()) {
      params.brand = filteredBrand.trim();
    }
  
    axios
      .post(
        apiUrl,
        {
          action: ACTION_GET_IDS,
          params: params,
        },
        {
          headers: {
            'X-Auth': generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result;
        fetchProducts(productIds);
      })
      .catch((error) => {
        console.error('Error fetching product IDs:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  

  function fetchProducts(productIds) {
    setIsLoading(true);
  
    axios
      .post(
        apiUrl,
        {
          action: ACTION_GET_ITEMS,
          params: { ids: productIds },
        },
        {
          headers: {
            'X-Auth': generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        let sortedProducts = response.data.result;
  
        sortedProducts = sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
  
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
  
        const uniqueProducts = removeDuplicates(sortedProducts, 'id');
        setProducts(uniqueProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  function fetchFilteredProductsByPrice(price) {
    setIsLoading(true)

    axios
      .post(
        apiUrl,
        {
          action: 'filter',
          params: {
            price: price,
          },
        },
        {
          headers: {
            'X-Auth': generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result
        fetchProducts(productIds)
      })
      .catch((error) => {
        console.error('Error:', error)
        setIsLoading(false)
      })
  }

  function fetchFilteredProductsByBrand(brand) {
    setIsLoading(true)

    axios
      .post(
        apiUrl,
        {
          action: 'filter',
          params: {
            brand: brand,
          },
        },
        {
          headers: {
            'X-Auth': generateAuthHeader(password),
          },
        }
      )
      .then((response) => {
        const productIds = response.data.result
        fetchProducts(productIds)
      })
      .catch((error) => {
        console.error('Error', error)
        setIsLoading(false)
      })
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setFilteredPrice(filterPrice);
    setFilteredBrand(filterBrand);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilterPrice('');
    setFilterBrand('');
    setFilteredPrice('');
    setFilteredBrand('');
    setCurrentPage(1);
    fetchProductIds();
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    fetchProductIds();
  };

  return (
    <>
    <Header/>
    <div className='product-main'>
      <Filter
        filterPrice={filterPrice}
        filterBrand={filterBrand}
        setFilterPrice={setFilterPrice}
        setFilterBrand={setFilterBrand}
        handleFilterSubmit={handleFilterSubmit}
        resetFilters={resetFilters}
      />

      <div className='productList'>
        <div className='productList-title'>
          <span>Список продуктов</span>
          <p className='productList-sort'>Сортировать по цене</p>
          <Sort sortOrder={sortOrder} handleSortChange={handleSortChange} />
        </div>

        {isLoading ? (
          <Loading /> 
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map(({ id, product, brand, price }) => (
                  <div key={id}>
                    <Product id={id} product={product} brand={brand} price={price} />
                  </div>
                ))}
                <Pagination
                  currentPage={currentPage}
                  goToPrevPage={goToPrevPage}
                  goToNextPage={goToNextPage}
                />
              </>
            ) : (
              <div>Товары не найдены</div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default ProductList;