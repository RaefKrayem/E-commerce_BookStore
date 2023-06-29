import axios from "axios";

const API_URL = "http://localhost:5000/api/books/";

// Get all saved books
const getBooks = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const bookService = {
  getBooks,
};

export default bookService;
