import NewItem from "./NewItem"
import { Link, useParams } from "react-router-dom"
import { BASE_URL } from "../services/api"

const ItemsList = ({ user, items, setItems, storeId }) => {
  let view

  if (user.role === "customer") {
    const { storeIdCus } = useParams()
    const filtered = items.filter((item) => item.storeId === storeIdCus)
    view = (
      <div className="items-wrapper">
        <Link to="/" className="back-link">
          <button className="back-button">Back</button>
        </Link>
        <div className="items-container">
          {filtered?.map((item) => (
            <Link
              key={item._id}
              to={`/itemsDetails/${item._id}/${storeIdCus}`}
              className="item-link"
            >
              <div className="item-card">
                <h3 className="item-name">{item.name}</h3>
                <img
                  className="item-image"
                  src={
                    item.image
                      ? `${BASE_URL}${item.image}`
                      : "https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/256x256/plain/shopping_basket_full.png"
                  }
                  alt={item.name}
                />
                <h3 className="item-price">{item.price} BHD</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return user.role === "customer" ? (
    view
  ) : (
    <div className="items-wrapper">
      <div className="items-container">
        {items?.map((item) => (
          <Link
            key={item._id}
            to={`/itemsDetails/${item._id}/${storeId}`}
            className="item-link"
          >
            <div className="item-card">
              <h3 className="item-name">{item.name}</h3>
              <img
                className="item-image"
                src={
                  item.image
                    ? `${BASE_URL}${item.image}`
                    : "https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/256x256/plain/shopping_basket_full.png"
                }
                alt={item.name}
              />
              <h3 className="item-price">{item.price} BHD</h3>
            </div>
          </Link>
        ))}
      </div>
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
