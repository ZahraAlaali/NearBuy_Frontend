import { allStores, OwnerStore, getStoresByFilter } from "../services/Store.js"
import { useState, useEffect } from "react"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"
import StoreComp from "./StoreComp"
import { Link } from "react-router-dom"

const Home = ({ user }) => {
  let homePage
  const [store, setStore] = useState(null)
  const [formValues, setFormValues] = useState({ city: "all", category: "all" })
  useEffect(() => {
    const load = async () => {
      if (user?.role === "customer") {
        const response = await allStores()
        setStore(response)
      } else if (user?.role === "business") {
        const response = await OwnerStore()
        setStore(response)
      }
    }
    load()
  }, [])

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
            <StoreComp key={element._id} store={element} />
          ))}
        </div>
      </>
    )
  } else if (user?.role === "business")
    homePage = (
      <>
        <h3>{store?.name}</h3>
        <p>{store?.description}</p>
      </>
    )

  return <>{homePage}</>
}
export default Home
