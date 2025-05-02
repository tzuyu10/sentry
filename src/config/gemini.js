import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables or use a fallback approach
const getApiKey = () => {
  // Try to get from import.meta.env (Vite)
  if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  
  // Try to get from process.env (Node.js)
  if (typeof process !== 'undefined' && process.env && process.env.VITE_GEMINI_API_KEY) {
    return process.env.VITE_GEMINI_API_KEY;
  }
  
  // If no API key is found, throw a more helpful error
  throw new Error("Gemini API key not found. Please set the VITE_GEMINI_API_KEY environment variable.");
};

const ai = new GoogleGenerativeAI(getApiKey());

async function runChat(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    return `Error: ${error.message}`;
  }
}

export default runChat;