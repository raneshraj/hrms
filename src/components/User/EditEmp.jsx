import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditEmp = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser || loggedInUser.username !== "admin") {
      toast.error("You are not authorized to access this page.", {
        position: "top-center",
        autoClose: 3000, // Toast will close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate("/hierarchy"), 1000); // Redirect after 3 seconds
    } else  {
   

    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
    }

  }, [navigate]);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const username = sessionStorage.getItem("user");

    fetch(`http://localhost:3000/user/${username}`, {
      method: "DELETE",
    })
      .then((res) => {
        toast.success("Employee deleted successfully");
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();

    let updatedEmployee = {
      fullName: selectedEmployee.fullName,
      username: selectedEmployee.username,
      password: selectedEmployee.password,
      designation: selectedEmployee.designation,
      dateOfJoining: selectedEmployee.dateOfJoining,
    };

    fetch(`http://localhost:3000/user/${selectedEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then((res) => {
        toast.success("Employee updated successfully");
        setEmployees(
          employees.map((employee) =>
            employee.id === selectedEmployee.id ? updatedEmployee : employee
          )
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <>
      <ToastContainer autoClose={3000} closeOnClick hideProgressBar theme="colored" position="top-center"></ToastContainer>

      <h1 className="text-center"> Employee List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.fullName}</td>
              <td>{employee.username}</td>
              <td>{employee.password}</td>
              <td>{employee.designation}</td>
              <td>{employee.dateOfJoining}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(employee)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveModal}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee ? selectedEmployee.fullName : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee ? selectedEmployee.username : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee ? selectedEmployee.password : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                value={selectedEmployee ? selectedEmployee.designation : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    designation: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Joining Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedEmployee ? selectedEmployee.dateOfJoining : ""}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    dateOfJoining: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditEmp;