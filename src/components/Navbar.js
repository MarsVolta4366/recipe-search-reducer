import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import styles from "./navbar.module.scss"

const Navbar = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <nav className={`${styles.nav} ${styles[theme]}`}>
            <h1 className="text">RecipeSearch</h1>
            <ul className="text">
                <li>About</li>
                <li>Design</li>
            </ul>
        </nav>
    )
}

export default Navbar