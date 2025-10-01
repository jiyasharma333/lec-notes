import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import SpaIcon from "@mui/icons-material/Spa";
import QuizIcon from "@mui/icons-material/Quiz";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const tools = [
  { name: "Pomodoro Timer", route: "/pomodoro", Icon: HourglassTopIcon, desc: "Boost focus with a cozy timer and ambient sound" },
  { name: "Study Flashcards", route: "/study", Icon: QuizIcon, desc: "Create and quiz yourself on flashcards" },
  { name: "Live Transcription", route: "/live", Icon: SubtitlesIcon, desc: "Real-time lecture notes as you listen" },
  { name: "Upload & Summarize", route: "/upload", Icon: UploadFileIcon, desc: "Audio to notes, quiz, flashcards powered by AI" },
];

function Home() {
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #FFFBE2 0%, #f4e4cc 100%)",
      pt: 10, pb: 8
    }}>
      <Container maxWidth="lg" sx={{ mx: "auto", maxWidth: 1100 }}>
        {/* Hero/Header */}
        <Box sx={{ mb: 7, textAlign: "center" }}>
          <SpaIcon sx={{ fontSize: 64, color: "#BC7647", mb: 2 }} />
          <Typography variant="h2" sx={{
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: 2,
            color: "#412B18",
            mb: 1
          }}>
            Welcome to your Study Suite
          </Typography>
          <Typography variant="h5" sx={{
            fontFamily: "'DM Sans', 'Montserrat', sans-serif",
            color: "#7a613e",
            mb: 3
          }}>
            Productivity. Inspiration. Everything for focused cozy learning.
          </Typography>
        </Box>
        {/* Cards Grid */}
        <Grid container spacing={6} justifyContent="center" alignItems="stretch">
          {tools.map(tool => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tool.name}>
              <Card
                component={Link}
                to={tool.route}
                elevation={12}
                sx={{
                  textDecoration: "none",
                  borderRadius: 8,
                  boxShadow: "0 10px 32px 0 rgba(76, 55, 30, 0.18)",
                  backdropFilter: "blur(17px)",
                  background: "rgba(255,255,255,0.76)",
                  minHeight: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "1.5px solid #ecd3af",
                  transition: "transform .19s cubic-bezier(.57,.21,.69,1.25), background .17s",
                  "&:hover": {
                    transform: "scale(1.055) translateY(-8px)",
                    background: "rgba(255,245,232,0.93)",
                    boxShadow: "0 26px 64px -10px rgba(163,122,65,0.22)"
                  }
                }}
              >
                <CardActionArea sx={{ py: 4, height: "100%" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <tool.Icon sx={{ fontSize: 56, color: "#BC7647", mb: 2 }} />
                    <Typography variant="h6" sx={{
                      fontWeight: 700,
                      fontFamily: "'Montserrat', 'Playfair Display', serif",
                      color: "#7e5837",
                      mb: 1
                    }}>
                      {tool.name}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontFamily: "'DM Sans', 'Montserrat', sans-serif",
                      color: "#a0815c",
                      mb: 1.5,
                      fontSize: 18,
                    }}>
                      {tool.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Classy Quote */}
        <Box sx={{
          mt: 11, py: 5, textAlign: "center",
          borderRadius: 8,
          background: "rgba(255,239,225,0.97)",
          mx: "auto", maxWidth: 540,
          boxShadow: 2
        }}>
          <Typography variant="h6" sx={{
            color: "#856947",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: 22
          }}>
            “The beautiful thing about learning is that nobody can take it away from you.”<br />— B. B. King
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
export default Home;
