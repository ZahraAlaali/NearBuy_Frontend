import { useState } from "react"
import { BASE_URL } from "../services/api"
import { editItem } from "../services/Item"
import { useNavigate, useParams } from "react-router-dom"

const EditItem = ({ items, setItems }) => {
  let navigate = useNavigate()
  const { itemId } = useParams()
  console.log(itemId)
  let x
  let filter
  items.forEach((item, index) => {
    if (String(item._id) === String(itemId)) {
      x = index
      filter = item
    }
  })
  const [filtered, setItem] = useState(filter)
  const initialItem = {
    name: filtered?.name,
    description: filtered?.description,
    price: filtered?.price,
  }
  const [form, setForm] = useState(initialItem)
  const [pictureFile, setPictureFile] = useState(filtered?.image)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    const response = await editItem(itemId, fd)
    setItems((prev) => {
      const next = [...prev]
      next[x] = response
      return next
    })
    setItem(response)
    setForm(initialItem)
    setPictureFile(null)
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name: </label>
        <input
          type="text"
          onChange={handleChange}
          value={form.name}
          name="name"
          placeholder="Enter item name"
          required
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          placeholder="Enter item description"
          onChange={handleChange}
          value={form.description}
        />
        <br />
        <img
          width="100px"
          src={
            filtered?.image
              ? `${BASE_URL}${filtered.image}`
              : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
          alt="Item image"
        />
        <label htmlFor="image">Upload the item image: </label>
        <input
          name="image"
          type="file"
          onChange={handleFile}
          value={form.image}
        />
        <br />
        <label htmlFor="price">Enter item price: </label>
        <input
          type="number"
          name="price"
          placeholder="Enter item price"
          required
          min="0"
          onChange={handleChange}
          value={form.price}
        />
        <br />

        <button>Edit Item</button>
      </form>
      <button
        onClick={() => {
          navigate(`/itemsDetails/${itemId}/${filter.storeId}`)
        }}
      >
        Back
      </button>
    </div>
  )
}
export default EditItem
