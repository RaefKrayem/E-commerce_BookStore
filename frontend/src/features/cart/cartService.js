import axios from "axios";

const API_URL = "http://localhost:5000/api/cart/";

const getCart = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addToCart = async (bookId, quantity, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      API_URL + `addToCart/${bookId}`,
      { order_quantity: quantity },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const removeFromCart = async (bookId, quantity, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      API_URL + `removeFromCart/${bookId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
};

export default cartService;
