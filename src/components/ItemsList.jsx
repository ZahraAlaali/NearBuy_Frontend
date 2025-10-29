import NewItem from "./newItem"
import { useEffect, useState } from "react"
import Client from "../services/api"
import ItemDetails from "./itemDetails"
import { Link, useParams } from "react-router-dom"
import { BASE_URL } from "../services/api"
const ItemsList = ({ user, items, setItems, storeId }) => {
  let view
  if (user.role == "customer") {
    const { storeIdCus } = useParams()
    const filtered = items.filter((item) => {
      return item.storeId === storeIdCus
    })
    view = (
      <div>
        {filtered?.map((item) => (
          <Link key={item._id} to={`/itemsDetails/${item._id}/${storeIdCus}`}>
            <div key={item._id}>
              <h3>Item name: {item.name}</h3>
              <img
                width="300px"
                src={
                  item.image
                    ? `${BASE_URL}${item.image}`
                    : "https://cdn.vectorstock.com/i/1000v/71/52/food-logo-design-template-vector-30097152.jpg"
                }
                alt=""
              />
              <h3>Item price: {item.price}</h3>
            </div>
          </Link>
        ))}
        <Link to="/">
          <button>back</button>
        </Link>
      </div>
    )
  }

  return user.role === "customer" ? (
    view
  ) : (
    <div>
      {items?.map((item) => (
        <Link key={item._id} to={`/itemsDetails/${item._id}/${storeId}`}>
          <div key={item._id}>
            <h3>Item name: {item.name}</h3>
            <img
              width="300px"
              src={
                item.image
                  ? `${BASE_URL}${item.image}`
                  : "https://cdn.vectorstock.com/i/1000v/71/52/food-logo-design-template-vector-30097152.jpg"
              }
              alt=""
            />
            <h3>Item price: {item.price}</h3>
          </div>
        </Link>
      ))}
      <NewItem
        user={user}
        items={items}
        setItems={setItems}
        storeId={storeId}
      />
    </div>
  )
}
export default ItemsList
