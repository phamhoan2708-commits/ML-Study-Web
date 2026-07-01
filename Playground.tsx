import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Playground() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container py-16">
        <Card className="p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Code Playground
          </h2>
          <p className="text-neutral-600 mb-6">
            The interactive code playground is integrated into each chapter. Visit a chapter to see code examples with line-by-line explanations.
          </p>
          <Button
            onClick={() => setLocation("/roadmap")}
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white"
          >
            Go to Learning Roadmap
          </Button>
        </Card>
      </div>
    </div>
  );
}
