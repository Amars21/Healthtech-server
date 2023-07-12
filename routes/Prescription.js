const express = require("express");
const router = express.Router();
const { firestore } = require("../Firebase"); 


router.post("/prescription", async (req, res) => {
    try {
      const { prescription } = req.body; 
  
      
      if (typeof prescription === "string") {

        try {
          const digitalPrescription = JSON.parse(prescription);
                
          const docRef = await firestore.collection("prescription").add({digitalPrescription});
  
          res.status(201).json({ id: docRef.id });
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.status(400).json({ error: "Invalid JSON format. Please provide a valid JSON string." });
        }
        
      } else {
        const docRef = await firestore.collection("prescription").add(prescription);
  
        res.status(201).json({ id: docRef.id });
      }
    } catch (error) {
      console.error("Error storing hospital data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
module.exports = router;
