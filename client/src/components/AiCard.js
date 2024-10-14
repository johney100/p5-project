import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Assuming this is the correct import path

const genAI = new GoogleGenerativeAI('AIzaSyCBr3rKUNANxHMOo2yIpHrl0XqWJ_VyPss');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const AiCard = () => {
  const [search, setSearch] = useState('');
  const [aiResponse, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // Combined state for loading
  const [saveError, setSaveError] = useState(null); // State for saving error message

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const aiRun = async () => {
    if (!search) return; // Check for empty search before API call

    setLoading(true);

    try {
      const prompt = `write a 500 word short story about ${search}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    aiRun();
  };

  const handleSaveStory = async () => {
    if (!aiResponse) {
      setSaveError("Please generate a story first!");
      return;
    }

    setLoading(true); // Show loading state for saving
    setSaveError(null); // Clear any previous error message

    try {
      const story = { title: search, body: aiResponse }; // Example story object
      const response = await fetch('http://127.0.0.1:5000/stories', { // Replace with your API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story)
      });

      if (!response.ok) {
        throw new Error(`Error saving story: ${response.statusText}`);
      }

      console.log("Story saved successfully!");
      // Optionally, clear the generated story or display a success message
    } catch (error) {
      console.error("Error saving story:", error);
      setSaveError(error.message); // Set a user-friendly error message
    } finally {
      setLoading(false); // Hide loading state after saving
    }
  };

  return (
    <div class="ai-card">
      <h1 class="ai-card-title">Generative AI Story Writer</h1>

      <div class="ai-card-content" style={{ display: 'flex' }}>
        <input
          placeholder='Enter story topic for Gemini to write about'
          onChange={handleChangeSearch}
        />
        <button style={{ marginLeft: '20px' }} onClick={handleClick}>
          Generate Story
        </button>
      </div>

      {loading && <p style={{ margin: '30px 0' }}>Loading ...</p>}
      {aiResponse && (
        <div style={{ margin: '30px 0' }}>
          <p>{aiResponse}</p>
          <button onClick={handleSaveStory}>Save Story</button>
          {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
        </div>
      )}
    </div>
  );
};

export default AiCard;