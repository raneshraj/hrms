import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";

const ApplyResign = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [resignationStatus, setResignationStatus] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) {
      toast.warn("Please enter a reason for resignation.");
      return;
    }
    if (loggedInUser) {
      // Calculate the number of approvals required based on the user's designation level
      const approvalsRequired = calculateApprovalsRequired(loggedInUser.designation);

      const resignationData = {
        userId: loggedInUser.id,
        userDesignationLevel: loggedInUser.designation,
        reason: reason,
        fromDate: fromDate,
        status: "pending",
        approvals: [],
        approvalsRequired: approvalsRequired,
      };
      fetch(`http://localhost:3000/resign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resignationData),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Resignation request submitted.");
          setResignationStatus("pending");
        })
        .catch((error) => {
          console.error("Error saving resignation data:", error);
        });
    }
  };

  // Function to calculate the number of approvals required based on the user's designation level
  const calculateApprovalsRequired = (userDesignation) => {
    // Implement your logic here to determine the number of approvals required based on the user's designation level
    // For example, you could have a mapping of designation levels to required approvals
    const designationApprovalsMapping = {
      1: 2,
      2: 3,
      3: 4,
      // Add more mappings as needed
    };

    return designationApprovalsMapping[userDesignation] || 2; // Default to 2 if no mapping is found
  };


  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        {loggedInUser && (
          <h1 className="text-center">Welcome, {loggedInUser.fullName}</h1>
        )}
        {resignationStatus && (
          <div className="alert alert-info" role="alert">
            Your resignation status: <strong>{resignationStatus}</strong>
          </div>
        )}
        <div className="mx-auto border-2 p-4">
          <h2 className="text-center text-bg-info">Apply For Resignation</h2>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="resignReason">Reason for Resignation</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              id="resignReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain your reasons for resigning."
            />
          </Form.Group>
          <div className="form-floating mb-3">
            From Date:-
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            disabled={!loggedInUser || resignationStatus}
          >
            Submit Resignation
          </Button>
        </div>
      </div>
    </>
  );
};

export default ApplyResign;