const Employee = require("../model/employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      userId: employee.empId,
      name: employee.firstName + " " + employee.lastName,
      designation: employee.designation,
    };
    const token = jwt.sign(payload, "Key", { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      employee.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }
 console.log(newPassword)
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedNewPassword)

    employee.password = hashedNewPassword;
    await employee.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      designation,
      maritalStatus,
      email,
      empId,
    } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log("object", req);
    const exisitingId = await Employee.findOne({ empId });
    if (exisitingId) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }


    const hashedPassword = await bcrypt.hash(empId, 10);

    const newEmployee = new Employee({
      empId,
      firstName,
      lastName,
      address,
      designation,
      maritalStatus,
      email,
      password: hashedPassword,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
 
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewEmployee = async (req, res) => {
  console.log(req)
  try {
    const employee = await Employee.findOne({empId:req.query.id});
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  console.log(req)
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { empId: req.body.empId },
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(req)
    const deleteEmployee = await Employee.findOneAndDelete(
      { empId: id },
      req.body,
      { new: true }
    );
    if (!deleteEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({
      message: "Employee Deleted successfully",
      employee: deleteEmployee,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = exports;
