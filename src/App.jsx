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

  const handleLogOut = () => {
    setUser(null)
    setItems([])
    localStorage.clear()
    navigate("/signin")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const getItems = async () => {
      try {
        let response = await Client.get(`/item`)
        setItems(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    if (token) {
      checkToken()
      getItems()
    }
  }, [])

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} items={items} setItems={setItems} />}
          />

          <Route
            path="/signin"
            element={<SignIn setUser={setUser} setItems={setItems} />}
          />

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
              <CreateStore setUser={setUser} user={user} items={items} />
            }
          />
          <Route
            path="/itemsList/:itemId"
            element={
              <ItemDetails items={items} user={user} setItems={setItems} />
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
