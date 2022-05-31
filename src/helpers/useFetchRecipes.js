import axios from "axios"
import { useEffect, useReducer } from "react"

const ACTIONS = {
    MAKE_REQUEST: "make-request",
    GET_DATA: "get-data",
    ERROR: "error"
}

const BASE_URL = "https://api.spoonacular.com/recipes/"
const apiKey = "a40e27eb395e4e92a5f5dcb1c521082b"

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, data: [] }
        case ACTIONS.GET_DATA:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                pageCount: Math.ceil(action.payload.data.totalResults / 10)
            }
        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                data: [],
                pageCount: 0
            }
        default:
            return state
    }
}

const useFetchRecipes = (endPoint, params) => {

    const [state, dispatch] = useReducer(reducer, { data: [], loading: true })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: ACTIONS.MAKE_REQUEST })
                const response = await axios.get(`${BASE_URL}${endPoint}`, {
                    params: { ...params, apiKey }
                })
                dispatch({ type: ACTIONS.GET_DATA, payload: { data: response.data } })
            } catch (err) {
                dispatch({ type: ACTIONS.ERROR, payload: { error: err } })
            }
        }
        fetchData()
    }, [params, endPoint])

    return state
}

export default useFetchRecipes