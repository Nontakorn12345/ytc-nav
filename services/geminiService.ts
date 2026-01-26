
import { GoogleGenAI } from "@google/genai";

// ข้อความแนะนำมาตรฐานกรณีไม่มี API Key (ฟรี 100% ไม่ต้องใช้เน็ต)
const getLocalAdvice = (from: string, to: string) => {
  const commonAdvices = [
    `เดินตรงไปตามทางเดินหลัก แล้วสังเกตป้ายบอกทางสีน้ำเงินครับ`,
    `จาก ${from} ให้เดินมุ่งหน้าไปทางโรงอาหารกลาง จะเห็น ${to} อยู่ไม่ไกลครับ`,
    `เดินผ่านหน้าตึกอำนวยการ แล้วเลี้ยวขวาตามทางเดินที่มีหลังคา (Cover Way) ครับ`,
    `ใช้เวลาเดินประมาณ 3-5 นาทีครับ เดินตามทางเดินหลักไปได้เลย`,
    `จุดหมายของคุณอยู่ใกล้ๆ กับลานจอดรถหลักของแผนกครับ`
  ];
  return commonAdvices[Math.floor(Math.random() * commonAdvices.length)];
};

export const getSmartAdvice = async (from: string, to: string) => {
  // ตรวจสอบว่ามี API Key หรือไม่
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    console.log("Using Local Advice (Free Mode)");
    return getLocalAdvice(from, to);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest', // ใช้รุ่น Lite เพื่อความประหยัดและรวดเร็ว
      contents: `คุณคือ AI นำทางในวิทยาลัยเทคนิคยโสธร แนะนำทางจาก "${from}" ไป "${to}" สั้นๆ 1 ประโยค (ภาษาไทย)`,
    });
    return response.text || getLocalAdvice(from, to);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return getLocalAdvice(from, to);
  }
};
