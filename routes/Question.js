const express = require("express");
const router = express.Router();
const { firestore } = require("../Firebase");

router.get("/everyDayQuestions", async (req, res) => {
  try {
    const questionsSnapshot = await firestore.collection("everyDayQuestions").get();
    const questions = questionsSnapshot.docs.map((doc) => doc.data());
    const recommendations = questionsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ questions, recommendations });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "An error occurred while fetching questions." });
  }
});

module.exports = router;
