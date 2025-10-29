import { allStores, OwnerStore, getStoresByFilter } from "../services/Store.js"
import { BASE_URL } from "../services/api"
import { useState, useEffect } from "react"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"
import StoreComp from "./StoreComp"
import ItemsList from "./ItemsList"
import { Link, useNavigate } from "react-router-dom"
import { deleteStore } from "../services/Store.js"
import "../App.css"

const Home = ({
  user,
  setUser,
  items,
  setItems,
  store,
  setStore,
  ownerStore,
  setOwnerStore,
}) => {
  let navigate = useNavigate()
  let homePage
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
    }
    load()
    setLoading(false)
  }, [user?.role, user?.hasStore])

  const handleDelete = async () => {
    await deleteStore(ownerStore._id)
    setOwnerStore(null)
    setItems([])
    setUser({ ...user, hasStore: false, storeId: null })
  }

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
            <Link
              key={element._id}
              to={`/itemsList/${element._id}`}
              className="store-link"
            >
              <StoreComp store={element} />
            </Link>
          ))}
        </div>
      </div>
    )
  } else if (user?.role === "business") {
    if (loading) {
      homePage = <p>Loading...</p>
    } else {
      homePage = (
        <div className="business-container">
          <img
            className="store-image"
            width="300px"
            src={
              ownerStore?.picture
                ? `${BASE_URL}${ownerStore.picture}`
                : "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-store-icon-in-line-style-png-image_1736161.jpg"
            }
            alt=""
          />
          <h3 className="store-name">
            {ownerStore?.name ? ownerStore.name : "You don't Have a store"}
          </h3>
          <p className="store-description">
            {ownerStore?.description
              ? "Description: " + ownerStore.description
              : ""}
          </p>
          <p className="store-description">
            {ownerStore?.city ? "City: " + ownerStore.city : ""}{" "}
          </p>

          {user?.hasStore ? (
            <div className="store-buttons">
              <button onClick={() => navigate(`/edit/${ownerStore?._id}`)}>
                Edit Store
              </button>
              <button onClick={handleDelete}>Delete Store</button>
            </div>
          ) : null}

          <div>
            {ownerStore?.name && (
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
        </div>
      )
    }
    return homePage
  } else {
  }
}

export default Home
