import React, { useEffect, useState } from "react";
import hmrs from "./hrms-.png";
import "./home.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logout from "./User/Logout";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // State to store the logged-in user's data

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!loggedInUser);
    setUser(loggedInUser); // Parse the user data from localStorage and set it to state
  }, []);

 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please enter a username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter a Password");
    }
    return result;
  };

  const login = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
    fetch("http://localhost:3000/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((users) => {
        const foundUser = users.find(
          (user) => user.username === username && user.password === password
        );

        if (foundUser) {

       localStorage.setItem("user", JSON.stringify(foundUser));
          setIsLoggedIn(true); // Update login status
          navigate("/hierarchy"); // Redirect to hierarchy page
          console.log(`User ${foundUser.username} logged in successfully`);
        } else {
          toast.error("Invalid Username or Password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("An error occurred. Please try again later.");
      });
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("An error occurred. Please try again later.");
  }
};

  return (
    <>
  <ToastContainer />
  {isLoggedIn && user ? (
  <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1 className="bg-info justify-content-center">
            Welcome, {user.fullName}!
          </h1>
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
    </div>
  </>
) : (
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
            <div className="col-md-5 form69 mx-auto align-self-center">
              <div action="" className="form_main">
                <p className="heading">Login</p>
                <div className="inputContainer">
                  <svg
                    className="inputIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#2e2e2e"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                  </svg>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="inputField"
                    id="username"
                    placeholder="Username"
                  />
                </div>

                <div className="inputContainer">
                  <svg
                    className="inputIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#2e2e2e"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                  </svg>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="inputField"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <button id="button" onClick={login}>
                  Submit
                </button>

                <a className="forgotLink">Forgot your password?</a>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
