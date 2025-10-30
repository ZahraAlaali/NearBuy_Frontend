import { useParams, useNavigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Client from "../services/api"
import { BASE_URL } from "../services/api"

const ItemDetails = ({ items, user, setItems }) => {
  const navigate = useNavigate()
  const { itemId, storeId } = useParams()

  const [item, setItem] = useState("")
  const [quantity, setQuantity] = useState(0)

  const handlePlus = (event) => {
    event.preventDefault()
    setQuantity((prev) => prev + 1)
  }

  const handleMinus = (event) => {
    event.preventDefault()
    if (quantity > 0) setQuantity((prev) => prev - 1)
  }

  const handleQuantityChange = (event) => {
    // this part is from chatgpt
    setQuantity(Math.max(1, Number(event.target.value)))
  }

  useEffect(() => {
    const selectedItem = items.find((item) => item._id === itemId)
    setItem(selectedItem)
  }, [items, itemId])

  const checkout = async (event, destination) => {
    if (quantity >= 1) {
      event.preventDefault()
      const initialState = {
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
      const response = await Client.post(`order/${storeId}/new`, initialState)
      setQuantity(0)
      if (destination) navigate(destination, { state: response.data })
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    await Client.delete(`${BASE_URL}/item/${item._id}`)
    const itemList = items.filter((el) => el._id !== item._id)
    setItems(itemList)
    navigate("/")
  }

  return (
    <div className="item-details-container">
      <img
        src={
          item.image
            ? `${BASE_URL}${item.image}`
            : "https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/256x256/plain/shopping_basket_full.png"
        }
        alt=""
      />
      <h1>{item.name}</h1>
      <h3>{item.description}</h3>
      <h3>{item.price}BD</h3>

      {user.role == "customer" && (
        <div className="quantity-section">
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={handleMinus}>
              -
            </button>
            <input
              type="number"
              min="1"
              onChange={handleQuantityChange}
              value={quantity}
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={handlePlus}>
              +
            </button>
          </div>

          <div className="action-buttons">
            <button
              className="blue-btn"
              onClick={(e) => checkout(e, "/orderDetails")}
            >
              Go to checkout
            </button>
            <button
              className="blue-btn"
              onClick={(e) => checkout(e, `/itemsList/${storeId}`)}
            >
              Add other items
            </button>
            <br />
          </div>
        </div>
      )}

      {user.role == "business" && (
        <div className="action-buttons">
          <button
            className="blue-btn"
            onClick={() => {
              navigate(`/editItem/${itemId}`)
            }}
          >
            Edit
          </button>
          <button className="blue-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      <Link to={`/itemsList/${storeId}`}>
        <button className="back-btn">Back</button>
      </Link>
    </div>
  )
}
export default ItemDetails
