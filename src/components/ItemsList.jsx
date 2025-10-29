import NewItem from "./newItem"
import { useEffect, useState } from "react"
import Client from "../services/api"
import ItemDetails from "./itemDetails"
import { Link } from "react-router-dom"
const ItemsList = ({ user, items, setItems }) => {
  return (
    <div>
      {items?.map((item, index) => (
        <Link to={`${item._id}`}>
          <div key={item._id}>
            <h3>Item name: {item.name}</h3>
            <h3>Item image: {item.image}</h3>
            <h3>Item price: {item.price}</h3>
          </div>
        </Link>
      ))}
      {user.role == "business" && <NewItem user={user} items={items} setItems={setItems} />}
      <Link to="/"><button>back</button></Link>
    </div>
  )
}
export default ItemsList
