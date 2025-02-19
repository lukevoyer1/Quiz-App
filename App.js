import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions")
      .then(response => setQuestions(response.data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {showScore ? (
        <h2>Your Score: {score} / {questions.length}</h2>
      ) : questions.length > 0 ? (
        <div>
          <h3>{questions[currentQuestion].question}</h3>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option.isCorrect)}
              style={{ display: "block", margin: "10px auto", padding: "10px" }}
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <h2>Loading Questions...</h2>
      )}
    </div>
  );
};

export default App;
