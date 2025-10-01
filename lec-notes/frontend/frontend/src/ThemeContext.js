import React, { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }) {
  // Persist dark mode in localStorage
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const next = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", next);
          return next;
        });
      },
    }),
    []
  );

  const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: "#8B5C2A",         // Warm deep brown
        },
        secondary: {
          main: "#FFA726",         // Amber
        },
        background: {
          default: mode === "light" ? "#FAF3EF" : "#231F1A",      // Parchment / deep brown-black
          paper: mode === "light" ? "#FFF6E9" : "#30281A",        // Light tan / muted dark
        },
        text: {
          primary: mode === "light" ? "#31240E" : "#FFE8CB",      // Deep brown / soft tan
          secondary: mode === "light" ? "#9C6B30" : "#FFA726",    // Accent text
        },
      },
      shape: { borderRadius: 20 },
      typography: {
        fontFamily: "Nunito, 'Roboto Slab', 'Georgia', serif",
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              fontWeight: 700,
              letterSpacing: 0.5,
            }
          }
        }
      }
    }),
  [mode]
);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
