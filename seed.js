require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./server"); // Import model

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"));

const sampleQuestions = [
  {
    question: "What is 2 + 2?",
    options: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: true },
      { text: "5", isCorrect: false }
    ]
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      { text: "Harper Lee", isCorrect: true },
      { text: "Mark Twain", isCorrect: false },
      { text: "J.K. Rowling", isCorrect: false }
    ]
  }
];

Question.insertMany(sampleQuestions).then(() => {
  console.log("Sample questions added!");
  mongoose.connection.close();
});
