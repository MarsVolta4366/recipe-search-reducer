import { useContext, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoadingSpinner from "./components/LoadingSpinner"
import Navbar from "./components/Navbar"
import RecipeGallery from "./components/RecipeGallery"
import RecipeShow from "./components/RecipeShow"
import { ThemeContext } from "./context/ThemeContext"
import useFetchRecipes from "./helpers/useFetchRecipes"
import "./scss/_main.scss"

function App() {

  const { theme } = useContext(ThemeContext)
  const [params, setParams] = useState({})
  const { data, loading, error } = useFetchRecipes("complexSearch", params)

  console.log(data)

  return (
    <div className={`${theme}`}>
      <div className="background container">
        <Router>
          <Navbar />
          {/* Spacing div because of fixed navbar */}
          <div style={{ height: "75px" }}></div>
          <Routes>
            <Route path="/" element={
              <>
                {/* LoadingSpinner only displays when loading === true */}
                {loading && <LoadingSpinner />}
                <RecipeGallery data={data} />
              </>
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
