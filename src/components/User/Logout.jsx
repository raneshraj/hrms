import React, { useState, useEffect } from "react";
import hmrs from "../hrms-.png";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    setConfirmationMessage("Are you sure you want to log out?");
    setShowModal(true);
  };


  const handleLogoutConfirmed = () => {
    localStorage.removeItem("user");
    
    toast.info("Logout successful!")
     
    navigate("/"); 
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className="bg-info justify-content-center">
            Welcome, {loggedInUser.fullName}!
          </h1>
          <p className="text-center mt-3">
            Thanks for using HRMS. Have a wonderful day!
          </p>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <img
                  className="image-fluid rounded mt-5 float-start"
                  src={hmrs}
                  alt=""
                  style={{ width: "80%", height: "80%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
          <ModalHeader toggle={() => setShowModal(false)}>
            Confirmation
          </ModalHeader>
          <ModalBody>{confirmationMessage}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleLogoutConfirmed}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default Logout;