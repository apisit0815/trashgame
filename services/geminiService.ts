import { GoogleGenAI, Type } from "@google/genai";
import { WasteItem, BinType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a fun and educational game engine for Thai middle school students (12-13 years old). 
Your goal is to generate waste items found in daily Thai life for a waste separation game.

Rules for Thai Waste Separation Standards:
1. Green Bin (Organic/Wet): Food scraps, fruit peels, leaves, leftovers.
2. Yellow Bin (Recycle): Clean plastic bottles, glass, paper, metal cans, cardboard.
3. Red Bin (Hazardous): Batteries, light bulbs, spray cans, electronics, chemicals.
4. Blue Bin (General): Snack wrappers (foil lined), foam boxes, dirty tissues, contaminated plastic bags, straws.

Generate a single random waste item. Vary the difficulty. 
The explanation should be short, scientific but fun, and strictly related to why it belongs in that bin.
`;

export const generateWasteItem = async (): Promise<WasteItem> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.1, // High temperature for variety
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the item in English" },
            thaiName: { type: Type.STRING, description: "Name of the item in Thai" },
            correctBin: { 
              type: Type.STRING, 
              enum: [BinType.GREEN, BinType.YELLOW, BinType.RED, BinType.BLUE],
              description: "The correct bin for this item"
            },
            explanation: { type: Type.STRING, description: "A fun 1-sentence explanation for a 12 year old." },
            emoji: { type: Type.STRING, description: "A single representative emoji" }
          },
          required: ["name", "thaiName", "correctBin", "explanation", "emoji"]
        }
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: "Generate a random waste item commonly found in Thailand. Make it unique from previous ones if possible." }
          ]
        }
      ]
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as WasteItem;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback item in case of API failure or quota issues
    return {
      name: "Plastic Water Bottle",
      thaiName: "ขวดน้ำพลาสติก",
      correctBin: BinType.YELLOW,
      explanation: "Clean plastic bottles are valuable resources that can be melted down and reused!",
      emoji: "🧴"
    };
  }
};