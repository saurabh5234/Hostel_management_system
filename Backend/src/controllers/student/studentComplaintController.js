const Maintenance = require("../../models/Maintenance");
const Tenant = require("../../models/Tenant");

const User = require("../../models/User");

// Helper to find or link tenant
const findTenantForUser = async (userId) => {
  // 1. Try to find by user ID
  let tenant = await Tenant.findOne({ user: userId });
  if (tenant) return tenant;

  // 2. If not found, try to find by email and link
  const user = await User.findById(userId);
  if (!user) return null;

  tenant = await Tenant.findOne({ email: user.email.toLowerCase() });
  
  // 3. If found by email, update the link (Self-heal)
  if (tenant) {
    tenant.user = userId;
    await tenant.save();
    console.log(`Linked user ${userId} to tenant ${tenant._id}`);
  }

  return tenant;
};

const createComplaint = async (req, res) => {
  try {
    const tenant = await findTenantForUser(req.user.id);
    
    if (!tenant) {
      return res.status(404).json({ message: "Tenant record not found for this user. Please contact admin." });
    }
    
    const complaint = await Maintenance.create({
      tenant: tenant._id,
      title: req.body.title,
      description: req.body.description,
      status: "pending"
    });
    
    res.status(201).json(complaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: error.message });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const tenant = await findTenantForUser(req.user.id);
    
    if (!tenant) {
        // If no tenant record, return empty array instead of error for better UX, or 404 if strictly required
        // But for specific logic:
        return res.status(404).json({ message: "Tenant record not found" });
    }
    
    const complaints = await Maintenance.find({ tenant: tenant._id }).sort({ createdAt: -1 });
    
    res.json(complaints);
  } catch (error) {
    console.error("Error in getMyComplaints:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Maintenance.find()
      .populate("tenant")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Error getting all complaints:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus
};
