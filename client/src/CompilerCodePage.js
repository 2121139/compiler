// CompilerCodePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import stubs from "./defaultStubs";
import moment from 'moment';
import PropTypes from 'prop-types'; 
import './Compiler.css';


function CompilerCodePage({ codeHistory, setCodeHistory }) {
  axios.defaults.withCredentials = true;
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("py");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  
 

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);


  CompilerCodePage.propTypes = {
    codeHistory: PropTypes.array.isRequired,
    setCodeHistory: PropTypes.func.isRequired
  };


  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let result = '';
    let { submittedAt, completedAt, startedAt } = jobDetails;
    submittedAt = moment(submittedAt).toString()
    result += `Submitted At: ${submittedAt}`
    if (!completedAt || !startedAt) {
      return result;
    }

    const start = moment(startedAt);
    const end = moment(completedAt);
    const executionTime = end.diff(start, 'seconds', true);
    result += ` Execution Time: ${executionTime}s`
    return result;
  }


  const updateCodeHistory = (code) => {
    setCodeHistory(prevCodeHistory => [...prevCodeHistory, code]);
  };


  const handleSubmit = async () => {
    const payload = {
      language: language,
      code: code
    };
    

    try {
      await axios.post("http://localhost:5000/submit-code", { code });
      console.log("Code submitted to database successfully");
    } catch (error) {
      console.error("Error submitting code to database:", error);
    }

    try {
      const response = await axios.post("http://localhost:5000/run", payload);
      if (response && response.data && response.data.jobId) {
        setJobId(response.data.jobId);

        const intervalId = setInterval(async () => {
          const { data } = await axios.get("http://localhost:5000/status", { params: { id: response.data.jobId } });
          const { success, job, error } = data;

          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);

            if (jobStatus !== "pending") {
              setOutput(jobOutput);
              clearInterval(intervalId);
              // Update code history state
              updateCodeHistory(code);
            }
          } else {
            setStatus("Error: Please retry!");
            console.error(error);
            clearInterval(intervalId);
            setOutput(error);
          }
        }, 1000);
      } else {
        setOutput("No output received from server");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setOutput(error.response.data.error);
      } else {
        setOutput("Error connecting to server!");
      }
    }
  };

  return (

    <div className="App">
      <h1>Online Code Compiler</h1>
      

      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            let response = window.confirm(
              "WARNING: Switching the language, will remove your current code. Do you wish to proceed? "
            );
            if (response) {
              setLanguage(e.target.value);
            }
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <div className="code-container">
        <textarea rows="30" cols="70" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
      </div>
      <div className="output-container">
        <button onClick={handleSubmit} className="submit-button">Submit</button>
        <p>{status}</p>
        <p>{jobId && `Job ID: ${jobId}`}</p>
        <p>{renderTimeDetails()}</p>
        <p className="output">{output}</p>
      </div>
    </div>
  );
}

export default CompilerCodePage;

