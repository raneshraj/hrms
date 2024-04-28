// src/components/EntryForm.js

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddEmp = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [designationName, setDesignationName] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || loggedInUser.username !== "admin") {
      toast.error("You are not authorized to access this page.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate("/"), 1000); // Redirect to home page after 3 seconds
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    let newEmployee = {
      username,
      fullName,
      password,
      designation,
      designationName,
      dateOfJoining,
    };

    console.log(newEmployee);
    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => {
        toast.success("Registered");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const handleDesignationChange = (e) => {
    const selectedDesignation = e.target.value;
    setDesignation(selectedDesignation);

    const designationNameMap = {
      "2": "HR",
      "2": "SM",
      "3": "RM",
      "3": "M",
      "4": "D",
      "4": "T",
    };

    setDesignationName(designationNameMap[selectedDesignation] || "");
  };

  return (
    <>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        hideProgressBar
        theme="colored"
        position="top-center"
      />

      <div className="align-center mx-auto border-2">
        <h1 className="text-center"> Add Employee</h1>
        <div className="form-floating mb-3">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingName">Full Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">User Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <select
            value={designation}
            onChange={handleDesignationChange}
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option value="">Select Designation</option>
            <option value="4">Developer</option>
            <option value="4">Tester</option>
            <option value="3">Manager</option>
            <option value="3">Resource Manager</option>
            <option value="2">Senior Manager</option>
            <option value="2">HR</option>
          </select>
          <label htmlFor="floatingSelect">Designation of Employee</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            type="date"
            className="form-control"
            id="floatingDate"
          />
          <label htmlFor="floatingDate">Joining date</label>
        </div>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          ADD EMPLOYEE
        </Button>
      </div>
    </>
  );
};

export default AddEmp;