import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useAppSelector } from '../app/hooks';
import { decrementQuantity, incrementQuantity, removeFromCart, selectCartItems, selectCartTotal } from './cartSlicer';
import { Product } from '../shopMain/shopMainSlicer';
import './cartItem.css';
import './cart.css';
import {DJANGO_APP_API_URL,REACT_APP_URL} from '../consts'



interface CartProps {
  products: Product[];
  quantities: { [productId: number]: number };
}

export function Cart({ products, quantities }: CartProps) {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      dispatch({ type: 'cart/setCartItems', payload: parsedCartItems });
    }
  }, []);

  useEffect(() => {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      product: {
        ...item.product,
      },
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  }, [cartItems]);

  const handleIncrement = (itemId: number) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId: number) => {
    dispatch(decrementQuantity(itemId));
  };

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (storedCart.length === 0) {
      alert('You must have items in your cart in order to checkout.');
      return;
    } else {
      window.location.href = REACT_APP_URL + '/checkout';
    }
    // Proceed with the checkout logic
    // ...
  };

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.id === item.product.id);
    if (product) {
      return total + product.price * item.quantity;
    }
    return total;
  }, 0);

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
                    <img
                      style={{ maxHeight: '77px' }}
                      src={DJANGO_APP_API_URL + item.product.image}
                      alt="Product Image"
                      className="product-image"
                    />
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
        <h3 style={{ margin: '0px', marginTop: '3px' }}>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="cart-button" onClick={handleCheckout}>
          Checkout
          <ShoppingCartCheckoutIcon style={{ marginLeft: '5px' }} />
        </button>
      </div>
    </div>
  );
}
