import { CircularProgress } from "@mui/material"

const LoadingSpinner = () => {
    return (
        <div className="flex">
            <CircularProgress style={{ marginTop: "10px" }} />
        </div>
    )
}

export default LoadingSpinner