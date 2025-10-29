const Cities = ({ handleChange, formValues, allop }) => {
  return (
    <select
      name="city"
      value={formValues.city}
      onChange={handleChange}
      required
      className="city-select"
    >
      {allop ? (
        <option value="all" className="city-option">All</option>
      ) : (
        <option value="" disabled className="city-option">
          Select a city…
        </option>
      )}

      <optgroup label="Manama & Surroundings">
        <option value="manama" className="city-option">Manama</option>
        <option value="juffair" className="city-option">Juffair</option>
        <option value="adliya" className="city-option">Adliya</option>
        <option value="hoora" className="city-option">Hoora</option>
        <option value="gudaibiya" className="city-option">Gudaibiya</option>
        <option value="sanabis" className="city-option">Sanabis</option>
        <option value="seef" className="city-option">Seef</option>
        <option value="karbabad" className="city-option">Karbabad</option>
        <option value="tubli" className="city-option">Tubli</option>
        <option value="al-dair" className="city-option">Al Dair</option>
      </optgroup>

      <optgroup label="Muharraq & Amwaj">
        <option value="muharraq" className="city-option">Muharraq</option>
        <option value="hidd" className="city-option">Hidd</option>
        <option value="busaiteen" className="city-option">Busaiteen</option>
        <option value="arad" className="city-option">Arad</option>
        <option value="amwaj-islands" className="city-option">Amwaj Islands</option>
        <option value="galali" className="city-option">Galali</option>
      </optgroup>

      <optgroup label="Riffa & A'ali">
        <option value="riffa-east" className="city-option">Riffa (East)</option>
        <option value="riffa-west" className="city-option">Riffa (West)</option>
        <option value="aali" className="city-option">A'ali</option>
        <option value="saar" className="city-option">Saar</option>
        <option value="janabiyah" className="city-option">Janabiyah</option>
      </optgroup>

      <optgroup label="Northern & Western Bahrain">
        <option value="budaiya" className="city-option">Budaiya</option>
        <option value="diraz" className="city-option">Diraz</option>
        <option value="jidhafs" className="city-option">Jidhafs</option>
        <option value="barbar" className="city-option">Barbar</option>
        <option value="karranah" className="city-option">Karranah</option>
        <option value="khamis" className="city-option">Khamis</option>
      </optgroup>

      <optgroup label="Southern & Central Bahrain">
        <option value="isa-town" className="city-option">Isa Town</option>
        <option value="hamad-town" className="city-option">Hamad Town</option>
        <option value="sitra" className="city-option">Sitra</option>
        <option value="maameer" className="city-option">Ma'ameer</option>
        <option value="nuwaidrat" className="city-option">Nuwaidrat</option>
        <option value="zallaq" className="city-option">Zallaq</option>
        <option value="awali" className="city-option">Awali</option>
        <option value="jaw" className="city-option">Jaw</option>
      </optgroup>
    </select>
  )
}

export default Cities
