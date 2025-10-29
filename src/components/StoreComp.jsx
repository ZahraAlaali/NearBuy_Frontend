import { BASE_URL } from "../services/api"

const StoreComp = ({ store }) => {
  return (
    <div className="store-card">
      <img
        className="store-image"
        src={
          store?.picture
            ? `${BASE_URL}${store.picture}`
            : "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-store-icon-in-line-style-png-image_1736161.jpg"
        }
        alt={store.name}
      />
      <h3 className="store-name">{store.name}</h3>
    </div>
  )
}

export default StoreComp
