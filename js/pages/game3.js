/**
 * TRÒ CHƠI 3: SOI GÓC ĐOÁN NGƯỜI PRO MAX (/game-3)
 * Chuẩn hóa Vector Icons (Anti-Emoji Controls), Tia quét Scanner, Micro-interactions
 */

let game3State = {
  currentImage: null,
  timeLeft: 15,
  timerInterval: null,
  isRevealed: false,
  gameOver: false,
  resultHtml: ''
};

function renderGame3Page() {
  const state = window.appState;
  const icons = window.AppIcons;
  const remaining = state.getRemainingPrizesCount('game3Prizes');
  const currentPlayer = state.getCurrentPlayer();
  const img = game3State.currentImage;

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
          SOI GÓC ĐOÁN NGƯỜI
        </h1>
        <p style="color: var(--text-muted-gold); font-size: 1rem;">
          Đại hiệp: <strong style="color: #fff; text-shadow: 0 0 10px #f59e0b;">${currentPlayer}</strong> • Quan sát góc ảnh và đoán xem nhân vật bí ẩn này là ai!
        </p>
      </div>

      <div class="guess-box">
        <!-- VÙNG SOI GÓC ẢNH & ĐẾM NGƯỢC -->
        <div class="crop-viewport mb-4">
          ${img ? `
            <img src="${img.src}" id="game3-target-img" class="crop-image ${game3State.isRevealed ? 'reveal' : 'zoomed'}"
                 style="transform-origin: ${img.cropOrigin || 'center center'};" alt="Nhân vật bí ẩn" />
          ` : `
            <div style="color: #fef08a;">Chưa có ảnh trong ngân hàng ảnh!</div>
          `}
          
          <div class="timer-ring" id="game3-timer" style="${game3State.isRevealed ? 'display: none;' : ''}">
            ${game3State.timeLeft}s
          </div>
        </div>

        <!-- POPUP KẾT QUẢ / THÔNG BÁO -->
        <div id="game3-result-area" class="mb-4">
          ${game3State.resultHtml}
        </div>

        <!-- CÁC NÚT ĐIỀU KHIỂN & ĐÁP ÁN -->
        <div class="glass-panel text-center" style="padding: 22px;">
          ${!game3State.isRevealed ? `
            <p style="color: var(--text-muted-gold); font-size: 0.95rem; margin-bottom: 16px;">
              Hãy hô to đáp án trước bàn tiệc, sau đó bấm nút <strong>MỞ KẾT QUẢ</strong>!
            </p>
            <div class="flex justify-center gap-4">
              <button class="btn-gold" style="font-size: 1.1rem; padding: 14px 34px;" onclick="revealGame3Result()">
                ${icons.magnifier(20, '#3b0713')}
                <span>MỞ KẾT QUẢ (FULL ẢNH)</span>
              </button>
            </div>
          ` : `
            <div style="margin-bottom: 18px;">
              <div style="font-size: 0.9rem; color: #fde68a; font-weight: 700;">ĐÁP ÁN CHÍNH XÁC LÀ:</div>
              <div style="font-size: 1.6rem; font-weight: 900; color: #facc15; margin-top: 4px;">
                ${img ? img.answer : ''}
              </div>
            </div>

            ${!game3State.gameOver ? `
              <p style="color: #fef08a; font-size: 0.9rem; margin-bottom: 14px;">Xác nhận kết quả của người chơi:</p>
              <div class="flex justify-center gap-4 flex-wrap">
                <button class="btn-gold" style="background: linear-gradient(135deg, #22c55e, #15803d); color: #fff;" onclick="handleGame3Choice(true)">
                  ${icons.check(18, '#ffffff')}
                  <span>ĐÃ ĐOÁN ĐÚNG (NHẬN GIẢI)</span>
                </button>
                <button class="btn-red" onclick="handleGame3Choice(false)">
                  ${icons.close(18, '#ffffff')}
                  <span>ĐOÁN SAI (CHỊU PHẠT)</span>
                </button>
              </div>
            ` : `
              <button class="btn-gold" onclick="resetGame3()">
                ${icons.refresh(18, '#3b0713')}
                <span>Chuyển Sang Ảnh Khác</span>
              </button>
            `}
          `}
        </div>
      </div>
    </div>
  `;
}

function initGame3() {
  const icons = window.AppIcons;
  const countdown = window.appState.state.settings.game3CountdownSeconds || 15;
  const slides = [
    {
      icon: icons.magnifier(48, '#fbbf24'),
      title: 'Mục Tiêu Trò Chơi',
      content: 'Màn hình sẽ hiển thị 1 góc/vùng crop phóng to ngẫu nhiên của 1 bức ảnh nhân vật quen thuộc trong buổi tiệc.'
    },
    {
      icon: icons.gift(48, '#34d399'),
      title: 'Cơ Chế 10 Giải Giới Hạn',
      content: `Bạn có ${countdown} giây đếm ngược để đoán chính xác danh tính nhân vật. Đoán đúng trước khi hết giờ để nhận ngay 1 trong 10 giải thưởng giới hạn!`
    },
    {
      icon: icons.beer(48, '#ef4444'),
      title: 'Luật Phạt Bàn Tiệc & Bắt Đầu',
      content: 'Nếu đoán sai hoặc hết thời gian đếm ngược mà chưa đoán ra, bức ảnh gốc sẽ bung full toàn màn hình và bạn phải chịu 1 hình phạt uống bia của bàn tiệc!'
    }
  ];

  window.carouselGuide.setup(slides);

  resetGame3(false);
}

function resetGame3(showGuide = true) {
  if (game3State.timerInterval) {
    clearInterval(game3State.timerInterval);
  }

  const images = window.appState.state.game3Images.filter(img => img.active);
  const countdown = window.appState.state.settings.game3CountdownSeconds || 15;

  if (images.length === 0) {
    game3State.currentImage = null;
  } else {
    game3State.currentImage = images[Math.floor(Math.random() * images.length)];
  }

  game3State.timeLeft = countdown;
  game3State.isRevealed = false;
  game3State.gameOver = false;
  game3State.resultHtml = '';

  const main = document.getElementById('app-main');
  if (main && window.location.hash === '#/game-3') {
    main.innerHTML = renderGame3Page();
  }

  startCountdown();

  if (showGuide) {
    window.carouselGuide.showCurrent();
  }
}

function startCountdown() {
  if (game3State.timerInterval) clearInterval(game3State.timerInterval);

  game3State.timerInterval = setInterval(() => {
    if (game3State.isRevealed || game3State.gameOver) {
      clearInterval(game3State.timerInterval);
      return;
    }

    game3State.timeLeft--;
    window.soundSystem.playTick();

    const timerEl = document.getElementById('game3-timer');
    if (timerEl) {
      timerEl.innerText = `${game3State.timeLeft}s`;
      if (game3State.timeLeft <= 5) {
        timerEl.style.borderColor = '#dc2626';
        timerEl.style.color = '#f87171';
      }
    }

    if (game3State.timeLeft <= 0) {
      clearInterval(game3State.timerInterval);
      revealGame3Result(true);
    }
  }, 1000);
}

function revealGame3Result(isTimeOut = false) {
  if (game3State.timerInterval) clearInterval(game3State.timerInterval);
  game3State.isRevealed = true;
  const icons = window.AppIcons;

  if (isTimeOut) {
    window.soundSystem.playBuzzer();
    game3State.resultHtml = `
      <div class="result-card-popup" style="border-color: #ef4444;">
        <div style="margin-bottom: 8px;">${icons.beer(48, '#ef4444')}</div>
        <h3 class="title-tet" style="color: #fca5a5;">HẾT THỜI GIAN ĐẾM NGƯỢC!</h3>
        <p style="color: #fff; font-size: 0.95rem;">Bức ảnh gốc đã mở. Bạn chưa kịp đoán tên trước khi chuông reo!</p>
      </div>
    `;
  }

  const main = document.getElementById('app-main');
  if (main && window.location.hash === '#/game-3') {
    main.innerHTML = renderGame3Page();
  }
}

function handleGame3Choice(isWin) {
  game3State.gameOver = true;
  const icons = window.AppIcons;

  if (isWin) {
    const claim = window.appState.claimRandomPrize('game3Prizes', null, 'Soi Góc Đoán Người');
    if (claim) {
      window.soundSystem.playCheer();
      window.confetti.launch(110);
      game3State.resultHtml = `
        <div class="result-card-popup">
          <div style="margin-bottom: 8px;">${icons.gift(52, '#fde047')}</div>
          <h3 class="title-tet" style="color: #fde047; font-size: 1.5rem;">ĐOÁN ĐÚNG - NHẬN LÌ XÌ!</h3>
          <div class="win-prize-box">
            ${claim.prize.name}<br/>
            <span style="font-size: 0.95rem; color: #fff;">Trị giá: ${claim.prize.value.toLocaleString('vi-VN')} VNĐ</span>
          </div>
          <p style="font-size: 0.9rem; color: #fef08a;">Bạn có đôi mắt thần tinh tường nhất mùa xuân 2027!</p>
        </div>
      `;
    } else {
      game3State.resultHtml = `
        <div class="result-card-popup">
          <div style="margin-bottom: 8px;">${icons.magnifier(48, '#f59e0b')}</div>
          <h3 class="title-tet" style="color: #fde047;">ĐOÁN ĐÚNG XUẤT SẮC!</h3>
          <p style="color: #fef08a;">Tuy nhiên 10 giải thưởng giới hạn của trò chơi này đã hết. Cả bàn hãy cùng nâng ly tán thưởng!</p>
        </div>
      `;
    }
  } else {
    window.soundSystem.playBuzzer();
    const penalty = window.appState.getRandomPenalty(null, 'Soi Góc Đoán Người');
    game3State.resultHtml = `
      <div class="result-card-popup" style="border-color: #ef4444;">
        <div style="margin-bottom: 8px;">${icons.beer(52, '#ef4444')}</div>
        <h3 class="title-tet" style="color: #fca5a5; font-size: 1.5rem;">ĐOÁN SAI HOẶC QUÁ GIỜ!</h3>
        <div class="beer-penalty-box">
          ${penalty}
          <span>Mở full ảnh nhìn lại thật kỹ và nâng ly thực hiện hình phạt nhé!</span>
        </div>
      </div>
    `;
  }

  const main = document.getElementById('app-main');
  if (main && window.location.hash === '#/game-3') {
    main.innerHTML = renderGame3Page();
  }
}
