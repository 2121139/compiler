

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Signup.css"; // Ensure this file includes the updated CSS

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src="https://tse2.mm.bing.net/th?id=OIP.PZBZNFtCPCgdf4_X6xp8NAHaDa&pid=Api&P=0&h=180" alt="Signup" />
      </div>
      <div className="form-section">
        <div className="form-wrapper">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-group">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
          <p className="already-have-account">Already Have an Account?</p>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
       </div>
    </div>
    
  
    
  );
}

export default Signup;



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// import "./Signup.css"; // Ensure this file includes the updated CSS

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !email || !password) {
//       alert("Please fill in all fields");
//       return;
//     }
//     axios
//       .post("http://localhost:5000/register", { name, email, password })
//       .then((result) => {
//         console.log(result);
//         navigate("/login");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="signup-container">
//       <div className="image-section">
//         <img src="https://tse2.mm.bing.net/th?id=OIP.PZBZNFtCPCgdf4_X6xp8NAHaDa&pid=Api&P=0&h=180" alt="Signup" />
//       </div>
//       <div className="form-section">
//         <div className="form-wrapper">
//           <h2>Register</h2>
//           <form onSubmit={handleSubmit} className="form-content">
//             <div className="form-group">
//               <label htmlFor="name">
//                 <strong>Name</strong>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 autoComplete="off"
//                 name="name"
//                 className="form-control"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">
//                 <strong>Email</strong>
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 autoComplete="off"
//                 name="email"
//                 className="form-control"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">
//                 <strong>Password</strong>
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 autoComplete="off"
//                 name="password"
//                 className="form-control"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="submit-button">
//               Register
//             </button>
//           </form>
//           <p className="already-have-account">Already Have an Account?</p>
//           <Link to="/login" className="login-link">
//             Login
//           </Link>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Signup;
