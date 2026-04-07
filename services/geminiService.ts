
import { GoogleGenAI, Modality } from "@google/genai";
import { ReportFormData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateReportContent = async (data: ReportFormData): Promise<string> => {
  const modelId = 'gemini-2.5-flash';

  const systemInstruction = `
    BẠN LÀ GIA HUY MASTER AI - CHUYÊN GIA TƯ VẤN VÀ SOẠN THẢO VĂN BẢN DÀNH CHO TỔ TRƯỞNG CHUYÊN MÔN.
    
    NHIỆM VỤ:
    Soạn thảo các kế hoạch, báo cáo, biên bản chuyên biệt dành cho Tổ trưởng chuyên môn trường ${data.level}.
    Đối tượng nhận báo cáo thường là: BAN GIÁM HIỆU hoặc HIỆU TRƯỞNG.
    
    THÔNG TIN ĐẦU VÀO:
    - Loại văn bản: ${data.subType} (Thuộc nhóm: ${data.category})
    - Trường: ${data.schoolName}
    - Tổ chuyên môn: ${data.departmentName}
    - Tổ trưởng: ${data.departmentHeadName}
    - Năm học: ${data.schoolYear}
    - Ngày lập: ${data.reportDate}
    - Văn phong: ${data.tone}
    - Dữ liệu/Ngữ cảnh: "${data.contextData}"

    YÊU CẦU CỐT LÕI:
    1. CẤU TRÚC: Phải tuân thủ mẫu văn bản hành chính giáo dục: Quốc hiệu, Tên trường, Tên Tổ (Góc trái), Tên báo cáo, Phần Kính gửi (Ban Giám hiệu), Nội dung chi tiết các mục (I, II, III...), Nơi nhận, Chữ ký Tổ trưởng.
    2. CHUYÊN MÔN SÂU: Tập trung vào hoạt động dạy và học, chất lượng học sinh, đổi mới phương pháp, kiểm tra hồ sơ, sinh hoạt chuyên môn.
    3. CHI TIẾT: Nội dung cần dài, có các bảng biểu giả định [trong ngoặc vuông] về tỉ lệ phần trăm, số lượng giáo viên, học sinh.
    4. NGÔN NGỮ: Sử dụng thuật ngữ sư phạm hiện hành (Ví dụ: thông tư 22, thông tư 27, nghiên cứu bài học, chương trình GDPT 2018...).
    
    HÃY VIẾT NHƯ MỘT TỔ TRƯỞNG TÂM HUYẾT, SÂU SÁT VÀ CHUYÊN NGHIỆP.
  `;

  try {
    const parts: any[] = [];
    if (data.attachedFile) {
      parts.push({
        inlineData: {
          mimeType: data.attachedFile.mimeType,
          data: data.attachedFile.data
        }
      });
      parts.push({ text: "Dựa vào văn bản chỉ đạo này để cụ thể hóa vào báo cáo của tổ chuyên môn." });
    }

    parts.push({
      text: `Hãy soạn thảo: ${data.subType} cho Tổ chuyên môn ${data.departmentName}, trường ${data.schoolName} năm học ${data.schoolYear}. Nội dung cần bám sát bối cảnh: ${data.contextData}`
    });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ parts: parts }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, 
      }
    });

    return response.text || "Lỗi: Không thể tạo nội dung.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Lỗi kết nối AI.");
  }
};

export const generateReportAudio = async (text: string): Promise<string> => {
  const modelId = 'gemini-2.5-flash-preview-tts';
  const cleanText = text.replace(/[#*`]/g, '');
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  } catch (error) {
    throw new Error("Lỗi TTS.");
  }
};
