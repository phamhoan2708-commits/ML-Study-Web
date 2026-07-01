import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { ChevronRight, BookOpen, Code2, BarChart3, Brain, Zap, Palette, Target } from "lucide-react";

export default function Roadmap() {
  const [, setLocation] = useLocation();
  const { data: chapters, isLoading } = trpc.chapters.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-300 border-t-[hsl(var(--primary))] animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải lộ trình...</p>
        </div>
      </div>
    );
  }

  const chapterIcons = [BookOpen, Code2, BarChart3, Brain, Zap, Palette];
  const chapterTopics = [
    ["Biến", "List", "Dictionary", "Vòng lặp"],
    ["DataFrame", "CSV", "Cleaning", "Groupby"],
    ["Histogram", "Boxplot", "Scatter", "Heatmap"],
    ["Preprocessing", "Train/Test", "Random Forest", "Evaluation"],
    ["FastAPI", "Endpoints", "Models", "Integration"],
    ["Streamlit", "UI", "Forms", "Deployment"],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="bg-white border-b border-neutral-200">
        <div className="container py-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-[hsl(var(--primary))]" />
            <span className="text-sm font-semibold text-[hsl(var(--primary))]">LEARNING PATH</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Lộ trình học Python & ML</h1>
          <p className="text-lg text-neutral-600">
            6 chương từ cơ bản đến nâng cao, mỗi chương có lý thuyết, ví dụ code và bài tập gắn với dự án cuối khóa.
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="space-y-6">
          {chapters?.map((chapter, idx) => {
            const Icon = chapterIcons[idx] || BookOpen;
            const topics = chapterTopics[idx] || [];

            return (
              <div key={chapter.id} className="relative">
                {idx < chapters.length - 1 && (
                  <div className="absolute left-8 top-24 w-1 h-12 bg-gradient-to-b from-[hsl(var(--primary))] to-transparent"></div>
                )}

                <Card className="p-8 hover:shadow-lg transition-all cursor-pointer group" onClick={() => setLocation(`/chapter/${chapter.id}`)}>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 flex items-center justify-center group-hover:from-[hsl(var(--primary))]/20 group-hover:to-[hsl(var(--secondary))]/20 transition-all">
                        <Icon className="w-8 h-8 text-[hsl(var(--primary))]" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="inline-block mb-2">
                            <span className="px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-semibold">
                              CHAPTER {chapter.order}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-[hsl(var(--primary))] transition-colors">
                            {chapter.title}
                          </h3>
                        </div>
                        <ChevronRight className="w-6 h-6 text-neutral-400 group-hover:text-[hsl(var(--primary))] transition-colors flex-shrink-0 mt-1" />
                      </div>

                      <p className="text-neutral-600 mb-4">{chapter.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {topics.map(topic => (
                          <span key={topic} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(`/chapter/${chapter.id}`);
                        }}
                        className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
                      >
                        Xem chi tiết <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-[hsl(var(--secondary))]/5 rounded-2xl border border-[hsl(var(--primary))]/20 p-8">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-7 h-7 text-[hsl(var(--primary))]" />
            <h3 className="text-2xl font-bold text-neutral-900">Áp dụng kiến thức vào dự án</h3>
          </div>
          <p className="text-neutral-600 mb-6">
            Sau khi hoàn thành các chương, bạn sẽ xây dựng Student Success Predictor, một hệ thống ML hoàn chỉnh từ dữ liệu đến giao diện.
          </p>
          <Button
            onClick={() => setLocation("/project")}
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
          >
            Xem hướng dẫn dự án
          </Button>
        </div>
      </div>
    </div>
  );
}
