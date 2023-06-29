import axios from "axios";

const API_URL = "http://localhost:5000/api/whishlist/";

const getWhishList = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

const addToWhishlist = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      API_URL + `addToWhishlist/${bookId}`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const removeFromWhishlist = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(
      API_URL + `removeFromWhishlist/${bookId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const whishlistService = {
  getWhishList,
  addToWhishlist,
  removeFromWhishlist,
};

export default whishlistService;
