# Design System Master File - Tết Đinh Mùi 2027 (Red-Envelope)
> Được tạo và chuẩn hóa bởi `ui-ux-pro-max-skill` (Design Intelligence Skill)

---

**Project:** red-envelope (Tết Đinh Mùi 2027)  
**Style Category:** 3D & Hyperrealism + Festive Glassmorphism  
**Stack:** Vanilla Web / HTML5 / CSS3 / Web Audio API / Canvas (100% Offline)  
**Guidelines Followed:** `pro-rules.md`, `token-architecture.md`, WCAG AA Accessibility, Anti-Emoji Vector System.

---

## 🎨 1. Design Token Architecture

### Primitive & Semantic Tokens (`tokens.css`)

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-primary` | `#b91c1c` | Màu Đỏ Nhung Hoàng Gia (Primary Brand) |
| `--color-primary-dark`| `#7f1d1d` | Đỏ Rượu Vang Đậm (Container / Cards) |
| `--color-accent` | `#f59e0b` | Vàng Kim 24K (CTA, Huy hiệu, Viền lấp lánh) |
| `--color-accent-light`| `#fde047` | Vàng Kim Sáng (Tia sáng, Highlights) |
| `--color-background` | `#1a0106` | Nền Đỏ Rượu Thượng Hạng (Canvas Background) |
| `--color-surface` | `rgba(45, 3, 13, 0.85)` | Mặt kính Glassmorphism 2.0 |
| `--color-border` | `rgba(245, 158, 11, 0.4)` | Viền mạ vàng tinh xảo |
| `--color-destructive` | `#dc2626` | Trạng thái phạt bia / Bom pháo |
| `--color-success` | `#10b981` | Trạng thái trúng lì xì / Quà bonus |
| `--color-ring` | `#fbbf24` | Vòng sáng Focus Keyboard Navigation |

### Spacing Scale (8pt Grid)
* `--space-2xs`: `2px`
* `--space-xs`: `4px`
* `--space-sm`: `8px`
* `--space-md`: `16px`
* `--space-lg`: `24px`
* `--space-xl`: `32px`
* `--space-2xl`: `48px`
* `--space-3xl`: `64px`

### Typography Scale & Hierarchy
* **Display / Hero:** 48px / 3rem (Line-height 1.2, Weight 900)
* **Heading 1:** 36px / 2.25rem (Weight 800)
* **Heading 2:** 24px / 1.5rem (Weight 700)
* **Heading 3:** 18px / 1.125rem (Weight 700)
* **Body:** 16px / 1rem (Line-height 1.6, Weight 400 - 600)
* **Caption / Badges:** 13px / 0.8125rem (Weight 700, Letter-spacing 0.5px)

---

## 🚫 2. Strict Pro-Rules Enforced (`pro-rules.md`)

* ❌ **NO EMOJIS AS UI ICONS:** Toàn bộ icon chức năng trên navbar, nút bấm, bảng điều hướng, modal được thay thế bằng **100% SVG Vector (`js/components/icons.js`)**.
* ❌ **NO MISSING CURSOR:POINTER:** Tất cả nút bấm, thẻ bài, bao lì xì, hũ quẻ, hàng bảng đều có `cursor: pointer`.
* ❌ **NO LAYOUT SHIFTING HOVERS:** Chỉ sử dụng `transform: translateY(-2px)` kết hợp `box-shadow` mượt mà, không thay đổi kích thước box làm giật layout.
* ❌ **NO LOW CONTRAST:** Tương phản văn bản vàng sáng/trắng trên nền đỏ sẫm luôn đạt chuẩn WCAG AA ($\ge 4.5:1$).
* ❌ **INSTANT STATE CHANGES:** Tất cả hiệu ứng chuyển động dùng `cubic-bezier(0.16, 1, 0.3, 1)` với thời gian $180\text{ms} - 320\text{ms}$.
* ❌ **RESPECT REDUCED MOTION:** Khi người dùng bật `prefers-reduced-motion: reduce`, tự động giảm hiệu ứng rung lắc và pháo hoa.
