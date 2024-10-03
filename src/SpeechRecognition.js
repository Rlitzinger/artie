// SpeechRecognitionComponent.js

import React, { useState, useEffect, useRef } from 'react';

const SpeechRecognitionComponent = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser compatibility
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Speech recognition started');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        onTranscript(transcript);
        setListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      alert('Sorry, your browser does not support Speech Recognition.');
    }

    // Clean up on unmount
    return () => {
      if (recognitionRef.current && listening) {
        recognitionRef.current.stop();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Listening'}
      </button>
      {listening && (
        <button onClick={stopListening}>
          Stop
        </button>
      )}
    </div>
  );
};

export default SpeechRecognitionComponent;
