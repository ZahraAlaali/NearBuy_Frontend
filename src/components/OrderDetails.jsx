import { useLocation, Link } from "react-router-dom"
import { useState } from "react"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
import "../App.css"

const OrderDetails = ({ user }) => {
  const { state } = useLocation()
  const [status, setStatus] = useState(state.status)

  const checkout = async (event) => {
    event.preventDefault()
    let newStatus = status
    if (status === "pending") newStatus = "received"
    else if (status === "received") newStatus = "ready"

    setStatus(newStatus)
    await Client.put(`${BASE_URL}/order/update/${state._id}`, {
      status: newStatus,
    })
  }

  return (
    <div className="order-details-container">
      <h1>{state.storeName}</h1>
      <h2>Order Status: {status}</h2>
      <h3>Items:</h3>
      {state.items.map((item, index) => (
        <div key={index} className="order-card">
          <ul>
            <li><strong>{item.itemName}</strong></li>
            <li>Price: {item.itemPrice} BD</li>
            <li>Quantity: {item.quantity}</li>
          </ul>
        </div>
      ))}
      <h3 className="order-price">Total Price: {state.price} BD</h3>

      {user.role === "customer" && (
        <button
          onClick={checkout}
          className={`action-btn checkout-btn ${status !== "pending" ? "disabled-btn" : ""}`}
          disabled={status !== "pending"}
        >
          Checkout
        </button>
      )}
      <Link to={`/itemsList/${state.storeId}`}>
        <button className="action-btn back-btn">Back</button>
      </Link>
    </div>
  )
}
export default OrderDetails
