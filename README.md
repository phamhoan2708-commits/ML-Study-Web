# ML Academy - Python for Machine Learning Learning Platform

Nền tảng học Python và Machine Learning theo lộ trình 6 chương, có theo dõi tiến độ, thư viện cheat sheet và dự án cuối khóa Student Success Predictor.

## Tính năng

- Lộ trình học gồm 6 chương, 24 bài học: Python Foundation, Pandas, EDA, Scikit-learn, FastAPI và Streamlit.
- Trang chi tiết chương với bài học, ví dụ code và giải thích từng dòng.
- Theo dõi tiến độ học tập theo từng bài và từng chương.
- Dự án cuối khóa hướng dẫn xây dựng hệ thống dự báo kết quả học tập.
- Thư viện cheat sheet cho Pandas, Scikit-learn và FastAPI.
- Dataset mẫu, starter project ML và schema PostgreSQL để chuẩn bị deploy.

## Cấu trúc chính

- `App.tsx`: định nghĩa routing cho toàn bộ ứng dụng.
- `Home.tsx`: trang giới thiệu và điều hướng nhanh.
- `Roadmap.tsx`: lộ trình học 6 chương.
- `Chapter.tsx`: nội dung chương, bài học và thao tác hoàn thành bài.
- `Progress.tsx`: dashboard tiến độ học tập.
- `Project.tsx`: hướng dẫn dự án Student Success Predictor.
- `Resources.tsx`: thư viện cheat sheet.
- `schema.ts`: schema Drizzle cho users, chapters, lessons, progress và cheatSheets.
- `db.ts`: hàm truy vấn dữ liệu.
- `routers.ts`: tRPC router cho frontend.
- `seed-data.mjs`: dữ liệu mẫu để seed database.
- `src/lib/curriculum.ts`: dữ liệu giáo trình chi tiết đang dùng trong web.
- `database/schema-postgres.sql`: schema PostgreSQL cho deploy.
- `public/data/students.csv`: dataset học tập mẫu.
- `project-starter/`: starter code cho Student Success Predictor.
- `DEPLOY_VERCEL.md`: hướng dẫn deploy lên Vercel.
- `CURRICULUM_SOURCES.md`: nguồn tham khảo chính thức/uy tín.

## Thiết lập dữ liệu

Tạo file `.env` có `DATABASE_URL`, sau đó chạy seed:

```bash
node seed-data.mjs
```

Script seed sẽ thêm 6 chương, 18 bài học và 3 cheat sheet vào database.

## Ghi chú triển khai

- Ứng dụng cần database MySQL tương thích với schema trong `schema.ts`.
- OAuth/login đang phụ thuộc vào hạ tầng có sẵn của template qua `getLoginUrl()` và `/api/oauth/login`.
- Nếu seed lại nhiều lần trên database cũ, dữ liệu có thể bị trùng vì script hiện chỉ insert thêm.
