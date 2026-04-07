import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import TemplateCatalog from './components/TemplateCatalog';
import { generateReportContent } from './services/geminiService';
import { ReportFormData } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (data: ReportFormData) => {
    setIsGenerating(true);
    setResult(null);
    try {
      const markdownContent = await generateReportContent(data);
      setResult(markdownContent);
    } catch (error) {
      alert("Có lỗi xảy ra trong quá trình tạo báo cáo. Vui lòng kiểm tra API Key và thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative selection:bg-gold-500 selection:text-navy-900 pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full px-4 md:px-8 relative z-10">
        <Header />
        
        <InputForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
        
        <TemplateCatalog />

        {result && (
          <div id="result-section">
            <ResultDisplay content={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;