import { ArrowDropDown, DarkMode, Search } from "@mui/icons-material"
import { Checkbox, FormControl, FormControlLabel, Input, InputAdornment, Menu, MenuItem, Radio, RadioGroup } from "@mui/material"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import styles from "./navbar.module.scss"

const Navbar = ({ searchRecipes, params, setParams, setCurrentPage }) => {

    const { theme, setTheme } = useContext(ThemeContext)
    const [searchEvent, setSearchEvent] = useState({ target: { name: "", value: "" } })
    const [filterCheckBoxes, setFilterCheckBoxes] = useState({ dairyFree: false, treeNutFree: false, peanutFree: false, seafoodFree: false })
    const [selectedRadio, setSelectedRadio] = useState("None")
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

    const handleRadioChange = (e) => {
        setCurrentPage(1)
        if (e.target.value === "None") {
            setParams({
                ...params,
                offset: 0,
                diet: undefined
            })
        } else {
            setParams({
                ...params,
                offset: 0,
                diet: e.target.value
            })
        }
        setSelectedRadio(e.target.value)
    }

    const toggleIntolerance = (intolerance) => {
        setCurrentPage(1)
        if (params.intolerances.includes(intolerance)) {
            setParams(prevParams => {
                let intolerancesArray = prevParams.intolerances.split(",").filter(item => item !== "")
                intolerancesArray = intolerancesArray.filter(item => item !== intolerance)
                return {
                    ...prevParams,
                    offset: 0,
                    intolerances: intolerancesArray.toString()
                }
            })
        } else {
            setParams(prevParams => {
                let intolerancesArray = prevParams.intolerances.split(",").filter(item => item !== "")
                intolerancesArray.push(intolerance)
                return {
                    ...prevParams,
                    offset: 0,
                    intolerances: intolerancesArray.toString()
                }
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
                <FormControl style={{ width: "100%" }}>
                    <RadioGroup
                        name="radio-buttons-group"
                        value={selectedRadio}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel
                            value="None"
                            control={<Radio className={`${styles.checkbox} ${styles[theme]}`} />}
                            className={`${styles.formLabel} ${styles[theme]}`}
                            label="None"
                        />
                        <FormControlLabel
                            value="Gluten Free"
                            control={<Radio className={`${styles.checkbox} ${styles[theme]}`} />}
                            className={`${styles.formLabel} ${styles[theme]}`}
                            label="Gluten Free"
                        />
                        <FormControlLabel
                            value="Vegetarian"
                            control={<Radio className={`${styles.checkbox} ${styles[theme]}`} />}
                            className={`${styles.formLabel} ${styles[theme]}`}
                            label="Vegetarian"
                        />
                        <FormControlLabel
                            value="Vegan"
                            control={<Radio className={`${styles.checkbox} ${styles[theme]}`} />}
                            className={`${styles.formLabel} ${styles[theme]}`}
                            label="Vegan"
                        />
                        <FormControlLabel
                            value="Ketogenic"
                            control={<Radio className={`${styles.checkbox} ${styles[theme]}`} />}
                            className={`${styles.formLabel} ${styles[theme]}`}
                            label="Ketogenic"
                        />
                    </RadioGroup>
                </FormControl>
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
                            toggleIntolerance("Dairy")
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
                            toggleIntolerance("Tree Nut")
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
                            toggleIntolerance("Peanut")
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
                            toggleIntolerance("Seafood")
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