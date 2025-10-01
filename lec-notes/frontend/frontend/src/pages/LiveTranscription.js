import React, { useState, useRef, useEffect } from "react";
import { Container, Paper, Typography, Button, Box, TextField } from "@mui/material";
import jsPDF from "jspdf";
function encodePCM(samples) {
  let buffer = new ArrayBuffer(samples.length * 2);
  let view = new DataView(buffer);
  for (let i = 0; i < samples.length; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
}
function LiveTranscription() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  function handleExportText(content, filename = "transcript.txt") {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.setAttribute("download", filename);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }
  function handleExportPDF(content, filename = "transcript.pdf") {
    const doc = new jsPDF(); const lines = doc.splitTextToSize(content, 180); doc.text(lines, 10, 10); doc.save(filename);
  }
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    setTranscript(""); setError("");
    try {
      wsRef.current = new window.WebSocket("ws://localhost:8000/ws/transcribe/");
      wsRef.current.binaryType = "arraybuffer";
      wsRef.current.onmessage = (event) => { setTranscript(prev => (event.data && event.data.length > prev.length) ? event.data : prev); };
      wsRef.current.onerror = () => setError("WebSocket error.");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new window.AudioContext({ sampleRate: 16000 });
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      source.connect(processor); processor.connect(audioContext.destination);
      processor.onaudioprocess = (event) => {
        if (wsRef.current && wsRef.current.readyState === 1) {
          const inputData = event.inputBuffer.getChannelData(0);
          const pcmData = encodePCM(inputData);
          wsRef.current.send(pcmData);
        }
      };
      audioContextRef.current = audioContext; processorRef.current = processor; streamRef.current = stream;
      wsRef.current.onclose = () => {
        try { processor.disconnect(); } catch {} try { source.disconnect(); } catch {}
        try { stream.getTracks().forEach(track => track.stop()); } catch {}
        try { if (audioContext.state !== "closed") audioContext.close(); } catch {}
        audioContextRef.current = null; processorRef.current = null; streamRef.current = null;
      };
      setIsRecording(true);
    } catch (e) { setError("Could not access microphone."); }
  };

  const stopRecording = () => { if (wsRef.current && wsRef.current.readyState === 1) wsRef.current.close(); setIsRecording(false); };

  useEffect(() => {
    return () => {
      if (wsRef.current && wsRef.current.readyState === 1) wsRef.current.close();
      try { processorRef.current && processorRef.current.disconnect(); } catch {}
      try { streamRef.current && streamRef.current.getTracks().forEach(track => track.stop()); } catch {}
      try { if (audioContextRef.current && audioContextRef.current.state !== "closed") { audioContextRef.current.close(); } } catch {}
      audioContextRef.current = null; processorRef.current = null; streamRef.current = null;
    };
  }, []);

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #FFFBE2 0%, #f4e4cc 100%)",
      pt: 8, pb: 7
    }}>
      <Container maxWidth="sm" sx={{ mx: "auto", maxWidth: 520 }}>
        <Paper elevation={9} sx={{
          p: 5, borderRadius: 8, boxShadow: "0 10px 32px 0 rgba(60,38,13,0.14)",
          background: "rgba(255,255,255,0.82)", border: "1.5px solid #ecd3af", backdropFilter: "blur(7px)"
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 800, fontFamily: "'Playfair Display', serif", letterSpacing: 2,
            color: "#5B3622", mb: 2
          }}>Live Transcription</Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button variant="contained" color="primary" onClick={startRecording} disabled={isRecording} sx={{ fontWeight: 700 }}>Start</Button>
            <Button variant="outlined" color="secondary" onClick={stopRecording} disabled={!isRecording} sx={{ fontWeight: 700 }}>Stop</Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
          )}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Transcript (Realtime):</Typography>
            <TextField value={transcript} multiline rows={8} fullWidth InputProps={{ readOnly: true }} sx={{
              background: "white", borderRadius: 2, color: "#5B3622"
            }} />
            {transcript && (
              <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
                <Button variant="outlined" color="primary" onClick={() => handleExportText(transcript, "transcript.txt")}>Export as Text</Button>
                <Button variant="contained" color="secondary" onClick={() => handleExportPDF(transcript, "transcript.pdf")}>Export as PDF</Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
export default LiveTranscription;
