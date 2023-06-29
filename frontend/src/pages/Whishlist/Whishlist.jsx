import { useEffect, useState } from "react";
import Card2 from "../../components/Card2/Card2";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, reset } from "../../features/books/bookSlice";
import { getCart } from "../../features/cart/cartSlice";
import {
  getWhishList,
  reset as resetWhishList,
} from "../../features/whishlist/whishlistSlice";
import { useNavigate } from "react-router-dom";
import "./Store.scss";

function Whishlist() {
  const dispatch = useDispatch();
  const { whishlist, isLoading, isError, message } = useSelector(
    (state) => state.whishlist
  );

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getWhishList());
    dispatch(getCart());
    return () => {
      dispatch(resetWhishList());
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const filteredBooks = whishlist.filter((book) => {
    // switch term on first character to determine search type
    switch (searchTerm[0]) {
      case "@":
        console.log("searching by author", searchTerm);
        // split the search term after the @
        const author = searchTerm.split("@")[1];
        console.log(author);
        return book.authors.toLowerCase().includes(author.toLowerCase());
      case "#":
        console.log("searching by genre", searchTerm);
        // split the search term after the #
        const category = searchTerm.split("#")[1];
        console.log(category);
        return book.category.toLowerCase().includes(category.toLowerCase());
      default:
        return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  console.table(filteredBooks);

  return (
    <>
      <div className="store">
        <div className="searchBar">
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search by title, @author, or #category"
              type="search"
              className="input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="cards">
          {filteredBooks.map((card) => (
            <Card2 key={card._id} book={card} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Whishlist;
