import NewItem from "./newItem"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../services/api"
const ItemsList = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        let response = await axios.get(`${BASE_URL}/item`)
        setItems(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getItems()
  }, [])
  return (
    <div>
      {items?.map((item) => (
        <div key={item._id}>
          <h3>Item name: {item.name}</h3>
          <h3>Item description: {item.description}</h3>
          <h3>Item image: {item.image}</h3>
          <h3>Item price: {item.price}</h3>
          <h3>Item stock: {item.stock}</h3>
        </div>
      ))}
      <NewItem items={items} setItems={setItems} />
    </div>
  )
}
export default ItemsList
