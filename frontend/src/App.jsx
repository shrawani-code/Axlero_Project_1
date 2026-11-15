import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

          <div className="filter">
            <label>Category: </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
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

        <section className="cart">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div>
                    <button onClick={() => decreaseQuantity(item._id)}>
                      −
                    </button>

                    <span> {item.quantity} </span>

                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                </div>
              ))}

              <h3>Cart Total: ₹{total}</h3>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;