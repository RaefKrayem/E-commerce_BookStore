import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { reset as resetCart } from "../../features/cart/cartSlice";
import { reset as resetBooks } from "../../features/books/bookSlice";
import { reset as resetOrders } from "../../features/orders/orderSlice";
import { reset as resetWhishList } from "../../features/whishlist/whishlistSlice";
import {
  FaBars,
  FaUserAlt,
  FaShoppingBag,
  FaSignOutAlt,
  FaSave,
  FaShoppingCart,
  FaClipboardList,
} from "react-icons/fa";
import "./Sidebar.scss";

const Sidebar = ({ children }) => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetBooks());
    dispatch(resetOrders());
    dispatch(resetWhishList());
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      name: "Shop",
      icon: <FaShoppingCart />,
    },
    {
      path: "/orders",
      name: "Orders",
      icon: <FaClipboardList />,
    },

    {
      path: "/whishlist",
      name: "Whishlist",
      icon: <FaSave />,
    },

    {
      path: "/cart",
      name: "Cart",
      icon: <FaShoppingBag />,
      quantity: cart.length,
    },
  ];
  return (
    <div className="container">
      <div
        style={{
          width: isOpen ? "200px" : "50px",
        }}
        className="sidebar"
      >
        <div
          className="top_section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            // transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <h1
            style={{
              display: isOpen ? "block" : "none",
              marginTop: "20px",
            }}
            className="logo"
          >
            Autopia
          </h1>
          <div
            style={{
              marginLeft: isOpen ? "50px" : "0px",
            }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">
              {item.icon}
              {item.quantity}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <button onClick={handleLogout} className="link logout-btn">
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Logout
          </div>
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
