import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../features/orders/orderSlice";
import "./Orders.scss";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { orders, isLoading, isError } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <section className="OrdersBody">
      <h1>Orders</h1>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Amount</th>
              <th>Number of Books</th>
              <th>Date of Order</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id} className="evenTD">
                  <td>{orders.indexOf(order) + 1}</td>
                  <td>$ {order.totalAmount}</td>
                  <td>{order.books.length}</td>
                  <td>
                    {new Date(order.dateOfOrder).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    <a
                      // ignore the lower case and upper case of the status
                      className={
                        order.status.toLowerCase() === "delivered"
                          ? "case success"
                          : order.status.toLowerCase() === "pending"
                          ? "case pending"
                          : "case canceled"
                      }
                    >
                      {order.status}
                    </a>
                  </td>
                </tr>
              ))}

            {/* <tr className="evenTD">
              <td>
                <a className="case success">Delivered</a>
              </td>
              <td>2</td>
              <td>Rs. 2000</td>
              <td>12/12/2021</td>
            </tr>
            <tr>
              <td>
                <a className="case pending">Delivered</a>
              </td>
              <td>2</td>
              <td>Rs. 2000</td>
              <td>12/12/2021</td>
            </tr>
            <tr className="evenTD">
              <td>
                <a className="case canceled">Delivered</a>
              </td>
              <td>2</td>
              <td>Rs. 2000</td>
              <td>12/12/2021</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Orders;
