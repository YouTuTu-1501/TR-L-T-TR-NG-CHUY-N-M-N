
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Volume2, Copy, Check, Square } from 'lucide-react';
import { generateReportAudio } from '../services/geminiService';

interface ResultDisplayProps {
  content: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx({ sampleRate: 24000 });
    setAudioContext(ctx);
    return () => {
      if (ctx.state !== 'closed') {
        ctx.close();
      }
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportWord = () => {
    if (!contentRef.current) return;

    // Header chuẩn cho file .docx (sử dụng định dạng Office XML/HTML tương thích cao)
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Báo Cáo Tổ Chuyên Môn</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 21cm 29.7cm;
            margin: 2cm 2cm 2cm 2.5cm;
          }
          body { 
            font-family: 'Times New Roman', Times, serif; 
            line-height: 1.6; 
            font-size: 13pt;
            color: #000000;
          }
          h1, h2, h3, h4 { color: #000000; font-weight: bold; text-transform: uppercase; margin-top: 15pt; }
          p { margin-bottom: 10pt; text-align: justify; color: #000000; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 15pt; border: 1px solid black; }
          th, td { border: 1px solid black; padding: 8pt; text-align: left; vertical-align: top; }
          ul, ol { margin-bottom: 10pt; color: #000000; text-align: justify; }
          li { margin-bottom: 5pt; color: #000000; }
          strong { font-weight: bold; color: #000000; }
        </style>
      </head>
      <body>
    `;
    const footer = "</body></html>";
    
    // Lấy nội dung HTML hiện tại từ div kết quả
    const htmlContent = header + contentRef.current.innerHTML + footer;

    // Tạo blob với MIME type .docx
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Bao_cao_To_chuyen_mon_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.docx`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTTS = async () => {
    if (isPlaying && audioSource) {
      try { audioSource.stop(); } catch (e) {}
      setIsPlaying(false);
      return;
    }
    if (!audioContext) return;
    if (audioContext.state === 'suspended') await audioContext.resume();

    try {
      setIsLoadingAudio(true);
      const textToSpeak = content.length > 4000 ? content.substring(0, 4000) + "..." : content;
      const base64Audio = await generateReportAudio(textToSpeak);
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);

      let finalBytes = bytes;
      if (bytes.length % 2 !== 0) {
        finalBytes = new Uint8Array(bytes.length + 1);
        finalBytes.set(bytes);
      }

      const dataInt16 = new Int16Array(finalBytes.buffer);
      const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
      setAudioSource(source);
      setIsPlaying(true);
    } catch (err) {
      alert("Không thể phát âm thanh.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  return (
    <div className="w-full max-w-[95%] mx-auto mt-12 bg-white rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up border border-slate-300">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-300 px-6 py-5 flex flex-col lg:flex-row justify-between items-center gap-4">
        <h3 className="font-serif text-black font-black text-2xl flex items-center gap-3 tracking-tight">
          <div className="w-2.5 h-8 bg-gold-600 rounded-full shadow-[0_0_10px_rgba(202,138,4,0.5)]"></div>
          KẾT QUẢ SOẠN THẢO VĂN BẢN
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleTTS}
            disabled={isLoadingAudio}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
              isPlaying 
                ? 'bg-red-600 text-white shadow-red-200 shadow-lg scale-105' 
                : 'bg-white border-2 border-slate-300 text-slate-800 hover:border-gold-600 hover:shadow-md'
            }`}
          >
            {isLoadingAudio ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Square className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            {isPlaying ? 'Dừng đọc' : 'Nghe văn bản'}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-300 text-slate-800 rounded-xl text-sm font-bold hover:border-gold-600 hover:shadow-md transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Đã sao chép' : 'Sao chép nội dung'}
          </button>
          
          <button 
            onClick={handleExportWord}
            className="flex items-center gap-2 px-6 py-2.5 bg-navy-950 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-2xl active:scale-95 border-b-4 border-navy-800 hover:border-black"
          >
            <Download className="w-4 h-4 text-gold-400" />
            Xuất file Word (.docx)
          </button>
        </div>
      </div>

      {/* Content Rendering Area - Maximum Contrast & Justified Alignment */}
      <div className="p-10 md:p-16 lg:p-20 bg-white min-h-[800px] selection:bg-gold-200">
        <div 
          ref={contentRef}
          className="prose prose-xl max-w-none 
            prose-headings:text-black prose-headings:font-serif prose-headings:font-black prose-headings:mb-8
            prose-p:text-black prose-p:leading-[1.8] prose-p:mb-6 prose-p:font-semibold prose-p:text-justify
            prose-li:text-black prose-li:font-semibold prose-li:text-justify prose-li:mb-2
            prose-strong:text-black prose-strong:font-black
            prose-blockquote:text-black prose-blockquote:border-l-4 prose-blockquote:border-gold-600 prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6
            prose-hr:border-slate-400 prose-hr:my-10"
          style={{ 
            color: '#000000', 
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textAlign: 'justify' // Đảm bảo căn lề đều cả 2 bên
          }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <div className="bg-slate-100 border-t border-slate-200 px-8 py-5 text-center">
        <p className="text-slate-800 text-sm font-black uppercase tracking-widest opacity-80">
          Văn bản hành chính chuẩn mực - Hỗ trợ bởi Trí tuệ nhân tạo chuyên biệt
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
