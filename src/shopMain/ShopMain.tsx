import React, { useEffect, ChangeEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Cart } from '../ccart/Cart';
import SearchAppBar from '../searchAppBar/SearchAppBar';
import './shopMain.css'; // Import the CSS file
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fetchProductsAsync, filterProducts, selectProducts } from './shopMainSlicer';
import { addToCart } from '../ccart/cartSlicer';

export function ShopMain() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const filteredProducts = useAppSelector((state) => state.shopMain.filteredProducts);
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);



  useEffect(() => {
    if (products.length > 0) {
      const defaultQuantities = products.reduce(
        (acc, product) => ({ ...acc, [product.id]: 1 }),
        {}
      );
      setQuantities(defaultQuantities);
    }
  }, [products]);


  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterProducts(event.target.value));
  };

  const handleIncrement = (productId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };
  const handleDecrement = (productId: number) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };
  const handleBuyButtonClick = (product: any) => {
    if (quantities[product.id] > 0) {
      dispatch(addToCart({ product, quantity: quantities[product.id] }));
    }
    setSelectedProduct(product);
  };

  return (
    <div>
    <div style={{ backgroundColor: '#d4f1c5', marginLeft: '355px', position: 'fixed', right: 0, left: 0, top: 90, bottom: 0, padding: '10px', overflowX: 'hidden', overflowY: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        <SearchAppBar />
        <Cart products={products} quantities={quantities} />
        MainShop
        {filteredProducts.map((product, ind) => (
           <div className="card" key={product.id}>
           <img src={product.image} alt="Product Image" className="product-image" />
           <div className="product-description">
             <p className="product-name">{product.name}</p>
             <p className="product-price">${product.price}</p>
           </div>
           <div className="quantity-controls">
             <button
               className="minus-btn"
               onClick={() => handleDecrement(product.id)}
               disabled={!quantities[product.id]}
             >
               -
             </button>
             <span className="quantity">{quantities[product.id] || 1}</span>
             <button
               className="plus-btn"
               onClick={() => handleIncrement(product.id)}
               disabled={!quantities[product.id]}
             >
               +
             </button>
             <button
               className="buy-btn"
               onClick={() => handleBuyButtonClick(product)}
               disabled={!quantities[product.id]}
             >
               <AddShoppingCartIcon fontSize="small" />
             </button>
           </div>
         </div>
        ))}
      </div>
    </div>
  );
}
