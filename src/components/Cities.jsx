const Cities = ({ handleChange, formValues, allop }) => {
  return (
    <select
      name="city"
      value={formValues.city}
      onChange={handleChange}
      required
    >
      {allop ? (
        <option value="all">All</option>
      ) : (
        <option value="">Select a city…</option>
      )}

      <option value="manama">Manama</option>
      <option value="juffair">Juffair</option>
      <option value="adliya">Adliya</option>
      <option value="hoora">Hoora</option>
      <option value="gudaibiya">Gudaibiya</option>
      <option value="sanabis">Sanabis</option>
      <option value="seef">Seef</option>
      <option value="karbabad">Karbabad</option>
      <option value="tubli">Tubli</option>

      <option value="muharraq">Muharraq</option>
      <option value="hidd">Hidd</option>
      <option value="busaiteen">Busaiteen</option>
      <option value="arad">Arad</option>
      <option value="amwaj-islands">Amwaj Islands</option>
      <option value="galali">Galali</option>
      <option value="riffa-east">Riffa (East)</option>
      <option value="riffa-west">Riffa (West)</option>
      <option value="aali">A'ali</option>
      <option value="saar">Saar</option>
      <option value="janabiyah">Janabiyah</option>
      <option value="budaiya">Budaiya</option>
      <option value="diraz">Diraz</option>
      <option value="jidhafs">Jidhafs</option>
      <option value="barbar">Barbar</option>
      <option value="karranah">Karranah</option>
      <option value="khamis">Khamis</option>

      <option value="isa-town">Isa Town</option>
      <option value="hamad-town">Hamad Town</option>
      <option value="sitra">Sitra</option>
      <option value="maameer">Ma'ameer</option>
      <option value="nuwaidrat">Nuwaidrat</option>
      <option value="zallaq">Zallaq</option>
      <option value="awali">Awali</option>
      <option value="jaw">Jaw</option>
    </select>
  )
}
export default Cities
