// DisplayOutput.js
import React from 'react';
import './DisplayOutput.css';

const DisplayOutput = ({ input, output }) => {
  return (
    <div className="container">
      <div className="output-box">
        <div>
          <h2>Input:</h2>
          <p>{input}</p>
        </div>
        <div>
          <h2>Output:</h2>
          <p>{output}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayOutput;
