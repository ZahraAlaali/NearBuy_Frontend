import { allStores, OwnerStore, getStoresByFilter } from "../services/Store.js"
import { BASE_URL } from "../services/api"
import { useState, useEffect } from "react"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"
import StoreComp from "./StoreComp"
import ItemsList from "./ItemsList"
import { Link, useNavigate } from "react-router-dom"

const Home = ({
  user,
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

  const handleChange = async (e) => {
    const next = { ...formValues, [e.target.name]: e.target.value }
    const response = await getStoresByFilter(next)
    setFormValues(next)
    setStore(response)
  }

  if (user?.role === "customer") {
    homePage = (
      <>
        <div className="col">
          <form className="col">
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
        <div>
          {store?.map((element) => (
            <Link to={`/itemsList/${element._id}`}>
              <StoreComp store={element} />
            </Link>
          ))}
        </div>
      </>
    )
  } else if (user?.role === "business") {
    if (loading) {
      homePage = <p>Loading...</p>
    } else {
      homePage = (
        <>
          <img
            width="300px"
            src={
              ownerStore?.picture
                ? `${BASE_URL}${ownerStore.picture}`
                : "https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-store-icon-in-line-style-png-image_1736161.jpg"
            }
            alt=""
          />
          <h3>
            {ownerStore?.name ? ownerStore.name : "You don't Have a store"}
          </h3>
          <p>
            {ownerStore?.description
              ? "Description: " + ownerStore.description
              : ""}
          </p>
          <p>City: {ownerStore?.city ? ownerStore.city : ""} </p>
          <button
            onClick={() => {
              navigate(`/edit/${ownerStore._id}`)
            }}
          >
            Edit Store
          </button>
          <div>
            {ownerStore.name ? (
              <ItemsList
                storeId={ownerStore._id}
                user={user}
                items={items}
                setItems={setItems}
              />
            ) : (
              ""
            )}
          </div>
        </>
      )
    }
  }

  return <>{homePage}</>
}
export default Home
