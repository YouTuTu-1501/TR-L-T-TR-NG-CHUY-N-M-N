
import React, { useState, useMemo, useRef } from 'react';
import { ReportFormData, ReportTone, SchoolLevel } from '../types';
import { REPORT_CATEGORIES } from '../constants';
import { FileText, School, User, Sparkles, Send, Calendar, CalendarDays, UploadCloud, X, FileCheck, Layers } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: ReportFormData) => void;
  isGenerating: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isGenerating }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const defaultSchoolYear = currentMonth < 8 
    ? `${currentYear - 1} - ${currentYear}` 
    : `${currentYear} - ${currentYear + 1}`;

  const [formData, setFormData] = useState<ReportFormData>({
    schoolName: 'Trường THCS&THPT Hồng Vân',
    departmentName: '',
    departmentHeadName: 'Trần Đình Phương',
    level: SchoolLevel.SECONDARY,
    schoolYear: defaultSchoolYear,
    reportDate: today.toISOString().split('T')[0],
    category: REPORT_CATEGORIES[0].name,
    subType: REPORT_CATEGORIES[0].subTypes[0],
    contextData: '',
    tone: ReportTone.FORMAL,
    attachedFile: undefined
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCategory = useMemo(() => {
    return REPORT_CATEGORIES.find(c => c.name === formData.category) || REPORT_CATEGORIES[0];
  }, [formData.category]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setFormData(prev => ({
          ...prev,
          attachedFile: { data: base64Data, mimeType: file.type, name: file.name }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-[95%] mx-auto bg-slate-900/50 border border-slate-700 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
              <School className="w-4 h-4" /> Tên Trường
            </label>
            <input
              type="text"
              required
              placeholder="VD: Tiểu học Lê Quý Đôn"
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            />
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Tên Tổ Chuyên Môn
            </label>
            <input
              type="text"
              required
              placeholder="VD: Tổ Toán - Tin"
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
              value={formData.departmentName}
              onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
              <User className="w-4 h-4" /> Tổ Trưởng
            </label>
            <input
              type="text"
              required
              placeholder="Nhập tên của bạn"
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
              value={formData.departmentHeadName}
              onChange={(e) => setFormData({ ...formData, departmentHeadName: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-slate-400 font-medium text-sm uppercase tracking-wider">Văn phong báo cáo</label>
            <select
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value as ReportTone })}
            >
              {Object.values(ReportTone).map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
              <Calendar className="w-4 h-4" /> Năm Học
            </label>
            <input
              type="text"
              required
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500"
              value={formData.schoolYear}
              onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
              <CalendarDays className="w-4 h-4" /> Ngày Lập
            </label>
            <input
              type="date"
              required
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500 [color-scheme:dark]"
              value={formData.reportDate}
              onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
            <FileText className="w-4 h-4" /> Danh Mục Báo Cáo Chuyên Môn
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <select
                className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500"
                value={formData.category}
                onChange={(e) => {
                  const newCat = REPORT_CATEGORIES.find(c => c.name === e.target.value);
                  setFormData({ ...formData, category: e.target.value, subType: newCat ? newCat.subTypes[0] : '' });
                }}
              >
                {REPORT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500"
                value={formData.subType}
                onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
              >
                {selectedCategory.subTypes.map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>
          </div>
        </div>

        <div className="space-y-3">
           <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
            <UploadCloud className="w-4 h-4" /> Văn bản chỉ đạo (BGH gửi xuống)
          </label>
          {!formData.attachedFile ? (
            <div onClick={() => fileInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-gold-500 transition-all">
              <span className="text-slate-400">Tải lên công văn để AI bám sát yêu cầu của BGH</span>
            </div>
          ) : (
            <div className="w-full h-16 bg-slate-800 border border-slate-600 rounded-xl flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <FileCheck className="text-green-400" />
                <span className="text-white text-sm">{formData.attachedFile.name}</span>
              </div>
              <X onClick={() => setFormData({...formData, attachedFile: undefined})} className="cursor-pointer text-slate-400 hover:text-red-400" />
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,image/*" onChange={handleFileChange} />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-gold-400 font-medium text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Nội dung & Số liệu thực tế của Tổ
          </label>
          <textarea
            required
            rows={5}
            placeholder="VD: 100% giáo viên thực hiện đúng PPCT, đã tổ chức 02 tiết thao giảng loại tốt, còn 01 giáo viên chưa hoàn thành học bạ điện tử..."
            className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold-500 resize-none"
            value={formData.contextData}
            onChange={(e) => setFormData({ ...formData, contextData: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-5 rounded-xl font-bold text-xl uppercase tracking-wider flex items-center justify-center gap-3 ${
            isGenerating ? 'bg-slate-700 text-slate-400' : 'bg-gradient-to-r from-gold-600 to-gold-400 text-navy-900'
          }`}
        >
          {isGenerating ? "Đang Phân Tích Chuyên Môn..." : "Soạn Thảo Ngay"}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
