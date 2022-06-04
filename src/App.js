import { createTheme, ThemeProvider } from "@mui/material"
import { useContext, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoadingSpinner from "./components/LoadingSpinner"
import Navbar from "./components/Navbar"
import RecipeGallery from "./components/RecipeGallery"
import RecipeShow from "./components/RecipeShow"
import ResultsPagination from "./components/ResultsPagination"
import { ThemeContext } from "./context/ThemeContext"
import useFetchRecipes from "./helpers/useFetchRecipes"
import "./scss/_main.scss"

const muiTheme = createTheme({
  components: {
    MuiPaginationItem: {
      variants: [
        {
          props: {
            variant: "lightPagination"
          },
          style: {
            color: "#101113",
            backgroundColor: "white",
            marginBottom: "10px"
          }
        },
        {
          props: {
            variant: "darkPagination"
          },
          style: {
            color: "white",
            backgroundColor: "#212529",
            marginBottom: "10px"
          }
        }
      ]
    },
    MuiMenuItem: {
      variants: [
        {
          props: {
            variant: "lightMenuItem"
          },
          style: {
            padding: "0"
          }
        }
      ]
    }
  }
})

function App() {

  const { theme } = useContext(ThemeContext)
  const [params, setParams] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading, error, pageCount } = useFetchRecipes("complexSearch", params)

  console.log(data)
  console.log(error)

  const searchRecipes = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value })
    setCurrentPage(1)
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={`${theme}`}>
        <div className="background container">
          <Router>
            <Navbar searchRecipes={searchRecipes} params={params} setParams={setParams} setCurrentPage={setCurrentPage} />
            {/* Spacing div because of fixed navbar */}
            <div style={{ height: "75px" }}></div>
            <Routes>
              <Route path="/" element={
                <>
                  {/* LoadingSpinner only displays when loading === true */}
                  {loading && <LoadingSpinner />}
                  <RecipeGallery data={data} />
                  {
                    !loading &&
                    <div className="flex">
                      <ResultsPagination
                        params={params}
                        setParams={setParams}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        theme={theme} />
                    </div>
                  }
                  {
                    error &&
                    <div className="flex">
                      <p className="text">Your daily points limit of 150 has been reached.</p>
                    </div>
                  }
                </>
              } />
              <Route path="/showRecipe/:recipeId" element={
                <RecipeShow />
              } />
            </Routes>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
