import "./App.css"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import { CheckSession } from "./services/Auth"
import axios from "axios"
// components
import Nav from "./components/Nav"
import Register from "./components/Register"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import ItemsList from "./components/ItemsList"
// import CreateStore from "./components/CreateStore"

function App() {
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
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/itemsList" element={<ItemsList />} />
          {/* <Route path="/createStore" element={<CreateStore />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
