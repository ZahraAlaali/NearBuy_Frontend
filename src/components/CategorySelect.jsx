const CategorySelect = ({ handleChange, formValues }) => {
  return (
    <select
      name="category"
      value={formValues.category}
      onChange={handleChange}
      required
      multiple
    >
      <option value="" disabled>
        Select a category…
      </option>

      <option value="restaurants">Restaurants</option>
      <option value="cafes">Cafés & Coffee Shops</option>
      <option value="fast-food">Fast Food</option>
      <option value="bakeries">Bakeries & Desserts</option>
      <option value="ice-cream-juice">Ice Cream & Juice Bars</option>
      <option value="street-food">Street Food & Food Trucks</option>
      <option value="supermarkets">Supermarkets & Grocery Stores</option>

      <option value="electronics">Electronics & Gadgets</option>
      <option value="computer-stores">Computer Stores</option>
      <option value="mobile-shops">Mobile Shops</option>
      <option value="clothing">Clothing & Fashion</option>
      <option value="shoes-accessories">Shoes & Accessories</option>
      <option value="cosmetics">Cosmetics & Beauty Products</option>
      <option value="furniture-decor">Furniture & Home Decor</option>
      <option value="toys-games">Toys & Games</option>
      <option value="books-stationery">Books & Stationery</option>

      <option value="hair-salon">Hair Salons</option>
      <option value="nail-salon">Nail Salons</option>
      <option value="spa-massage">Spas & Massage Centers</option>
      <option value="barber">Barber Shops</option>
      <option value="skin-care">Skin Care Clinics</option>
      <option value="gym-fitness">Gyms & Fitness Centers</option>
      <option value="yoga-pilates">Yoga & Pilates Studios</option>

      <option value="car-wash-repair">Car Wash & Auto Repair</option>
      <option value="laundry-dry-clean">Laundry & Dry Cleaning</option>
      <option value="tailor">Tailors & Alterations</option>
      <option value="device-repair">Repair Services (Electronics/Phone)</option>
      <option value="delivery-courier">Delivery & Courier</option>
      <option value="cleaning-services">Cleaning Services</option>
      <option value="pet-care">Pet Care & Grooming</option>
      <option value="printing-copy">Printing & Copy Centers</option>

      <option value="hotels">Hotels & Resorts</option>
      <option value="travel-agency">Travel Agencies</option>
      <option value="car-rental">Car Rentals</option>
      <option value="tourist-attractions">Tourist Attractions</option>
      <option value="parks-beaches">Beaches & Parks</option>
      <option value="entertainment-centers">Entertainment Centers</option>

      <option value="schools-colleges">Schools & Colleges</option>
      <option value="training-institutes">Training Institutes</option>
      <option value="tutoring">Tutoring Centers</option>
      <option value="art-music">Art & Music Schools</option>
      <option value="language-centers">Language Centers</option>

      <option value="pharmacies">Pharmacies</option>
      <option value="clinics">Clinics</option>
      <option value="dental">Dental Clinics</option>
      <option value="optical">Optical Stores</option>
      <option value="hospitals">Hospitals</option>
      <option value="veterinary">Veterinary Clinics</option>

      <option value="banks">Banks</option>
      <option value="insurance">Insurance Offices</option>
      <option value="accounting">Accounting Services</option>
      <option value="real-estate">Real Estate Agencies</option>
      <option value="legal">Legal Services</option>
      <option value="coworking">Coworking Spaces</option>

      <option value="cinemas">Cinemas & Theaters</option>
      <option value="arcades">Game Centers & Arcades</option>
      <option value="party-supplies">Party Supplies</option>
      <option value="photo-video">Photography & Videography</option>
      <option value="event-planners">Event Planners</option>
      <option value="music-dj">Music & DJ Services</option>

      <option value="hardware-tools">Hardware & Tools</option>
      <option value="electrical">Electrical Supplies</option>
      <option value="plumbing">Plumbing Services</option>
      <option value="paint-materials">Paint & Materials</option>
      <option value="interior-design">Interior Design</option>
      <option value="contractors">Real Estate Contractors</option>
    </select>
  )
}
export default CategorySelect
