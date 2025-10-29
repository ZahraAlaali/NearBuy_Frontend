import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
const ItemDetails = ({ items, user, setItems }) => {
  const navigate = useNavigate()

  let { itemId, storeId } = useParams()

  const [item, setItem] = useState("")
  const [quantity, setQuantity] = useState(0)

  const handlePlus = (event) => {
    event.preventDefault()
    setQuantity((prev) => prev + 1)
  }
  const handleMinus = (event) => {
    event.preventDefault()
    if (quantity > 0) {
      setQuantity((prev) => prev - 1)
    }
    console.log(quantity)
  }
  const handleQuantityChange = (event) => {
    // max from chatGpt
    setQuantity(Math.max(0, Number(event.target.value)))
  }

  useEffect(() => {
    let selectedItem = items.find((item) => {
      return item._id === itemId
    })
    setItem(selectedItem)
  }, [items, itemId])

  const checkout = async (event, destination) => {
    if (quantity >= 1) {
      event.preventDefault()
      let initialState = {
        items: [
          {
            itemId: item._id,
            itemName: item.name,
            quantity: quantity,
            itemPrice: item.price,
          },
        ],
        price: quantity * item.price,
        customerId: user.id,
        storeId: storeId,
        status: "pending",
      }
      let response = await Client.post(`order/${storeId}/new`, initialState)
      setQuantity(0)
      if (destination) navigate(destination, { state: response.data })
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    await Client.delete(`${BASE_URL}/item/${item._id}`)
    let itemList = [...items]
    itemList.forEach((element, index) => {
      if (element._id === item._id) {
        itemList.splice(index, 1)
      }
    })
    setItems(itemList)
    navigate("/")
  }

  return item ? (
    <div>
      <img
        width="200px"
        src={
          item.image
            ? `${BASE_URL}${item.image}`
            : "https://cdn.vectorstock.com/i/1000v/71/52/food-logo-design-template-vector-30097152.jpg"
        }
        alt=""
      />
      <h1>{item.name}</h1>
      <h3>{item.description}</h3>
      <h3>{item.price}BD</h3>

      {user.role == "customer" && (
        <div>
          <button onClick={handleMinus}>-</button>
          <input
            type="number"
            min="1"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <button onClick={handlePlus}>+</button>
          <br />
          <button onClick={(e) => checkout(e, "/orderDetails")}>
            Go to checkout
          </button>
          <br />
          <button onClick={(e) => checkout(e, `/itemsList/${storeId}`)}>
            add other items
          </button>
          <br />
        </div>
      )}
      {user.role == "business" && (
        <div>
          <button>edit</button>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
      <Link to={`/itemsList/${storeId}`}>
        <button>back</button>
      </Link>
    </div>
  ) : null
}
export default ItemDetails
