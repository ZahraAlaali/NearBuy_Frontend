import { useLocation, Link } from "react-router-dom"
import { useState } from "react"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
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
    <div>
      orderDetails
      <h1>{state.storeName}</h1>
      <h2>order status: {status}</h2>
      <h2>items: </h2>
      {state.items.map((item) => {
        return (
          <div>
            <ul>
              <li>{item.itemName}</li>
              <li>item price: {item.itemPrice}</li>
              <li>quantity: {item.quantity}</li>
            </ul>
          </div>
        )
      })}
      <h2>order price: {state.price}</h2>
      {user.role == "customer" && (
        <button onClick={checkout} disabled={status !== "pending"}>
          Checkout
        </button>
      )}
      <Link to={`/itemsList/${state.storeId}`}>
        <button>back</button>
      </Link>
    </div>
  )
}
export default OrderDetails
