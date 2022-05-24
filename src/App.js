import { useContext, useState } from "react"
import Navbar from "./components/Navbar"
import { ThemeContext } from "./context/ThemeContext"
import useFetchRecipes from "./helpers/useFetchRecipes"
import "./scss/_main.scss"

function App() {

  const { theme } = useContext(ThemeContext)
  const [params, setParams] = useState({})
  const { data, loading, error } = useFetchRecipes(params)

  console.log(data)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a40e27eb395e4e92a5f5dcb1c521082b&query=${search}&offset=${searchOffset}`)
  //     const resData = await response.json()
  //     console.log("Data:", resData)
  //     setData(resData)
  //   }
  //   fetchData()
  // }, [search, searchOffset])

  return (
    <div className={theme}>
      <Navbar />
      <div className="background flex">
        <h1 className="text">Hello</h1>
      </div>
    </div>
  )
}

export default App
