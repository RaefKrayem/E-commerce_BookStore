import axios from "axios";

const API_URL = "http://localhost:5000/api/orders/";

const getOrders = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const placeOrder = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL + "place", {}, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getOrderInfo = async (orderId, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL + "/order/" + orderId, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const cancelOrder = async (orderId, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(API_URL + orderId, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const orderService = {
  getOrders,
  placeOrder,
  getOrderInfo,
  cancelOrder,
};

export default orderService;
