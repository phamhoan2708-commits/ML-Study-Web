# Deployment Checklist

## Trước khi deploy

- [ ] Cấu hình `DATABASE_URL` trên môi trường production.
- [ ] Chạy migration tương ứng với `0001_outgoing_mauler.sql`.
- [ ] Seed dữ liệu lần đầu bằng `node seed-data.mjs`.
- [ ] Kiểm tra OAuth callback/login hoạt động trên domain production.
- [ ] Kiểm tra các route chính: `/`, `/roadmap`, `/chapter/1`, `/progress`, `/project`, `/resources`.
- [ ] Kiểm tra thao tác đánh dấu hoàn thành bài học với tài khoản đã đăng nhập.
- [ ] Kiểm tra thư viện cheat sheet hiển thị và copy nội dung được.

## Rủi ro còn lại

- Chưa có `package.json` trong workspace hiện tại nên chưa thể chạy build/test từ thư mục này.
- Script seed chưa idempotent; cần reset database hoặc thêm cơ chế upsert nếu chạy nhiều lần.
- Dashboard hiện có một vài chỉ số minh họa như streak và hoạt động gần nhất; cần nối dữ liệu thật nếu muốn dùng production.
