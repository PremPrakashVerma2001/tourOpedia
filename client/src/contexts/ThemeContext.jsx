import { createContext, useState } from "react";

const initState = true; //light = true , dark = false;

export function useTheme() {
  const [theme, setTheme] = useState(initState);
  return { theme, setTheme };
}

const ThemeContext = createContext(useTheme);

export default ThemeContext;
