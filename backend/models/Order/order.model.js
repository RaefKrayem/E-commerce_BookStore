const OrderSchema = require("./Order.js");
const asyncHandler = require("express-async-handler");
const UserSchema = require("../User/User.js");

const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderSchema.find({ user: req.user._id });

    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getOrderInfo = asyncHandler(async (req, res) => {
  const id = req.params.id.toString();

  try {
    const order = await OrderSchema.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createOrder = async (req, res) => {
  try {
    // Retrieve the user's cart and populate the 'book' field to get the book details
    const user = await UserSchema.findById(req.user._id).populate("cart.book");

    // Check if the cart is empty
    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate the total amount
    let totalAmount = 0;
    for (const item of user.cart) {
      totalAmount += item.quantity * item.book.price;
    }

    // Create the order object
    const order = {
      user: req.user._id,
      books: user.cart,
      status: "pending",
      totalAmount: totalAmount,
    };

    // Create a new order document
    const newOrder = await OrderSchema.create(order);

    // Update the user's orders array
    user.orders.push(newOrder._id);
    await user.save();

    // Clear the user's cart
    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order Placed successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteOrder = asyncHandler(async (req, res) => {
  const id = req.params.id.toString();
  try {
    await OrderSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = {
  getOrderInfo,
  createOrder,
  deleteOrder,
  getOrders,
};
