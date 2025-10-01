import React, { useState } from "react";
import {
  Container, Paper, Typography, Button, TextField, MenuItem, CircularProgress, Box
} from "@mui/material";
import jsPDF from "jspdf";
import axios from "axios";
function UploadTranscribe() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [transcript, setTranscript] = useState("");
  const [task, setTask] = useState("summary");
  const [loading, setLoading] = useState(false);
  function handleExportText(content, filename = "notes.txt") {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.setAttribute("download", filename);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }
  function handleExportPDF(content, filename = "notes.pdf") {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, 10); doc.save(filename);
  }
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleTaskChange = (e) => setTask(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file); formData.append("task", task);
    try {
      const response = await axios.post("http://localhost:8000/transcribe/", formData);
      setTranscript(response.data.transcript); setOutput(response.data.output);
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #FFFBE2 0%, #f4e4cc 100%)",
      pt: 8, pb: 7
    }}>
      <Container maxWidth="sm" sx={{ mx: "auto", maxWidth: 520 }}>
        <Paper elevation={9} sx={{
          p: 5, borderRadius: 8, boxShadow: "0 10px 32px 0 rgba(60,38,13,0.14)",
          background: "rgba(255,255,255,0.81)", border: "1.3px solid #ecd3af", backdropFilter: "blur(7px)"
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 800, fontFamily: "'Playfair Display', serif",
            letterSpacing: 2, color: "#5B3622", mb: 2
          }}>Upload Lecture Recording</Typography>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="audio/*" onChange={handleFileChange} style={{ marginBottom: "1em" }} />
            <TextField select label="Output Type" value={task} onChange={handleTaskChange} fullWidth sx={{ mb: 2 }}>
              <MenuItem value="summary">Summary Notes</MenuItem>
              <MenuItem value="quiz">Quiz</MenuItem>
              <MenuItem value="flashcards">Flashcards</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" disabled={loading || !file} fullWidth sx={{ py: 1, mb: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </form>
          {transcript && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#482908", fontWeight: 600 }}>Transcript</Typography>
              <TextField value={transcript} multiline rows={7} fullWidth InputProps={{ readOnly: true }} sx={{ mb: 2, background: "white", borderRadius: 2 }} />
              <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                <Button variant="outlined" color="primary" onClick={() => handleExportText(transcript, "transcript.txt")}>Export as Text</Button>
                <Button variant="contained" color="secondary" onClick={() => handleExportPDF(transcript, "transcript.pdf")}>Export as PDF</Button>
              </Box>
            </Box>
          )}
          {output && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#7952B3", fontWeight: 600 }}>
                AI Output ({task.charAt(0).toUpperCase() + task.slice(1)})
              </Typography>
              <TextField value={output} multiline rows={7} fullWidth InputProps={{ readOnly: true }} sx={{ background: "white", borderRadius: 2 }} />
              <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                <Button variant="outlined" color="primary" onClick={() => handleExportText(output, "notes.txt")}>Export Notes as Text</Button>
                <Button variant="contained" color="secondary" onClick={() => handleExportPDF(output, "notes.pdf")}>Export Notes as PDF</Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
export default UploadTranscribe;
