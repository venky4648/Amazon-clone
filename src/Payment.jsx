import './Payment.css';
import { useStateValue } from './StateProvider'; // Corrected import path
import { getBasketTotal } from "./reducer";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from './axios'; // Correct axios import for making requests to backend

function Payment() {
  const [{ user, basket }] = useStateValue(); // Correct destructuring
  const shippingCost = 40;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Generate the client secret when the basket changes
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${(getBasketTotal(basket) + shippingCost) * 100}`, // Stripe expects amount in cents
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user?.email,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setSucceeded(true);
      setError(null);
      setProcessing(false);

      // After successful payment, navigate to orders page
      navigate('/orders', { replace: true });
    }
  };

  const handleChange = (event) => {
    // Update the form state based on card element changes
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Redirect to the orders page when "Buy Now" button is clicked without waiting for Stripe processing.
  const handleBuyNow = () => {
    handleSubmit();
    navigate('/orders', { replace: true }); // Navigate to the orders page
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1 className='h1'>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Delivery Address */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>City, State, Zip Code</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Order</h3>
          </div>
          <div className="payment_items">
            {basket?.map((item) => (
              <div className="payment_item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="payment_item_details">
                  <p>{item.title}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <h3>Order Total: ${(getBasketTotal(basket) + shippingCost).toFixed(2)}</h3>
                <button onClick={handleBuyNow} disabled={processing || disabled || succeeded}>
                  {processing ? <span>Processing...</span> : "Buy Now"}
                </button>
              </div>
              {error && <div className="payment_error">{error}</div>}
            </form>
          </div>
        </div>

        {/* Order Total */}
        <div className="payment_total">
          <p>Subtotal: ${getBasketTotal(basket)}</p>
          <p>Shipping: ${shippingCost}</p>
          <p>Total: ${(getBasketTotal(basket) + shippingCost).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
