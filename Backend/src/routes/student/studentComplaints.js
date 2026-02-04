const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../../middlewares/auth");
const controller = require("../../controllers/student/studentComplaintController");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Student creates complaint
router.post("/", 
  auth, 
  requireRole("student"), 
  asyncHandler(controller.createComplaint)
);

// Student sees own complaints
router.get("/", 
  auth, 
  requireRole("student"), 
  asyncHandler(controller.getMyComplaints)
);

module.exports = router;