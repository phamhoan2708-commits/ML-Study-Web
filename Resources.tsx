import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { BookOpen, Search, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Resources() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const { data: cheatSheets, isLoading } = trpc.cheatSheets.list.useQuery();

  const categories = ["Pandas", "Scikit-learn", "FastAPI"];

  const filteredSheets = cheatSheets?.filter(sheet => {
    const matchesSearch = sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.searchKeywords?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || sheet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleCopyContent = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-300 border-t-[hsl(var(--primary))] animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container py-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-[hsl(var(--primary))]" />
            <span className="text-sm font-semibold text-[hsl(var(--primary))]">RESOURCE LIBRARY</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">
            Cheat Sheets & References
          </h1>
          <p className="text-lg text-neutral-600">
            Quick reference guides for Pandas, Scikit-learn, and FastAPI
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {/* Search and filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search cheat sheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-[hsl(var(--primary))] text-white" : ""}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-[hsl(var(--primary))] text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Cheat sheets */}
        <div className="space-y-6">
          {filteredSheets.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-neutral-600 text-lg">
                No cheat sheets found. Try a different search or category.
              </p>
            </Card>
          ) : (
            filteredSheets.map(sheet => (
              <Card key={sheet.id} className="overflow-hidden hover:shadow-lg transition-all">
                {/* Header */}
                <div className="p-6 border-b border-neutral-200 bg-neutral-50">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-semibold mb-2">
                        {sheet.category}
                      </span>
                      <h3 className="text-2xl font-bold text-neutral-900">
                        {sheet.title}
                      </h3>
                    </div>
                    <Button
                      onClick={() => handleCopyContent(sheet.content || "", sheet.id)}
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      {copiedId === sheet.id ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Content */}
                {sheet.content && (
                  <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="prose prose-sm max-w-none">
                      <pre className="code-block whitespace-pre-wrap text-sm">
                        <code>{sheet.content}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
                  <div className="text-sm text-neutral-600">
                    {sheet.searchKeywords && (
                      <>
                        <span className="font-semibold">Keywords:</span> {sheet.searchKeywords}
                      </>
                    )}
                  </div>
                  <Button
                    onClick={() => setLocation("/roadmap")}
                    variant="ghost"
                    className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-dark))]"
                  >
                    Use in learning →
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Tips section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="font-bold text-neutral-900 mb-2">💡 Pandas Tips</h4>
            <p className="text-neutral-600 text-sm">
              Use Pandas for data manipulation and cleaning. Master DataFrame operations for efficient data processing.
            </p>
          </Card>
          <Card className="p-6">
            <h4 className="font-bold text-neutral-900 mb-2">🤖 ML Tips</h4>
            <p className="text-neutral-600 text-sm">
              Scikit-learn provides ready-to-use ML algorithms. Always split your data into train/test sets.
            </p>
          </Card>
          <Card className="p-6">
            <h4 className="font-bold text-neutral-900 mb-2">⚡ API Tips</h4>
            <p className="text-neutral-600 text-sm">
              FastAPI makes building APIs simple. Use Pydantic models for request validation and type safety.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-[hsl(var(--secondary))]/5 rounded-2xl border border-[hsl(var(--primary))]/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Ready to apply these concepts?
          </h3>
          <p className="text-neutral-600 mb-6">
            Start learning with our comprehensive curriculum and use these cheat sheets as reference materials.
          </p>
          <Button
            onClick={() => setLocation("/roadmap")}
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
          >
            Go to Learning Path
          </Button>
        </div>
      </div>
    </div>
  );
}
