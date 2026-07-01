import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { ChevronLeft, Check, Code2, Copy } from "lucide-react";
import { useState } from "react";

export default function Chapter() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const chapterId = Number(window.location.pathname.split("/").pop() || 0);

  const { data: chapter, isLoading: chapterLoading } = trpc.chapters.getById.useQuery({ id: chapterId });
  const { data: lessons, isLoading: lessonsLoading } = trpc.lessons.getByChapterId.useQuery({ chapterId });
  const { data: progress } = trpc.progress.getChapterProgress.useQuery({ chapterId }, { enabled: isAuthenticated });
  const utils = trpc.useUtils();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const markLessonMutation = trpc.progress.markLessonComplete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.progress.getChapterProgress.invalidate(),
        utils.progress.getUserProgress.invalidate(),
      ]);
    },
  });

  if (chapterLoading || lessonsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-300 border-t-[hsl(var(--primary))] animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Đang tải chương học...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Không tìm thấy chương học</p>
          <Button onClick={() => setLocation("/roadmap")}>Quay lại lộ trình</Button>
        </div>
      </div>
    );
  }

  const handleCopyCode = (code: string, lessonId: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(lessonId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMarkComplete = (lessonId: number) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để đánh dấu bài học đã hoàn thành");
      return;
    }
    markLessonMutation.mutate({ chapterId, lessonId });
  };

  const completedLessons = progress?.filter(p => p.lessonId && p.completed === 1).length || 0;
  const totalLessons = lessons?.length || 0;
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="bg-white border-b border-neutral-200">
        <div className="container py-8">
          <Button variant="ghost" onClick={() => setLocation("/roadmap")} className="mb-4 text-neutral-600 hover:text-neutral-900">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Quay lại lộ trình
          </Button>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-semibold">
                CHAPTER {chapter.order}
              </span>
              <h1 className="text-4xl font-bold text-neutral-900 mt-3">{chapter.title}</h1>
              <p className="text-lg text-neutral-600 mt-2">{chapter.description}</p>
            </div>

            {isAuthenticated && (
              <div className="text-right">
                <div className="text-3xl font-bold text-[hsl(var(--primary))]">{completionPercentage}%</div>
                <p className="text-neutral-600 text-sm">Hoàn thành</p>
              </div>
            )}
          </div>

          {isAuthenticated && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">
                  {completedLessons}/{totalLessons} bài học đã hoàn thành
                </span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container py-12">
        {chapter.content && (
          <Card className="p-8 mb-12">
            <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed">{chapter.content}</div>
          </Card>
        )}

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-neutral-900">Bài học</h2>

          {lessons?.map((lesson) => {
            const isCompleted = progress?.some(p => p.lessonId === lesson.id && p.completed === 1);

            return (
              <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6 border-b border-neutral-200 bg-neutral-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-neutral-600">LESSON {lesson.order}</span>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] text-xs font-semibold">
                            <Check className="w-3 h-3" />
                            Đã hoàn thành
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">{lesson.title}</h3>
                      <p className="text-neutral-600 mt-2">{lesson.description}</p>
                    </div>

                    {isAuthenticated && (
                      <Button
                        onClick={() => handleMarkComplete(lesson.id)}
                        variant={isCompleted ? "default" : "outline"}
                        className={isCompleted ? "bg-[hsl(var(--success))] text-white" : ""}
                      >
                        {isCompleted ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Đã hoàn thành
                          </>
                        ) : (
                          "Đánh dấu hoàn thành"
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {lesson.content && (
                  <div className="p-6 border-b border-neutral-200">
                    <h4 className="font-bold text-neutral-900 mb-3">Lý thuyết, bài tập và milestone</h4>
                    <div className="text-neutral-700 leading-relaxed whitespace-pre-wrap">{lesson.content}</div>
                  </div>
                )}

                {lesson.codeSnippet && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                        Ví dụ code
                      </h4>
                      <Button size="sm" variant="outline" onClick={() => handleCopyCode(lesson.codeSnippet || "", lesson.id)} className="gap-2">
                        {copiedId === lesson.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Đã sao chép
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Sao chép
                          </>
                        )}
                      </Button>
                    </div>

                    <pre className="code-block mb-6">
                      <code>{lesson.codeSnippet}</code>
                    </pre>

                    {lesson.codeExplanation && (
                      <div className="bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 rounded-lg p-4">
                        <h5 className="font-bold text-neutral-900 mb-2">Giải thích code</h5>
                        <div className="text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed">{lesson.codeExplanation}</div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Button variant="outline" onClick={() => setLocation("/roadmap")}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Quay lại lộ trình
          </Button>

          {chapter.order < 6 && (
            <Button
              onClick={() => setLocation(`/chapter/${chapter.order + 1}`)}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
            >
              Chương tiếp theo
              <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
