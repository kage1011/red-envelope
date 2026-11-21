/**
 * TRANG QUẢN TRỊ ADMIN PRO MAX (/admin)
 * Chuẩn hóa Vector Icons (Anti-Emoji Controls), Thao tác 1 chạm, Xuất Excel UTF-8 BOM
 */

let adminCurrentTab = 'prizes';
let adminFilterGame = 'all';
let adminFilterStatus = 'all';

function renderAdminPage() {
  const state = window.appState.state;
  const icons = window.AppIcons;

  return `
    <div class="container" style="padding-top: 20px; padding-bottom: 60px;">
      <!-- HEADER ADMIN -->
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <a href="#/" class="btn-outline">
          ${icons.arrowLeft(16, 'currentColor')}
          <span>Về Trang Chủ</span>
        </a>
        <div class="flex items-center gap-2">
          <span class="badge-stock" style="background: rgba(220, 38, 38, 0.3); border-color: #ef4444; color: #fca5a5;">
            ${icons.shield(14, '#fca5a5')}
            <span>KHU VỰC QUẢN TRỊ VIÊN</span>
          </span>
          <button class="btn-red" style="padding: 6px 14px; font-size: 0.82rem;" onclick="confirmResetAllData()">
            ${icons.refresh(14, '#ffffff')}
            <span>Reset Gốc</span>
          </button>
        </div>
      </div>

      <div class="mb-6">
        <h1 class="title-tet title-gold-gradient" style="font-size: 2.1rem; margin-bottom: 6px;">
          HỆ THỐNG QUẢN TRỊ TẾT 2027
        </h1>
        <p style="color: var(--text-muted-gold); font-size: 0.95rem;">
          Dữ liệu được lưu trữ an toàn trên thiết bị (Offline Storage) theo chuẩn UI/UX Pro Max.
        </p>
      </div>

      <!-- TABS ĐIỀU HƯỚNG -->
      <div class="admin-tabs">
        <button class="admin-tab-btn ${adminCurrentTab === 'prizes' ? 'active' : ''}" onclick="switchAdminTab('prizes')">
          ${icons.gift(16, 'currentColor')}
          <span>1. Quản Lý Giải Thưởng</span>
        </button>
        <button class="admin-tab-btn ${adminCurrentTab === 'penalties' ? 'active' : ''}" onclick="switchAdminTab('penalties')">
          ${icons.beer(16, 'currentColor')}
          <span>2. Hình Phạt & Nội Dung Game</span>
        </button>
        <button class="admin-tab-btn ${adminCurrentTab === 'players' ? 'active' : ''}" onclick="switchAdminTab('players')">
          <span>👥 3. Người Tham Gia (${state.participants.length})</span>
        </button>
        <button class="admin-tab-btn ${adminCurrentTab === 'winners' ? 'active' : ''}" onclick="switchAdminTab('winners')">
          ${icons.trophy(16, 'currentColor')}
          <span>4. Người Trúng Thưởng (${state.winners.length})</span>
        </button>
      </div>

      <!-- NỘI DUNG TỪNG TAB -->
      <div class="glass-panel" style="padding: 26px;">
        ${renderCurrentAdminTabContent()}
      </div>
    </div>
  `;
}

function switchAdminTab(tab) {
  adminCurrentTab = tab;
  const main = document.getElementById('app-main');
  if (main) main.innerHTML = renderAdminPage();
}

function renderCurrentAdminTabContent() {
  switch (adminCurrentTab) {
    case 'prizes':
      return renderAdminPrizesTab();
    case 'penalties':
      return renderAdminPenaltiesTab();
    case 'players':
      return renderAdminPlayersTab();
    case 'winners':
      return renderAdminWinnersTab();
    default:
      return '';
  }
}

// ==================== TAB 1: QUẢN LÝ GIẢI THƯỞNG ====================
function renderAdminPrizesTab() {
  const state = window.appState.state;
  const icons = window.AppIcons;

  const renderGamePrizeTable = (title, key, iconFn) => {
    const list = state[key] || [];
    const totalRemaining = list.reduce((s, i) => s + (i.remaining || 0), 0);
    return `
      <div style="margin-bottom: 30px;">
        <div class="flex items-center justify-between mb-2">
          <h3 style="color: #fde047; font-size: 1.2rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            ${iconFn(20, '#fbbf24')}
            <span>${title} (Còn ${totalRemaining}/10 giải)</span>
          </h3>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Tên Giải Thưởng</th>
                <th style="width: 140px;">Giá Trị (VNĐ)</th>
                <th style="width: 90px;">Tổng SL</th>
                <th style="width: 110px;">Còn Lại</th>
                <th style="width: 90px;">Tỷ Lệ %</th>
              </tr>
            </thead>
            <tbody>
              ${list.map((p, idx) => `
                <tr>
                  <td>
                    <input type="text" class="form-control" value="${p.name}" 
                           onchange="updatePrizeField('${key}', ${idx}, 'name', this.value)" />
                  </td>
                  <td>
                    <input type="number" class="form-control" value="${p.value}" 
                           onchange="updatePrizeField('${key}', ${idx}, 'value', parseInt(this.value) || 0)" />
                  </td>
                  <td>
                    <input type="number" class="form-control" value="${p.total}" 
                           onchange="updatePrizeField('${key}', ${idx}, 'total', parseInt(this.value) || 0)" />
                  </td>
                  <td>
                    <input type="number" class="form-control" style="font-weight: 900; color: ${p.remaining > 0 ? '#4ade80' : '#ef4444'};"
                           value="${p.remaining}" 
                           onchange="updatePrizeField('${key}', ${idx}, 'remaining', parseInt(this.value) || 0)" />
                  </td>
                  <td>
                    <input type="number" class="form-control" value="${p.rate || 10}" 
                           onchange="updatePrizeField('${key}', ${idx}, 'rate', parseInt(this.value) || 1)" />
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  return `
    <div>
      <h2 class="title-tet" style="font-size: 1.4rem; color: #fde047; margin-bottom: 12px;">
        QUẢN LÝ 10 GIẢI THƯỞNG CHO 3 GAME CHÍNH & KHO QUÀ BONUS
      </h2>
      <p style="color: #fef08a; font-size: 0.9rem; margin-bottom: 22px;">
        Mỗi game chính có cấu hình 10 giải thưởng giới hạn. Số lượng 'Còn Lại' tự động trừ khi có người trúng giải.
      </p>

      ${renderGamePrizeTable('Trò 1: Gỡ Bom Bao Lì Xì', 'game1Prizes', icons.redPacket)}
      ${renderGamePrizeTable('Trò 2: Xếp Gỗ Tháp Lộc', 'game2Prizes', icons.tower)}
      ${renderGamePrizeTable('Trò 3: Soi Góc Đoán Người', 'game3Prizes', icons.magnifier)}

      <!-- QUÀ TẶNG TRÒ PHỤ (KHÔNG GIỚI HẠN) -->
      <div class="mt-6">
        <h3 style="color: #34d399; font-size: 1.2rem; font-weight: 800; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          ${icons.flower(22, '#34d399')}
          <span>Nhóm Quà Tặng Không Giới Hạn (Trò Chơi Phụ)</span>
        </h3>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Tên Quà Tặng / Đặc Quyền</th>
                <th>Mô Tả Chi Tiết</th>
                <th style="width: 130px;">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              ${state.bonusPrizes.map((bp, idx) => `
                <tr>
                  <td>
                    <input type="text" class="form-control" value="${bp.name}" 
                           onchange="updateBonusPrizeField(${idx}, 'name', this.value)" />
                  </td>
                  <td>
                    <input type="text" class="form-control" value="${bp.desc || ''}" 
                           onchange="updateBonusPrizeField(${idx}, 'desc', this.value)" />
                  </td>
                  <td>
                    <button class="status-badge ${bp.active ? 'claimed' : 'unclaimed'}" 
                            onclick="toggleBonusActive(${idx})">
                      ${bp.active ? '✓ Đang Bật' : '✕ Đang Tắt'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function updatePrizeField(gameKey, index, field, value) {
  window.appState.state[gameKey][index][field] = value;
  window.appState.saveState();
}

function updateBonusPrizeField(index, field, value) {
  window.appState.state.bonusPrizes[index][field] = value;
  window.appState.saveState();
}

function toggleBonusActive(index) {
  const bp = window.appState.state.bonusPrizes[index];
  bp.active = !bp.active;
  window.appState.saveState();
  switchAdminTab('prizes');
}

// ==================== TAB 2: HÌNH PHẠT & NỘI DUNG GAME ====================
function renderAdminPenaltiesTab() {
  const state = window.appState.state;
  const icons = window.AppIcons;

  return `
    <div>
      <h2 class="title-tet" style="font-size: 1.4rem; color: #fde047; margin-bottom: 16px;">
        QUẢN LÝ HÌNH PHẠT BÀN TIỆC & CẤU HÌNH ĐỘ KHÓ
      </h2>

      <!-- CẤU HÌNH ĐỘ KHÓ -->
      <div style="background: rgba(0,0,0,0.35); padding: 20px; border-radius: 14px; margin-bottom: 26px;">
        <h3 style="color: #fde68a; font-size: 1.15rem; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          ${icons.settings(18, '#fbbf24')}
          <span>Tùy Chỉnh Độ Khó Game 2 & Game 3</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label class="form-label">Game 2: Số tầng mục tiêu để thắng:</label>
            <input type="number" class="form-control" value="${state.settings.game2TargetLayers || 10}" 
                   onchange="updateSetting('game2TargetLayers', parseInt(this.value) || 10)" />
          </div>
          <div class="form-group">
            <label class="form-label">Game 2: Tốc độ trượt khởi đầu (1 - 6):</label>
            <input type="number" class="form-control" step="0.5" value="${state.settings.game2Speed || 3.5}" 
                   onchange="updateSetting('game2Speed', parseFloat(this.value) || 3.5)" />
          </div>
          <div class="form-group">
            <label class="form-label">Game 3: Thời gian đếm ngược (giây):</label>
            <input type="number" class="form-control" value="${state.settings.game3CountdownSeconds || 15}" 
                   onchange="updateSetting('game3CountdownSeconds', parseInt(this.value) || 15)" />
          </div>
        </div>
      </div>

      <!-- NGÂN HÀNG HÌNH PHẠT -->
      <div style="margin-bottom: 30px;">
        <div class="flex items-center justify-between mb-2">
          <h3 style="color: #fca5a5; font-size: 1.15rem; display: flex; align-items: center; gap: 8px;">
            ${icons.beer(18, '#ef4444')}
            <span>Danh Sách Câu Hình Phạt Bàn Tiệc (Uống Bia / Thử Thách)</span>
          </h3>
        </div>
        <div style="display: flex; gap: 10px; margin-bottom: 14px;">
          <input type="text" id="new-penalty-input" class="form-control" placeholder="Thêm câu hình phạt mới... (ví dụ: Uống 100% cùng người ngồi cạnh)" />
          <button class="btn-gold" style="white-space: nowrap; padding: 10px 20px;" onclick="addPenalty()">
            + Thêm Phạt
          </button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${state.penalties.map((pen, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.35); padding: 10px 16px; border-radius: 10px; border-left: 4px solid #ef4444;">
              <span style="color: #fff; font-size: 0.95rem;">${pen}</span>
              <button class="btn-red" style="padding: 5px 12px; font-size: 0.8rem;" onclick="deletePenalty(${idx})">
                Xóa
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- NGÂN HÀNG HÌNH ẢNH GAME 3 -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 style="color: #fde047; font-size: 1.15rem; display: flex; align-items: center; gap: 8px;">
            ${icons.magnifier(18, '#fbbf24')}
            <span>Ngân Hàng Hình Ảnh (Cho Trò 3: Soi Góc Đoán Người)</span>
          </h3>
        </div>
        
        <div style="background: rgba(0,0,0,0.35); padding: 18px; border-radius: 14px; margin-bottom: 18px; border: 1.5px dashed rgba(245, 158, 11, 0.5);">
          <div style="font-weight: 800; color: #fff; margin-bottom: 10px;">Tải Ảnh Gốc Từ Máy Tính Lên (Lưu Trực Tiếp Trên Máy):</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 12px;">
            <div>
              <label class="form-label">Chọn File Ảnh:</label>
              <input type="file" id="admin-upload-file" class="form-control" accept="image/*" />
            </div>
            <div>
              <label class="form-label">Tên Đáp Án Chính Xác:</label>
              <input type="text" id="admin-upload-answer" class="form-control" placeholder="Ví dụ: Giám Đốc Tuấn" />
            </div>
            <div>
              <label class="form-label">Tọa Độ Soi Góc (Crop Origin):</label>
              <select id="admin-upload-crop" class="form-control">
                <option value="50% 50%">Trung Tâm (50% 50%)</option>
                <option value="40% 30%">Mắt / Trán (40% 30%)</option>
                <option value="50% 60%">Nụ Cười / Miệng (50% 60%)</option>
                <option value="20% 40%">Góc Trái (20% 40%)</option>
                <option value="80% 40%">Góc Phải (80% 40%)</option>
              </select>
            </div>
          </div>
          <button class="btn-gold" style="padding: 10px 24px;" onclick="uploadCustomGame3Image()">
            + Tải Ảnh Lên Ngân Hàng
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 18px;">
          ${state.game3Images.map((img, idx) => `
            <div style="background: rgba(0,0,0,0.45); border: 1.5px solid rgba(245, 158, 11, 0.35); border-radius: 14px; padding: 14px; display: flex; flex-direction: column;">
              <div style="width: 100%; height: 160px; border-radius: 10px; overflow: hidden; background: #000; margin-bottom: 10px;">
                <img src="${img.src}" style="width: 100%; height: 100%; object-fit: cover;" alt="${img.title}" />
              </div>
              <div style="font-weight: 800; color: #fde047; margin-bottom: 4px;">Đáp án: ${img.answer}</div>
              <div style="font-size: 0.85rem; color: #fef08a; margin-bottom: 10px;">Góc soi: ${img.cropOrigin || 'Center'}</div>
              <div class="flex items-center justify-between mt-auto">
                <button class="status-badge ${img.active ? 'claimed' : 'unclaimed'}" onclick="toggleGame3ImageActive(${idx})">
                  ${img.active ? '✓ Đang Dùng' : '✕ Tạm Tắt'}
                </button>
                <button class="btn-red" style="padding: 5px 10px; font-size: 0.8rem;" onclick="deleteGame3Image(${idx})">
                  Xóa
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function updateSetting(key, val) {
  window.appState.state.settings[key] = val;
  window.appState.saveState();
}

function addPenalty() {
  const input = document.getElementById('new-penalty-input');
  if (input && input.value.trim()) {
    window.appState.state.penalties.push(input.value.trim());
    window.appState.saveState();
    switchAdminTab('penalties');
  }
}

function deletePenalty(index) {
  window.appState.state.penalties.splice(index, 1);
  window.appState.saveState();
  switchAdminTab('penalties');
}

function toggleGame3ImageActive(index) {
  const img = window.appState.state.game3Images[index];
  img.active = !img.active;
  window.appState.saveState();
  switchAdminTab('penalties');
}

function deleteGame3Image(index) {
  if (confirm('Bạn có chắc muốn xóa ảnh này khỏi trò chơi?')) {
    window.appState.state.game3Images.splice(index, 1);
    window.appState.saveState();
    switchAdminTab('penalties');
  }
}

function uploadCustomGame3Image() {
  const fileInput = document.getElementById('admin-upload-file');
  const ansInput = document.getElementById('admin-upload-answer');
  const cropSelect = document.getElementById('admin-upload-crop');

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert('Vui lòng chọn 1 file hình ảnh từ máy!');
    return;
  }
  const answer = (ansInput ? ansInput.value.trim() : '') || 'Nhân vật bí ẩn';
  const crop = cropSelect ? cropSelect.value : '50% 50%';

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const base64Src = e.target.result;
    window.appState.state.game3Images.push({
      id: 'img_' + Date.now(),
      title: answer,
      answer: answer,
      src: base64Src,
      active: true,
      zoomLevel: 3.5,
      cropOrigin: crop
    });
    window.appState.saveState();
    alert('Đã tải ảnh lên thành công và sẵn sàng trong Game 3!');
    switchAdminTab('penalties');
  };

  reader.readAsDataURL(file);
}

// ==================== TAB 3: QUẢN LÝ NGƯỜI THAM GIA ====================
function renderAdminPlayersTab() {
  const state = window.appState.state;
  const list = state.participants || [];

  return `
    <div>
      <h2 class="title-tet" style="font-size: 1.4rem; color: #fde047; margin-bottom: 16px;">
        DANH SÁCH NGƯỜI THAM GIA & THỐNG KÊ LƯỢT CHƠI
      </h2>
      ${list.length === 0 ? `
        <p style="color: #fef08a; text-align: center; padding: 30px 0;">Chưa có người chơi nào tham gia.</p>
      ` : `
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Tên Người Chơi</th>
                <th>Tổng Số Lượt Đã Chơi</th>
                <th>Số Lần Thắng (Nhận Quà)</th>
                <th>Số Lần Thua (Bị Phạt)</th>
                <th>Hoạt Động Gần Nhất</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(p => `
                <tr>
                  <td style="font-weight: 800; color: #fff;">${p.name}</td>
                  <td style="color: #fde68a;">${p.playCount || 0}</td>
                  <td style="color: #4ade80; font-weight: 800;">${p.winCount || 0}</td>
                  <td style="color: #f87171; font-weight: 800;">${p.lossCount || 0}</td>
                  <td style="color: #cbd5e1; font-size: 0.82rem;">${p.lastActive || '--'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// ==================== TAB 4: QUẢN LÝ NGƯỜI TRÚNG THƯỞNG & ĐỐI SOÁT ====================
function renderAdminWinnersTab() {
  const state = window.appState.state;
  const icons = window.AppIcons;
  let list = state.winners || [];

  if (adminFilterGame !== 'all') {
    list = list.filter(w => w.gameTitle === adminFilterGame);
  }
  if (adminFilterStatus !== 'all') {
    list = list.filter(w => w.status === adminFilterStatus);
  }

  return `
    <div>
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 class="title-tet" style="font-size: 1.4rem; color: #fde047;">
            DANH SÁCH NGƯỜI TRÚNG THƯỞNG & ĐỐI SOÁT
          </h2>
          <span style="color: #fde68a; font-size: 0.88rem;">Bấm vào trạng thái để chuyển đổi giữa 'Chưa trao' và 'Đã trao'</span>
        </div>
        <div class="flex gap-2">
          <button class="btn-gold" style="font-size: 0.95rem; padding: 10px 20px;" onclick="window.appState.exportWinnersToCSV()">
            ${icons.download(16, '#3b0713')}
            <span>Xuất File Excel / CSV Đối Soát</span>
          </button>
        </div>
      </div>

      <!-- BỘ LỌC DỮ LIỆU -->
      <div style="display: flex; gap: 14px; margin-bottom: 18px; flex-wrap: wrap;">
        <div>
          <label style="font-size: 0.82rem; color: #fde68a; display: block; margin-bottom: 4px; font-weight: 700;">Lọc Theo Trò Chơi:</label>
          <select class="form-control" style="width: auto;" onchange="setAdminFilter('game', this.value)">
            <option value="all" ${adminFilterGame === 'all' ? 'selected' : ''}>Tất Cả Trò Chơi</option>
            <option value="Gỡ Bom Bao Lì Xì" ${adminFilterGame === 'Gỡ Bom Bao Lì Xì' ? 'selected' : ''}>Gỡ Bom Bao Lì Xì</option>
            <option value="Xếp Gỗ Tháp Lộc" ${adminFilterGame === 'Xếp Gỗ Tháp Lộc' ? 'selected' : ''}>Xếp Gỗ Tháp Lộc</option>
            <option value="Soi Góc Đoán Người" ${adminFilterGame === 'Soi Góc Đoán Người' ? 'selected' : ''}>Soi Góc Đoán Người</option>
            <option value="Bốc Quẻ Lộc Nở Trăm Hoa" ${adminFilterGame === 'Bốc Quẻ Lộc Nở Trăm Hoa' ? 'selected' : ''}>Bốc Quẻ Lộc Nở Trăm Hoa</option>
          </select>
        </div>
        <div>
          <label style="font-size: 0.82rem; color: #fde68a; display: block; margin-bottom: 4px; font-weight: 700;">Lọc Trạng Thái Trao Thưởng:</label>
          <select class="form-control" style="width: auto;" onchange="setAdminFilter('status', this.value)">
            <option value="all" ${adminFilterStatus === 'all' ? 'selected' : ''}>Tất Cả Trạng Thái</option>
            <option value="unclaimed" ${adminFilterStatus === 'unclaimed' ? 'selected' : ''}>Chưa Trao</option>
            <option value="claimed" ${adminFilterStatus === 'claimed' ? 'selected' : ''}>Đã Trao</option>
          </select>
        </div>
      </div>

      <!-- BẢNG TRÚNG THƯỞNG -->
      ${list.length === 0 ? `
        <p style="color: #fef08a; text-align: center; padding: 30px 0;">Không tìm thấy bản ghi trúng thưởng nào phù hợp.</p>
      ` : `
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Tên Người Chơi</th>
                <th>Trò Chơi</th>
                <th>Tên Phần Thưởng</th>
                <th>Giá Trị</th>
                <th>Thời Gian Trúng</th>
                <th style="width: 130px;">Trạng Thái Trao</th>
              </tr>
            </thead>
            <tbody>
              ${list.map(w => `
                <tr>
                  <td style="font-weight: 800; color: #fff;">${w.playerName}</td>
                  <td style="color: #fde68a;">${w.gameTitle}</td>
                  <td style="color: #facc15; font-weight: 700;">${w.prizeName}</td>
                  <td>${w.prizeValue ? w.prizeValue.toLocaleString('vi-VN') + ' đ' : '--'}</td>
                  <td style="color: #cbd5e1; font-size: 0.82rem;">${w.timestamp}</td>
                  <td>
                    <button class="status-badge ${w.status === 'claimed' ? 'claimed' : 'unclaimed'}" 
                            title="Bấm để đổi trạng thái"
                            onclick="toggleWinnerStatusFromAdmin('${w.id}')">
                      ${w.status === 'claimed' ? '✓ Đã Trao' : 'Chưa Trao'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

function setAdminFilter(type, value) {
  if (type === 'game') adminFilterGame = value;
  if (type === 'status') adminFilterStatus = value;
  switchAdminTab('winners');
}

function toggleWinnerStatusFromAdmin(id) {
  window.appState.toggleWinnerStatus(id);
  switchAdminTab('winners');
}

function confirmResetAllData() {
  if (confirm('CẢNH BÁO: Bạn có chắc chắn muốn khôi phục toàn bộ giải thưởng, tồn kho và danh sách trúng thưởng về mặc định ban đầu không?')) {
    window.appState.resetToDefault();
    alert('Đã khôi phục cài đặt gốc thành công!');
    switchAdminTab('prizes');
  }
}
