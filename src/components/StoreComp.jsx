import { BASE_URL } from "../services/api"

const StoreComp = ({ store }) => {
  return (
    <div className="store-card">
      <img
        className="store-image"
        src={
          store?.picture
            ? `${BASE_URL}${store.picture}`
            : "https://cdn-icons-png.flaticon.com/512/2697/2697432.png"
        }
        alt={store.name}
      />
      <h3 className="store-name">{store.name}</h3>
    </div>
  )
}

export default StoreComp
