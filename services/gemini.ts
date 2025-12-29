
import { GoogleGenAI } from "@google/genai";

// Safe access to API_KEY to avoid crash in browser ESM
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function generateFirmCopy(topic: string): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "AI generation requires an API Key configured in the environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a professional, sophisticated, and trustworthy private equity firm description about: ${topic}. Keep it concise and impactful for a high-net-worth audience.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text || "Failed to generate copy.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
}
