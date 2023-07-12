const express = require("express");
const router = express.Router();
const { firestore } = require("../Firebase"); 


router.post("/patientAnswers", async (req, res) => {
    try {
      const { answer } = req.body; 
  
      if (typeof answer === "string") {

        try {
          const patientAnswer = JSON.parse(answer);
          
          const docRef = await firestore.collection("energyAnswers").add({patientAnswer});
  
          res.status(201).json({ id: docRef.id });
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.status(400).json({ error: "Invalid JSON format. Please provide a valid JSON string." });
        }

      } else {
        const docRef = await firestore.collection("energyAnswers").add(answer);
  
        res.status(201).json({ id: docRef.id });
      }
    } catch (error) {
      console.error("Error storing patient answer:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
module.exports = router;
