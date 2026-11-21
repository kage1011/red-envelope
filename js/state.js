/**
 * STATE MANAGEMENT & LOCAL STORAGE
 * Quản trị toàn bộ dữ liệu 100% Offline: Giải thưởng, Kho tồn, Hình phạt, Người chơi, Trúng thưởng & Xuất CSV
 */

const STORAGE_KEYS = {
  STATE: 'TET_2027_STATE_V1',
  CURRENT_PLAYER: 'TET_2027_CURRENT_PLAYER'
};

// 1. Dữ liệu mặc định ban đầu
const DEFAULT_STATE = {
  // 10 giải thưởng giới hạn cho Game 1: Gỡ Bom Bao Lì Xì
  game1Prizes: [
    { id: 'g1_1', name: 'Độc Đắc: Lì Xì Đại Phú Quý', value: 1000000, total: 1, remaining: 1, rate: 5 },
    { id: 'g1_2', name: 'Nhất: Phong Bao Phát Tài', value: 500000, total: 2, remaining: 2, rate: 10 },
    { id: 'g1_3', name: 'Nhì: Lì Xì An Khang', value: 200000, total: 3, remaining: 3, rate: 25 },
    { id: 'g1_4', name: 'Ba: Lì Xì Thịnh Vượng', value: 100000, total: 4, remaining: 4, rate: 60 }
  ],

  // 10 giải thưởng giới hạn cho Game 2: Xếp Gỗ Tháp Lộc
  game2Prizes: [
    { id: 'g2_1', name: 'Độc Đắc: Thần Tháp Đinh Mùi', value: 1000000, total: 1, remaining: 1, rate: 5 },
    { id: 'g2_2', name: 'Nhất: Tháp Vàng May Mắn', value: 500000, total: 2, remaining: 2, rate: 10 },
    { id: 'g2_3', name: 'Nhì: Cân Bằng Tài Lộc', value: 200000, total: 3, remaining: 3, rate: 25 },
    { id: 'g2_4', name: 'Ba: Khởi Sắc Đầu Xuân', value: 100000, total: 4, remaining: 4, rate: 60 }
  ],

  // 10 giải thưởng giới hạn cho Game 3: Soi Góc Đoán Người
  game3Prizes: [
    { id: 'g3_1', name: 'Độc Đắc: Nhãn Thần Khai Xuân', value: 1000000, total: 1, remaining: 1, rate: 5 },
    { id: 'g3_2', name: 'Nhất: Mắt Vàng Soi Lộc', value: 500000, total: 2, remaining: 2, rate: 10 },
    { id: 'g3_3', name: 'Nhì: Thấu Thị Đầu Năm', value: 200000, total: 3, remaining: 3, rate: 25 },
    { id: 'g3_4', name: 'Ba: Nhanh Trí Hái Tiền', value: 100000, total: 4, remaining: 4, rate: 60 }
  ],

  // Trò chơi phụ: Quà không giới hạn
  bonusPrizes: [
    { id: 'bp_1', name: 'Lì Xì Lộc 20.000đ', type: 'money', value: 20000, active: true, desc: 'Lộc may mắn lì xì tươi đầu năm!' },
    { id: 'bp_2', name: 'Lì Xì Lộc 10.000đ', type: 'money', value: 10000, active: true, desc: 'Lộc may mắn khởi sắc bình an!' },
    { id: 'bp_3', name: 'Thẻ Thần Men: Kim Bài Miễn Tử', type: 'privilege', value: 0, active: true, desc: 'Miễn uống 1 lần phạt trong suốt buổi tiệc!' },
    { id: 'bp_4', name: 'Thẻ Thần Men: Triệu Hồi Uống Hộ', type: 'privilege', value: 0, active: true, desc: 'Chỉ định 1 người bất kỳ trong bàn uống hộ bạn nửa ly!' },
    { id: 'bp_5', name: 'Thẻ Thần Men: Phản Đòn Bàn Tiệc', type: 'privilege', value: 0, active: true, desc: 'Chuyển ngay hình phạt cho người vừa thách thức bạn!' },
    { id: 'bp_6', name: 'Quẻ Tết: Tình Duyên Nở Rộ 2027', type: 'blessing', value: 0, active: true, desc: 'Năm Đinh Mùi tình duyên đỏ rực, thoát ế ngoạn mục!' },
    { id: 'bp_7', name: 'Quẻ Tết: Thăng Quan Tiến Chức', type: 'blessing', value: 0, active: true, desc: 'Sự nghiệp thăng hoa, tiền tài rủng rỉnh cả năm!' }
  ],

  // Ngân hàng hình phạt bàn tiệc (Uống bia / Thử thách)
  penalties: [
    "🍺 Uống cạn 100% một hơi chào đón năm mới Đinh Mùi!",
    "🍻 Uống 50% và bắt tay chúc mừng người ngồi đối diện!",
    "🥂 Nhấp môi 3 ngụm và nói 3 lời chúc tốt đẹp tới bàn tiệc!",
    "🎤 Vừa nâng ly nửa cốc vừa hát vang 2 câu bài hát về mùa Xuân!",
    "🤝 Bắt tay người ngồi bên phải, khen 1 câu chân thành rồi cùng uống 1 ngụm!",
    "🤫 Thú nhận 1 kỷ niệm đáng nhớ nhất năm 2026 hoặc uống trọn 1 ly đầy!",
    "👑 Quyền năng Thần Men: Chỉ định 1 người bất kỳ trong bàn cùng nâng ly chia vui!",
    "🕺 Đứng lên tạo dáng linh vật Đinh Mùi 2027 và hô 'Chúc Mừng Năm Mới' rồi nhấp môi!"
  ],

  // Cài đặt độ khó trò chơi
  settings: {
    game2TargetLayers: 10,     // Game 2: Số tầng để thắng
    game2Speed: 3,             // Game 2: Tốc độ trượt
    game3CountdownSeconds: 15  // Game 3: Thời gian đếm ngược (giây)
  },

  // Ngân hàng hình ảnh Game 3 (Soi góc đoán người)
  game3Images: [
    {
      id: 'img_1',
      title: 'Sếp Tổng Hoàng Gia',
      answer: 'Sếp Tổng',
      // SVG data URL chuẩn offline không cần mạng
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23450a0a"/><circle cx="300" cy="240" r="120" fill="%23fde047"/><circle cx="260" cy="220" r="16" fill="%231e000a"/><circle cx="340" cy="220" r="16" fill="%231e000a"/><path d="M 270 280 Q 300 320 330 280" stroke="%23b91c1c" stroke-width="8" fill="none"/><polygon points="220,130 300,70 380,130 350,160 250,160" fill="%23f59e0b" stroke="%23ffffff" stroke-width="4"/><path d="M 180 500 Q 300 380 420 500 Z" fill="%23b91c1c"/><text x="300" y="550" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23fef08a" text-anchor="middle">SẾP TỔNG VẠN TUẾ</text></svg>',
      active: true,
      zoomLevel: 3.5,
      cropOrigin: '45% 35%' // Góc crop mắt/vương miện
    },
    {
      id: 'img_2',
      title: 'Trưởng Phòng Tài Ba',
      answer: 'Trưởng Phòng',
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%231e1b4b"/><circle cx="300" cy="250" r="110" fill="%23fed7aa"/><circle cx="250" cy="230" r="28" fill="none" stroke="%23f59e0b" stroke-width="8"/><circle cx="350" cy="230" r="28" fill="none" stroke="%23f59e0b" stroke-width="8"/><line x1="278" y1="230" x2="322" y2="230" stroke="%23f59e0b" stroke-width="8"/><circle cx="250" cy="230" r="12" fill="%230f172a"/><circle cx="350" cy="230" r="12" fill="%230f172a"/><path d="M 280 290 Q 300 320 320 290" stroke="%23dc2626" stroke-width="6" fill="none"/><path d="M 170 520 Q 300 400 430 520 Z" fill="%231e3a8a"/><text x="300" y="560" font-family="sans-serif" font-size="30" font-weight="bold" fill="%23fef08a" text-anchor="middle">TRƯỞNG PHÒNG TÀI BA</text></svg>',
      active: true,
      zoomLevel: 3.8,
      cropOrigin: '55% 40%' // Kính mắt
    },
    {
      id: 'img_3',
      title: 'Hoa Khôi Bàn Tiệc',
      answer: 'Hoa Khôi',
      src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23701a75"/><circle cx="300" cy="240" r="115" fill="%23ffedd5"/><circle cx="260" cy="225" r="14" fill="%234a044e"/><circle cx="340" cy="225" r="14" fill="%234a044e"/><path d="M 260 280 Q 300 330 340 280 Z" fill="%23e11d48"/><circle cx="210" cy="210" r="25" fill="%23f43f5e"/><circle cx="390" cy="210" r="25" fill="%23f43f5e"/><path d="M 180 510 Q 300 390 420 510 Z" fill="%23be185d"/><text x="300" y="560" font-family="sans-serif" font-size="30" font-weight="bold" fill="%23fef08a" text-anchor="middle">HOA KHÔI BÀN TIỆC</text></svg>',
      active: true,
      zoomLevel: 3.6,
      cropOrigin: '50% 50%' // Nụ cười
    }
  ],

  // Danh sách người tham gia chơi
  participants: [
    { name: 'Khách Vip 01', playCount: 2, winCount: 1, lossCount: 1, lastActive: '2026-11-22 00:30' }
  ],

  // Danh sách Người trúng thưởng (có đối soát)
  winners: [
    {
      id: 'win_101',
      playerName: 'Khách Vip 01',
      gameTitle: 'Gỡ Bom Bao Lì Xì',
      prizeName: 'Nhất: Phong Bao Phát Tài',
      prizeValue: 500000,
      timestamp: '2026-11-22 00:30:15',
      status: 'unclaimed' // 'unclaimed' (Chưa trao) | 'claimed' (Đã trao)
    }
  ],

  // Lịch sử biến động gần nhất để chạy trên thanh Ticker
  recentEvents: [
    { text: 'Chúc Mừng Năm Mới Đinh Mùi 2027 - Vạn Sự Như Ý, Tỷ Sự Như Mơ!' },
    { text: 'Khách Vip 01 vừa rinh giải Nhất: Phong Bao Phát Tài 500.000đ!' }
  ]
};

class StateManager {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATE);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Lỗi đọc localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(this.state));
    } catch (e) {
      console.error('Lỗi lưu localStorage:', e);
    }
  }

  getCurrentPlayer() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_PLAYER) || 'Người Chơi May Mắn';
  }

  setCurrentPlayer(name) {
    const cleanName = (name || '').trim() || 'Người Chơi May Mắn';
    localStorage.setItem(STORAGE_KEYS.CURRENT_PLAYER, cleanName);

    // Ghi nhận vào danh sách người tham gia
    const existing = this.state.participants.find(p => p.name.toLowerCase() === cleanName.toLowerCase());
    const nowStr = new Date().toLocaleString('vi-VN');
    if (existing) {
      existing.lastActive = nowStr;
    } else {
      this.state.participants.push({
        name: cleanName,
        playCount: 0,
        winCount: 0,
        lossCount: 0,
        lastActive: nowStr
      });
    }
    this.saveState();
    return cleanName;
  }

  recordGamePlay(playerName, isWin) {
    const p = this.state.participants.find(item => item.name.toLowerCase() === playerName.toLowerCase());
    if (p) {
      p.playCount = (p.playCount || 0) + 1;
      if (isWin) {
        p.winCount = (p.winCount || 0) + 1;
      } else {
        p.lossCount = (p.lossCount || 0) + 1;
      }
      p.lastActive = new Date().toLocaleString('vi-VN');
      this.saveState();
    }
  }

  // Tính tổng số giải còn lại của 1 game
  getRemainingPrizesCount(gameKey) {
    const list = this.state[gameKey] || [];
    return list.reduce((sum, item) => sum + (item.remaining || 0), 0);
  }

  // Lấy 1 giải thưởng ngẫu nhiên theo tỷ lệ từ kho giải còn tồn
  claimRandomPrize(gameKey, playerName, gameTitle) {
    const prizes = this.state[gameKey] || [];
    const available = prizes.filter(p => p.remaining > 0);

    if (available.length === 0) {
      return null; // Đã hết giải
    }

    // Tính toán weighted random
    const totalWeight = available.reduce((sum, p) => sum + (p.rate || 10), 0);
    let rand = Math.random() * totalWeight;
    let chosen = available[0];

    for (const p of available) {
      if (rand < (p.rate || 10)) {
        chosen = p;
        break;
      }
      rand -= (p.rate || 10);
    }

    // Trừ kho tồn theo thời gian thực
    chosen.remaining -= 1;

    // Ghi nhận người trúng
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const winRecord = {
      id: 'win_' + Date.now(),
      playerName: playerName || this.getCurrentPlayer(),
      gameTitle: gameTitle,
      prizeName: chosen.name,
      prizeValue: chosen.value,
      timestamp: timeStr,
      status: 'unclaimed'
    };

    this.state.winners.unshift(winRecord);
    this.state.recentEvents.unshift({
      text: `🎉 ${winRecord.playerName} vừa trúng [${winRecord.prizeName}] trong ${winRecord.gameTitle}!`
    });
    if (this.state.recentEvents.length > 20) this.state.recentEvents.pop();

    this.recordGamePlay(playerName || this.getCurrentPlayer(), true);
    this.saveState();

    return { prize: chosen, record: winRecord };
  }

  // Lấy 1 câu hình phạt ngẫu nhiên
  getRandomPenalty(playerName, gameTitle) {
    const penalties = this.state.penalties;
    const penalty = penalties[Math.floor(Math.random() * penalties.length)];
    const pName = playerName || this.getCurrentPlayer();

    this.recordGamePlay(pName, false);
    this.state.recentEvents.unshift({
      text: `🍻 ${pName} không may dính bẫy trong ${gameTitle}: ${penalty}`
    });
    if (this.state.recentEvents.length > 20) this.state.recentEvents.pop();
    this.saveState();

    return penalty;
  }

  // Lấy 1 phần quà không giới hạn (Game Bonus)
  claimBonusPrize(playerName) {
    const activeBonus = this.state.bonusPrizes.filter(b => b.active);
    const chosen = activeBonus[Math.floor(Math.random() * activeBonus.length)];
    const pName = playerName || this.getCurrentPlayer();

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const record = {
      id: 'bonus_' + Date.now(),
      playerName: pName,
      gameTitle: 'Bốc Quẻ Lộc Nở Trăm Hoa',
      prizeName: chosen.name,
      prizeValue: chosen.value || 0,
      timestamp: timeStr,
      status: chosen.type === 'money' ? 'unclaimed' : 'claimed'
    };

    this.state.winners.unshift(record);
    this.state.recentEvents.unshift({
      text: `🌸 ${pName} bốc được quẻ may mắn: [${chosen.name}]!`
    });
    if (this.state.recentEvents.length > 20) this.state.recentEvents.pop();

    this.recordGamePlay(pName, true);
    this.saveState();

    return { prize: chosen, record };
  }

  // Đổi trạng thái Đã trao / Chưa trao
  toggleWinnerStatus(recordId) {
    const winner = this.state.winners.find(w => w.id === recordId);
    if (winner) {
      winner.status = winner.status === 'claimed' ? 'unclaimed' : 'claimed';
      this.saveState();
      return winner.status;
    }
    return null;
  }

  // Xuất file CSV / Excel đối soát tiếng Việt chuẩn UTF-8 BOM
  exportWinnersToCSV() {
    const headers = ['Mã Trao Thưởng', 'Tên Người Chơi', 'Trò Chơi', 'Tên Giải Thưởng / Quà', 'Giá Trị (VNĐ)', 'Thời Gian Trúng', 'Trạng Thái'];
    const rows = this.state.winners.map(w => [
      `"${w.id}"`,
      `"${w.playerName.replace(/"/g, '""')}"`,
      `"${w.gameTitle.replace(/"/g, '""')}"`,
      `"${w.prizeName.replace(/"/g, '""')}"`,
      w.prizeValue || 0,
      `"${w.timestamp}"`,
      `"${w.status === 'claimed' ? 'Đã Trao' : 'Chưa Trao'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Doi_Soat_Trung_Thuong_Tet_2027_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Khôi phục cài đặt gốc
  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.saveState();
  }
}

window.appState = new StateManager();
