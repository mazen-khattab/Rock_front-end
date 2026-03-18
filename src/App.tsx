import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/AllProducts/Products";
import Whyus from "./Components/WhyUs/WhyUs";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import CartPage from "./Components/Cart/Cart";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import ProductDetails from "./Components/Global/ProductDetails/ProductDetails";
import { CartProvider } from "./Context/CartContext";
import { ContactUsProvider } from "./Context/ContactUsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./Context/AuthContext";
import { ProductProvider } from "./Context/ProductContext";
import { OrderProvider } from "./Context/OrderContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <CartProvider>
      <ProductProvider>
        <OrderProvider>
          <ContactUsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/why-us" element={<Whyus />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order-history" element={<OrderHistory />} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
              />
            </Router>
          </ContactUsProvider>
        </OrderProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
