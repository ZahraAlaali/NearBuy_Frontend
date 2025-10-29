import { useEffect, useState } from "react"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
import "../App.css"

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [toggle, setToggle] = useState(false)

  const checkout = async (order) => {
    let newStatus
    if (order.status === "pending" && user.role === "customer") newStatus = "received"
    else if (order.status === "received" && user.role === "business") newStatus = "ready"

    await Client.put(`${BASE_URL}/order/update/${order._id}`, { status: newStatus })
    setToggle(!toggle)
  }

  useEffect(() => {
    const getOrders = async () => {
      const response = await Client.get(`${BASE_URL}/order`, {})
      setOrders(response.data)
    }
    getOrders()
  }, [toggle])

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {orders?.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Order ID: {order._id}</h3>
          <p>Status: {order.status}</p>
          <p className="order-price">Price: {order.price} BD</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.itemName} | {item.quantity} pcs | {item.itemPrice} BD
              </li>
            ))}
          </ul>
          {user?.role === "business" && (
            <button
              onClick={() => checkout(order)}
              className={`action-btn checkout-btn ${order.status === "ready" ? "disabled-btn" : ""}`}
              disabled={order.status === "ready"}
            >
              Order Ready for Pickup
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
export default Orders
