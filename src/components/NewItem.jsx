import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../services/api"
import Client from "../services/api"
const NewItem = ({ items, setItems, user }) => {
  const initialItem = {
    name: "",
    description: "",
    stock: 0,
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
    const response = await Client.post(
      `${BASE_URL}/item/68fd17f8f260cea4ccbdde75`,
      form,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    let itemsList = [...items]
    itemsList.push(response.data)
    setItems(itemsList)
    setForm(initialItem)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter item name: </label>
        <input
          type="text"
          onChange={handleChange}
          value={form.name}
          name="name"
          placeholder="Enter item name"
          required
        />
        <br />
        <label htmlFor="description">Enter item description: </label>
        <input
          type="text"
          name="description"
          placeholder="Enter item description"
          onChange={handleChange}
          value={form.description}
        />
        <br />
        <label htmlFor="image">Upload the item image: </label>
        <input
          name="image"
          type="file"
          onChange={handleFile}
          value={pictureFile?.image}
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
        <label htmlFor="stock">Enter item stock: </label>
        <input
          type="number"
          name="stock"
          placeholder="Enter item stock"
          required
          min="0"
          onChange={handleChange}
          value={form.stock}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}
export default NewItem
