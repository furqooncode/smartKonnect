import { createContext, useContext } from 'react';
import { DarkColors, LightColors } from '../theme.tsx';
import { useState , useEffect } from 'react';

interface ThemeContextType {
  Toggle: () => void;
  isdarkMode: boolean;
  colors: typeof DarkColors;
}

const ThemeContext = createContext();
export function ThemeProvider({children}){
  
 
 const[isdarkMode, setisdarkMode] = useState<boolean>(false);
 const colors = isdarkMode ? DarkColors : LightColors;
 
 useEffect(()=>{
   const saved: string = localStorage.getItem('theme')
   const mode = saved === 'dark';
   setisdarkMode(mode)
 },[])
 
 
 function Toggle(): void{
   setisdarkMode((prev) => {
     const Newmode = !prev;
     localStorage.setItem('theme', Newmode ? 'dark' : 'light')
     return Newmode;
   })
 }
 
 
  return(
    <ThemeContext.Provider value={{
      Toggle,
      isdarkMode,
      colors,
    }}>
      {children}
    </ThemeContext.Provider>
    )
}

export function useTheme(){
  return(
    useContext(ThemeContext)
    )
}