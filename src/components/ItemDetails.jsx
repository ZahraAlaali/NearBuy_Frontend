import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const ItemDetails = ({ items,user }) => {
  let { itemId } = useParams()
  const [item, setItem] = useState("")
  useEffect(() => {
    let selectedItem = items.find((item) => {
      return item._id === itemId
    })
    setItem(selectedItem)
  }, [items, itemId])
  const [quantity,setQuantity]=useState(0)
  const handlePlus = (event) => {
    event.preventDefault()
    setQuantity((prev)=>prev+1)
  }
  const handleMinus = (event) => {
    event.preventDefault()
    if(quantity>0){
      setQuantity((prev)=>prev-1)

    }
    console.log(quantity)
  }
  const handleChange=(event)=>{
    // max from chatGpt
    setQuantity(Math.max(0, Number(event.target.value)))
  }
  return item ? (
    <div>
      <h1>{item.name}</h1>
      <h3>{item.description}</h3>
      <h3>{item.price}BD</h3>
      <h3>{item.stock} pieces are available</h3>

      {user.role == "customer" && (
        <div>
          <button onClick={handleMinus}>-</button>
          <input type="number" min="0" onChange={handleChange} value={quantity}/>
          <button onClick={handlePlus}>+</button>
          <br />
          <button>checkout</button>
          <br />
          <button>add other items</button>
          <br />
          <Link to="/itemsList"><button>back</button></Link>
        </div>
      )}
      {user.role == "business" && (
        <div>
          <button>edit</button>
          <button>delete</button>
        </div>
      )}
    </div>
  ) : null
}
export default ItemDetails
