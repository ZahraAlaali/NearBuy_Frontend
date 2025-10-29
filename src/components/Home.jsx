import { allStores, OwnerStore, getStoresByFilter } from "../services/Store.js"
import { BASE_URL } from "../services/api"
import { useState, useEffect } from "react"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"
import StoreComp from "./StoreComp"
import ItemsList from "./ItemsList"
import { Link } from "react-router-dom"
import "../App.css"

const Home = ({ user, items, setItems }) => {
  const [store, setStore] = useState(null)
  const [ownerStore, setOwnerStore] = useState({})
  const [loading, setLoading] = useState(true)
  const [formValues, setFormValues] = useState({ city: "all", category: "all" })

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      if (user?.role === "business") {
        if (user.hasStore) {
          const response = await OwnerStore()
          setOwnerStore(response)
        }
      } else {
        const response = await allStores()
        setStore(response)
      }
      setLoading(false)
    }
    load()
  }, [user?.role, user?.hasStore])

  const handleChange = async (e) => {
    const next = { ...formValues, [e.target.name]: e.target.value }
    const response = await getStoresByFilter(next)
    setFormValues(next)
    setStore(response)
  } 

  if (user?.role === "customer") {
    return (
      <div className="home-container">
        <div className="filter-section">
          <form className="filter-form">
            <div className="input-wrapper">
              <label htmlFor="category">Category</label>
              <CategorySelect
                handleChange={handleChange}
                formValues={formValues}
                multiple={false}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="city">City</label>
              <Cities
                handleChange={handleChange}
                formValues={formValues}
                allop={true}
              />
            </div>
          </form>
        </div>

        <div className="stores-list">
          {store?.map((element) => (
            <Link key={element._id} to={`/itemsList/${element._id}`} className="store-link">
              <StoreComp store={element} />
            </Link>
          ))}
        </div>
      </div>
    )
  } else if (user?.role === "business") {
    if (loading) {
      return <p className="loading-text">Loading...</p>
    }
    return (
      <div className="business-container">
        <img
          className="store-image"
          width="300"
          src={
            ownerStore?.picture
              ? `${BASE_URL}${ownerStore.picture}`
              : "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-store-icon-in-line-style-png-image_1736161.jpg"
          }
          alt={ownerStore?.name || "Store"}
        />
        <h3 className="store-name">
          {ownerStore?.name ? ownerStore.name : "You don't Have a store"}
        </h3>
        <p className="store-description">{ownerStore?.description || ""}</p>

        {ownerStore.name && (
          <div className="items-section">
            <ItemsList
              storeId={ownerStore._id}
              user={user}
              items={items}
              setItems={setItems}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Home
