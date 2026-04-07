
import React, { useState } from 'react';
import { REPORT_CATEGORIES } from '../constants';
import { BookOpen, ChevronDown, ChevronUp, FileText, X, Copy, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const getTemplatePreview = (name: string): string => {
  const title = name.toUpperCase();
  
  if (name.includes('Kế hoạch') || name.includes('phân phối')) {
    return `
**TRƯỜNG ...**  
**TỔ CHUYÊN MÔN: ...**  
---
**KẾ HOẠCH GIÁO DỤC TỔ CHUYÊN MÔN**  
**NĂM HỌC 20... - 20...**

# I. ĐẶC ĐIỂM TÌNH HÌNH
1. **Số liệu đội ngũ:** Tổng số GV: ... (Biên chế: ..., Hợp đồng: ...)
2. **Cơ sở vật chất:** Số phòng học bộ môn, thiết bị dạy học hiện có...
3. **Thuận lợi và khó khăn:**

# II. CÁC MỤC TIÊU CHỈ TIÊU PHẤN ĐẤU
1. **Chất lượng giáo dục bộ môn:**
   - Giỏi/Tốt: ...%
   - Khá: ...%
2. **Danh hiệu thi đua:**
   - Tập thể: ...
   - Cá nhân: ...

# III. NỘI DUNG VÀ GIẢI PHÁP THỰC HIỆN
1. Thực hiện chương trình và kế hoạch dạy học...
2. Đổi mới phương pháp giảng dạy và kiểm tra đánh giá...
3. Hoạt động bồi dưỡng thường xuyên và sinh hoạt chuyên môn...

**HIỆU TRƯỞNG DUYỆT**                    **TỔ TRƯỞNG**  
*(Ký, đóng dấu)*                         *(Ký, ghi rõ họ tên)*
`;
  }

  if (name.includes('nghiên cứu bài học') || name.includes('chuyên đề')) {
    return `
**TỔ CHUYÊN MÔN: ...**  
---
**BÁO CÁO SINH HOẠT CHUYÊN MÔN THEO NGHIÊN CỨU BÀI KHỐI**

# I. THÔNG TIN CHUNG
- Môn học: ...
- Người thực hiện tiết dạy minh họa: ...
- Bài dạy: ... Lớp: ...

# II. TIẾN TRÌNH THỰC HIỆN
1. **Bước 1: Xây dựng bài dạy minh họa:** Tổ thảo luận thống nhất mục tiêu, phương pháp...
2. **Bước 2: Tiến hành dạy minh họa và dự giờ:**
3. **Bước 3: Suy ngẫm và thảo luận:**
   - Tập trung vào việc học của học sinh (Học sinh học thế nào? Khó khăn ở đâu?)...

# III. ĐÁNH GIÁ VÀ VẬN DỤNG
- Những ưu điểm cần phát huy...
- Những điều chỉnh về phương pháp dạy học cho các bài học sau...

**NGƯỜI LẬP BÁO CÁO**
`;
  }

  return `
**TRƯỜNG ...**  
**TỔ CHUYÊN MÔN: ...**  
---
**${title}**

# I. NỘI DUNG CÔNG VIỆC ĐÃ THỰC HIỆN
- Đánh giá việc thực hiện nhiệm vụ chuyên môn theo tuần/tháng.
- Kết quả cụ thể: (Dạy học, dự giờ, hồ sơ sổ sách).

# II. ĐÁNH GIÁ CHUNG
1. **Ưu điểm:** ...
2. **Tồn tại:** ...

# III. KẾ HOẠCH THỜI GIAN TỚI
- Các nhiệm vụ trọng tâm: ...
- Các biện pháp khắc phục tồn tại: ...

**TỔ TRƯỞNG**
`;
};

const TemplateCatalog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[95%] mx-auto mt-8 mb-4 relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all group">
        <BookOpen className="w-5 h-5 text-gold-500" />
        <span className="text-slate-300 font-medium uppercase tracking-wider">
          {isOpen ? 'Thu gọn danh mục' : 'Kho biểu mẫu Tổ chuyên môn (Chuẩn sư phạm)'}
        </span>
        {isOpen ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
      </button>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-down">
          {REPORT_CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-slate-900/60 border border-slate-700/80 rounded-xl flex flex-col group overflow-hidden">
              <div className="bg-slate-800/50 px-5 py-4 border-b border-slate-700/50 text-gold-400 font-bold text-xs uppercase">
                {cat.name}
              </div>
              <div className="p-4 space-y-2">
                {cat.subTypes.map((sub, idx) => (
                  <div key={idx} onClick={() => setSelectedTemplate(sub)} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-white/5 group/item transition-all">
                    <Eye className="w-3 h-3 text-slate-500 group-hover/item:text-gold-500" />
                    <span className="text-slate-300 text-xs group-hover/item:text-gold-400">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={() => setSelectedTemplate(null)}></div>
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up border border-gold-500/30">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-100 border-b">
              <h3 className="text-navy-900 font-bold uppercase text-sm">{selectedTemplate}</h3>
              <X className="cursor-pointer text-slate-500" onClick={() => setSelectedTemplate(null)} />
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-white text-black">
              <div className="prose prose-sm max-w-none prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black">
                <ReactMarkdown>{getTemplatePreview(selectedTemplate)}</ReactMarkdown>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
              <button onClick={() => {navigator.clipboard.writeText(getTemplatePreview(selectedTemplate)); alert('Đã sao chép!');}} className="px-4 py-2 border rounded text-slate-700 flex items-center gap-2 hover:bg-white"><Copy className="w-4 h-4" /> Sao chép</button>
              <button onClick={() => setSelectedTemplate(null)} className="px-6 py-2 bg-navy-900 text-white rounded">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCatalog;
