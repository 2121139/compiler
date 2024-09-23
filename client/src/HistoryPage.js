// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import "./HistoryPage.css"; // Import CSS file for styling

// function HistoryPage() {
//     const [codeHistory, setCodeHistory] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/history");
//                 setCodeHistory(response.data.reverse());
//             } catch (error) {
//                 console.error('Error fetching code history:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="history-container">
//             <h2>Code History</h2>
//             <div className="code-history">
//                 {codeHistory.map((codeData, index) => (
//                     <div key={index} className="code-item">
//                         <pre>{codeData.code}</pre> 
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default HistoryPage;


import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./HistoryPage.css"; // Import CSS file for styling

function HistoryPage() {
    const [codeHistory, setCodeHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/history");
                setCodeHistory(response.data.reverse());
            } catch (error) {
                console.error('Error fetching code history:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="history-container">
            <h2>Code History</h2>
            <div className="code-history">
                {codeHistory.map((codeData, index) => (
                    <div key={index} className="code-item">
                        <pre>{codeData.code}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HistoryPage;
