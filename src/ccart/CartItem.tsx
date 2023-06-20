import React from 'react';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity , removeFromCart} from '../ccart/cartSlicer';
import { Product } from '../shopMain/shopMainSlicer';
import './cartItem.css';

interface CartItemProps {
  item: Product;
  quantity: number;
}

export function CartItem({ item, quantity }: CartItemProps) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <span>{item.name}</span>
        <span>Quantity: {quantity}</span>
      </div>
      <div className="cart-quantity-controls">
        <button className="cart-minus-btn" onClick={handleDecrement}>
          -
        </button>
        <button className="cart-plus-btn" onClick={handleIncrement}>
          +
        </button>
        <button className="cart-delete-btn" onClick={handleRemove}>
          Delete
        </button>
      </div>
    </div>
  );
}
