
import { ReportCategory } from './types';

export const APP_NAME = "Trợ lí Tổ trưởng chuyên môn";
export const APP_DESCRIPTION = "Phụ trách tham mưu văn bản chuyên môn và kế hoạch chuyên môn";

export const REPORT_CATEGORIES: ReportCategory[] = [
  {
    id: 'I',
    name: 'I. Kế hoạch & Báo cáo chung của Tổ',
    subTypes: [
      'Kế hoạch giáo dục tổ chuyên môn (Năm học)',
      'Kế hoạch hoạt động chuyên môn tháng/tuần',
      'Báo cáo sơ kết học kỳ I của tổ',
      'Báo cáo tổng kết năm học của tổ',
      'Báo cáo tháng của tổ chuyên môn',
      'Biên bản họp tổ chuyên môn định kỳ',
      'Biên bản họp xét thi đua đợt 1',
      'Biên bản họp xét thi đua đợt 2',
      'Biên bản họp xét thi đua đợt 3',
      'Biên bản họp xét thi đua đợt 4'
    ]
  },
  {
    id: 'II',
    name: 'II. Quản lý dạy học & Chương trình',
    subTypes: [
      'Báo cáo thực hiện chương trình (Tiến độ chương trình)',
      'Báo cáo chất lượng bộ môn (Theo khối/lớp)',
      'Báo cáo phân công giảng dạy và dạy thay',
      'Báo cáo rà soát ma trận, đề kiểm tra định kỳ',
      'Báo cáo ứng dụng CNTT và thiết bị dạy học',
      'Kế hoạch dạy học các môn học (Phân phối chương trình)'
    ]
  },
  {
    id: 'III',
    name: 'III. Hoạt động Chuyên đề & Thao giảng',
    subTypes: [
      'Báo cáo sinh hoạt chuyên môn theo nghiên cứu bài học',
      'Kế hoạch thao giảng, dự giờ cấp tổ',
      'Báo cáo kết quả thực hiện chuyên đề dạy học',
      'Tổng hợp nhận xét, đánh giá tiết dạy của giáo viên',
      'Báo cáo hội giảng chào mừng các ngày lễ'
    ]
  },
  {
    id: 'IV',
    name: 'IV. Bồi dưỡng & Kiểm tra nội bộ',
    subTypes: [
      'Báo cáo kiểm tra hồ sơ sổ sách giáo viên',
      'Kế hoạch bồi dưỡng thường xuyên giáo viên trong tổ',
      'Báo cáo đánh giá chuẩn nghề nghiệp giáo viên (Cấp tổ)',
      'Báo cáo bồi dưỡng giáo viên sử dụng SGK mới',
      'Nhận xét, đánh giá viên chức hằng tháng'
    ]
  },
  {
    id: 'V',
    name: 'V. Hoạt động Học sinh',
    subTypes: [
      'Kế hoạch bồi dưỡng học sinh giỏi cấp tổ',
      'Báo cáo kết quả phụ đạo học sinh yếu kém',
      'Báo cáo học sinh tham gia các hội thi chuyên môn',
      'Kế hoạch tổ chức hoạt động ngoại khóa chuyên môn'
    ]
  },
  {
    id: 'VI',
    name: 'VI. Báo cáo Chuyển đổi số & Hồ sơ điện tử',
    subTypes: [
      'Báo cáo triển khai hồ sơ sổ sách điện tử của tổ',
      'Báo cáo sử dụng học bạ điện tử và chữ ký số',
      'Báo cáo xây dựng kho học liệu số của tổ'
    ]
  }
];
