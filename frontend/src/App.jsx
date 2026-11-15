import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Axlero Marketplace</h2>

        <div>
          <span>Home</span>
          <span>Products</span>
          <span>Vendors</span>
          <span>Cart ({cart.length})</span>
        </div>
      </nav>

      <section className="hero">
        <h1>Multi-Vendor Marketplace</h1>
        <p>Shop products from multiple trusted vendors.</p>
        <button>Explore Products</button>
      </section>

      <section className="products">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">Product</div>

              <h3>{product.name}</h3>

              <p>Vendor: {product.vendor}</p>

              <h3>₹{product.price}</h3>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 Axlero Marketplace</p>
      </footer>
    </div>
  );
}

export default App;