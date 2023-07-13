
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { EmployModel } = require("../model/employe.model")
require('dotenv').config()


const EmpRouter = express.Router()

EmpRouter.post('/employees', async (req, res) => {
    try {
        const { firstName, lastName, email, department, salary } = req.body;

        const EmpPresent = await EmployModel.findOne({ firstName })

        if (EmpPresent) {
            return res.status(201).json({ message: 'Employee already present' });
        }

        const newEmploye = new EmployModel({
            firstName,
            lastName,
            email,
            department,
            salary,
        });
        await newEmploye.save();
        return res.status(201).json({ message: 'Employee added successfully' });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

EmpRouter.get('/dashboard', async (req, res) => {
    try {
      const { page } = req.query;
      const pageSize = 5;
      
      const totalEmployees = await EmployModel.countDocuments();
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
     const Employeesdata = await EmployModel.find().skip(startIndex).limit(pageSize);
  
      //return res.json({ employees: Employeesdata, totalEmployees },{msg : "emplyee get sucess"});
      return res.send(Employeesdata)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  



// Update an employee for Edit button
EmpRouter.patch('/employees/:id', async (req, res) => {
    try {
         const id  = req.params.id;
         let data=  req.body
       

        const emp = await EmployModel.findByIdAndUpdate({_id:id},data);
        if (!emp) {
            return res.status(404).json({ message: "employe not found" });
        }
        return res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




// Delete an employee for delete button
EmpRouter.delete('/employees/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        const emp = await EmployModel.findByIdAndDelete({_id:id});
        if (!emp) {
            return res.status(404).json({ message: "employe not found" });
        }
        return res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
// dashboard/filter?Department=Operations
EmpRouter.get('/dashboard/filter', async (req, res) => {
    try {
      const { Department } = req.query;
  
      const filteredEmployees = await EmployModel.find({ department: Department });
  
      return res.json({ employees: filteredEmployees });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
//   http://localhost:8080/dashboard/sorting?sortBy= dsc
  EmpRouter.get('/dashboard/sorting', async (req, res) => {
    try {
      const { sortBy } = req.query;
     
      const sortedEmployees = await EmployModel.find().sort({ salary: sortBy === 'asc' ? 1 : -1 });
  
      return res.json({ employees: sortedEmployees });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  EmpRouter.get('/dashboard/searching', async (req, res) => {
    try {
      const { search } = req.query;
  
      const searchdata = { firstName: { $regex: search, $options: 'i' } };
      const searchedEmployees = await EmployModel.find(searchdata);
  
      return res.json({ employees: searchedEmployees });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = EmpRouter
  
  
  