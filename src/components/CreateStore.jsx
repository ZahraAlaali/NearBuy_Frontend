import { useState } from "react"
import { createStore } from "../services/Store.js"
import { useNavigate } from "react-router-dom"
import CategorySelect from "./CategorySelect.jsx"
import Cities from "./Cities.jsx"

const CreateStore = ({ setUser, user }) => {
  let navigate = useNavigate()

  const initialState = { name: "", description: "", category: [], city: "" }

  const [formValues, setFormValues] = useState(initialState)

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
    const store = await createStore(formValues)
    if (store) {
      setFormValues(initialState)
      setUser(...user, (hasStore = true))
      navigate("/")
    }
  }
  return (
    <>
      <div className="col">
        <form className="col" onSubmit={handleSubmit}>
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
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="city">City</label>
            <Cities handleChange={handleChange} formValues={formValues} />
          </div>

          <button disabled={!formValues.name}>Create Store</button>
        </form>
      </div>
      <button
        onClick={() => {
          navigate("/")
        }}
      >
        Skip For Now
      </button>
    </>
  )
}
export default CreateStore
