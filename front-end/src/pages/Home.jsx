import { Outlet } from "react-router";
import Inicio from "../components/Inicio";
function Home() {

  return (
    <>
      <Inicio />
      <Outlet />
    </>
  )
}

export default Home