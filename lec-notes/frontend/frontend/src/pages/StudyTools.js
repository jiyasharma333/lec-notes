import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";
function Flashcard({ front, back, flipped, onClick }) {
  return (
    <Box
      sx={{
        perspective: 900,
        width: "100%",
        minHeight: 140,
        mb: 2,
        userSelect: "none",
        display: "flex",
        justifyContent: "center"
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: 370,
          minHeight: 140,
          height: "100%",
          position: "relative",
          borderRadius: 6,
          cursor: "pointer",
          transition: "transform 0.44s cubic-bezier(.5,.21,.69,1.04)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(255,255,255,0.80)",
            boxShadow: "0 8px 32px 0 rgba(125,90,49,0.13)",
            borderRadius: 6,
            backdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            backfaceVisibility: "hidden"
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: 23,
              color: "#482908",
              fontFamily: "'Playfair Display', serif"
            }}
          >
            {front}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(255,255,255,0.80)",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden"
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: 23,
              color: "#5B3622",
              fontFamily: "'Playfair Display', serif"
            }}
          >
            {back}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}


function StudyTools() {
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [input, setInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("lecnotes_flashcards");
    if (saved) setCards(JSON.parse(saved));
  }, []);
  useEffect(() => { localStorage.setItem("lecnotes_flashcards", JSON.stringify(cards)); }, [cards]);
  const addCard = () => { if (front.trim() && back.trim()) { setCards([...cards, { front, back }]); setFront(""); setBack(""); setIndex(cards.length + 1 > 0 ? cards.length : 0); setFlipped(false); } };
  const nextCard = () => { setIndex(prev => prev < cards.length - 1 ? prev + 1 : 0); setFlipped(false); };
  const prevCard = () => { setIndex(prev => prev > 0 ? prev - 1 : cards.length - 1); setFlipped(false); };
  const flipCard = () => setFlipped(v => !v);
  const startQuiz = () => { setQuizMode(true); setInput(""); setShowAnswer(false); setQuizIndex(0); setScore(0); };
  const exitQuiz = () => { setQuizMode(false); setShowAnswer(false); setQuizIndex(0); setInput(""); setScore(0); };
  const checkAnswer = () => { const correct = cards[quizIndex].back.trim().toLowerCase() === input.trim().toLowerCase(); setShowAnswer(true); if (correct) setScore(s => s + 1); };
  const nextQuizCard = () => { setQuizIndex(q => q < cards.length - 1 ? q + 1 : 0); setShowAnswer(false); setInput(""); };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #FFFBE2 0%, #f4e4cc 100%)",
      pt: 8, pb: 7
    }}>
      <Container maxWidth="sm" sx={{ mx: "auto", maxWidth: 520 }}>
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography variant="h4" sx={{
            fontWeight: 800, fontFamily: "'Playfair Display', serif",
            letterSpacing: 2, color: "#5B3622", mb: 2
          }}>Study Flashcards</Typography>
        </Box>
        {!quizMode && (
          <Box sx={{ mb: 2 }}>
            <TextField label="Front" value={front} onChange={e => setFront(e.target.value)} sx={{ mb: 2, width: "100%" }} />
            <TextField label="Back" value={back} onChange={e => setBack(e.target.value)} sx={{ mb: 2, width: "100%" }} />
            <Button variant="contained" color="primary" onClick={addCard} disabled={!front || !back} sx={{ py: 1 }}>Add Card</Button>
          </Box>
        )}
        {quizMode ? (
          cards.length > 0 ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Montserrat',sans-serif" }}>Quiz Mode</Typography>
              <Typography sx={{ mb: 1, fontFamily: "'DM Sans',sans-serif", color: "#80572b" }}>
                Card {quizIndex + 1} of {cards.length}
              </Typography>
              <Box sx={{
                bgcolor: "rgba(255,255,255,0.93)", borderRadius: 6,
                boxShadow: 4, minHeight: 100, mb: 2, display: "flex",
                alignItems: "center", justifyContent: "center", p: 2
              }}>
                <Typography variant="h6" align="center"
                  sx={{ fontFamily: "'Playfair Display', serif", fontSize: 22, userSelect: "none" }}>
                  {cards[quizIndex].front}
                </Typography>
              </Box>
              <TextField label="Your answer" value={input} onChange={e => setInput(e.target.value)} disabled={showAnswer} sx={{ mb: 2, width: "100%" }} onKeyDown={e => { if (e.key === "Enter" && !showAnswer) checkAnswer(); }} />
              {showAnswer && (
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, color: input.trim().toLowerCase() === cards[quizIndex].back.trim().toLowerCase() ? "green" : "red" }}>
                    {input.trim().toLowerCase() === cards[quizIndex].back.trim().toLowerCase() ? "Correct!" : `Incorrect. Answer: ${cards[quizIndex].back}`}
                  </Typography>
                </Box>
              )}
              <Box display="flex" gap={2} justifyContent="center">
                {!showAnswer &&
                  <Button onClick={checkAnswer} variant="contained" color="primary">
                    Check
                  </Button>
                }
                {showAnswer &&
                  <Button onClick={nextQuizCard} variant="outlined" color="primary">
                    Next
                  </Button>
                }
                <Button onClick={exitQuiz} color="secondary" variant="text">
                  Exit Quiz
                </Button>
              </Box>
              <Typography sx={{ mt: 2 }}>Score: {score} / {cards.length}</Typography>
            </Box>
          ) : (
            <Typography>No cards available for quiz.</Typography>
          )
        ) : (
          <>
            {cards.length > 0 ? (
              <Box>
                <Typography sx={{ mb: 1, fontFamily: "'DM Sans',sans-serif", color: "#80572b" }}>
                  Card {index + 1} of {cards.length}
                </Typography>
                <Flashcard
                  front={cards[index].front}
                  back={cards[index].back}
                  flipped={flipped}
                  onClick={flipCard}
                />
                <Box display="flex" justifyContent="space-between">
                  <Button onClick={prevCard} color="primary" variant="outlined">Prev</Button>
                  <Button onClick={nextCard} color="primary" variant="outlined">Next</Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ color: "#a0815c", fontFamily: "'DM Sans',sans-serif" }}>
                No flashcards yet. Add one above!
              </Typography>
            )}
            {cards.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Button
                  onClick={startQuiz}
                  variant="contained"
                  color="secondary"
                  sx={{ fontWeight: 700 }}
                >
                  Quiz Me!
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
export default StudyTools;
