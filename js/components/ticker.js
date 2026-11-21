/**
 * TICKER COMPONENT - BENTO FLOATING NEON (UI/UX PRO MAX)
 */
function renderTicker() {
  const events = window.appState.state.recentEvents || [];
  const textChain = events.map(e => e.text).join(' &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp; ');

  return `
    <div class="ticker-bar">
      <div class="ticker-inner">
        <div class="ticker-label">
          <span>⚡ LIVE</span>
        </div>
        <div class="ticker-marquee">
          ${textChain || 'Chúc Mừng Năm Mới Đinh Mùi 2027! Vạn Sự Như Ý - Tấn Tài Tấn Lộc!'}
        </div>
      </div>
    </div>
  `;
}
