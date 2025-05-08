const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middelwares/authMiddleware");

const {
  getClassificationsByCompanyHandler,
  addDummyClassificationHandler,
} = require("../../controllers/classfication-controller/classfication-controller");

// Example routes

router.get(
  "/getClassfication/:companyName",
  getClassificationsByCompanyHandler
); // Get classifications by company
router.post("/addDummyClassification", addDummyClassificationHandler); // Add dummy classification data

module.exports = router;
