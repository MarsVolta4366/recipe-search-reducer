import { CircularProgress } from "@mui/material"
import { useContext, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import RecipeGallery from "./components/RecipeGallery"
import RecipeShow from "./components/RecipeShow"
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
      <div className="background">
        <Router>
          <Navbar />
          <div className="center">
            {loading && <CircularProgress style={{ marginTop: "10px" }} />}
          </div>
          <Routes>
            <Route path="/" element={
              <RecipeGallery data={data} />
            } />
            <Route path="/showRecipe/:recipeId" element={
              <RecipeShow />
            } />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
