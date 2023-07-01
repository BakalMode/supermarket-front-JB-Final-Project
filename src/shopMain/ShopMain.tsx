import React, { useEffect, ChangeEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Cart } from '../ccart/Cart';
import SearchAppBar from '../searchAppBar/SearchAppBar';
import './shopMain.css'; // Import the CSS file
import { fetchProductsAsync, filterProducts, selectProducts } from './shopMainSlicer';
import { addToCart } from '../ccart/cartSlicer';


export function ShopMain() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredProducts = useAppSelector((state) => {
    if (selectedCategory) {
      return state.shopMain.filteredProducts.filter(
        (product) => product.category_name == selectedCategory
      );
    }
    return state.shopMain.filteredProducts;
  });


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

  useEffect(() => {
    const selectedCategory = sessionStorage.getItem('selectedCategory');
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
  }, []);

  //   useEffect(() => {
  //     if (refreshPage) {
  //       // Perform necessary actions or fetch data
  //       console.log('Refresh page');
  //       // Additional code here to rerun the filtered product map
  //     }
  //   }, [refreshPage]);
  //   // ...
  // }


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
      <div className='search-app-bar'>
        <SearchAppBar />
      </div>
      <Cart products={products} quantities={quantities} />

      <div
        style={{
          backgroundColor: '#d4f1c5',
          marginLeft: '355px',
          position: 'fixed',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          padding: '10px',
          overflowX: 'hidden',
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',

        }}
      >

        <div className="scroll-container">
          <div
            className="card-container"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', }}
          >
            {filteredProducts.map((product, ind) => (
              <div
                className="card"
                key={product.id}
                style={{ margin: '5px', flex: '0 0 250px', textAlign: 'center', }}
              >
                <img src={"http://127.0.0.1:8000"+product.image} alt="Product Image" className="product-image" />
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
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
