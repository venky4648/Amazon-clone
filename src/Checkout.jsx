// import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ basket , user }, dispatch] = useStateValue();

  const removeFromBasket = (id) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id,
    });
  };

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Checkout Ad"
        />
        
        {basket?.length === 0 ? (
          <div>
            {user ? (
              <h3>Hello, {user.email}</h3>
            ) : (
              <h3>Hello, Guest</h3>
            )}
            <h2>Your shopping basket is empty</h2>
          </div>
        ) : (
          <div>
            {user ? (
              <h3>Hello, {user.email}</h3>
            ) : (
              <h3>Hello, Guest</h3>
            )}
            <h2 className="checkout_title">Your Shopping Basket</h2>
            {basket.map((item) => (
              <div key={item.id} className="checkout_product">
                <img className="checkout_productImage" src={item.image} alt={item.title} />
                <div className="checkout_productInfo">
                  <p className="checkout_productTitle">{item.title}</p>
                  <p className="checkout_productPrice">
                    <small>$</small>
                    <strong>{item.price}</strong>
                  </p>
                  <div className="checkout_productRating">
                    {Array(item.rating).fill().map((_, i) => (<p key={i}>🌟</p>))}
                  </div>
                  <div>
                    <button onClick={() => removeFromBasket(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
