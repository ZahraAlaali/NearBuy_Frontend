import { BASE_URL } from "../services/api"
const StoreComp = ({ store }) => {
  return (
    <>
      <img
        src={
          store?.picture
            ? `${BASE_URL}${store.picture}`
            : "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-store-icon-in-line-style-png-image_1736161.jpg"
        }
        alt=""
      />
      <h3>{store.name}</h3>
    </>
  )
}
export default StoreComp
