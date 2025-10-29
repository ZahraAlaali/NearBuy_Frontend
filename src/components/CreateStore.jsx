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
    <div className="create-store-wrapper">
  <h2 className="create-store-title">Create Your Store</h2>
  <form className="create-store-form" onSubmit={handleSubmit}>
    {/* Upload Image */}
    <div className="create-store-input-wrapper">
      <label htmlFor="picture">Store Image</label>
      <input
        type="file"
        name="picture"
        accept="image/*"
        className="create-store-input"
        onChange={handleFile}
      />
    </div>

    {/* Store Name */}
    <div className="create-store-input-wrapper">
      <label htmlFor="name">Store Name</label>
      <input
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        className="create-store-input"
        placeholder="Enter store name"
        required
      />
    </div>

    {/* Description */}
    <div className="create-store-input-wrapper">
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        className="create-store-input"
        placeholder="Enter description"
      />
    </div>

    {/* Category */}
    <div className="create-store-input-wrapper">
      <label htmlFor="category">Category</label>
      <CategorySelect
        handleChange={handleChange}
        formValues={formValues}
        multiple={true}
        className="create-store-input"
      />
    </div>

    {/* City */}
    <div className="create-store-input-wrapper">
      <label htmlFor="city">City</label>
      <Cities
        handleChange={handleChange}
        formValues={formValues}
        allop={false}
        className="create-store-input"
      />
    </div>

    <button type="submit" className="create-store-submit" disabled={!formValues.name}>
      Create Store
    </button>
    <button className="create-store-skip" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
      Skip For Now
    </button>
  </form>
</div>

  )
}

export default CreateStore
