import React from 'react';
import { useAppSelector } from '../app/hooks';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom';
import { selectCartItems } from './cartSlicer';
import { Product } from '../shopMain/shopMainSlicer';
import { CartItem } from './CartItem';

interface CartProps {
  products: Product[];
  quantities: { [productId: number]: number };
}

export function Cart({ products, quantities }: CartProps) {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <div
      style={{
        width: '335px',
        backgroundColor: ' #227e47',
        position: 'fixed',
        top: 90,
        bottom: 0,
        left: 0,
        maxWidth: '335px',
        padding: '10px',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      }}
    >
      <div className="cart-container">
        <div className="cart-header">
          <LocalGroceryStoreIcon />
          <h3>Cart</h3>
        </div>
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item.product.id} item={item.product} quantity={item.quantity} />
              ))}
            </ul>
          )}
        </div>
        <button className="button">
          <Link to="checkout" style={{ textDecoration: 'none', color: 'black' }}>
            <div>Checkout</div>
            <ShoppingCartCheckoutIcon />
          </Link>
        </button>
      </div>
    </div>
  );
}
