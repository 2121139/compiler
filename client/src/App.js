import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Compiler from './Compiler';
import NavigationBar from './NavigationBar';
import HistoryPage from './HistoryPage';
//import ProblemsPage from './ProblemsPage'
import HomePage from './HomePage';
import ProblemDetailsPage from './ProblemDetailsPage';
import CompilerCodePage from './CompilerCodePage';
import ProblemPage from './ProblemPage'
import PythonTutorials from './PythonTutorials';
import CppTutorials from './CppTutorials';
import axios from 'axios';

function App() {
   const [codeHistory, setCodeHistory] = useState([]); 
   axios.defaults.withCredentials = true;
   const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://compiler-apis.vercel.app/')
      .then(result => console.log(result));
      .catch(err => console.log(err));
}

  return (
    <Router>
      <div>
        <NavigationBar />
       
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/problems' element={<ProblemsPage />} /> */}
          <Route path="/problem-page" element={<ProblemPage />} />
          <Route path='/compiler' element={<Compiler codeHistory={codeHistory} setCodeHistory={setCodeHistory} />} />
            <Route path='/history' element={<HistoryPage codeHistory={codeHistory} />} />
            <Route path='/problems/:id' element={<ProblemPage />} />
            <Route path='/problems/:id' element={<ProblemDetailsPage />} /> 
            <Route path="/compiler" element={<CompilerCodePage />} />   
            <Route path="/tutorials/python" element={<PythonTutorials />} />
            <Route path="/tutorials/cpp" element={<CppTutorials />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

