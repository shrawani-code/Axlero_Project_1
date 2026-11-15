import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app">
      <header className="navbar">
        <h1>Axlero Marketplace</h1>

        <nav>
          <span>Home</span>
          <span>Products</span>
          <span>Cart 🛒 ({cart.length})</span>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Multi-Vendor Marketplace</h2>
          <p>Discover products from trusted vendors.</p>
        </section>

        <section className="products">
          <h2>Products</h2>

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">🛍️</div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <h4>₹{product.price}</h4>
                  <p>
                    Vendor: {product.vendorId?.name || "Vendor"}
                  </p>

                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;