/**
 * TRÒ CHƠI 1: GỠ BOM BAO LÌ XÌ PRO MAX (/game-1)
 * Chuẩn hóa Vector Icons (Anti-Emoji Controls), Screen Shake, 3D Envelope
 */

let game1State = {
  packets: [],
  gameOver: false,
  resultHtml: ''
};

function renderGame1Page() {
  const state = window.appState;
  const icons = window.AppIcons;
  const remaining = state.getRemainingPrizesCount('game1Prizes');
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
          <span class="badge-stock ${remaining === 0 ? 'empty' : ''}">
            ${icons.gift(14, 'currentColor')} Còn ${remaining}/10 giải
          </span>
          <button class="btn-outline" onclick="window.carouselGuide.showCurrent()">
            ${icons.help(16, 'currentColor')}
            <span>Hướng Dẫn</span>
          </button>
        </div>
      </div>

      <div class="text-center mb-6">
        <h1 class="title-tet title-gold-gradient" style="font-size: 2.3rem; margin-bottom: 6px;">
          GỠ BOM BAO LÌ XÌ
        </h1>
        <p style="color: var(--text-muted-gold); font-size: 1rem;">
          Đại hiệp: <strong style="color: #fff; text-shadow: 0 0 10px #f59e0b;">${currentPlayer}</strong> • Chọn 1 phong bao để định đoạt vận đỏ!
        </p>
      </div>

      <!-- POPUP KẾT QUẢ TRÚNG THƯỞNG / BỊ PHẠT -->
      <div id="game1-result-area" class="mb-6">
        ${game1State.resultHtml}
      </div>

      <!-- LƯỚI BAO LÌ XÌ GẤM ĐỎ 3D -->
      <div class="grid-red-packets" id="game1-grid">
        ${game1State.packets.map((pkt, idx) => `
          <div class="envelope-card ${pkt.flipped ? 'flipped' : ''} ${game1State.gameOver ? 'disabled' : ''}" 
               onclick="handleEnvelopeClick(${idx})">
            <div class="envelope-inner">
              <div class="envelope-front">
                <div class="envelope-seal">LỘC</div>
                <div style="font-size: 0.82rem; color: #fde047; margin-top: 12px; font-weight: 800; text-shadow: 0 1px 2px #000;">
                  BAO SỐ ${idx + 1}
                </div>
              </div>
              <div class="envelope-back ${pkt.type === 'BOMB' ? 'bomb' : 'win'}">
                <div style="margin-bottom: 6px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));">
                  ${pkt.type === 'BOMB' ? icons.bomb(46, '#ef4444') : (pkt.type === 'PRIZE' ? icons.redPacket(46, '#fde047') : icons.shield(46, '#38bdf8'))}
                </div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fff; letter-spacing: 0.5px;">
                  ${pkt.label || ''}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- NÚT BÀY LẠI VÁN MỚI -->
      <div class="text-center mt-6">
        <button class="btn-gold" onclick="resetGame1()">
          ${icons.refresh(18, '#3b0713')}
          <span>Bày Lại Ván Mới</span>
        </button>
      </div>
    </div>
  `;
}

function initGame1() {
  const icons = window.AppIcons;
  const slides = [
    {
      icon: icons.redPacket(48, '#fbbf24'),
      title: 'Mục Tiêu Trò Chơi',
      content: 'Trước mắt bạn là 12 phong bao lì xì đỏ gấm thêu hoa văn vàng Tết Đinh Mùi 2027. Hãy vận dụng trực giác để tìm ra phong bao chứa Lì Xì Thật!'
    },
    {
      icon: icons.gift(48, '#34d399'),
      title: 'Cơ Chế 10 Giải Giới Hạn',
      content: 'Mở trúng Bao Lì Xì Vàng để nhận ngay 1 trong 10 giải thưởng độc đắc (trừ kho tồn tức thì). Nếu mở trúng Thẻ An Toàn, bạn được bảo toàn tính mạng để mở thêm 1 bao nữa!'
    },
    {
      icon: icons.bomb(48, '#ef4444'),
      title: 'Luật Phạt Bàn Tiệc & Bắt Đầu',
      content: 'Nếu chọn nhầm phải Pháo Nổ (Bom), pháo sẽ phát nổ rung màn hình và bạn phải nhận ngay 1 Thẻ Phạt Bàn Tiệc (uống bia 100%, 50% hoặc thử thách). Sẵn sàng chưa?'
    }
  ];

  window.carouselGuide.setup(slides);

  if (game1State.packets.length === 0) {
    resetGame1(false);
  }
}

function resetGame1(showSlide = true) {
  const types = [
    'PRIZE', 'PRIZE', 'PRIZE',
    'SAFE', 'SAFE', 'SAFE',
    'BOMB', 'BOMB', 'BOMB', 'BOMB', 'BOMB', 'BOMB'
  ];
  types.sort(() => Math.random() - 0.5);

  game1State.packets = types.map((t, idx) => ({
    id: idx,
    type: t,
    flipped: false,
    label: t === 'PRIZE' ? 'LÌ XÌ THẬT' : (t === 'SAFE' ? 'AN TOÀN' : 'PHÁO NỔ')
  }));

  game1State.gameOver = false;
  game1State.resultHtml = '';

  const main = document.getElementById('app-main');
  if (main && window.location.hash === '#/game-1') {
    main.innerHTML = renderGame1Page();
  }

  if (showSlide) {
    window.carouselGuide.showCurrent();
  }
}

function handleEnvelopeClick(index) {
  if (game1State.gameOver) return;
  const pkt = game1State.packets[index];
  const icons = window.AppIcons;
  if (pkt.flipped) return;

  pkt.flipped = true;

  if (pkt.type === 'PRIZE') {
    const claim = window.appState.claimRandomPrize('game1Prizes', null, 'Gỡ Bom Bao Lì Xì');
    game1State.gameOver = true;

    if (claim) {
      window.soundSystem.playCheer();
      window.confetti.launch(110);
      game1State.resultHtml = `
        <div class="result-card-popup">
          <div style="margin-bottom: 8px;">${icons.gift(52, '#fde047')}</div>
          <h3 class="title-tet" style="color: #fde047; font-size: 1.5rem;">RÚT TRÚNG LÌ XÌ VÀNG!</h3>
          <div class="win-prize-box">
            ${claim.prize.name}<br/>
            <span style="font-size: 0.95rem; color: #fff;">Trị giá: ${claim.prize.value.toLocaleString('vi-VN')} VNĐ</span>
          </div>
          <p style="font-size: 0.9rem; color: #fef08a;">Giải thưởng đã được ghi nhận vào danh sách trao thưởng!</p>
        </div>
      `;
    } else {
      game1State.resultHtml = `
        <div class="result-card-popup">
          <div style="margin-bottom: 8px;">${icons.redPacket(48, '#f59e0b')}</div>
          <h3 class="title-tet" style="color: #fde047;">ĐÃ HẾT 10 GIẢI GIỚI HẠN!</h3>
          <p style="color: #fef08a; font-size: 0.95rem;">Toàn bộ 10 phần lì xì của trò này đã có chủ nhân. Chúc bạn may mắn ở 2 trò chơi tiếp theo!</p>
        </div>
      `;
    }
  } else if (pkt.type === 'BOMB') {
    const penalty = window.appState.getRandomPenalty(null, 'Gỡ Bom Bao Lì Xì');
    game1State.gameOver = true;
    window.soundSystem.playBomb();

    document.body.classList.add('screen-shake');
    setTimeout(() => {
      document.body.classList.remove('screen-shake');
    }, 600);

    game1State.resultHtml = `
      <div class="result-card-popup" style="border-color: #ef4444;">
        <div style="margin-bottom: 8px;">${icons.beer(52, '#ef4444')}</div>
        <h3 class="title-tet" style="color: #fca5a5; font-size: 1.5rem;">TRÚNG PHÁO NỔ - CHỊU PHẠT!</h3>
        <div class="beer-penalty-box">
          ${penalty}
          <span>Cả bàn tiệc hãy cùng nâng ly giám sát hình phạt nhé!</span>
        </div>
      </div>
    `;
  } else {
    window.soundSystem.playBonus();
    game1State.resultHtml = `
      <div class="result-card-popup" style="border-color: #3b82f6;">
        <div style="margin-bottom: 8px;">${icons.shield(48, '#38bdf8')}</div>
        <h3 class="title-tet" style="color: #93c5fd;">THOÁT HIỂM AN TOÀN!</h3>
        <p style="color: #fff; font-size: 1rem;">Bạn vừa may mắn né được pháo nổ! Hãy chọn tiếp 1 phong bao nữa để săn lộc!</p>
      </div>
    `;
  }

  const main = document.getElementById('app-main');
  if (main) main.innerHTML = renderGame1Page();
}
