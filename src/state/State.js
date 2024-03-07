import { useState} from 'react';

export function useProductListStates() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPrice, setFilterPrice] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filteredPrice, setFilteredPrice] = useState('');
  const [filteredBrand, setFilteredBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  const password = 'Valantis';
  const apiUrl = 'https://api.valantis.store:41000/';
  const limit = 50;

  const ACTION_GET_IDS = 'get_ids';
  const ACTION_GET_ITEMS = 'get_items';
  const ACTION_FILTER = 'filter';
  return {
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
 
  };
}