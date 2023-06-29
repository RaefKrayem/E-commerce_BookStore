import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login2 from "./pages/Login2/Login2";
import Register2 from "./pages/Register2/Register2";
import Sidebar from "./components/sidebar/Sidebar";
import Store from "./pages/Store/Store";
import Cart from "./pages/Cart/Cart";
import Whishlist from "./pages/Whishlist/Whishlist";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/login" element={<Login2 />} />
            <Route path="/register" element={<Register2 />} />
            <Route path="/store" element={<Store />} />
            <Route path="/" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/whishlist" element={<Whishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Sidebar>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
