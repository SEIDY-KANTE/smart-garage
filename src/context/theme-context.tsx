import React, { createContext, FC, useContext, useState } from "react";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
});

interface IProps{
    children: React.ReactNode;
}

export const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider:FC<IProps> = (props) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;