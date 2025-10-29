const CategorySelect = ({ handleChange, formValues, multiple }) => {
  return (
    <select
      name="category"
      value={formValues.category}
      onChange={handleChange}
      required
      multiple={multiple ? true : false}
      className="category-select"
    >
      {multiple ? (
        <option value="" disabled className="category-option">
          Select a category…
        </option>
      ) : (
        <option value="all" className="category-option">All</option>
      )}

      <optgroup label="Food & Beverages">
        <option value="restaurants" className="category-option">Restaurants</option>
        <option value="cafes" className="category-option">Cafés & Coffee Shops</option>
        <option value="fast-food" className="category-option">Fast Food</option>
        <option value="bakeries" className="category-option">Bakeries & Desserts</option>
        <option value="ice-cream-juice" className="category-option">Ice Cream & Juice Bars</option>
        <option value="street-food" className="category-option">Street Food & Food Trucks</option>
        <option value="supermarkets" className="category-option">Supermarkets & Grocery Stores</option>
      </optgroup>

      <optgroup label="Electronics & Fashion">
        <option value="electronics" className="category-option">Electronics & Gadgets</option>
        <option value="computer-stores" className="category-option">Computer Stores</option>
        <option value="mobile-shops" className="category-option">Mobile Shops</option>
        <option value="clothing" className="category-option">Clothing & Fashion</option>
        <option value="shoes-accessories" className="category-option">Shoes & Accessories</option>
        <option value="cosmetics" className="category-option">Cosmetics & Beauty Products</option>
        <option value="furniture-decor" className="category-option">Furniture & Home Decor</option>
        <option value="toys-games" className="category-option">Toys & Games</option>
        <option value="books-stationery" className="category-option">Books & Stationery</option>
      </optgroup>

      <optgroup label="Finance & Business">
        <option value="banks" className="category-option">Banks</option>
        <option value="insurance" className="category-option">Insurance Offices</option>
        <option value="accounting" className="category-option">Accounting Services</option>
        <option value="real-estate" className="category-option">Real Estate Agencies</option>
        <option value="legal" className="category-option">Legal Services</option>
        <option value="coworking" className="category-option">Coworking Spaces</option>
      </optgroup>
    </select>
  )
}

export default CategorySelect
