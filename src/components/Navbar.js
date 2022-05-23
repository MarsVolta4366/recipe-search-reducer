import { DarkMode, Search } from "@mui/icons-material"
import { Input, InputAdornment } from "@mui/material"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import styles from "./navbar.module.scss"

const Navbar = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <nav className={`${styles.nav} ${styles[theme]}`}>
            <h1 className="text">RecipeSearch</h1>
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
                <li><DarkMode onClick={() => setTheme(theme === "light" ? "dark" : "light")} /></li>
            </ul>
        </nav>
    )
}

export default Navbar