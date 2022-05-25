import { ThemeContext } from "../context/ThemeContext"
import { Card, CardContent, CardMedia } from "@mui/material"
import { useContext } from "react"
import styles from "./recipeGallery.module.scss"

const RecipeGallery = ({ data }) => {

    const { theme } = useContext(ThemeContext)
    let dataDisplay = []

    if (data.results) {
        dataDisplay = data.results.map((recipe, index) => {
            return (
                <Card key={index} className={`${styles.card} ${styles[theme]}`}>
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
            )
        })
    }

    return (
        <>
            {dataDisplay}
        </>
    )
}

export default RecipeGallery