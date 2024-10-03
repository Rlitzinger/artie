// App.js

import React, { useState } from 'react';
import SpeechRecognitionComponent from './SpeechRecognition';
import DisplayOutput from './displays/DisplayOutput';

function App() {
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState('');

  const handleTranscript = (text) => {
    console.log('Transcript received:', text);
    setTranscript(text);

    // Send the transcript to the backend for processing
    fetch('http://localhost:5000/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
      })
      .catch((error) => {
        console.error('Error:', error);
        setResult('Error processing your request.');
      });
  };

  return (
    <div className="App">
      <SpeechRecognitionComponent onTranscript={handleTranscript} />
      <DisplayOutput input={transcript} output={result} />
    </div>
  );
}

export default App;
