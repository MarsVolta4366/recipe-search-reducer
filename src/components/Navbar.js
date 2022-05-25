import { DarkMode, Search } from "@mui/icons-material"
import { Input, InputAdornment } from "@mui/material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import styles from "./navbar.module.scss"

const Navbar = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <nav className={`${styles.nav} ${styles[theme]}`}>
            <Link to="/" className="link">
                <h1 className="text">RecipeSearch</h1>
            </Link>
            <Input
                className={`${styles.searchInput} ${styles[theme]}`}
                disableUnderline={true}
                startAdornment={
                    <InputAdornment position="end">
                        <Search className={`${styles.searchIcon} ${styles[theme]}`} />
                    </InputAdornment>
                }
            />
            <ul className="text">
                <li>About</li>
                <li>Contact</li>
                <li>Spoonacular API</li>
                <li><DarkMode onClick={() => {
                    theme === "light" ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light")
                    setTheme(theme === "light" ? "dark" : "light")
                }} />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar