import PropTypes from 'prop-types';
import './product.css';

function Product({ id, product, brand, price }) {
  return (
    <div className="product">
      <div>
        <p className="product-id">Id: {id}</p>
        <div className="product-name">{product}</div>
        <p className="product-brand">Бренд: {brand ? brand : 'без бренда'}</p>
        <p className="product-price">Цена: {price}</p>
      </div>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  brand: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default Product;
