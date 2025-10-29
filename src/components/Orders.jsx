import { useEffect, useState } from "react"
import Client from "../services/api"
import { BASE_URL } from "../services/api"

const Orders = ({user}) => {
  const [orders, setOrders] = useState([])
  const [toggle,setToggle] = useState(false)
  const checkout = async (order) => {
    let newStatus

    if (order.status === "pending" && user.role=="customer") newStatus = "received"
    else if (order.status === "received" && user.role=="business") newStatus = "ready"
    await Client.put(`${BASE_URL}/order/update/${order._id}`, {
      status: newStatus,
    })
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
    <div>
      {orders?.map((order) => (
        <div>
          <h3>Order ID: {order._id}</h3>
          <h4>status: {order.status}</h4>
          <h4>Price: {order.price}</h4>
          <h4>
            Items:
            {order.items.map((item) => (
              <ul>
                <li>
                  {item.itemName} | {item.quantity} pieces | item price:{" "}
                  {item.itemPrice} BD
                </li>
              </ul>
            ))}
          </h4>
          {user?.role==='business'?(
            <button
            onClick={() => checkout(order)}
            disabled={order.status == "ready"}
          >
            Order is ready to pickup
          </button>
          ):""}

        </div>
      ))}
    </div>
  )
}
export default Orders
