import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Zap, CheckCircle, BookOpen, Code2, Rocket, Database } from "lucide-react";

export default function Project() {
  const [, setLocation] = useLocation();

  const projectPhases = [
    {
      chapter: 1,
      title: "Python Foundation",
      goal: "Tạo dữ liệu mẫu, hàm validate và cấu trúc thư mục project.",
      tasks: ["Tạo list[dict] học sinh", "Viết hàm kiểm tra điểm hợp lệ", "Ghi dữ liệu mẫu ra CSV"]
    },
    {
      chapter: 2,
      title: "Pandas",
      goal: "Đọc, kiểm tra, làm sạch và tạo feature từ dataset.",
      tasks: ["Đọc students.csv", "Xử lý missing/duplicate", "Tạo students_features.csv"]
    },
    {
      chapter: 3,
      title: "EDA & Visualization",
      goal: "Hiểu dữ liệu trước khi huấn luyện model.",
      tasks: ["Vẽ histogram/boxplot", "Phân tích correlation", "Viết EDA summary"]
    },
    {
      chapter: 4,
      title: "Scikit-learn",
      goal: "Huấn luyện pipeline dự báo điểm cuối kỳ.",
      tasks: ["Chia train/test", "Tạo preprocessing pipeline", "Đánh giá MAE/RMSE/R² và lưu model"]
    },
    {
      chapter: 5,
      title: "FastAPI Backend",
      goal: "Đóng gói model thành API dự báo.",
      tasks: ["Tạo Pydantic schema", "Load model joblib", "Test POST /predict"]
    },
    {
      chapter: 6,
      title: "Streamlit & Deployment",
      goal: "Tạo demo sản phẩm và chuẩn bị bàn giao.",
      tasks: ["Tạo form nhập liệu", "Hiển thị prediction/insight", "Viết README và checklist demo"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white">
        <div className="container py-16">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-8 h-8" />
            <span className="text-sm font-semibold opacity-90">CAPSTONE PROJECT</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Student Success Predictor</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Xây dựng project Machine Learning hoàn chỉnh trong 6 tuần: chuẩn bị dữ liệu, EDA, huấn luyện model, tạo API và demo giao diện.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Mục tiêu project</h3>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Dự báo điểm cuối kỳ của sinh viên dựa trên các feature có sẵn trước kỳ thi:
            </p>
            <ul className="space-y-2 text-neutral-600">
              {["Giờ học mỗi tuần", "Tỷ lệ điểm danh", "Điểm trước đó", "Lớp, giới tính, số buổi vắng"].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--success))] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Dataset và nguồn</h3>
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-1" />
              <p className="text-neutral-600">
                Bản học tập dùng dataset mẫu trong thư mục <code>public/data/students.csv</code>. Khi làm nghiêm túc, có thể thay bằng UCI Student Performance Dataset và giữ nguyên pipeline.
              </p>
            </div>
            <ul className="space-y-3">
              {["Data Pipeline: load, clean, feature engineering", "ML Model: scikit-learn Pipeline + Random Forest", "REST API: FastAPI endpoint /predict", "Demo UI: Streamlit form + insight"].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <h2 className="text-3xl font-bold text-neutral-900 mb-8">Lộ trình project theo chương</h2>

        <div className="space-y-6">
          {projectPhases.map((phase) => (
            <Card key={phase.chapter} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--primary))] text-white text-sm font-bold">
                        {phase.chapter}
                      </span>
                      <span className="text-sm font-semibold text-neutral-600">CHAPTER {phase.chapter}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900">{phase.title}</h3>
                    <p className="text-neutral-600 mt-1">{phase.goal}</p>
                  </div>
                  <Button onClick={() => setLocation(`/chapter/${phase.chapter}`)} variant="outline" className="flex-shrink-0">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Xem chương
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-neutral-900 mb-3">Việc cần hoàn thành:</h4>
                <ul className="space-y-2">
                  {phase.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--primary))] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]"></div>
                      </div>
                      <span className="text-neutral-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">Bắt đầu từ chương 1</h3>
          <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
            Đi đúng thứ tự để sau 6 tuần có notebook, model, API, UI demo và báo cáo đủ trình bày.
          </p>
          <Button onClick={() => setLocation("/roadmap")} className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white px-8 py-3">
            <Zap className="w-4 h-4 mr-2" />
            Vào lộ trình
          </Button>
        </div>
      </div>
    </div>
  );
}
