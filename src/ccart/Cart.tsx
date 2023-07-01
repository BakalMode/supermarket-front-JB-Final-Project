import React from 'react';
import { useDispatch } from 'react-redux';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { decrementQuantity, incrementQuantity, removeFromCart, selectCartItems } from './cartSlicer';
import { Product } from '../shopMain/shopMainSlicer';
import './cartItem.css';
import './cart.css'

interface CartProps {
  products: Product[];
  quantities: { [productId: number]: number };
}

export function Cart({ products, quantities }: CartProps) {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useDispatch();

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.product.id);
    if (product) {
      return total + product.price * item.quantity;
    }
    return total;
  }, 0);

  const handleIncrement = (itemId: number) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId: number) => {
    dispatch(decrementQuantity(itemId));
  };

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="cart-wrapper">
      <div className="static-content">
        <div className="cart-title">
          <LocalGroceryStoreIcon style={{ marginRight: '5px' }} />
          <h3>Your cart</h3>
        </div>
      </div>
      <div className="cart-container">
        <div className="cart-header"></div>
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div>
              <p>Your cart is currently empty &#128549;</p>
              <p>
                <a href="/login">Not your first time here? SignIn</a>
              </p>
            </div>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.product.id}>
                  <div className="cart-item-info">
                  <img style={{maxHeight:"77px"}} src={"http://127.0.0.1:8000"+item.product.image} alt="Product Image" className="product-image" />
                  </div>
  
                  <div className="cart-quantity-controls">
                  <p>
                      {item.product.name} - ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button className="cart-minus-btn" onClick={() => handleDecrement(item.product.id)}>
                      -
                    </button>
                    <h3>{item.quantity}</h3>
                    <button className="cart-plus-btn" onClick={() => handleIncrement(item.product.id)}>
                      +
                    </button>
                    <button className="cart-delete-btn" onClick={() => handleRemove(item.product.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="cart-footer">
        <h3 style={{ margin: '0px',marginTop:'3px' }}>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="cart-button">
          <Link to="checkout" style={{ textDecoration: 'none', color: 'white' }}>
            Checkout
            <ShoppingCartCheckoutIcon style={{ marginLeft: '5px' }} />
          </Link>
        </button>
      </div>
    </div>
  );
  
  
  
}
