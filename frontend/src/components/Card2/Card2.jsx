import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import { useState } from "react";

import "./Card2.scss";
import { FaShoppingCart, FaSave } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  addToWhishlist,
  removeFromWhishlist,
} from "../../features/whishlist/whishlistSlice";

function Card2({ book, isCartItem }) {
  const [bookCartQuantity, setBookCartQuantity] = useState(
    book.ordered_quantity
  );

  const [bookWhishlist, setBookWhishlist] = useState(book.whishlist);

  const dispatch = useDispatch();
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  const handleAddToCart = (e) => {
    setBookCartQuantity(bookCartQuantity + 1);
    dispatch(addToCart({ bookId: book._id, quantity: 1 }));
    if (message) {
      toast.success(message);
    }
  };

  const handleReduceQuantity = (e) => {
    setBookCartQuantity(bookCartQuantity - 1);
    dispatch(addToCart({ bookId: book._id, quantity: -1 }));
    if (message) {
      toast.success(message);
    }
  };

  const handleRemoveFromCart = (e) => {
    dispatch(removeFromCart({ bookId: book._id }));
    if (message) {
      toast.success(message);
    }
  };

  const handleAddToWhishlist = (e) => {
    setBookWhishlist(true);
    dispatch(addToWhishlist(book._id));
    if (message) {
      toast.success(message);
    }
  };

  const handleRemoveFromWhishlist = (e) => {
    setBookWhishlist(false);
    dispatch(removeFromWhishlist(book._id));
    if (message) {
      toast.success(message);
    }
  };

  return (
    <div className="card">
      <img
        src={
          book.image || "https://d.gr-assets.com/books/1394350537l/21234254.jpg"
        }
        alt="Book Image"
        className="book-image"
      />
      <h2 className="title">{book.title}</h2>
      <h3 className="author">{book.authors}</h3>
      <p className="description">{book.description || "Book's description"}</p>
      <p className="price">${book.price}</p>
      <div className="card-buttons">
        {isCartItem ? (
          <>
            <button onClick={handleRemoveFromCart}>
              <FaTrashAlt
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </button>
            <div className="card__counter">
              <button className="card__btn" onClick={handleReduceQuantity}>
                -
              </button>
              <div className="card__counter-score">{bookCartQuantity}</div>
              <button
                className="card__btn card__btn-plus"
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
          </>
        ) : (
          <button onClick={handleAddToCart}>
            <FaShoppingCart
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </button>
        )}
        {bookWhishlist ? (
          <button onClick={handleRemoveFromWhishlist}>
            <FaTrashAlt
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </button>
        ) : (
          <button onClick={handleAddToWhishlist}>
            <FaSave
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Card2;
