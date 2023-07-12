const express = require("express");
const router = express.Router();
const { firestore } = require("../Firebase"); 


router.post("/integration", async (req, res) => {
    try {
      const { data, institutionName, doctorName } = req.body; 
  
      
      if (typeof data === "string") {

        try {
          const facility = JSON.parse(data);
          const institution = JSON.parse(institutionName);
          const doctor = JSON.parse(doctorName)
                
          const docRef = await firestore.collection("hospitalData").add({facility, institution, doctor});
  
          res.status(201).json({ id: docRef.id });
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.status(400).json({ error: "Invalid JSON format. Please provide a valid JSON string." });
        }
        
      } else {
        const docRef = await firestore.collection("hospitalData").add(data);
  
        res.status(201).json({ id: docRef.id });
      }
    } catch (error) {
      console.error("Error storing hospital data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
module.exports = router;
