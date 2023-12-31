import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { saveBook, unsaveBook, getBooks } from "../../features/books/bookSlice";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

function BookCard({ book, isSaved }) {
  const { title, authors, description, imageLinks, categories, publishedDate } =
    book.volumeInfo;
  const dispatch = useDispatch();

  const handleSaveBook = () => {
    const bookData = {
      id: book.id,
      book_selfLink: book.selfLink,
      book_title: title,
      book_authors: authors,
      book_description: description,
      book_categories: categories || "No categories available",
      book_image: imageLinks ? imageLinks.thumbnail : null,
    };
    dispatch(saveBook(bookData));
    dispatch(getBooks());
  };

  const handleUnsaveBook = () => {
    dispatch(unsaveBook(book.selfLink));
    dispatch(getBooks());
  };

  return (
    <>
      <Card className="book_card">
        <Link
          to={`/book/${book.id}`}
          state={{ book: book }}
          key={book.id}
          style={{ textDecoration: "none" }}
        >
          <div className="book_card_image_container">
            <Card.Img
              variant="top"
              src={imageLinks && imageLinks.thumbnail}
              loading="lazy"
              className="book_card_image"
            />
          </div>
        </Link>
        <Card.Body className="book_card_body">
          <Card.Title>
            <div className="book_card_title_container">
              <h5 className="book_card_title">
                {categories ? categories.join(", ") : "No categories available"}
              </h5>
              <span className="book_card_bookmark_icon">
                <Button
                  variant="button"
                  className="book_card_bookmark_button"
                  onClick={isSaved ? handleUnsaveBook : handleSaveBook}
                >
                  {isSaved ? (
                    <FaBookmark id="bookmark-icon" />
                  ) : (
                    <FaRegBookmark id="bookmark-icon" />
                  )}
                </Button>
              </span>
            </div>
          </Card.Title>
          <Card.Text className="book_card_text">
            <h3 className="book_title">
              {title.length > 20 ? title.substring(0, 20) + "..." : title}
            </h3>
            <h4 class="book_authors">
              By {authors ? authors.join(", ") : "No authors available"}
            </h4>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default BookCard;
