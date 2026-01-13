import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DealerOrders = () => {
  const { dealerId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:2008/api/orders/${dealerId}`)
      .then(res => setOrders(res.data));
  }, [dealerId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📜 Previous Orders</h2>

      {orders.map(o => (
        <div key={o._id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px"
        }}>
          <p><b>Date:</b> {new Date(o.createdAt).toLocaleString()}</p>
          <p><b>Total:</b> ₹ {o.totalAmount}</p>

          <ul>
            {o.items.map((i, idx) => (
              <li key={idx}>{i.name} × {i.qty}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DealerOrders;
