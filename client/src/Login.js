


import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
       
        try {
            localStorage.removeItem('userData');
            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log("Response from server:", response.data);
            if (response.data === "No record existed") {
                alert("No record existed");
            } else if (response.data === "the password is incorrect") {
                alert("Password is incorrect");
            } else if (response.data.message === "Success") {
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                navigate('/compiler');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    }
    
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded w-25">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 position-relative">
                        <i className="fas fa-envelope position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0 ps-5"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <i className="fas fa-lock position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                        <input
                            type="password" 
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password" 
                            className="form-control rounded-0 ps-5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p className="mt-3 text-center">Don't Have an Account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none text-center">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;

