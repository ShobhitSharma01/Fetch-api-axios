import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Axios.css"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


interface CartProduct {
  productId: number;
  quantity: number;
}
interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}
const FetchAndLog = () => {
  const [cartData, setCartData] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('https://fakestoreapi.com/carts'),
      axios.get('https://fakestoreapi.com/products')
    ])
      .then(([cartRes, productRes]) => {
        setCartData(cartRes.data);
        setProducts(productRes.data);
      })
      .catch(err => {
        alert();
        console.error('Error fetching data:', err);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

 if (loading) {
  return (
    <div className="loading-overlay">
      <AiOutlineLoading3Quarters className="spin-icon" size={48} color="#3498db" />
     <div>Loading, please wait...</div>
    </div>
  );
}
  return (
    <div className='Main'>
      <h2>Fetched Cart Data</h2>
      {cartData.map(cart => (
        <div key={cart.id}>
          <h3>
            Cart ID: {cart.id} | User ID: {cart.userId} | Date: {cart.date}
          </h3>
          <div className="data">
            {cart.products.map(item => {
              const product = products.find(p => p.id === item.productId);
              return product ? (
                <div key={item.productId} className="card">
                  <img src={product.image} alt={product.title} width={80} height={80} />
                  <div>{product.title}</div>
                  Qty: {item.quantity}
                  <div>Price: ${product.price}</div>
                  <button>Show Details</button>
                  <br />
                  <button className="button">Add to Wishlist</button>
                </div>
              ) : (
                <p key={item.productId}>Product not found</p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchAndLog;
