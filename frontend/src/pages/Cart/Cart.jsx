import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card2 from "../../components/Card2/Card2";
import { getCart, reset as resetCart } from "../../features/cart/cartSlice";
import { placeOrder } from "../../features/orders/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Store.scss";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.auth);

  const { orders, message: orderMessage } = useSelector(
    (state) => state.orders
  );

  // get the message from the orderSlice

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getCart());
  }, [isError, message, dispatch]);

  const handlePlaceOrder = () => {
    dispatch(placeOrder());

    // check if the order is placed successfully
    if (isError) {
      toast.error(message);
    }
    if (orderMessage) {
      dispatch(resetCart());
      navigate("/orders");
    }
  };

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.price * item.ordered_quantity;
    }
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice(cart);

  return (
    <>
      <h1 className="cartHeading">Cart</h1>

      <div className="cards">
        {cart &&
          cart.map((item) => (
            <Card2 key={item._id} book={item} isCartItem={true} />
          ))}
      </div>
      {cart.length === 0 && <h1 className="empty-cart">Cart is empty</h1>}
      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
        disabled={cart.length === 0}
      >
        Place Order -{" "}
        {cart
          ? totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : 0}
      </button>
    </>
  );
}

export default Cart;
