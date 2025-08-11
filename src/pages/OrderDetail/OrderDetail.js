import "./OrderDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";

const OrderDetail = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios_instance.get(URL.GET_ORDERS + order_id);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order_id]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="order-detail">
      <h1 className="order-title">Your Order</h1>

      <div className="order-info">
        <h2>Customer Information</h2>
        <div className="order-info-grid">
          <p>
            <strong>Name:</strong> {order.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer_email}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer_telephone}
          </p>
          <p>
            <strong>Address:</strong> {order.customer_address}
          </p>
          <p>
            <strong>Status:</strong> {order.order_status}
          </p>
          <p>
            <strong>Total:</strong> $
            {Number(order.grand_total).toFixed(2).replace(/\.00$/, "")}
          </p>
        </div>
      </div>

      <div className="order-items">
        <h2>Order Items</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price (each)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>${item.product_price}</td>
                <td>${item.quantity * item.product_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
