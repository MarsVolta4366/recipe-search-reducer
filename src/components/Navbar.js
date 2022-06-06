import { ArrowDropDown, DarkMode, Search } from "@mui/icons-material"
import { Checkbox, FormControlLabel, Input, InputAdornment, Menu, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import styles from "./navbar.module.scss"

const Navbar = ({ searchRecipes, params, setParams, setCurrentPage }) => {

    const { theme, setTheme } = useContext(ThemeContext)
    const [searchEvent, setSearchEvent] = useState({ target: { name: "", value: "" } })
    const [filterCheckBoxes, setFilterCheckBoxes] = useState({ dairyFree: false, glutenFree: false, vegetarian: false, vegan: false, ketogenic: false, treeNutFree: false, peanutFree: false, seafoodFree: false })
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
                onChange={(e) => {
                    setSearchEvent(e)
                }}
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
                <h3 className={`${styles.menuHeading} ${styles[theme]}`}>Diet</h3>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.glutenFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    glutenFree: !prevFilters.glutenFree
                                }
                            })
                            toggleFilter("diet", "Gluten Free")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Gluten Free" />
                </MenuItem>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.vegetarian}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    vegetarian: !prevFilters.vegetarian
                                }
                            })
                            toggleFilter("diet", "Vegetarian")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Vegetarian" />
                </MenuItem>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.vegan}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    vegan: !prevFilters.vegan
                                }
                            })
                            toggleFilter("diet", "Vegan")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Vegan" />
                </MenuItem>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.ketogenic}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    ketogenic: !prevFilters.ketogenic
                                }
                            })
                            toggleFilter("diet", "Ketogenic")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Ketogenic" />
                </MenuItem>
                <h3 className={`${styles.menuHeading} ${styles[theme]}`}>Intolerances</h3>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.dairyFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    dairyFree: !prevFilters.dairyFree
                                }
                            })
                            toggleFilter("intolerances", "Dairy")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Dairy" />
                </MenuItem>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.treeNutFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    treeNutFree: !prevFilters.treeNutFree
                                }
                            })
                            toggleFilter("intolerances", "Tree Nut")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Tree Nuts" />
                </MenuItem>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.peanutFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    peanutFree: !prevFilters.peanutFree
                                }
                            })
                            toggleFilter("intolerances", "Peanut")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Peanuts" />
                </MenuItem>
                <MenuItem variant="lightMenuItem">
                    <FormControlLabel control={<Checkbox className={`${styles.checkbox} ${styles[theme]}`} checked={filterCheckBoxes.seafoodFree}
                        onClick={() => {
                            setFilterCheckBoxes(prevFilters => {
                                return {
                                    ...prevFilters,
                                    seafoodFree: !prevFilters.seafoodFree
                                }
                            })
                            toggleFilter("intolerances", "Seafood")
                        }}
                    />} className={`${styles.formLabel} ${styles[theme]}`} label="Seafood" />
                </MenuItem>
            </Menu>
            <ul className="text">
                <li>About</li>
                <li><Link to="/contact" className="link text">Contact</Link></li>
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