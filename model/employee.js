const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password:{ type: String },
  address: { type: String },
  email: { type: String, required: true },
  designation: { type: String },
  maritalStatus: { type: String },
  dob: { type: String },
  doj: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
