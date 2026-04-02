import { GoogleGenAI, Type, ThinkingLevel, Modality } from "@google/genai";

// Initialize Gemini API
// Note: process.env.GEMINI_API_KEY is injected by the platform.
const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const findNearbyRestaurants = async (latitude: number, longitude: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Find Burger King restaurants near me. Provide a list with name, address, and status.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude,
            longitude
          }
        }
      }
    },
  });

  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const generateBurgerImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        {
          text: `A high-quality, professional food photography of a custom burger: ${prompt}. Flame-grilled, juicy, appetizing, Burger King style.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};
