const Home = ({ user }) => {
  return (
    <>
      <h1>home</h1>
      <h2>{user?.hasStore ? "has a stote" : "does not have a store"}</h2>
    </>
  )
}
export default Home
