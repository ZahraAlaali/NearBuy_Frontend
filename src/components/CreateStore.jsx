import { useState } from "react"
import { CreateStore } from "../services/Store.js"
import { useNavigate } from "react-router-dom"

const CreateStore = () => {
  let navigate = useNavigate()

  const initialState = { name: "", description: "", category: [], city: "" }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const store = await CreateStore(formValues)
    if (store) {
      setFormValues(initialState)
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
              required
            />
          </div>

          <button disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}
export default CreateStore
