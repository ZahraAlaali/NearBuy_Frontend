import "./App.css"
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { CheckSession } from "./services/Auth"
import Client from "./services/api"
// components
import Nav from "./components/Nav"
import Register from "./components/Register"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import ItemsList from "./components/ItemsList"
import CreateStore from "./components/CreateStore"
import ItemDetails from "./components/ItemDetails"
import Profile from "./components/Profile"

function App() {
  let navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [items, setItems] = useState([])

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }
  const getItems = async () => {
    try {
      let response = await Client.get(`/item`)
      setItems(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(async () => {
    const token = localStorage.getItem("token")

    if (token) {
      checkToken()
      getItems()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    setItems(null)
    localStorage.clear()
    navigate("/signin")
  }
  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} items={items} setItems={setItems} />}
          />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route
            path="/itemsList"
            element={
              <ItemsList
                user={user}
                items={items}
                setItems={setItems}
                storeId={user?.storeId ? user.storeId : null}
              />
            }
          />
          <Route
            path="/createStore"
            element={
              <CreateStore
                setUser={setUser}
                user={user}
                items={items}
                checkToken={checkToken}
                getItems={getItems}
              />
            }
          />
          <Route
            path="/itemsList/:itemId"
            element={<ItemDetails items={items} user={user} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
