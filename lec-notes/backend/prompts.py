PROMPTS = {
    "summary": (
        "You are an academic teaching assistant. Read the following transcript and create clear, concise lecture notes. "
        "Highlight key ideas, terms, and examples. Use descriptive bullet points wherever beneficial.\n\nTranscript:\n{transcript}"
    ),
    "flashcards": (
        "Based on the transcript, generate 10 study flashcards. Each should have a term or question on one side and a concise definition or answer on the other. Format as a list of Term:Definition pairs.\n\nTranscript:\n{transcript}"
    ),
    "quiz": (
        "Create a 5-question multiple choice quiz (with answers) based on the transcript. Format as:\n1. Question?\nA) ... B) ... C) ... D) ...\nCorrect: [A/B/C/D]\n\nTranscript:\n{transcript}"
    )
}
