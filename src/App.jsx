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
import ItemDetails from "./components/itemDetails"

function App() {
  let navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkToken = async () => {
      const userData = await CheckSession()
      setUser(userData)
    }
    const token = localStorage.getItem("token")
    if (token) {
      checkToken
    }
  }, [user])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate("/signin")
  }
  const [items, setItems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        let response = await Client.get(`/item`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setItems(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getItems()
  }, [])
  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/itemsList" element={<ItemsList user={user} items={items} setItems={setItems}/>} />
          {/* <Route path="/createStore" element={<CreateStore />} /> */}
          <Route
            path="/createStore"
            element={
              <CreateStore setUser={setUser} user={user} items={items} />
            }
          />
          <Route path="/itemsList/:itemId" element={<ItemDetails items={items} user={user}/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
