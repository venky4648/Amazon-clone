import './Product.css';
import { useStateValue } from './StateProvider';
import PropTypes from 'prop-types';

function Product({ id, title, price, rating, image }) {
  const [{ basket }, dispatch] = useStateValue(); // Change setstate to dispatch
  console.log("This is the basket:", basket);

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET', // Ensure this matches your action type in reducer
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating).fill().map((_, i) => (<p key={i}>🌟</p>))}
        </div>
      </div>
      <img src={image} alt="product" />
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired, // Adding PropTypes for all props
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Product;
