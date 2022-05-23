import { createContext, useState } from "react";

export const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "dark" ? "dark" : "light"
    )

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider