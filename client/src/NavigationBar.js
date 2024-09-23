// //correct code fully

// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import './NavigationBar.css';
// // import { useNavigate } from 'react-router-dom';

// // function NavigationBar() {
// //     const [loggedIn, setLoggedIn] = useState(false);
// //     const [username, setUsername] = useState('');
// //     const navigate = useNavigate();

// //     // Function to handle login
// //     const handleLogin = () => {
// //         const userData = JSON.parse(localStorage.getItem('userData'));

// //         // Implement your login logic here
// //         // Example: Set loggedIn to true and store the username
// //         setLoggedIn(true);
// //         setUsername(userData.name);  // Replace 'JohnDoe' with the actual username
// //     };

// //     // Function to handle logout
// //     const handleLogout = () => {
// //         // Implement your logout logic here
// //         // Example: Set loggedIn to false and clear the username
// //         setLoggedIn(false);
// //         setUsername('');
// //         navigate('/login')
// //     };

// //     return (
// //         <nav>
// //             <ul style={{ listStyleType: 'none', padding: 0 }}>
// //                 <li style={{ display: 'inline-block', marginRight: '10px', fontSize: 'larger' }}>
// //                     <a href="/compiler"></a>
// //                 </li>
// //                 <li style={{ display: 'inline-block', marginRight: '10px' }}>
// //                     <Link to="/problem-page">Problem Details</Link>
// //                 </li>
// //                 <li style={{ display: 'inline-block', marginRight: '10px' }}>
// //                     <Link to="/submissions"></Link>
// //                 </li>
// //                 <li style={{ display: 'inline-block' }}>
// //                     <Link to="/history">History</Link>
// //                 </li>
// //                 {loggedIn ? (
// //                     <li style={{ float: 'right', marginRight: '10px' }}>
// //                         <span>Welcome, {username}!</span>
// //                         <button onClick={handleLogout}>Logout</button>
// //                     </li>
// //                 ) : (
// //                     <li style={{ float: 'right', marginRight: '10px' }}>
// //                         <button onClick={handleLogin}>Log In</button>
// //                     </li>

// //                 )}
// //             </ul>
// //         </nav>
// //     );
// // }

// // export default NavigationBar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './NavigationBar.css';
// import { useNavigate } from 'react-router-dom';

// function NavigationBar() {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [username, setUsername] = useState('');
//     const navigate = useNavigate();

//     // Function to handle login
//     const handleLogin = () => {
//         const userData = JSON.parse(localStorage.getItem('userData'));

//         setLoggedIn(true);
//         setUsername(userData.name);  // Replace 'JohnDoe' with the actual username
//     };

//     // Function to handle logout
//     const handleLogout = () => {
//         setLoggedIn(false);
//         setUsername('');
//         navigate('/login');
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">
//                 <Link to="/">MyApp</Link>
//             </div>
//             <ul className="navbar-links">
//                 <li>
//                     <Link to="/problem-page">Problem Details</Link>
//                 </li>
//                 <li>
//                     <Link to="/history">History</Link>
//                 </li>
//                 {loggedIn ? (
//                     <li className="navbar-user">
//                         <span>Welcome, {username}!</span>
//                         <button className="logout-button" onClick={handleLogout}>Logout</button>
//                     </li>
//                 ) : (
//                     <li>
//                         <button className="login-button" onClick={handleLogin}>Log In</button>
//                     </li>
//                 )}
//             </ul>
//         </nav>
//     );
// }

// export default NavigationBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    setLoggedIn(true);
    setUsername(userData.name); // Replace 'JohnDoe' with the actual username
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <i className="fas fa-code"></i> {/* Example logo icon */}
          CodeMint
        </Link>
      </div>
      <ul className="navbar-links">
      <li>
        <Link to="/compiler">
          <i className="fas fa-terminal"></i> {/* Compiler icon */}
          Compiler
        </Link>
      </li>
        <li>
          <Link to="/problem-page">
            <i className="fas fa-question-circle"></i> {/* Problem icon */}
            Problems
          </Link>
        </li>
        <li>
          <Link to="/history">
            <i className="fas fa-history"></i> {/* History icon */}
            History
          </Link>
        </li>
        {loggedIn ? (
          <li className="navbar-user">
            <span>Welcome, {username}!</span>
            <button className="logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> {/* Logout icon */}
              Logout
            </button>
          </li>
        ) : (
          <li>
            <button className="login-button" onClick={handleLogin}>
              <i className="fas fa-sign-in-alt"></i> {/* Login icon */}
              Log In
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;
