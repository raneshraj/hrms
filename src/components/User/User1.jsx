import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User1 = () => {
  const [leave, setLeave] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      fetch(`http://localhost:3000/leave-applications?userId=${loggedInUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setLeaveApplications(data);
          const status = {};
          data.forEach((leave) => {
            status[leave.id] = leave.status;
          });
          setLeaveStatus(status);
        })
        .catch((err) => console.log(err.message));
    }
  }, [loggedInUser]);

  const handleSubmit = () => {
    if (!leave || !fromDate || !toDate) {
      alert("Please select leave type, from date, and to date.");
      return;
    }

    const leaveData = {
      leaveType: leave,
      fromDate: fromDate,
      toDate: toDate,
      status: "pending",
      userId: loggedInUser.id,
      designation: loggedInUser.designation,
    };

    fetch(`http://localhost:3000/leave-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leaveData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Leave application created:", data);
        setLeave("");
        setFromDate("");
        setToDate("");
        toast.success("Leave applied successfully!");

        setLeaveApplications([...leaveApplications, data]);
        setLeaveStatus({ ...leaveStatus, [data.id]: "pending" });
      })
      .catch((error) => {
        console.error("Error creating leave application:", error);
      });
  };

  useEffect(() => {
    document.title = loggedInUser
      ? `Welcome, ${loggedInUser.fullName}`
      : "Apply For Leave";
  }, [loggedInUser]);

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        {loggedInUser && (
          <h1 className="text-center">Welcome, {loggedInUser.fullName}!</h1>
        )}
        <div className="align-center mx-auto border-2">
          <h2 className="text-center text-bg-info">Apply For LEAVE</h2>
          <div className="form-floating mb-3">
            <select
              value={leave}
              onChange={(e) => setLeave(e.target.value)}
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option value="">Select leave type</option>
              <option value="Paid Leave">Paid Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
            <label htmlFor="floatingSelect">Type of leaves</label>
          </div>
          <div className="form-floating mb-3">
            <span>
              From Date;-
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </span>
          </div>
          <div className="form-floating mb-3">
            To Date:-
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="form-floating mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!loggedInUser}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h2 className="text-center text-bg-info">
          {loggedInUser?.fullName}'s Leave Applications
        </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveApplications.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td>{leaveStatus[leave.id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User1;