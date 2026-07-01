# Deploy Web Lên Vercel

Tài liệu này hướng dẫn deploy phần web React/Vite lên Vercel và chuẩn bị database PostgreSQL cho nội dung giáo trình/progress.

## 1. Kiểm tra local

```bash
npm install
npm run build
npm run dev
```

Mở:

```text
http://127.0.0.1:5173/
```

## 2. Đẩy code lên GitHub

```bash
git init
git add .
git commit -m "Build ML Academy curriculum platform"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Nếu thư mục đã là git repo thì bỏ qua `git init` và `git remote add`.

## 3. Import project vào Vercel

1. Vào https://vercel.com/new
2. Chọn repository GitHub.
3. Framework Preset: `Vite`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Bấm Deploy.

Vercel sẽ tự nhận Vite theo tài liệu official Vercel cho Vite.

## 4. Tạo PostgreSQL database

Bạn có 2 lựa chọn phổ biến:

- Vercel Postgres: tạo trực tiếp trong dashboard Vercel.
- Neon/Supabase PostgreSQL: tạo database bên ngoài rồi copy connection string vào Vercel.

Sau khi có database, thêm biến môi trường trong Vercel:

```text
POSTGRES_URL=postgresql://...
```

## 5. Chạy schema database

Mở SQL editor của Vercel Postgres/Neon/Supabase và chạy:

```sql
-- Copy nội dung file database/schema-postgres.sql
```

Sau đó seed dataset mẫu:

```sql
-- Copy nội dung file database/seed-students.sql
```

Hiện tại web đang đọc giáo trình từ bundle TypeScript trong `src/lib/curriculum.ts` để deploy nhanh và ổn định. Database đã được chuẩn bị để bước tiếp theo có thể:

- lưu progress user thật,
- quản lý nội dung giáo trình từ admin/database,
- thay dữ liệu mẫu bằng dataset thật.

## 6. Deploy lại sau khi thêm env

Trong Vercel dashboard:

1. Vào Project Settings.
2. Chọn Environment Variables.
3. Thêm `POSTGRES_URL`.
4. Vào Deployments.
5. Redeploy bản mới nhất.

## 7. Kiểm tra sau deploy

Các route cần mở thử:

- `/`
- `/roadmap`
- `/chapter/1`
- `/project`
- `/resources`
- `/progress`

Checklist:

- Trang không còn overlay lỗi Vite.
- Tiếng Việt hiển thị đúng.
- Lộ trình có 6 chương.
- Mỗi chương có 4 bài học.
- Nút đánh dấu hoàn thành cập nhật tiến độ.
- Resources có cheat sheet.

## 8. Lưu ý về FastAPI/Streamlit project starter

Thư mục `project-starter/` là project ML Python riêng cho sinh viên luyện tập. Vercel phù hợp để deploy web React/Vite, nhưng không phải lựa chọn tốt nhất để chạy FastAPI + Streamlit + model file trong cùng project học tập.

Khuyến nghị deploy:

- Web giáo trình: Vercel.
- FastAPI model API: Render, Railway, Fly.io hoặc Hugging Face Spaces.
- Streamlit demo: Streamlit Community Cloud.

Nếu muốn gom toàn bộ vào một hệ thống production, nên chuyển FastAPI thành backend riêng và để web gọi qua `VITE_API_URL`.
