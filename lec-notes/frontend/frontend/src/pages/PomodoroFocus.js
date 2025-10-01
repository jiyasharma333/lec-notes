import React, { useState, useRef, useEffect } from "react";
import {
  Container, Paper, Typography, Button, Box, IconButton, Select, MenuItem,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SpaIcon from "@mui/icons-material/Spa";

const soundOptions = [
  { label: "Leaves & Brook", value: "leaves", src: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b83660c.mp3" },
  { label: "Rain City", value: "rain", src: "https://cdn.pixabay.com/audio/2022/10/16/audio_123be2a3f3.mp3" },
  { label: "Jazz Cafe", value: "cafe", src: "https://cdn.pixabay.com/audio/2022/05/25/audio_12fa0c2e84.mp3" },
  { label: "Fireplace HD", value: "fireplace", src: "https://cdn.pixabay.com/audio/2022/07/26/audio_124b083a44.mp3" }
];
const bgOptions = [
  { label: "Leaves (Animated)", value: "leaves" },
  { label: "Wood Texture", value: "wood" },
  { label: "Cafe", value: "cafe" },
  { label: "Clouds", value: "clouds" },
  { label: "Soft Cream", value: "none" }
];
const backgroundStyles = {
  leaves: {},
  wood: { backgroundImage: `url("https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1920&q=80")`, backgroundSize: "cover", backgroundPosition: "center" },
  cafe: { backgroundImage: `url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80")`, backgroundSize: "cover", backgroundPosition: "center" },
  clouds: { backgroundImage: `url("https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1920&q=80")`, backgroundSize: "cover", backgroundPosition: "center" },
  none: { background: "#f5ecd2" }
};
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
  const [soundOn, setSoundOn] = useState(false);
  const [sound, setSound] = useState("leaves");
  const [bg, setBg] = useState("leaves");
  const audioRef = useRef(null);
  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) interval = setInterval(() => setSeconds(s => s - 1), 1000);
    else if (isRunning && seconds === 0) {
      if (!onBreak) { setOnBreak(true); setSeconds(BREAK); setSessions(s => s + 1); }
      else { setOnBreak(false); setSeconds(WORK); }
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, onBreak]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = soundOptions.find(opt => opt.value === sound).src;
      if (soundOn) { audioRef.current.volume = 0.7; audioRef.current.loop = true; audioRef.current.play().catch(() => {}); }
      else { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    }
  }, [sound, soundOn]);
  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => { setIsRunning(false); setOnBreak(false); setSeconds(WORK); };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", ...(backgroundStyles[bg] || {}) }}>
      {bg === "leaves" && <LeavesBackground />}
      <Container maxWidth="sm" sx={{ pt: 10, zIndex: 2, position: "relative", mx: "auto", maxWidth: 540 }}>
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
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 2 }}>
            <Select value={bg} onChange={e => setBg(e.target.value)} sx={{ minWidth: 140, fontFamily: "'Montserrat',sans-serif" }}>
              {bgOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
            <Select value={sound} onChange={e => setSound(e.target.value)} sx={{ minWidth: 150, fontFamily: "'Montserrat',sans-serif" }}>
              {soundOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
            <Button startIcon={<SpaIcon />} variant={soundOn ? "contained" : "outlined"} color="success" onClick={() => setSoundOn(o => !o)}>
              {soundOn ? "Pause Ambient" : "Play Ambient"}
            </Button>
          </Box>
          <audio ref={audioRef} preload="auto" />
        </Paper>
      </Container>
    </Box>
  );
}
export default PomodoroFocus;
