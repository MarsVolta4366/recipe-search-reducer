import { useParams } from "react-router-dom"
import useFetchRecipes from "../helpers/useFetchRecipes"
import LoadingSpinner from "./LoadingSpinner"

const RecipeShow = () => {

    const { recipeId } = useParams()
    const { data, loading, error } = useFetchRecipes(`${recipeId}/information`)

    console.log(data)

    return (
        <>
            {loading && <LoadingSpinner />}
            RECIPE SHOW
        </>
    )
}

export default RecipeShow