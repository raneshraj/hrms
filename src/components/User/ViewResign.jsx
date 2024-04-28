import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const ViewResign = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [resignRequests, setResignRequests] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

    fetch("http://localhost:3000/resign")
      .then((res) => res.json())
      .then((data) => {
        setResignRequests(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleApproval = (request, approve) => {
    const updatedRequest = { ...request };

    if (approve) {
      updatedRequest.approvals.push(currentUser.id);

      if (updatedRequest.approvals.length >= updatedRequest.approvalsRequired) {
        updatedRequest.status = "approved";
      }
    } else {
      updatedRequest.status = "rejected";
    }

    fetch(`http://localhost:3000/resign/${request.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRequest),
    })
      .then((res) => res.json())
      .then((updatedRequest) => {
        setResignRequests(
          resignRequests.map((req) =>
            req.id === updatedRequest.id ? updatedRequest : req
          )
        );
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="align-center mx-auto border-2">
          <h1 className="text-center">Resignation Requests</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Designation</th>
                <th>Reason</th>
                <th>From Date</th>
                <th>Status</th>
                <th>Approvals</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resignRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.userId}</td>
                  <td>{request.userDesignationLevel}</td>
                  <td>{request.reason}</td>
                  <td>{request.fromDate}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.approvals.length}/{request.approvalsRequired}
                  </td>
                  <td>
                    {request.status === "pending" &&
                      request.userDesignationLevel > currentUser.designation &&
                      !request.approvals.includes(currentUser.id) && (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleApproval(request, true)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleApproval(request, false)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    {request.status === "approved" && <span>Approved</span>}
                    {request.status === "rejected" && <span>Rejected</span>}
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

export default ViewResign;

// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";

// const ViewResign = () => {
//   const [currentUser, setCurrentUser] = useState({});
//   const [resignRequests, setResignRequests] = useState([]);

//   useEffect(() => {
//     // Fetch the current user from local storage or another source
//     const user = JSON.parse(localStorage.getItem("user"));
//     setCurrentUser(user);

//     // Fetch resignation requests
//     fetch("http://localhost:3000/resign")
//       .then((res) => res.json())
//       .then((data) => {
//         // Filter for requests that need the current user's approval
//         const requestsNeedingApproval = data.filter(
//           (request) =>
//             request.designation < user.designation &&
//             request.status === "pending"
//         );
//         setResignRequests(requestsNeedingApproval);
//       })
//       .catch((err) => console.log(err.message));
//   }, []);

//   const handleApproval = (request) => {
//     // Add the current user's approval
//     const updatedApprovals = [...request.approvals, currentUser.id];

//     // Determine if all higher designations have approved
//     const isFullyApproved = updatedApprovals.length >= request.approvalsRequired;

//     fetch(`http://localhost:3000/resign/${request.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...request,
//         approvals: updatedApprovals,
//         status: isFullyApproved ? "accepted" : request.status,
//       }),
//     })
//       .then((res) => res.json())
//       .then((updatedRequest) => {
//         // Update the local state with the new data
//         setResignRequests(
//           resignRequests.map((req) =>
//             req.id === updatedRequest.id ? updatedRequest : req
//           )
//         );
//       })
//       .catch((err) => console.log(err.message));
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="align-center mx-auto border-2">
//           <h1 className="text-center">Resignation Requests</h1>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>User Name</th>
//                 <th>Reason</th>
//                 <th>From Date</th>
//                 <th>Status</th>
//                 <th>Approvals</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {resignRequests.map((request) => (
//                 <tr key={request.id}>
//                   <td>{request.id}</td>
//                   <td>{request.userId}</td>
//                   <td>{request.reason}</td>
//                   <td>{request.fromDate}</td>
//                   <td>{request.status}</td>
//                   <td>
//                     {request.approvals.join(", ")}
//                   </td>
//                   <td>
//                     {request.status === "pending" && (
//                       <>
//                         <Button
//                           variant="success"
//                           onClick={() => handleApproval(request)}
//                         >
//                           Approve
//                         </Button>
//                       </>
//                     )}
//                     {request.status === "accepted" && <span>Accepted</span>}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewResign;
