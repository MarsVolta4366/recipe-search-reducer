import { useContext } from "react"
import Navbar from "./components/Navbar"
import { ThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"

function App() {

  const { theme } = useContext(ThemeContext)

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
