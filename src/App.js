import { CircularProgress } from "@mui/material"
import { useContext, useState } from "react"
import Navbar from "./components/Navbar"
import RecipeGallery from "./components/RecipeGallery"
import { ThemeContext } from "./context/ThemeContext"
import useFetchRecipes from "./helpers/useFetchRecipes"
import "./scss/_main.scss"

function App() {

  const { theme } = useContext(ThemeContext)
  const [params, setParams] = useState({})
  const { data, loading, error } = useFetchRecipes(params)

  console.log(data)

  return (
    <div className={theme}>
      <Navbar />
      <div className="background flex">
        {loading && <CircularProgress style={{ marginTop: "10px" }} />}
        <RecipeGallery data={data} />
      </div>
    </div>
  )
}

export default App
