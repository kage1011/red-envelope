/**
 * TRÒ CHƠI 2: XẾP GỖ THÁP LỘC PRO MAX (/game-2)
 * Chuẩn hóa Vector Icons (Anti-Emoji Controls), Canvas Tower Physics, Micro-interactions
 */

let game2State = {
  canvas: null,
  ctx: null,
  animationId: null,
  blocks: [],
  currentBlock: null,
  direction: 1,
  speed: 3,
  score: 0,
  targetScore: 10,
  gameOver: false,
  gameWon: false,
  resultHtml: ''
};

function renderGame2Page() {
  const state = window.appState;
  const icons = window.AppIcons;
  const remaining = state.getRemainingPrizesCount('game2Prizes');
  const target = state.state.settings.game2TargetLayers || 10;
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

      <div class="text-center mb-4">
        <h1 class="title-tet title-gold-gradient" style="font-size: 2.3rem; margin-bottom: 6px;">
          XẾP GỖ THÁP LỘC
        </h1>
        <p style="color: var(--text-muted-gold); font-size: 1rem;">
          Đại hiệp: <strong style="color: #fff; text-shadow: 0 0 10px #f59e0b;">${currentPlayer}</strong> • Bấm Phím Cách (Space) hoặc chạm màn hình để thả khối!
        </p>
      </div>

      <!-- KHU VỰC THÁP & CANVAS -->
      <div class="tower-container">
        <!-- HUD CHỈ SỐ -->
        <div class="tower-hud">
          <div class="hud-item">
            <div style="font-size: 0.82rem; color: #fde68a; font-weight: 700;">TẦNG HIỆN TẠI</div>
            <div class="hud-value" id="tower-score">${game2State.score}</div>
          </div>
          <div class="hud-item">
            <div style="font-size: 0.82rem; color: #fde68a; font-weight: 700;">MỤC TIÊU THẮNG</div>
            <div class="hud-value" style="color: #4ade80;">${target} TẦNG</div>
          </div>
          <div class="hud-item">
            <div style="font-size: 0.82rem; color: #fde68a; font-weight: 700;">TRẠNG THÁI</div>
            <div class="hud-value" id="tower-status" style="font-size: 1.15rem; color: #facc15;">
              ${game2State.gameOver ? (game2State.gameWon ? 'CHIẾN THẮNG' : 'SẬP THÁP') : 'ĐANG CHƠI'}
            </div>
          </div>
        </div>

        <!-- POPUP KẾT QUẢ NẾU CÓ -->
        <div id="game2-result-area" class="mb-4">
          ${game2State.resultHtml}
        </div>

        <canvas id="canvas-tower" width="450" height="420" onclick="handleTowerAction()"></canvas>

        <div class="mt-4 flex justify-center gap-4">
          <button class="btn-gold" style="font-size: 1.05rem; padding: 14px 34px;" onclick="handleTowerAction()">
            ${icons.tower(20, '#3b0713')}
            <span>THẢ KHỐI GỖ (SPACE)</span>
          </button>
          <button class="btn-outline" onclick="resetGame2()">
            ${icons.refresh(16, 'currentColor')}
            <span>Chơi Lại</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function initGame2() {
  const icons = window.AppIcons;
  const target = window.appState.state.settings.game2TargetLayers || 10;
  const slides = [
    {
      icon: icons.tower(48, '#fbbf24'),
      title: 'Mục Tiêu Trò Chơi',
      content: `Nhiệm vụ của bạn là xếp chồng các thanh lộc vàng lên nhau để dựng thành Thần Tháp Đinh Mùi kiên cố.`
    },
    {
      icon: icons.gift(48, '#34d399'),
      title: 'Cơ Chế 10 Giải Giới Hạn',
      content: `Chạm hoặc bấm Phím Cách để thả khối. Hãy xếp đạt đủ ${target} tầng liên tiếp để nhận ngay 1 trong 10 giải thưởng giới hạn!`
    },
    {
      icon: icons.beer(48, '#ef4444'),
      title: 'Luật Phạt Bàn Tiệc & Bắt Đầu',
      content: 'Nếu bấm lệch làm khối trượt hoàn toàn ra ngoài, tháp sẽ sụp đổ và bạn phải nhận hình phạt bàn tiệc (uống bia) tương ứng với tầng bạn đã ngã! Chúc bạn vững tay lộc!'
    }
  ];

  window.carouselGuide.setup(slides);

  window.onkeydown = (e) => {
    if (window.location.hash === '#/game-2' && e.code === 'Space') {
      e.preventDefault();
      handleTowerAction();
    }
  };

  setTimeout(() => {
    setupTowerCanvas();
  }, 100);
}

function setupTowerCanvas() {
  const canvas = document.getElementById('canvas-tower');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  game2State.canvas = canvas;
  game2State.ctx = ctx;

  resetGame2(false);
}

function resetGame2(showGuide = true) {
  if (game2State.animationId) {
    cancelAnimationFrame(game2State.animationId);
  }

  const target = window.appState.state.settings.game2TargetLayers || 10;
  const initialWidth = 220;
  const blockHeight = 28;

  game2State.blocks = [
    { x: (450 - initialWidth) / 2, y: 420 - blockHeight, width: initialWidth, height: blockHeight, color: '#f59e0b' }
  ];

  game2State.currentBlock = {
    x: 10,
    y: 420 - blockHeight * 2,
    width: initialWidth,
    height: blockHeight,
    color: '#fbbf24'
  };

  game2State.score = 1;
  game2State.targetScore = target;
  game2State.speed = window.appState.state.settings.game2Speed || 3.5;
  game2State.direction = 1;
  game2State.gameOver = false;
  game2State.gameWon = false;
  game2State.resultHtml = '';

  const main = document.getElementById('app-main');
  if (main && window.location.hash === '#/game-2') {
    main.innerHTML = renderGame2Page();
    game2State.canvas = document.getElementById('canvas-tower');
    if (game2State.canvas) game2State.ctx = game2State.canvas.getContext('2d');
  }

  animateTower();

  if (showGuide) {
    window.carouselGuide.showCurrent();
  }
}

function handleTowerAction() {
  if (game2State.gameOver) {
    resetGame2(false);
    return;
  }

  const curr = game2State.currentBlock;
  const prev = game2State.blocks[game2State.blocks.length - 1];
  const icons = window.AppIcons;

  const diff = curr.x - prev.x;

  if (Math.abs(diff) >= curr.width) {
    game2State.gameOver = true;
    game2State.gameWon = false;
    window.soundSystem.playCrash();

    const penalty = window.appState.getRandomPenalty(null, 'Xếp Gỗ Tháp Lộc');
    game2State.resultHtml = `
      <div class="result-card-popup" style="border-color: #ef4444;">
        <div style="margin-bottom: 8px;">${icons.beer(52, '#ef4444')}</div>
        <h3 class="title-tet" style="color: #fca5a5; font-size: 1.5rem;">SẬP THÁP Ở TẦNG ${game2State.score}!</h3>
        <div class="beer-penalty-box">
          ${penalty}
          <span>Hãy nâng ly cạn chén để lấy lại bình tĩnh dựng tháp mới!</span>
        </div>
      </div>
    `;
    updateTowerHUD();
    return;
  }

  window.soundSystem.playDrop();

  let newWidth = curr.width - Math.abs(diff);
  let newX = diff > 0 ? curr.x : prev.x;

  if (Math.abs(diff) < 4) {
    newWidth = curr.width;
    newX = prev.x;
  }

  game2State.blocks.push({
    x: newX,
    y: curr.y,
    width: newWidth,
    height: curr.height,
    color: (game2State.blocks.length % 2 === 0) ? '#f59e0b' : '#fbbf24'
  });

  game2State.score++;

  if (game2State.score >= game2State.targetScore) {
    game2State.gameOver = true;
    game2State.gameWon = true;

    const claim = window.appState.claimRandomPrize('game2Prizes', null, 'Xếp Gỗ Tháp Lộc');
    if (claim) {
      window.soundSystem.playCheer();
      window.confetti.launch(110);
      game2State.resultHtml = `
        <div class="result-card-popup">
          <div style="margin-bottom: 8px;">${icons.trophy(52, '#fde047')}</div>
          <h3 class="title-tet" style="color: #fde047; font-size: 1.5rem;">ĐẠT ${game2State.score} TẦNG - THẮNG LỚN!</h3>
          <div class="win-prize-box">
            ${claim.prize.name}<br/>
            <span style="font-size: 0.95rem; color: #fff;">Trị giá: ${claim.prize.value.toLocaleString('vi-VN')} VNĐ</span>
          </div>
          <p style="font-size: 0.9rem; color: #fef08a;">Bạn là bậc thầy cân bằng tháp lộc của năm 2027!</p>
        </div>
      `;
    } else {
      game2State.resultHtml = `
        <div class="result-card-popup">
          <div style="margin-bottom: 8px;">${icons.tower(48, '#f59e0b')}</div>
          <h3 class="title-tet" style="color: #fde047;">ĐẠT ${game2State.score} TẦNG XUẤT SẮC!</h3>
          <p style="color: #fef08a;">Tuy nhiên 10 giải thưởng của trò chơi này đã được trao hết. Cả bàn hãy nâng ly chúc mừng bạn!</p>
        </div>
      `;
    }
    updateTowerHUD();
    return;
  }

  const blockH = curr.height;
  if (curr.y < 200) {
    game2State.blocks.forEach(b => b.y += blockH);
  }

  game2State.currentBlock = {
    x: 0,
    y: game2State.blocks[game2State.blocks.length - 1].y - blockH,
    width: newWidth,
    height: blockH,
    color: '#fef08a'
  };

  game2State.speed = Math.min(game2State.speed + 0.25, 7.5);
  updateTowerHUD();
}

function updateTowerHUD() {
  const sEl = document.getElementById('tower-score');
  const stEl = document.getElementById('tower-status');
  const resEl = document.getElementById('game2-result-area');

  if (sEl) sEl.innerText = game2State.score;
  if (stEl) {
    stEl.innerText = game2State.gameOver ? (game2State.gameWon ? 'CHIẾN THẮNG' : 'SẬP THÁP') : 'ĐANG CHƠI';
    stEl.style.color = game2State.gameOver ? (game2State.gameWon ? '#4ade80' : '#ef4444') : '#facc15';
  }
  if (resEl) resEl.innerHTML = game2State.resultHtml;
}

function animateTower() {
  if (window.location.hash !== '#/game-2') return;

  const ctx = game2State.ctx;
  if (!ctx) return;

  ctx.clearRect(0, 0, 450, 420);

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
  for (let i = 0; i < 450; i += 30) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 420);
    ctx.stroke();
  }

  game2State.blocks.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, b.width, b.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(b.x, b.y, b.width, b.height);

    ctx.fillStyle = 'rgba(69, 10, 10, 0.6)';
    ctx.font = '12px sans-serif';
    ctx.fillText('LỘC 2027', b.x + b.width / 2 - 25, b.y + 18);
  });

  if (!game2State.gameOver && game2State.currentBlock) {
    const curr = game2State.currentBlock;
    curr.x += game2State.speed * game2State.direction;

    if (curr.x + curr.width > 450) {
      curr.x = 450 - curr.width;
      game2State.direction = -1;
    } else if (curr.x < 0) {
      curr.x = 0;
      game2State.direction = 1;
    }

    ctx.fillStyle = curr.color;
    ctx.fillRect(curr.x, curr.y, curr.width, curr.height);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(curr.x, curr.y, curr.width, curr.height);
  }

  game2State.animationId = requestAnimationFrame(animateTower);
}
