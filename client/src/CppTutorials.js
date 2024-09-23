// CppTutorials.js
import React, { useEffect, useState } from 'react';
import './CppTutorials.css'; // Import the CSS file for styling

const CppTutorials = () => {
  const [tutorials, setTutorials] = useState([]); // State to store fetched tutorials
  const [loading, setLoading] = useState(true);   // State to show loading status
  const [error, setError] = useState(null);       // State to handle any errors

  useEffect(() => {
    // Fetch the tutorials data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tutorials/cpp');
        if (!response.ok) {
          throw new Error('Failed to fetch tutorials.');
        }
        const data = await response.json();
        setTutorials(data);  // Update the tutorials state with fetched data
        setLoading(false);   // Stop loading once data is fetched
      } catch (error) {
        setError(error.message);  // Handle any errors during fetching
        setLoading(false);
      }
    };

    fetchData();  // Call fetchData when the component is mounted
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  if (error) {
    return <p>{error}</p>; // Display error message if any
  }

  return (
    <div className="tutorials-container">
      <h1>C++ Tutorials</h1>
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

export default CppTutorials;
