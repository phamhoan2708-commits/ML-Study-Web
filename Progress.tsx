import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { TrendingUp, Award, Target, Calendar } from "lucide-react";

export default function Progress() {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: chapters } = trpc.chapters.list.useQuery();
  const { data: lessons } = trpc.lessons.list.useQuery();
  const { data: userProgress } = trpc.progress.getUserProgress.useQuery(undefined, { enabled: isAuthenticated });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-300 border-t-[hsl(var(--primary))] animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải tiến độ...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            Đăng nhập để xem tiến độ
          </h2>
          <p className="text-neutral-600 mb-6">
            Theo dõi hành trình học tập và tỷ lệ hoàn thành của bạn.
          </p>
          <Button
            onClick={() => window.location.href = "/api/oauth/login"}
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
          >
            Đăng nhập
          </Button>
        </Card>
      </div>
    );
  }

  const totalLessons = lessons?.length || 0;
  const completedLessons = userProgress?.filter(p => p.lessonId && p.completed === 1).length || 0;
  const overallPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Calculate per-chapter progress
  const chapterProgress = chapters?.map(chapter => {
    const chapterLessons = userProgress?.filter(p => p.chapterId === chapter.id && p.lessonId) || [];
    const totalChapterLessons = lessons?.filter(lesson => lesson.chapterId === chapter.id).length || 0;
    const completedLessons = chapterLessons.filter(p => p.completed === 1).length;
    return {
      chapter,
      completed: completedLessons,
      total: totalChapterLessons,
      percentage: totalChapterLessons > 0 ? Math.round((completedLessons / totalChapterLessons) * 100) : 0
    };
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container py-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[hsl(var(--primary))]" />
            <span className="text-sm font-semibold text-[hsl(var(--primary))]">YOUR PROGRESS</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Bảng tiến độ học tập
          </h1>
          <p className="text-lg text-neutral-600">
            Theo dõi tiến độ của bạn qua toàn bộ lộ trình.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-12">
        {/* Overall stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Overall completion */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Tiến độ tổng thể</h3>
              <Target className="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
            <div className="text-5xl font-bold text-[hsl(var(--primary))] mb-2">
              {overallPercentage}%
            </div>
            <p className="text-neutral-600">
              {completedLessons}/{totalLessons} bài học đã hoàn thành
            </p>
            <div className="mt-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
          </Card>

          {/* Streak */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Chuỗi học hiện tại</h3>
              <Award className="w-6 h-6 text-[hsl(var(--warning))]" />
            </div>
            <div className="text-5xl font-bold text-[hsl(var(--warning))] mb-2">
              3
            </div>
            <p className="text-neutral-600">
              Ngày học liên tiếp
            </p>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    day <= 3
                      ? 'bg-[hsl(var(--warning))] text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </Card>

          {/* Last activity */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Hoạt động gần nhất</h3>
              <Calendar className="w-6 h-6 text-[hsl(var(--secondary))]" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-2">
              Hôm nay
            </div>
            <p className="text-neutral-600">
              Tiếp tục lộ trình Python & ML
            </p>
            <div className="mt-4 text-sm text-neutral-500">
              Dữ liệu minh họa
            </div>
          </Card>
        </div>

        {/* Per-chapter progress */}
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Tiến độ theo chương
          </h2>

          <div className="space-y-4">
            {chapterProgress.map(({ chapter, completed, total, percentage }) => (
              <Card
                key={chapter.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setLocation(`/chapter/${chapter.id}`)}
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900">
                      {chapter.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {completed}/{total} bài học đã hoàn thành
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                      {percentage}%
                    </div>
                  </div>
                </div>

                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-[hsl(var(--secondary))]/5 rounded-2xl border border-[hsl(var(--primary))]/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Tiếp tục giữ nhịp học nhé!
          </h3>
          <p className="text-neutral-600 mb-6">
            Mỗi bài hoàn thành sẽ đưa bạn gần hơn tới dự án ML cuối khóa.
          </p>
          <Button
            onClick={() => setLocation("/roadmap")}
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
          >
            Tiếp tục học
          </Button>
        </div>
      </div>
    </div>
  );
}
