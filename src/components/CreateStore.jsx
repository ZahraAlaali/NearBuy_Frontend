import { useState, useEffect } from "react"
import { createStore } from "../services/Store.js"
import { useNavigate } from "react-router-dom"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"

const CreateStore = ({ setUser, user, checkToken, getItems }) => {
  let navigate = useNavigate()

  const initialState = { name: "", description: "", category: [], city: "" }
  const [formValues, setFormValues] = useState(initialState)
  const [pictureFile, setPictureFile] = useState(null)

  const handleFile = (e) => {
    setPictureFile(e.target.files?.[0] || null)
  }
  const handleChange = (e) => {
    // credits for CHATGPT
    const { name, value, options, multiple } = e.target
    if (multiple) {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value)
      setFormValues({ ...formValues, [name]: selected })
    } else {
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const store = await createStore(fd)
    if (store) {
      setFormValues(initialState)
      setUser({ ...user, hasStore: true })
      setPictureFile(null)
      checkToken()
      getItems()
      navigate("/")
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <>
      <div className="col">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="name">Store Name</label>
            <input
              name="name"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              placeholder=""
              onChange={handleChange}
              value={formValues.description}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="category">Category</label>
            <CategorySelect
              handleChange={handleChange}
              formValues={formValues}
              multiple={true}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="city">City</label>
            <Cities
              handleChange={handleChange}
              formValues={formValues}
              allop={false}
            />
          </div>

          <button disabled={!formValues.name}>Create Store</button>
        </form>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault()
          checkToken()
          getItems()
          navigate("/")
        }}
      >
        Skip For Now
      </button>
    </>
  )
}
export default CreateStore
