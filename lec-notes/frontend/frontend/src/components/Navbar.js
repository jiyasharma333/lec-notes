import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SpaIcon from "@mui/icons-material/Spa";

function Navbar() {
  return (
    <AppBar position="sticky" sx={{
      background: "rgba(255,255,245,0.90)",
      boxShadow: "0 6px 18px 0 rgba(142,118,66,0.08)",
      backdropFilter: "blur(9px)",
      borderBottom: "1px solid #ecd3af"
    }}>
      <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
        <SpaIcon sx={{ color: "#BC7647", fontSize: 36, mr: 2 }} />
        <Button component={Link} to="/" sx={{ color: "#7e5837", fontSize: 18 }}>Home</Button>
        <Button component={Link} to="/pomodoro" sx={{ color: "#7e5837", fontSize: 18 }}>Pomodoro</Button>
        <Button component={Link} to="/study" sx={{ color: "#7e5837", fontSize: 18 }}>Flashcards</Button>
        <Button component={Link} to="/upload" sx={{ color: "#7e5837", fontSize: 18 }}>Upload</Button>
        <Button component={Link} to="/live" sx={{ color: "#7e5837", fontSize: 18 }}>Live</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
