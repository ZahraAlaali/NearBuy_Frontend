import { allStores, OwnerStore, getStoresByFilter } from "../services/Store.js"

const Home = ({ user }) => {
  let homePage
  let store
  if (user?.role === "customer") {
    store = await
    // homePage=(

    // )
  }
  return (
    <>
      <h1>home</h1>
      <h2>{user?.hasStore ? "has a stote" : "does not have a store"}</h2>
    </>
  )
}
export default Home
