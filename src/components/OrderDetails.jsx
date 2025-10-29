import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
const OrderDetails = () => {
  const { state } = useLocation()
  // state.storeId="68fdc427d42b2ea119186b17"
  console.log(state)
  const checkout = () => {}
  return (
    <div>
      orderDetails
      <h1>{state.storeName}</h1>
      <h2>order status: {state.status}</h2>
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
      <button>Checkout</button>
      <Link to={`/itemsList/${state.storeId}`}>
        <button>back</button>
      </Link>
    </div>
  )
}
export default OrderDetails
