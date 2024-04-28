import { useState } from "react";
import { Modal, Button } from "antd";

import { useNavigate, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
// Import all of Bootstrap's CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

import User1 from "./components/User/User1";
import Hierarchy from "./components/User/Hierarchy";
import { Menu } from "antd";
import {
  DashboardOutlined,
  HomeOutlined,
  Power,
  TrendingUpRounded,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import AddEmp from "./components/User/AddEmp";
import EditEmp from "./components/User/EditEmp";
import ApplyResign from "./components/User/ApplyResign";
import ViewLeaves from "./components/User/ViewLeaves";
import ViewResign from "./components/User/ViewResign";
import Logout from "./components/User/Logout";
function App() {
  const [count, setCount] = useState(0);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <SideMenu />
        <Content />
      </div>
  
    </>
  );
}

function SideMenu() {
  const navigate = useNavigate();

  return (
    <Menu
      onClick={({ key }) => {
        if (key === "signout") {
        } else {
          navigate(key);
        }
      }}
      defaultSelectedKeys={[window.location.pathname]}
      items={[
        { label: "Home", key: "/", icon: <HomeOutlined /> },
        {
          label: "Admin",
          key: "/",
          icon: <DashboardOutlined />,
          children: [
            { label: "Add Employee", key: "/addEmp" },
            { label: "Edit Employee", key: "/editEmp" },
            { label: "View Leave", key: "/viewLeave" },
            { label: "View Resign", key: "/viewResign" },
          ],
        },
        {
          label: "User",
          key: "/user",
          icon: <VerifiedUserOutlined />,
          children: [
            { label: "Apply For Leave", key: "/leave" },

            { label: "Apply For Resign", key: "/resign" },
          ],
        },
        { label: "Hieararchy", key: "/hierarchy", icon: <TrendingUpRounded /> },
        { label: "Signoff", key: "/end", icon: <Power />, danger: true },
      ]}
    ></Menu>
  );
}

function Content() {
  return (
    <div>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        hideProgressBar
        theme="colored"
        position="top-center"
      ></ToastContainer>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/user" element={<User1 />}></Route>
        <Route path="/hierarchy" element={<Hierarchy />}></Route>
        <Route path="/leave" element={<User1 />}></Route>
        <Route path="/resign" element={<ApplyResign />}></Route>
        <Route path="/viewLeave" element={<ViewLeaves />}></Route>
        <Route path="/viewResign" element={<ViewResign />}></Route>

        <Route path="/editEmp" element={<EditEmp />}></Route>
        <Route path="/addEmp" element={<AddEmp />}></Route>
        <Route path="/end" element={<Logout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
