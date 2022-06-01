import { ThemeContext } from "../context/ThemeContext"
import { Card, CardContent, CardMedia } from "@mui/material"
import { useContext } from "react"
import styles from "./recipeGallery.module.scss"
import { Link } from "react-router-dom"

const RecipeGallery = ({ data }) => {

    const { theme } = useContext(ThemeContext)
    let dataDisplay = []

    if (data.results) {
        if (data.results.length === 0) {
            dataDisplay = <p className="text">No results matched your search.</p>
        } else {
            dataDisplay = data.results.map((recipe, index) => {
                return (
                    <Link to={`/showRecipe/${recipe.id}`} key={index} className="link">
                        <Card className={`${styles.card} ${styles[theme]}`}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={recipe.image}
                                alt={recipe.title}
                            />
                            <CardContent className={`${styles.cardContent} ${styles[theme]}`}>
                                <h2 style={{ textAlign: "center", fontSize: "20px" }} className="text">{recipe.title}</h2>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })
        }
    }

    return (
        <div className="flex">
            {dataDisplay}
        </div>
    )
}

export default RecipeGallery