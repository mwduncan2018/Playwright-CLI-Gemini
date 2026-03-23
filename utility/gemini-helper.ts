import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function analyzeScreenshot(screenshotBuffer: Buffer, prompt: string) {
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: screenshotBuffer.toString("base64"),
        mimeType: "image/png",
      },
    },
  ]);
  return result.response.text();
}