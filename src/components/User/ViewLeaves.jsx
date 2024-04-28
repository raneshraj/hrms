// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ViewLeaves = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     // Fetch the current user's data
//     const loggedInUser = JSON.parse(localStorage.getItem("user"));
//     setCurrentUser(loggedInUser);

//     // Fetch all leave requests
//     fetch("http://localhost:3000/leave-applications")
//       .then((res) => res.json())
//       .then((data) => {
//         // Filter leave requests for users with one higher designation level
//         const leavesForHigherDesignation = data.filter(
//           (leave) =>
//             parseInt(leave.designationLevel) === parseInt(loggedInUser.designationLevel) + 1 &&
//             leave.userId !== loggedInUser.id
//         );

//         setLeaves(leavesForHigherDesignation);
//       })
//       .catch((err) => console.log(err.message));
//   }, []);

//   const updateLeaveStatus = (leave, status) => {
//     // Update the leave status
//     fetch(`http://localhost:3000/leave-applications/${leave.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // Show success notification
//         toast.success(`Leave status updated to ${status}`);

//         // Update the leave status in the local state
//         setLeaves(
//           leaves.map((leaveItem) => (leaveItem.id === leave.id ? { ...leaveItem, status } : leaveItem))
//         );
//       })
//       .catch((err) => console.log(err.message));
//   };

//   return (
//     <>
//       <div className="container mt-5">
//         <h2 className="mb-4">View Leaves</h2>
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User ID</th>
//                 <th>Leave Type</th>
//                 <th>From Date</th>
//                 <th>To Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaves.map((leave) => (
//                 <tr key={leave.id}>
//                   <td>{leave.id}</td>
//                   <td>{leave.userId}</td>
//                   <td>{leave.leaveType}</td>
//                   <td>{leave.fromDate}</td>
//                   <td>{leave.toDate}</td>
//                   <td>
//                     {leave.status === "pending" && (
//                       <>
//                         <Button
//                           variant="success"
//                           onClick={() => updateLeaveStatus(leave, "accepted")}
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           variant="danger"
//                           onClick={() => updateLeaveStatus(leave, "rejected")}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     )}
//                     {leave.status === "accepted" && <span>Accepted</span>}
//                     {leave.status === "rejected" && <span>Rejected</span>}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default ViewLeaves;


// working leaves **

// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ViewLeaves = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("user"));
//     setCurrentUser(loggedInUser);

//     fetch("http://localhost:3000/leave-applications")
//       .then((res) => res.json())
//       .then((data) => {
//         // leaves with a status of 'pending'
//         const pendingLeaves = data.filter((leave) => leave.status === 'pending');
//         setLeaves(pendingLeaves);
//       })
//       .catch((err) => console.log(err.message));
//   }, []);

//   const updateLeaveStatus = (leave, newStatus) => {
//     fetch(`http://localhost:3000/leave-applications/${leave.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...leave, status: newStatus }),
//     })
//       .then((res) => res.json())
//       .then((updatedLeave) => {
//         if (updatedLeave) {
//           // Update the leaves state to reflect the new status
//           setLeaves(leaves.map((item) =>
//             item.id === leave.id ? { ...item, status: newStatus } : item
//           ));
//           toast.success(`Leave ${newStatus} successfully!`);
//           window.location.reload();
//         }
//       })
//       .catch((err) => {
//         console.log(err.message);
//         toast.error("An error occurred while updating the leave status.");
//       });
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="align-center mx-auto border-2">
//           <h1 className="text-center">Pending Leaves</h1>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>User Name</th>
//                 <th>Leave Type</th>
//                 <th>From Date</th>
//                 <th>To Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaves.map((leave) => (
//                 <tr key={leave.id}>
//                   <td>{leave.id}</td>
//                   <td>{leave.userId}</td>
//                   <td>{leave.leaveType}</td>
//                   <td>{leave.fromDate}</td>
//                   <td>{leave.toDate}</td>
//                   <td>
//                     <Button variant="success" onClick={() => updateLeaveStatus(leave, 'accepted')}>
//                       Accept
//                     </Button>
//                     <Button variant="danger" onClick={() => updateLeaveStatus(leave, 'rejected')}>
//                       Reject
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default ViewLeaves;

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentUser, setCurrentUser] = useState({});



  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(loggedInUser);
  
       
        fetch("http://localhost:3000/leave-applications")
          .then((res) => res.json())
          .then((data) => {
            const leavesForHigherDesignation = data.filter(
              (leave) =>
                parseInt(leave.designation) === parseInt(loggedInUser.designation) + 1
                //  && leave.userId !== loggedInUser.id
            );
    
            setLeaves(leavesForHigherDesignation);
          })
          .catch((err) => console.log(err.message));
      }, []);


  // const updateLeaveStatus = (leave, newStatus) => {
  //   fetch(`http://localhost:3000/leave-applications/${leave.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...leave, status: newStatus }),
  //   })
  //     .then((res) => res.json())
  //     .then((updatedLeave) => {
  //       if (updatedLeave) {
  //         // Update the leaves state to reflect the new status
  //         setLeaves(leaves.map((item) =>
  //           item.id === leave.id ? { ...item, status: newStatus } : item
  //         ));
  //         toast.success(`Leave ${newStatus} successfully!`);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       toast.error("An error occurred while updating the leave status.");
  //     });
  // };

  const updateLeaveStatus = (leave, newStatus) => {
        fetch(`http://localhost:3000/leave-applications/${leave.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...leave, status: newStatus }),
        })
          .then((res) => res.json())
          .then((updatedLeave) => {
            if (updatedLeave) {
              // Update the leaves state to reflect the new status
              setLeaves(leaves.map((item) =>
                item.id === leave.id ? { ...item, status: newStatus } : item
              ));
              toast.success(`Leave ${newStatus} successfully!`);
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err.message);
            toast.error("An error occurred while updating the leave status.");
          });
      };



  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="align-center mx-auto border-2">
          <h1 className="text-center">Review Leaves</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>
                  <td>{leave.userId}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.status}</td>
                  <td>
                    {leave.status === "pending" && (
                      <>
                        <Button variant="success" onClick={() => updateLeaveStatus(leave, 'accepted')}>
                          Accept
                        </Button>
                        <Button variant="danger" onClick={() => updateLeaveStatus(leave, 'rejected')}>
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewLeaves;
