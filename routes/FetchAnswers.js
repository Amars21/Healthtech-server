const express = require("express");
const router = express.Router();
const { firestore } = require("../Firebase");

router.get("/answers", async (req, res) => {
  try {
    const answersSnapshot = await firestore.collection("energyAnswers").get();
    const answers = answersSnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ error: "An error occurred while fetching answers." });
  }
});

module.exports = router;