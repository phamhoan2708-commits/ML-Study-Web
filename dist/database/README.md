# Database

Thư mục này chuẩn bị database PostgreSQL cho bản deploy.

## Files

- `schema-postgres.sql`: tạo bảng `chapters`, `lessons`, `cheat_sheets`, `student_samples`, `progress`.
- `seed-students.sql`: seed dataset mẫu cho bảng `student_samples`.

## Cách dùng

1. Tạo PostgreSQL database trên Vercel Postgres, Neon hoặc Supabase.
2. Chạy `schema-postgres.sql` trong SQL editor.
3. Chạy `seed-students.sql`.

Hiện tại web Vite đọc giáo trình từ `src/lib/curriculum.ts` để deploy frontend nhanh. Schema đã chuẩn bị sẵn để bước tiếp theo chuyển curriculum/progress sang database thật.
