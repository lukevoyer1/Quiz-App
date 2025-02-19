require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const questionSchema = new mongoose.Schema({
  question: String,
  options: [{ text: String, isCorrect: Boolean }]
});

const Question = mongoose.model("Question", questionSchema);

app.get("/api/questions", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
