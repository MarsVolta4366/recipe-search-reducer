import {
    Accordion, AccordionDetails, AccordionSummary, Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import useFetchRecipes from "../helpers/useFetchRecipes"
import LoadingSpinner from "./LoadingSpinner"
import styles from "./recipeShow.module.scss"
import { ArrowBackIosNew } from "@mui/icons-material"

const RecipeShow = () => {

    const { recipeId } = useParams()
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const { data, loading, error } = useFetchRecipes(`${recipeId}/information`)

    console.log(data)

    let ingredients
    let instructions

    if (data.extendedIngredients) {
        ingredients = data.extendedIngredients.map((ingredient, index) => {
            return (
                <Typography key={index} className={`${styles.typography} text`}>{ingredient.original}</Typography>
            )
        })
    }

    if (data.analyzedInstructions && data.analyzedInstructions[0]) {
        instructions = data.analyzedInstructions[0].steps.map((step, index) => {
            return (
                <Typography key={index} className={`${styles.typography} text`}>{index + 1}. {step.step}</Typography>
            )
        })
    } else {
        instructions = <Typography className={`${styles.typography} text`}>No instructions available</Typography>
    }

    return (
        <div className={styles.recipeShowContainer}>
            {loading && <LoadingSpinner />}
            {data.title &&
                <>
                    <img src={data.image} alt={data.title} />
                    <h2 className="text">{data.title}</h2>
                    <TableContainer component={Paper} className={`${styles.table} ${styles[theme]}`}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>Dairy Free</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>Gluten Free</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>Vegetarian</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>Ready In</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>Amount of Servings</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>{data.dairyFree ? "Yes" : "No"}</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>{data.glutenFree ? "Yes" : "No"}</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>{data.vegetarian ? "Yes" : "No"}</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>{data.readyInMinutes} Minutes</TableCell>
                                    <TableCell className={`${styles.tableCell} ${styles[theme]}`}>{data.servings} Servings</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Accordion className={`${styles.panelBackground} ${styles[theme]}`}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="text">Ingredients</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {ingredients}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={`${styles.panelBackground} ${styles[theme]}`}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text" />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className="text">Instructions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {instructions}
                        </AccordionDetails>
                    </Accordion>
                    <Button startIcon={<ArrowBackIosNew className="text" />}
                        className="text"
                        style={{ marginTop: "10px" }}
                        onClick={() => navigate(-1)}>
                        Back to Results
                    </Button>
                </>
            }
        </div>
    )
}

export default RecipeShow