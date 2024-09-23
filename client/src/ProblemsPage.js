// ProblemsPage.js
//it shows all the problems that is stored in the mongodb
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch problems from the server when the component mounts
    axios.get('http://localhost:5000/problems')
      .then(response => {
        setProblems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
        setError('An error occurred while fetching problems.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="problem-list">
        {problems.map(problem => (
          <div className="problem" key={problem._id}>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
            <p>Difficulty: {problem.difficulty}</p>
            <Link to={`/problems/${problem._id}`} className="btn btn-primary">
              View Problem
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemsPage;
