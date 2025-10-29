import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Client from "../services/api"
import { BASE_URL } from "../services/api"
const ItemDetails = ({ items, user, setItems }) => {
  const navigate = useNavigate()
  // get selected item details
  let { itemId, storeId } = useParams()
  const [item, setItem] = useState("")
  const [quantity, setQuantity] = useState(0)
  useEffect(() => {
    let selectedItem = items.find((item) => {
      return item._id === itemId
    })
    setItem(selectedItem)
  }, [items, itemId])

  // handle quantity
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

  // handle comment
  const [comment, setComment] = useState("")
  const handleCommentChange = (event) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  // checkout
  // const [newItem, setNewItems] = useState(initialState)
  const checkout = async (event, destination) => {
    if (quantity >= 1) {
      event.preventDefault()
      let initialState = {
        comment,
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
      let response = await Client.post(`order/68fd17f8f260cea4ccbdde75/new`, initialState)
      setQuantity(0)
      setComment("")
      if (destination) navigate(destination, {state: response.data})
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
    navigate("/itemsList")
  }
  return item ? (
    <div>
      <h1>{item.name}</h1>
      <h3>{item.description}</h3>
      <h3>{item.price}BD</h3>
      <h3>{item.stock} pieces are available</h3>

      {user.role == "customer" && (
        <div>
          <label htmlFor="comment">Add comment</label>
          <input type="text" name="comment" onChange={handleCommentChange} />
          <br />
          <button onClick={handleMinus}>-</button>
          <input
            type="number"
            min="0"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <button onClick={handlePlus}>+</button>
          <br />
          <button onClick={(e) => checkout(e, "/orderDetails")}>
            checkout
          </button>
          <br />
          <button onClick={(e) => checkout(e, "/itemsList")}>
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
      <Link to="/itemsList">
        <button>back</button>
      </Link>
    </div>
  ) : null
}
export default ItemDetails
