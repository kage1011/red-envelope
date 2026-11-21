# 🧧 WEB LÌ XÌ & ĐẠI TIỆC TẤT NIÊN TẾT ĐINH MÙI 2027
> Thiết kế và chuẩn hóa toàn diện theo Design Intelligence System từ **`ui-ux-pro-max-skill`**

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT

1. **Chuẩn Hóa UI/UX Pro Max (`ui-ux-pro-max-skill`):**
   - **Hệ thống Design Tokens 3 tầng:** Toàn bộ Primitive, Semantic và Component Tokens được định nghĩa tập trung tại `css/tokens.css`.
   - **Tài liệu Design System Master:** Lưu trữ tại `design-system/red-envelope/MASTER.md`.
   - **Quy chuẩn Pro-Rules (`pro-rules.md`):** Thay thế 100% emoji trên các nút điều khiển, thanh điều hướng, modal bằng **Vector SVG Icons** sắc nét (`js/components/icons.js`), không bị vỡ font hay biến dạng giữa các hệ điều hành iOS/Android/Windows.
   - **Micro-interactions:** Motion timing `cubic-bezier(0.16, 1, 0.3, 1)` từ $160\text{ms} - 320\text{ms}$, hỗ trợ `prefers-reduced-motion` theo tiêu chuẩn trợ năng WCAG AA.
2. **Hoạt Động 100% Offline (Zero External CDN):**
   - Không phụ thuộc bất kỳ file CSS, JS, font hay icon nào ngoài internet.
   - Nhạc ngũ cung đón xuân, pháo nổ, sập tháp, chuông lộc được tổng hợp trực tiếp bằng **Web Audio API** nội bộ.
   - Cánh hoa mai đào rơi tự nhiên (Ambient) và pháo hoa nổ đa tầng (Celebration) bằng **HTML5 Canvas** nội bộ.
3. **Kiến Trúc 6 Trang Hoàn Chỉnh:**
   - **Trang chủ (`/`):** Hero Tết 2027, thẻ 4 game hiển thị tồn kho real-time, live ticker neon, bảng vinh danh, thể lệ bàn tiệc.
   - **Game 1 (`/game-1`):** Gỡ Bom Bao Lì Xì (Lưới 12 bao gấm 3D, 10 giải giới hạn, bom pháo nổ rung giật màn hình).
   - **Game 2 (`/game-2`):** Xếp Gỗ Tháp Lộc (Tháp lộc Canvas physics, 10 tầng thắng giải, sập tháp phạt bia).
   - **Game 3 (`/game-3`):** Soi Góc Đoán Người (Tia quét Scanner, đếm ngược 15s, nút mở full ảnh, đoán đúng/sai).
   - **Game Phụ (`/game-bonus`):** Bốc Quẻ "Lộc Nở Trăm Hoa" (Hũ quẻ sơn mài dát vàng, quà không giới hạn, Thẻ Thần Men đặc quyền, không bị phạt).
   - **Trang Admin (`/admin`):** Quản trị 4 phân hệ (Giải thưởng, Hình phạt, Người chơi, Xuất Excel/CSV UTF-8 BOM).

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY (2 CÁCH)

### Cách 1: Chạy Server Phát Sóng Cho Cả Bàn Tiệc (Khuyên Dùng)
Mở terminal tại thư mục dự án và chạy:

```bash
node server.js
# Hoặc
npm start
```
Terminal sẽ hiển thị IP mạng LAN nội bộ (ví dụ: `http://192.168.1.15:3000`). Cả bàn tiệc chỉ cần kết nối chung mạng WiFi/Hotspot và truy cập bằng điện thoại để cùng chơi!

---

### Cách 2: Mở Trực Tiếp File HTML (Dành Cho Máy Chiếu / Laptop)
Nhấp đúp chuột trực tiếp vào file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox). Chạy mượt mà ngay cả khi ngắt kết nối mạng hoàn toàn!
