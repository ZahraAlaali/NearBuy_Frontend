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
          value={form.image}
        />
        <br />
        <label htmlFor="price">Enter item price: </label>
        <input
          type="number"
          name="price"
          placeholder="Enter item price"
          required
          min="1"
          onChange={handleChange}
          value={form.price}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  )
}
export default NewItem
