import { CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"
import useFetchRecipes from "../helpers/useFetchRecipes"

const RecipeShow = () => {

    const { recipeId } = useParams()
    const { data, loading, error } = useFetchRecipes(`${recipeId}/information`)

    console.log(data)

    return (
        <>
            {loading && <div className="flex">
                <CircularProgress style={{ marginTop: "10px" }} />
            </div>}
            RECIPE SHOW
        </>
    )
}

export default RecipeShow