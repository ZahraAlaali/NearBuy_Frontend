import { useState } from "react"
import { BASE_URL } from "../services/api"
import Client from "../services/api"

const NewItem = ({ items, setItems, storeId }) => {
  const initialItem = {
    name: "",
    description: "",
    price: 0,
    storeId: "",
  }

  const [form, setForm] = useState(initialItem)
  const [pictureFile, setPictureFile] = useState(null)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    const response = await Client.post(`${BASE_URL}/item/${storeId}`, fd)
    let itemsList = [...items]
    itemsList.push(response.data)
    setItems(itemsList)
    setForm(initialItem)
    setPictureFile(null)
  }

  return (
    <div className="new-item-container">
      <h2 className="form-title">Add New Item</h2>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          onChange={handleChange}
          value={form.name}
          name="name"
          placeholder="Enter item name"
          required
          className="form-input"
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter item description"
          onChange={handleChange}
          value={form.description}
          className="form-input"
        />

        <label htmlFor="image">Item Image</label>
        <input
          name="image"
          type="file"
          onChange={handleFile}
          className="form-input"
        />

        <label htmlFor="price">Price (BHD)</label>
        <input
          type="number"
          name="price"
          placeholder="Enter item price"
          required
          min="1"
          onChange={handleChange}
          value={form.price}
          className="form-input"
        />

        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div>
  )
}

export default NewItem
