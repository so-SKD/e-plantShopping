import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css'; 

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalCost = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.cost.slice(1)) * item.quantity), 0);
  };

  const calculateSubtotal = (cost, quantity) => {
    return parseFloat(cost.slice(1)) * quantity;
  };

  const handleUpdateQuantity = (name, quantity) => {
    if (quantity <= 0) {
        dispatch(removeItem(name)); // Remove item if quantity is zero or less
    } else {
        dispatch(updateQuantity({ name, quantity }));
    }
  };

  const handleRemoveItem = (name) => {
    dispatch(removeItem(name));
  };

  const handleDecrement = (item) => {
    const newQuantity = item.quantity - 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalCost().toFixed(2)}</h2>

      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>

                {/* Quantity control */}
                <div className="cart-item-quantity">
                  <button 
                    className="cart-item-button cart-item-button-dec" 
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 1} // Disable decrement button if quantity is 1
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button 
                    className="cart-item-button cart-item-button-inc" 
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  Subtotal: ${calculateSubtotal(item.cost, item.quantity).toFixed(2)}
                </div>

                <button className="cart-item-delete" onClick={() => handleRemoveItem(item.name)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
