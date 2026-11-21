/**
 * TRANG CHỦ (/) - BENTO GRID & DARK LUXURY FESTIVE (UI/UX PRO MAX)
 * Thiết kế chuẩn hóa theo triết lý ui-ux-pro-max-skill
 */

function renderHomePage() {
  const state = window.appState;
  const icons = window.AppIcons;
  const currentPlayer = state.getCurrentPlayer();

  const g1Remaining = state.getRemainingPrizesCount('game1Prizes');
  const g2Remaining = state.getRemainingPrizesCount('game2Prizes');
  const g3Remaining = state.getRemainingPrizesCount('game3Prizes');

  const recentWinners = state.state.winners.slice(0, 6);
  const latestWinner = state.state.winners[0];

  return `
    <div class="container">
      <!-- 1. SPLIT HERO SECTION (BENTO PRO MAX) -->
      <section class="hero-split">
        <!-- Cột trái: Thông điệp & Tương tác -->
        <div>
          <div class="hero-mascot-badge">
            ${icons.sparkles(16, '#fde047')}
            <span>XUÂN ĐINH MÙI 2027 • LINH DƯƠNG CHIÊU TÀI</span>
            ${icons.sparkles(16, '#fde047')}
          </div>

          <h1 class="hero-title title-tet">
            <span class="title-gold-gradient">VẠN LỘC KHAI XUÂN</span><br/>
            <span style="font-size: 0.82em; color: #fffbeb;">& ĐẠI CHIẾN BÀN TIỆC</span>
          </h1>

          <p class="hero-subtitle">
            Chào xuân 2027! Đấu trường nhận lì xì và thử thách bàn tiệc đỉnh cao. Cơ chế độc bản: <strong style="color: #fde047;">Thắng Nhận Lì Xì Tươi – Thua Cạn Ly Nâng Lộc!</strong>
          </p>

          <!-- Ô nhập tên người chơi Capsule -->
          <div class="player-bar">
            <input type="text" id="home-player-input" class="player-input" 
                   value="${currentPlayer}" placeholder="Nhập tên đại hiệp để nhập tiệc..." />
            <button class="btn-gold" style="padding: 10px 22px; font-size: 0.95rem;" onclick="savePlayerNameFromHome()">
              ${icons.check(16, '#3b0713')}
              <span>Lưu Tên</span>
            </button>
          </div>

          <!-- Nút CTA kép -->
          <div class="flex gap-4" style="flex-wrap: wrap;">
            <a href="#/game-1" class="btn-gold" style="font-size: 1.05rem; padding: 13px 30px;">
              <span>Vào Đấu Trường Ngay</span>
              ${icons.arrowRight(18, '#3b0713')}
            </a>
            <button class="btn-outline" onclick="window.soundSystem.playSpringMelody()">
              ${icons.music(18, '#fbbf24')}
              <span>Nhạc Ngũ Cung Xuân</span>
            </button>
          </div>
        </div>

        <!-- Cột phải: 3D Showcase Linh Vật Đinh Mùi 2027 -->
        <div class="hero-card-showcase">
          <div class="mascot-halo">
            <span>🐐</span>
          </div>
          <h3 class="title-tet" style="font-size: 1.5rem; color: #fde047; margin-bottom: 6px;">
            LINH DƯƠNG PHÁT TÀI 2027
          </h3>
          <p style="font-size: 0.9rem; color: #fde68a; margin-bottom: 20px;">
            Quỹ lộc khởi đầu cho một năm an khang thịnh vượng!
          </p>

          <!-- Live Feed Mini Card -->
          <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 14px; padding: 12px 16px; text-align: left; display: flex; align-items: center; gap: 12px;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #fbbf24; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${icons.trophy(20, '#3b0713')}
            </div>
            <div style="overflow: hidden;">
              <div style="font-size: 0.78rem; color: #fca5a5; font-weight: 700;">TRÚNG LỘC GẦN NHẤT</div>
              <div style="font-size: 0.92rem; font-weight: 800; color: #fff; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
                ${latestWinner ? `${latestWinner.playerName} - ${latestWinner.prizeName}` : 'Đang chờ đại hiệp mở màn...'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. BENTO STATS ROW (4 CHỈ SỐ HOÀNG KIM) -->
      <section class="bento-stats-grid">
        <div class="bento-stat-card">
          <div class="bento-stat-num">30</div>
          <div class="bento-stat-label">Giải Thưởng Giới Hạn</div>
        </div>
        <div class="bento-stat-card">
          <div class="bento-stat-num" style="color: #34d399;">100%</div>
          <div class="bento-stat-label">Tỷ Lệ Quà May Mắn</div>
        </div>
        <div class="bento-stat-card">
          <div class="bento-stat-num" style="color: #60a5fa;">4</div>
          <div class="bento-stat-label">Đại Đấu Trường Tết</div>
        </div>
        <div class="bento-stat-card">
          <div class="bento-stat-num" style="color: #fca5a5;">OFFLINE</div>
          <div class="bento-stat-label">100% Không Cần Mạng</div>
        </div>
      </section>

      <!-- 3. BENTO GAME GRID (BỐ CỤC ĐẲNG CẤP) -->
      <section class="mb-6">
        <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 class="title-tet" style="font-size: 1.7rem; color: #fde047; display: flex; align-items: center; gap: 10px;">
            ${icons.redPacket(28, '#f59e0b')}
            <span>4 ĐẤU TRƯỜNG LỘC XUÂN</span>
          </h2>
          <span style="font-size: 0.9rem; color: #fca5a5; font-weight: 600;">
            Hệ thống tự động trừ kho tồn thời gian thực
          </span>
        </div>

        <div class="bento-games-wrapper">
          <!-- Game 1: FEATURED BENTO CARD (2 CỘT) -->
          <div class="bento-game-card bento-game-featured">
            <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <span class="badge-stock" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #3b0713; border: 1px solid #fff;">
                  ${icons.sparkles(14, '#3b0713')}
                  <span>HOT NHẤT BÀN TIỆC</span>
                </span>
                <span class="badge-stock ${g1Remaining === 0 ? 'empty' : ''}">
                  ${icons.gift(14, 'currentColor')} Còn ${g1Remaining}/10 giải
                </span>
              </div>
              <span class="badge-penalty">
                ${icons.beer(14, 'currentColor')} Pháo nổ cạn ly
              </span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;">
              <div>
                <h3 class="title-tet" style="font-size: 1.6rem; color: #fff; margin-bottom: 6px;">
                  1. Gỡ Bom Bao Lì Xì
                </h3>
                <p style="color: #fde68a; font-size: 0.95rem; line-height: 1.6; max-width: 650px;">
                  Lưới 12 phong bao gấm đỏ thêu hoa văn vàng. Lật trúng bao Lì Xì Thật để nhận ngay giải độc đắc, chạm trúng Pháo Nổ dính Thẻ Phạt Bàn Tiệc rung chấn màn hình!
                </p>
              </div>
              <div style="width: 72px; height: 72px; border-radius: 18px; background: rgba(245, 158, 11, 0.2); border: 1.5px solid #fbbf24; display: flex; align-items: center; justify-content: center;">
                ${icons.bomb(38, '#f59e0b')}
              </div>
            </div>

            <!-- Progress bar giải thưởng -->
            <div class="prize-progress-bar">
              <div class="prize-progress-fill" style="width: ${(g1Remaining / 10) * 100}%;"></div>
            </div>

            <div class="flex items-center justify-between mt-auto pt-2">
              <span style="font-size: 0.82rem; color: #fde68a;">Tồn kho: ${g1Remaining} phần thưởng độc đắc</span>
              <a href="#/game-1" class="btn-gold">
                <span>Vào Chơi Ngay</span>
                ${icons.arrowRight(16, '#3b0713')}
              </a>
            </div>
          </div>

          <!-- Game 2: BENTO COL 1 -->
          <div class="bento-game-card">
            <div class="flex items-center justify-between mb-3">
              <span class="badge-stock ${g2Remaining === 0 ? 'empty' : ''}">
                ${icons.gift(14, 'currentColor')} Còn ${g2Remaining}/10 giải
              </span>
              <span class="badge-penalty">
                ${icons.beer(14, 'currentColor')} Sập tháp phạt bia
              </span>
            </div>
            <div class="flex items-center gap-3 mb-2">
              <div style="width: 50px; height: 50px; border-radius: 14px; background: rgba(245, 158, 11, 0.2); border: 1px solid #fbbf24; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${icons.tower(28, '#f59e0b')}
              </div>
              <h3 class="title-tet" style="font-size: 1.35rem; color: #fff;">
                2. Xếp Gỗ Tháp Lộc
              </h3>
            </div>
            <p style="color: #fde68a; font-size: 0.92rem; line-height: 1.6; margin-bottom: 12px; flex-grow: 1;">
              Xếp chồng các khối lộc vàng thăng bằng. Canh chuẩn đạt 10 tầng để rinh lộc lớn, trượt tay làm sập tháp chịu ngay hình phạt bàn tiệc!
            </p>
            <div class="prize-progress-bar">
              <div class="prize-progress-fill" style="width: ${(g2Remaining / 10) * 100}%;"></div>
            </div>
            <a href="#/game-2" class="btn-gold text-center">
              <span>Chơi Ngay</span>
              ${icons.arrowRight(16, '#3b0713')}
            </a>
          </div>

          <!-- Game 3: BENTO COL 2 -->
          <div class="bento-game-card">
            <div class="flex items-center justify-between mb-3">
              <span class="badge-stock ${g3Remaining === 0 ? 'empty' : ''}">
                ${icons.gift(14, 'currentColor')} Còn ${g3Remaining}/10 giải
              </span>
              <span class="badge-penalty">
                ${icons.beer(14, 'currentColor')} Phạt đoán sai
              </span>
            </div>
            <div class="flex items-center gap-3 mb-2">
              <div style="width: 50px; height: 50px; border-radius: 14px; background: rgba(245, 158, 11, 0.2); border: 1px solid #fbbf24; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ${icons.magnifier(28, '#f59e0b')}
              </div>
              <h3 class="title-tet" style="font-size: 1.35rem; color: #fff;">
                3. Soi Góc Đoán Người
              </h3>
            </div>
            <p style="color: #fde68a; font-size: 0.92rem; line-height: 1.6; margin-bottom: 12px; flex-grow: 1;">
              Soi cận cảnh góc ảnh zoom của nhân vật bí ẩn trong 15s đếm ngược. Đoán đúng nhận giải thưởng, đoán sai mở full ảnh dìm hàng và chịu phạt!
            </p>
            <div class="prize-progress-bar">
              <div class="prize-progress-fill" style="width: ${(g3Remaining / 10) * 100}%;"></div>
            </div>
            <a href="#/game-3" class="btn-gold text-center">
              <span>Chơi Ngay</span>
              ${icons.arrowRight(16, '#3b0713')}
            </a>
          </div>

          <!-- Game Bonus: BENTO BANNER DÀI (2 CỘT) -->
          <div class="bento-game-card bento-game-bonus">
            <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
              <span class="badge-stock" style="background: rgba(52, 211, 153, 0.25); border-color: #34d399; color: #a7f3d0;">
                ${icons.sparkles(14, 'currentColor')} QUÀ KHÔNG GIỚI HẠN
              </span>
              <span class="badge-stock" style="background: rgba(59, 130, 246, 0.25); border-color: #3b82f6; color: #93c5fd;">
                ${icons.shield(14, 'currentColor')} MIỄN PHẠT 100%
              </span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center;">
              <div>
                <h3 class="title-tet" style="font-size: 1.5rem; color: #a7f3d0; margin-bottom: 6px;">
                  Trò Phụ: Bốc Quẻ "Lộc Nở Trăm Hoa"
                </h3>
                <p style="color: #fef08a; font-size: 0.95rem; line-height: 1.6;">
                  Hũ quẻ may mắn đầu năm 2027. Ai tham gia cũng có quà: lì xì tiền mặt nhỏ, quẻ bói vui tình duyên công danh, và <strong>Thẻ Thần Men đặc quyền bàn tiệc (Kim bài miễn tử, Triệu hồi uống hộ, Phản đòn...)</strong>!
                </p>
              </div>
              <div style="width: 72px; height: 72px; border-radius: 18px; background: rgba(52, 211, 153, 0.2); border: 1.5px solid #34d399; display: flex; align-items: center; justify-content: center;">
                ${icons.flower(38, '#34d399')}
              </div>
            </div>
            <div class="flex items-center justify-between mt-4 pt-2">
              <span style="font-size: 0.85rem; color: #a7f3d0;">🛡️ Giúp bạn sống sót qua mọi thử thách bàn tiệc!</span>
              <a href="#/game-bonus" class="btn-gold" style="background: linear-gradient(135deg, #34d399, #059669); color: #fff; border-color: #a7f3d0;">
                <span>Bốc Quẻ Ngay</span>
                ${icons.arrowRight(16, '#ffffff')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. BẢNG VINH DANH & QUY CHẾ BÀN TIỆC (BENTO PANELS) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 26px; margin-bottom: 60px;">
        <!-- Bảng vinh danh -->
        <div class="glass-panel">
          <div class="flex items-center gap-2 mb-4">
            ${icons.trophy(24, '#fbbf24')}
            <h3 class="title-tet" style="font-size: 1.35rem; color: #fde047;">BẢNG VINH DANH KHAI XUÂN</h3>
          </div>
          ${recentWinners.length === 0 ? `
            <p style="color: #fef08a; font-size: 0.95rem; text-align: center; padding: 30px 0;">
              Chưa có ai trúng giải. Hãy mở màn vận đỏ năm mới 2027 ngay bây giờ!
            </p>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${recentWinners.map((w, index) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(0,0,0,0.35); border-radius: 14px; border-left: 4px solid ${index === 0 ? '#fbbf24' : (index === 1 ? '#e2e8f0' : (index === 2 ? '#b45309' : '#f59e0b'))};">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 900; font-size: 1rem; color: ${index === 0 ? '#fbbf24' : '#fff'};">
                      #${index + 1}
                    </span>
                    <div>
                      <div style="font-weight: 800; color: #fff; font-size: 1rem;">${w.playerName}</div>
                      <div style="font-size: 0.8rem; color: #fde68a;">${w.gameTitle} • ${w.timestamp.slice(11, 16)}</div>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 800; color: #fde047; font-size: 1rem;">${w.prizeName}</div>
                    <div style="font-size: 0.78rem; font-weight: 700; color: ${w.status === 'claimed' ? '#86efac' : '#fca5a5'};">
                      ${w.status === 'claimed' ? '✓ Đã trao lộc' : '⏳ Chưa trao'}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Thể lệ bàn tiệc -->
        <div class="glass-panel">
          <div class="flex items-center gap-2 mb-4">
            ${icons.scroll(24, '#f59e0b')}
            <h3 class="title-tet" style="font-size: 1.35rem; color: #fde047;">VĂN HÓA BÀN TIỆC TẾT 2027</h3>
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 0.95rem; color: #fef08a; line-height: 1.6;">
            <li style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="margin-top: 2px;">${icons.redPacket(20, '#fbbf24')}</span>
              <span><strong>Mỗi game chính có đúng 10 giải thưởng giới hạn:</strong> Hệ thống tự động trừ kho tức thì. Nhanh tay kẻo hết lộc!</span>
            </li>
            <li style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="margin-top: 2px;">${icons.beer(20, '#ef4444')}</span>
              <span><strong>Thắng nhận lì xì – Thua nâng ly chúc Tết:</strong> Không khí vui là chính, nâng ly cạn chén chúc mừng một năm mới đại cát đại lợi.</span>
            </li>
            <li style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="margin-top: 2px;">${icons.shield(20, '#34d399')}</span>
              <span><strong>Thẻ Thần Men quyền năng:</strong> Trò chơi phụ tặng bạn Kim bài miễn tử hoặc Thẻ triệu hồi người uống hộ để lật ngược tình thế!</span>
            </li>
            <li style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="margin-top: 2px;">${icons.sparkles(20, '#fbbf24')}</span>
              <span><strong>Hoạt động Offline 100%:</strong> Tắt WiFi, rút mạng vẫn hoạt động hoàn hảo, âm thanh sống động và xuất dữ liệu đối soát an toàn.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function savePlayerNameFromHome() {
  const input = document.getElementById('home-player-input');
  if (input) {
    const name = window.appState.setCurrentPlayer(input.value);
    window.soundSystem.playBonus();
    alert(`Đã lưu danh tính: ${name}! Chúc bạn năm mới 2027 rinh trọn giải độc đắc!`);
  }
}
