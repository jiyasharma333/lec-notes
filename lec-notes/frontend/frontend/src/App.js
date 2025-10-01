import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeProvider } from "./ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PomodoroFocus from "./pages/PomodoroFocus";
import UploadTranscribe from "./pages/UploadTranscribe";
import LiveTranscription from "./pages/LiveTranscription";
import StudyTools from "./pages/StudyTools";
import About from "./pages/About";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeProvider>
        {<Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadTranscribe />} />
            <Route path="/live" element={<LiveTranscription />} />
            <Route path="/pomodoro" element={<PomodoroFocus />} />
            <Route path="/study" element={<StudyTools />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>}
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
