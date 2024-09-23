import React, { useEffect, useState } from 'react';
import './PythonTutorials.css';  // Import the CSS file

const PythonTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tutorials/python');
        if (!response.ok) {
          throw new Error('Failed to fetch tutorials.');
        }
        const data = await response.json();
        setTutorials(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="tutorials-container">
      <h1>Python Tutorials</h1>
      <ul className="tutorials-list">
        {tutorials.map((tutorial) => (
          <li key={tutorial.id} className="tutorial-item">
            <h2>{tutorial.title}</h2>
            <p>{tutorial.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PythonTutorials;
