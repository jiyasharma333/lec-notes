import React, { useState, useEffect } from "react";
import {
  Container, Paper, Typography, Button, Box, IconButton
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SpaIcon from "@mui/icons-material/Spa";

const leafColors = ["#C19A6B", "#A0522D", "#FFD700", "#B8860B", "#C97C5D"];
function LeavesBackground({ count = 18 }) {
  return (
    <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => (
        <SpaIcon
          key={i}
          sx={{
            color: leafColors[i % leafColors.length],
            position: "absolute", left: `${Math.random() * 100}%`, top: `-${Math.random() * 80}px`,
            fontSize: 36 + Math.random() * 20, opacity: 0.7 + Math.random() * 0.3,
            animation: `pomodoro-fall ${8 + Math.random() * 7}s linear ${Math.random() * 7}s infinite`
          }}
        />
      ))}
      <style>
        {`@keyframes pomodoro-fall { to { transform: translateY(120vh) rotate(360deg); opacity: 0.4; } }`}
      </style>
    </Box>
  );
}
function PomodoroFocus() {
  const WORK = 25 * 60; const BREAK = 5 * 60;
  const [seconds, setSeconds] = useState(WORK);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) interval = setInterval(() => setSeconds(s => s - 1), 1000);
    else if (isRunning && seconds === 0) {
      if (!onBreak) { setOnBreak(true); setSeconds(BREAK); setSessions(s => s + 1); }
      else { setOnBreak(false); setSeconds(WORK); }
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, onBreak]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => { setIsRunning(false); setOnBreak(false); setSeconds(WORK); };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", background: "#f5ecd2" }}>
      <LeavesBackground />
      <Container maxWidth="sm" sx={{ pt: 10, zIndex: 2, position: "relative" }}>
        <Paper elevation={10} sx={{
          p: 5, borderRadius: 8, boxShadow: "0 10px 32px 0 rgba(60,38,13,0.14)",
          background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)",
          border: "1.3px solid #ecd3af", textAlign: "center"
        }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Playfair Display', serif", mb: 2, color: "#5B3622", letterSpacing: 2 }}>
            {onBreak ? "Break Time" : "Pomodoro Session"}
          </Typography>
          <Typography variant="h1" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: onBreak ? "#A0522D" : "#3B2C00", mb: 3, letterSpacing: 2 }}>
            {mmss}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={3} sx={{ mb: 2 }}>
            <IconButton color="primary" size="large" onClick={start} disabled={isRunning}><PlayArrowIcon fontSize="large" /></IconButton>
            <IconButton color="secondary" size="large" onClick={pause} disabled={!isRunning}><PauseIcon fontSize="large" /></IconButton>
            <IconButton onClick={reset}><RestartAltIcon fontSize="large" /></IconButton>
          </Box>
          <Typography variant="body1" sx={{ mb: 2, fontFamily: "'DM Sans', sans-serif", color: "#a0815c", fontWeight: 700 }}>
            Sessions completed: <b>{sessions}</b>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
export default PomodoroFocus;
