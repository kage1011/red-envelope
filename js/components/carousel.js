/**
 * MODAL HƯỚNG DẪN DẠNG SLIDE (CAROUSEL 3 BƯỚC) - UI/UX PRO MAX STANDARD
 * Áp dụng chuẩn Vector SVG Icons, motion timing tự nhiên và trợ năng
 */

class CarouselGuide {
  constructor() {
    this.modalEl = null;
    this.currentStep = 0;
    this.slidesData = [];
    this.onStartCallback = null;
    this.createDom();
  }

  createDom() {
    let overlay = document.getElementById('guide-carousel-modal');
    const icons = window.AppIcons;

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'guide-carousel-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="carousel-modal">
          <div class="carousel-slide-content" id="carousel-slide-body">
            <!-- Nội dung slide sẽ render ở đây -->
          </div>
          <div class="carousel-dots" id="carousel-dots-container"></div>
          <div class="carousel-actions">
            <button class="btn-outline" id="carousel-btn-prev">
              ${icons ? icons.arrowLeft(16) : '←'} Trước
            </button>
            <button class="btn-gold" id="carousel-btn-next">
              Tiếp Theo ${icons ? icons.arrowRight(16) : '→'}
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Thêm nút nổi (?) Hướng dẫn SVG
      let floatHelp = document.getElementById('floating-help-btn');
      if (!floatHelp) {
        floatHelp = document.createElement('button');
        floatHelp.id = 'floating-help-btn';
        floatHelp.className = 'btn-floating-help';
        floatHelp.title = 'Mở lại hướng dẫn chơi';
        floatHelp.innerHTML = icons ? icons.help(26, '#3b0713') : '?';
        floatHelp.onclick = () => this.showCurrent();
        document.body.appendChild(floatHelp);
      }
    }

    this.modalEl = overlay;
    this.prevBtn = document.getElementById('carousel-btn-prev');
    this.nextBtn = document.getElementById('carousel-btn-next');
    this.bodyEl = document.getElementById('carousel-slide-body');
    this.dotsEl = document.getElementById('carousel-dots-container');

    this.prevBtn.onclick = () => this.prev();
    this.nextBtn.onclick = () => this.next();
  }

  setup(slides, onStart) {
    this.slidesData = slides || [];
    this.currentStep = 0;
    this.onStartCallback = onStart;
    this.render();
  }

  showCurrent() {
    if (!this.slidesData || this.slidesData.length === 0) return;
    this.currentStep = 0;
    this.render();
    this.modalEl.classList.add('active');
  }

  hide() {
    this.modalEl.classList.remove('active');
    if (this.onStartCallback) {
      this.onStartCallback();
    }
  }

  render() {
    if (this.slidesData.length === 0) return;
    const slide = this.slidesData[this.currentStep];
    const icons = window.AppIcons;

    this.bodyEl.innerHTML = `
      <div class="carousel-icon">${slide.icon || (icons ? icons.gift(48, '#fbbf24') : '🧧')}</div>
      <div class="carousel-step-tag">BƯỚC ${this.currentStep + 1} / ${this.slidesData.length}</div>
      <h3 class="carousel-title">${slide.title}</h3>
      <p class="carousel-text">${slide.content}</p>
    `;

    this.dotsEl.innerHTML = this.slidesData.map((_, idx) => `
      <div class="carousel-dot ${idx === this.currentStep ? 'active' : ''}" onclick="window.carouselGuide.goTo(${idx})"></div>
    `).join('');

    this.prevBtn.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';

    if (this.currentStep === this.slidesData.length - 1) {
      this.nextBtn.innerHTML = `${icons ? icons.sparkles(18) : '✨'} Bắt Đầu Chơi Ngay!`;
    } else {
      this.nextBtn.innerHTML = `Tiếp Theo ${icons ? icons.arrowRight(16) : '→'}`;
    }
  }

  goTo(step) {
    this.currentStep = step;
    this.render();
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  next() {
    if (this.currentStep < this.slidesData.length - 1) {
      this.currentStep++;
      this.render();
    } else {
      this.hide();
    }
  }
}

window.carouselGuide = new CarouselGuide();
