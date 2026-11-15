import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("store");
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/products`);
      setProducts(data);
    } catch { setMessage("Backend not connected. Start the backend and MongoDB."); }
  };

  useEffect(() => { loadProducts(); }, []);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setMessage(`${product.name} added to cart`);
  };

  return (
    <div>
      <nav className="nav">
        <div className="brand">Axlero Marketplace</div>
        <div>
          <button onClick={() => setView("store")}>Store</button>
          <button onClick={() => setView("login")}>Vendor Login</button>
          <button onClick={() => setView("cart")}>Cart ({cart.length})</button>
        </div>
      </nav>

      {message && <div className="notice">{message}</div>}

      {view === "store" && (
        <main>
          <section className="hero">
            <h1>Multi-Vendor Marketplace</h1>
            <p>Discover products from multiple sellers in one unified storefront.</p>
          </section>
          <div className="grid">
            {products.map(p => (
              <article className="card" key={p._id}>
                <div className="image">{p.image ? <img src={p.image} alt={p.name} /> : "PRODUCT"}</div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p className="price">₹{p.price}</p>
                <small>Category: {p.category}</small>
                <button className="primary" onClick={() => addToCart(p)}>Add to Cart</button>
              </article>
            ))}
          </div>
          {products.length === 0 && <div className="empty">No products yet. Register as a vendor and add products.</div>}
        </main>
      )}

      {view === "login" && <VendorLogin onDone={() => { setView("vendor"); loadProducts(); }} />}
      {view === "vendor" && <VendorPanel onProducts={loadProducts} />}
      {view === "cart" && <Cart cart={cart} />}
    </div>
  );
}

function VendorLogin({ onDone }) {
  const [register, setRegister] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      const endpoint = register ? "/auth/register" : "/auth/login";
      const body = register ? { ...form, role: "vendor" } : { email: form.email, password: form.password };
      const { data } = await axios.post(API + endpoint, body);
      localStorage.setItem("token", data.token);
      setMessage("Success");
      onDone();
    } catch (err) { setMessage(err.response?.data?.message || "Request failed"); }
  };

  return <main className="formPage"><div className="panel">
    <h2>{register ? "Vendor Registration" : "Vendor Login"}</h2>
    <form onSubmit={submit}>
      {register && <input placeholder="Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />}
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required />
      <button className="primary">{register ? "Create Vendor Account" : "Login"}</button>
    </form>
    <button className="link" onClick={() => setRegister(!register)}>{register ? "Already have an account? Login" : "Create a vendor account"}</button>
    <p>{message}</p>
  </div></main>;
}

function VendorPanel({ onProducts }) {
  const [form, setForm] = useState({ name:"", description:"", price:"", category:"", stock:"10", image:"" });
  const [message, setMessage] = useState("");

  const create = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API}/products`, form, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setMessage("Product created successfully");
      setForm({name:"",description:"",price:"",category:"",stock:"10",image:""});
      onProducts();
    } catch (err) { setMessage(err.response?.data?.message || "Could not create product"); }
  };

  return <main className="formPage"><div className="panel wide">
    <h2>Vendor Dashboard</h2>
    <p>Add products to your marketplace inventory.</p>
    <form onSubmit={create} className="productForm">
      <input placeholder="Product name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
      <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required />
      <input type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
      <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} />
      <input placeholder="Image URL (optional)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <button className="primary">Add Product</button>
    </form>
    <p>{message}</p>
  </div></main>;
}

function Cart({ cart }) {
  const total = cart.reduce((sum, p) => sum + Number(p.price), 0);
  return <main className="cart"><h2>Your Cart</h2>
    {cart.map((p,i)=><div className="cartItem" key={i}><span>{p.name}</span><b>₹{p.price}</b></div>)}
    {cart.length ? <h3>Total: ₹{total}</h3> : <p>Your cart is empty.</p>}
    {cart.length > 0 && <button className="primary">Proceed to Mock Checkout</button>}
  </main>;
}