import { ArrowDropDown, DarkMode, Search } from "@mui/icons-material"
import { Checkbox, FormControlLabel, Input, InputAdornment, Menu, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import styles from "./navbar.module.scss"

const Navbar = ({ searchRecipes, params, setParams, setCurrentPage }) => {

    const { theme, setTheme } = useContext(ThemeContext)
    const [searchEvent, setSearchEvent] = useState({ target: { name: "", value: "" } })
    const [filterCheckBoxes, setFilterCheckBoxes] = useState({ dairyFree: false, glutenFree: false })
    const navigate = useNavigate()

    // For drop down filter menu
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleFilterClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleFilterClose = () => {
        setAnchorEl(null)
    }

    // Add param or set to undefined as toggled
    const toggleFilter = (paramName, paramValue) => {
        setCurrentPage(1)
        if (params[paramName] === paramValue) {
            setParams({
                ...params,
                offset: 0,
                [paramName]: undefined
            })
        } else {
            setParams({
                ...params,
                offset: 0,
                [paramName]: paramValue
            })
        }
    }

    return (
        <nav className={`${styles.nav} ${styles[theme]}`}>
            <Link to="/" className="link">
                <h1 className="text">RecipeSearch</h1>
            </Link>
            <Input
                className={`${styles.searchInput} ${styles[theme]}`}
                disableUnderline={true}
                startAdornment={
                    <ArrowDropDown className={`${styles.searchIcon} ${styles[theme]}`}
                        onClick={handleFilterClick}
                    />
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Search className={`${styles.searchIcon} ${styles[theme]}`}
                            onClick={() => {
                                searchRecipes(searchEvent)
                                navigate("/")
                            }}
                        />
                    </InputAdornment>
                }
                name="query"
                onChange={(e) => setSearchEvent(e)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchRecipes(e)
                        navigate("/")
                    }
                }}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleFilterClose}
            >
                <MenuItem>
                    <FormControlLabel control={<Checkbox checked={filterCheckBoxes.dairyFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    dairyFree: !prevFilters.dairyFree
                                }
                            })
                            toggleFilter("intolerances", "Dairy")
                        }}
                    />} label="Dairy Free" />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel control={<Checkbox checked={filterCheckBoxes.glutenFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    glutenFree: !prevFilters.glutenFree
                                }
                            })
                            toggleFilter("diet", "Gluten Free")
                        }}
                    />} label="Gluten Free" />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel control={<Checkbox />} label="Vegetarian" />
                </MenuItem>
                <MenuItem>
                    <FormControlLabel control={<Checkbox />} label="Vegan" />
                </MenuItem>
            </Menu>
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