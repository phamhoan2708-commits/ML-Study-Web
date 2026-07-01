import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-3">Không tìm thấy trang</h1>
        <p className="text-neutral-600 mb-6">Đường dẫn này không tồn tại trong bản demo.</p>
        <Button onClick={() => setLocation("/")}>Về trang chủ</Button>
      </div>
    </div>
  );
}
