/**
 * NAVBAR COMPONENT - UI/UX PRO MAX STANDARD
 * Thay thế hoàn toàn emoji bằng Vector SVG Icons đồng bộ chuẩn pro-rules.md
 */
function renderNavbar() {
  const currentPath = window.location.hash || '#/';
  const isMuted = window.soundSystem ? window.soundSystem.isMuted : false;
  const icons = window.AppIcons;

  return `
    <header class="navbar">
      <div class="container navbar-inner">
        <a href="#/" class="nav-brand">
          <div class="nav-logo-icon">
            ${icons.redPacket(24, '#ffffff')}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 1.15rem; color: #fef08a; letter-spacing: 0.5px;">LÌ XÌ TẾT 2027</div>
            <div style="font-size: 0.75rem; color: #fca5a5; letter-spacing: 1.5px; font-weight: 700;">ĐINH MÙI ĐẠI CÁT</div>
          </div>
        </a>

        <nav class="nav-links">
          <a href="#/" class="nav-btn ${currentPath === '#/' ? 'active' : ''}">
            ${icons.home(18, 'currentColor')}
            <span>Trang Chủ</span>
          </a>
          <button class="nav-btn" onclick="toggleSoundFromNav()" id="nav-sound-btn" title="Bật/Tắt âm thanh">
            ${isMuted ? icons.soundMute(18, 'currentColor') : icons.soundOn(18, 'currentColor')}
          </button>
          <a href="#/admin" class="nav-btn nav-btn-admin ${currentPath === '#/admin' ? 'active' : ''}">
            ${icons.settings(18, 'currentColor')}
            <span>Quản Trị</span>
          </a>
        </nav>
      </div>
    </header>
  `;
}

function toggleSoundFromNav() {
  if (window.soundSystem) {
    const muted = window.soundSystem.toggleMute();
    const btn = document.getElementById('nav-sound-btn');
    if (btn && window.AppIcons) {
      btn.innerHTML = muted ? window.AppIcons.soundMute(18, 'currentColor') : window.AppIcons.soundOn(18, 'currentColor');
    }
  }
}
