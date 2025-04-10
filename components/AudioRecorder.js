import { useState } from "react";

import axios from "axios";
import dynamic from "next/dynamic";

const ReactMic = dynamic(() => import("react-mic").then(mod => mod.ReactMic), {
  ssr: false,
});

const AudioRecorder = () => {
  const [record, setRecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [response, setResponse] = useState(null);

  const startRecording = () => setRecord(true);
  const stopRecording = () => setRecord(false);

  const onStop = (recordedData) => {
    setAudioBlob(recordedData.blob);
  };

  const sendAudio = async () => {
    if (!audioBlob) return alert("Please record audio first!");

    const formData = new FormData();
    formData.append("audio", audioBlob, "interview.wav");

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert("Error sending audio");
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>🎤 AI Interview Feedback Tool</h1>

      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        strokeColor="#000"
        backgroundColor="#F8BBD0"
      />

      <div style={{ margin: "10px" }}>
        {!record ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {audioBlob && (
        <>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <br />
          <button onClick={sendAudio}>Send for Analysis</button>
        </>
      )}

      {response && (
        <div style={{ marginTop: 20, textAlign: "left" }}>
          <h3>🧠 Feedback</h3>
          <p><strong>Transcript:</strong> {response.transcript}</p>
          <p><strong>Grammar Score:</strong> {response.feedback.grammar_score}/10</p>
          <p><strong>Filler Words:</strong> {response.feedback.filler_word_count}</p>
          <p><strong>Suggestion:</strong> {response.feedback.suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
