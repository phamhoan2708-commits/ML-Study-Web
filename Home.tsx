import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { BookOpen, Code2, TrendingUp, Zap, Users, Award } from "lucide-react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-300 border-t-[hsl(var(--primary))] animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">ML Academy</span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Button variant="ghost" onClick={() => setLocation("/roadmap")} className="text-neutral-700 hover:text-neutral-900">
                  Lộ trình
                </Button>
                <Button variant="ghost" onClick={() => setLocation("/progress")} className="text-neutral-700 hover:text-neutral-900">
                  Tiến độ
                </Button>
                <Button variant="ghost" onClick={() => setLocation("/resources")} className="text-neutral-700 hover:text-neutral-900">
                  Tài liệu
                </Button>
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </>
            ) : (
              <Button
                onClick={() => window.location.href = getLoginUrl()}
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section className="container py-20 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-semibold">
              Bắt đầu hành trình Machine Learning của bạn
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Học <span className="gradient-text">Python & Machine Learning</span> từ cơ bản đến nâng cao
          </h1>

          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Một nền tảng học tập toàn diện với 6 chương, ví dụ code có giải thích từng dòng và dự án thực tế từ dữ liệu đến triển khai.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {isAuthenticated && user ? (
              <>
                <Button
                  onClick={() => setLocation("/roadmap")}
                  className="px-8 py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white rounded-lg font-semibold text-lg"
                >
                  Bắt đầu học ngay
                </Button>
                <Button
                  onClick={() => setLocation("/project")}
                  variant="outline"
                  className="px-8 py-3 border-2 border-neutral-300 text-neutral-900 rounded-lg font-semibold text-lg hover:bg-neutral-50"
                >
                  Xem dự án
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => window.location.href = getLoginUrl()}
                  className="px-8 py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white rounded-lg font-semibold text-lg"
                >
                  Đăng nhập để bắt đầu
                </Button>
                <Button
                  onClick={() => setLocation("/roadmap")}
                  variant="outline"
                  className="px-8 py-3 border-2 border-neutral-300 text-neutral-900 rounded-lg font-semibold text-lg hover:bg-neutral-50"
                >
                  Xem lộ trình
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[hsl(var(--primary))]">6</div>
              <p className="text-neutral-600 text-sm">Chương học</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[hsl(var(--primary))]">18</div>
              <p className="text-neutral-600 text-sm">Bài học</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[hsl(var(--primary))]">1</div>
              <p className="text-neutral-600 text-sm">Dự án</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 sm:py-28">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-4">Tính năng chính</h2>
        <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto">
          Mọi thứ bạn cần để học Machine Learning theo lộ trình rõ ràng và có sản phẩm cuối khóa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Lộ trình 6 chương",
              description: "Từ Python cơ bản đến Streamlit Frontend, mỗi chương có lý thuyết, ví dụ và bài tập thực hành."
            },
            {
              icon: Code2,
              title: "Code có giải thích",
              description: "Xem code mẫu với giải thích từng dòng để hiểu cách chương trình hoạt động."
            },
            {
              icon: TrendingUp,
              title: "Theo dõi tiến độ",
              description: "Xem tỷ lệ hoàn thành tổng thể và tiến độ riêng của từng chương."
            },
            {
              icon: Zap,
              title: "Dự án thực tế",
              description: "Xây dựng Student Success Predictor, một hệ thống ML hoàn chỉnh từ A đến Z."
            },
            {
              icon: Award,
              title: "Cheat sheets",
              description: "Tài liệu tham khảo nhanh cho Pandas, Scikit-learn và FastAPI."
            },
            {
              icon: Users,
              title: "Học theo sản phẩm",
              description: "Mỗi kỹ năng mới đều được nối vào dự án cuối khóa để bạn thấy ngay ứng dụng thực tế."
            }
          ].map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-all">
              <feature.icon className="w-12 h-12 text-[hsl(var(--primary))] mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-20 sm:py-28">
        <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-lg mb-8 opacity-90">Đi theo lộ trình, hoàn thành từng bài và biến kiến thức thành dự án ML chạy được.</p>
          {isAuthenticated && user ? (
            <Button
              onClick={() => setLocation("/roadmap")}
              className="px-8 py-3 bg-white text-[hsl(var(--primary))] hover:bg-neutral-100 rounded-lg font-semibold text-lg"
            >
              Bắt đầu học ngay
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = getLoginUrl()}
              className="px-8 py-3 bg-white text-[hsl(var(--primary))] hover:bg-neutral-100 rounded-lg font-semibold text-lg"
            >
              Đăng nhập để bắt đầu
            </Button>
          )}
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
        <div className="container text-center text-neutral-600 text-sm">
          <p>&copy; 2026 ML Academy. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
