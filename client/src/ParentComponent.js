// ParentComponent.js

import React, { useState } from 'react';
import CompilerCodePage from './Compilercodepage';

function ParentComponent() {
  const [codeHistory, setCodeHistory] = useState([]);
  
  console.log(typeof setCodeHistory); // Check type of setCodeHistory

  return (
    <CompilerCodePage codeHistory={codeHistory} setCodeHistory={setCodeHistory} />
  );
}

export default ParentComponent;
