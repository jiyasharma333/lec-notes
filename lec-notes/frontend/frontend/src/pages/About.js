import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

function About() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(120deg, #FFF6E9 0%, #FFD7AF 100%)",
          boxShadow: 5,
          border: "2px solid #C19A6B",
        }}
      >
        <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 700 }}>
          About Lec-Notes
        </Typography>
        <Box>
          <Typography paragraph sx={{ color: "secondary.main" }}>
            Lec-Notes helps students transcribe lectures and create instant study tools using AI. Enjoy a cozy workspace, upload lectures, summarize, quiz, and study—all in one place!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
export default About;
