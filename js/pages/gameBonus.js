/**
 * TRÒ CHƠI PHỤ: BỐC QUẺ "LỘC NỞ TRĂM HOA" PRO MAX (/game-bonus)
 * Chuẩn hóa Vector Icons (Anti-Emoji Controls), Hũ quẻ sơn mài dát vàng, Quà không giới hạn
 */

let gameBonusState = {
  isShaking: false,
  showStick: false,
  resultHtml: ''
};

function renderGameBonusPage() {
  const state = window.appState;
  const icons = window.AppIcons;
  const currentPlayer = state.getCurrentPlayer();

  return `
    <div class="container" style="padding-top: 20px; padding-bottom: 50px;">
      <!-- HEADER TRÒ CHƠI -->
      <div class="flex items-center justify-between mb-4">
        <a href="#/" class="btn-outline">
          ${icons.arrowLeft(16, 'currentColor')}
          <span>Về Trang Chủ</span>
        </a>
        <div class="flex items-center gap-2">
          <span class="badge-stock" style="background: rgba(34, 197, 94, 0.25); border-color: #22c55e; color: #86efac;">
            ${icons.sparkles(14, 'currentColor')} Quà Không Giới Hạn
          </span>
          <button class="btn-outline" onclick="window.carouselGuide.showCurrent()">
            ${icons.help(16, 'currentColor')}
            <span>Hướng Dẫn</span>
          </button>
        </div>
      </div>

      <div class="text-center mb-6">
        <h1 class="title-tet title-gold-gradient" style="font-size: 2.3rem; margin-bottom: 6px;">
          BỐC QUẺ "LỘC NỞ TRĂM HOA"
        </h1>
        <p style="color: var(--text-muted-gold); font-size: 1rem;">
          Đại hiệp: <strong style="color: #fff; text-shadow: 0 0 10px #f59e0b;">${currentPlayer}</strong> • Bốc quẻ đầu xuân, 100% trúng quà may mắn và Thẻ Thần Men!
        </p>
      </div>

      <div class="bonus-tree-stage">
        <!-- POPUP KẾT QUẢ BỐC ĐƯỢC -->
        <div id="bonus-result-area" class="mb-6">
          ${gameBonusState.resultHtml}
        </div>

        <!-- HŨ QUẺ RUNG LẮC SƠN MÀI DÁT VÀNG -->
        <div class="bonus-cylinder ${gameBonusState.isShaking ? 'shaking' : ''}" 
             onclick="shakeBonusCylinder()" title="Bấm vào để lắc hũ quẻ!">
          ${gameBonusState.showStick ? '<div class="bonus-stick-out"></div>' : ''}
          <div style="text-align: center; color: #fde047;">
            <div style="margin-bottom: 6px;">
              ${icons.flower(44, '#fde047')}
            </div>
            <div style="font-size: 1.15rem; font-weight: 900; letter-spacing: 2px;">HŨ QUẺ</div>
            <div style="font-size: 0.8rem; color: #fecaca; margin-top: 2px; font-weight: 700;">ĐINH MÙI 2027</div>
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button class="btn-gold" style="font-size: 1.15rem; padding: 14px 36px; background: linear-gradient(135deg, #10b981, #047857); border-color: #a7f3d0; color: #fff;" 
                  onclick="shakeBonusCylinder()" ${gameBonusState.isShaking ? 'disabled' : ''}>
            ${icons.flower(20, '#ffffff')}
            <span>LẮC HŨ RÚT QUẺ LỘC</span>
          </button>
        </div>

        <!-- GHI CHÚ THẺ ĐẶC QUYỀN PRO MAX -->
        <div class="glass-panel text-left mt-6" style="padding: 22px; font-size: 0.92rem; color: var(--text-muted-gold);">
          <div style="font-weight: 800; color: #fff; margin-bottom: 12px; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
            ${icons.shield(20, '#fbbf24')}
            <span>BẢNG ĐẶC QUYỀN THẦN MEN ĐẦU XUÂN:</span>
          </div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
            <li style="display: flex; gap: 8px; align-items: flex-start;">
              <span style="color: #fbbf24;">✦</span>
              <span><strong>Kim Bài Miễn Tử:</strong> Được miễn phạt bia 1 lần bất kỳ trong bữa tiệc!</span>
            </li>
            <li style="display: flex; gap: 8px; align-items: flex-start;">
              <span style="color: #fbbf24;">✦</span>
              <span><strong>Thẻ Triệu Hồi Uống Hộ:</strong> Chỉ định 1 đồng đội kế bên uống hộ bạn nửa ly!</span>
            </li>
            <li style="display: flex; gap: 8px; align-items: flex-start;">
              <span style="color: #fbbf24;">✦</span>
              <span><strong>Thẻ Phản Đòn:</strong> Bật ngược lại hình phạt cho người vừa ép bạn uống!</span>
            </li>
            <li style="display: flex; gap: 8px; align-items: flex-start;">
              <span style="color: #fbbf24;">✦</span>
              <span><strong>Lì Xì Lộc Nhỏ:</strong> Nhận lì xì tươi 10k - 20k lấy may mắn cả năm!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function initGameBonus() {
  const icons = window.AppIcons;
  const slides = [
    {
      icon: icons.flower(48, '#34d399'),
      title: 'Mục Tiêu Trò Chơi Phụ',
      content: 'Đây là trò chơi lộc xuân vui vẻ dành cho tất cả mọi người. Mỗi lần chạm vào Hũ Quẻ Tết 2027, một quẻ lộc may mắn sẽ bay ra trao tay bạn!'
    },
    {
      icon: icons.sparkles(48, '#fbbf24'),
      title: 'Cơ Chế Quà Không Giới Hạn',
      content: 'Trò chơi này HOÀN TOÀN KHÔNG GIỚI HẠN SỐ LƯỢNG NGƯỜI TRÚNG! Ai tham gia cũng 100% nhận được lộc vui đầu năm: lì xì tiền mặt nhỏ, quẻ bói vận mệnh 2027, hoặc Thẻ Thần Men đặc quyền!'
    },
    {
      icon: icons.shield(48, '#38bdf8'),
      title: 'Tuyệt Đối Không Bị Phạt & Bắt Đầu',
      content: 'Trò chơi phụ hoàn toàn không có hình phạt bia rượu! Hãy bốc lấy những chiếc Thẻ Thần Men quyền lực để bảo vệ bản thân trong các trò chơi chính nhé!'
    }
  ];

  window.carouselGuide.setup(slides);

  gameBonusState.isShaking = false;
  gameBonusState.showStick = false;
  gameBonusState.resultHtml = '';
}

function shakeBonusCylinder() {
  if (gameBonusState.isShaking) return;
  const icons = window.AppIcons;

  gameBonusState.isShaking = true;
  gameBonusState.showStick = false;
  gameBonusState.resultHtml = '';

  window.soundSystem.playShake();
  setTimeout(() => window.soundSystem.playShake(), 200);
  setTimeout(() => window.soundSystem.playShake(), 400);

  const main = document.getElementById('app-main');
  if (main && window.location.hash === '#/game-bonus') {
    main.innerHTML = renderGameBonusPage();
  }

  setTimeout(() => {
    gameBonusState.isShaking = false;
    gameBonusState.showStick = true;

    const claim = window.appState.claimBonusPrize();
    window.soundSystem.playBonus();
    window.confetti.launch(80);

    const prize = claim.prize;
    gameBonusState.resultHtml = `
      <div class="result-card-popup" style="border-color: #34d399; background: linear-gradient(145deg, #064e3b 0%, #022c22 100%);">
        <div style="margin-bottom: 8px;">${icons.flower(52, '#6ee7b7')}</div>
        <h3 class="title-tet" style="color: #6ee7b7; font-size: 1.5rem;">QUẺ LỘC ĐẦU NĂM ĐÃ XUẤT HIỆN!</h3>
        <div class="win-prize-box" style="border-color: #34d399; background: rgba(52, 211, 153, 0.25); color: #a7f3d0;">
          ${prize.name}<br/>
          <span style="font-size: 0.95rem; color: #fff; font-weight: normal;">${prize.desc || ''}</span>
        </div>
        <p style="font-size: 0.9rem; color: #fef08a;">Lộc đã được trao tay! Hãy lưu giữ đặc quyền của bạn!</p>
      </div>
    `;

    if (main && window.location.hash === '#/game-bonus') {
      main.innerHTML = renderGameBonusPage();
    }
  }, 750);
}
