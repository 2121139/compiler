// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ProblemDetails.css'; 

// const ProblemDetails = ({ problemId }) => {
//   const [problem, setProblem] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/problem/${problemId}`);
//         setProblem(response.data);
//       } catch (error) {
//         console.error(`Error fetching problem details for ID ${problemId}:`, error);
//       }
//     };

//     if (problemId) {
//       fetchData();
//     }
//   }, [problemId]);

//   if (!problem) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{problem.title}</h2>
//       <p>{problem.description}</p>
//       <p>Difficulty: {problem.difficulty}</p>
//       <p>Solution: {problem.solution}</p>
//     </div>
//   );
// };

// export default ProblemDetails;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProblemDetails.css'; // Import CSS file

const ProblemDetails = ({ problemId }) => {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/problem/${problemId}`);
        setProblem(response.data);
      } catch (error) {
        console.error(`Error fetching problem details for ID ${problemId}:`, error);
      }
    };

    if (problemId) {
      fetchData();
    }
  }, [problemId]);

  if (!problem) {
    return <div className="problem-details">Loading...</div>;
  }

  return (
    <div className={`problem-details ${problem ? 'show' : ''}`}>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <p>Difficulty: {problem.difficulty}</p>
      <p>Solution: {problem.solution}</p>
    </div>
  );
};

export default ProblemDetails;
