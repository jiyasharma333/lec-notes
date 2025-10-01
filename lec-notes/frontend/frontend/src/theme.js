import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#BC7647" },        // elegant autumn brown
    secondary: { main: "#7952B3" },      // purple accent
    background: {
      default: "#fffbe2"
    },
    text: {
      primary: "#482908"
    }
  },
  typography: {
    fontFamily: "'DM Sans','Montserrat','Playfair Display',sans-serif",
    h1: { fontFamily: "'Playfair Display', serif" },
    h2: { fontFamily: "'Playfair Display', serif" },
    h3: { fontFamily: "'Playfair Display', serif" },
    h4: { fontFamily: "'Montserrat', sans-serif" },
    h5: { fontFamily: "'Montserrat', sans-serif" },
    h6: { fontFamily: "'Montserrat', sans-serif" },
    body1: { fontFamily: "'DM Sans', sans-serif" },
    body2: { fontFamily: "'DM Sans', sans-serif" }
  },
  shape: {
    borderRadius: 18
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 26, fontWeight: 700 }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(60, 38, 13, 0.14)",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(13px)"
        }
      }
    }
  }
});

export default theme;
