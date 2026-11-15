import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <h1>Axlero Marketplace</h1>

        <nav>
          <span>Home</span>
          <span>Products</span>
          <span>Cart 🛒</span>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Multi-Vendor Marketplace</h2>
          <p>Discover products from trusted vendors.</p>
        </section>

        <section className="products">
          <h2>Products</h2>

          {loading && <p>Loading products...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p>No products available.</p>
          )}

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image">🛍️</div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <h4>₹{product.price}</h4>
                  <p>Vendor: {product.vendorId?.name || "Vendor"}</p>

                  <button>Add to Cart</button>
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