/**
 * HỆ THỐNG ÂM THANH TẾT PRO MAX (WEB AUDIO API - 100% OFFLINE)
 * Tự tổng hợp giai điệu ngũ cung mùa xuân (Pentatonic Tet Melody), pháo nổ giòn giã, tiếng sập tháp, tiếng chuông vàng
 */

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureContext() {
    if (!this.audioCtx) {
      this.initAudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // 1. Giai điệu ngũ cung mừng Xuân Đinh Mùi (Ngũ cung Việt: Đô - Rê - Fa - Sol - La)
  playSpringMelody() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const melody = [
      { f: 523.25, d: 0.2 }, // C5
      { f: 587.33, d: 0.2 }, // D5
      { f: 698.46, d: 0.25 }, // F5
      { f: 783.99, d: 0.3 }, // G5
      { f: 880.00, d: 0.4 }, // A5
      { f: 1046.50, d: 0.6 } // C6
    ];

    let time = this.audioCtx.currentTime;
    melody.forEach((note) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(time);
      osc.stop(time + note.d);
      time += note.d * 0.75;
    });
  }

  // 2. Tiếng pháo hoa mừng năm mới trúng Lì Xì Độc Đắc
  playCheer() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    this.playSpringMelody();

    // Tiếng chuông vàng ting ting hòa nhịp
    setTimeout(() => {
      [1046.50, 1318.51, 1567.98].forEach((freq, idx) => {
        setTimeout(() => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

          gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start();
          osc.stop(this.audioCtx.currentTime + 0.6);
        }, idx * 120);
      });
    }, 450);
  }

  // 3. Tiếng pháo nổ giòn giã tạch tạch đùng (Game 1 - Trúng Bom)
  playBomb() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    // Tràng pháo nổ liên hoàn
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const bufferSize = this.audioCtx.sampleRate * 0.12;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = Math.random() * 2 - 1;
        }

        const noise = this.audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000 - i * 150, this.audioCtx.currentTime);

        const gain = this.audioCtx.createGain();
        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.12);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);

        noise.start();
        noise.stop(this.audioCtx.currentTime + 0.12);
      }, i * 70);
    }

    // Tiếng đùng lớn cuối cùng
    setTimeout(() => {
      const bufferSize = this.audioCtx.sampleRate * 0.45;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.45);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start();
      noise.stop(this.audioCtx.currentTime + 0.45);
    }, 300);
  }

  // 4. Tiếng đặt thanh khối lộc (Game 2)
  playDrop() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(960, this.audioCtx.currentTime + 0.14);

    gain.gain.setValueAtTime(0.22, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.14);
  }

  // 5. Tiếng sập tháp lách cách (Game 2)
  playCrash() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320 - i * 50, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.22);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.22);
      }, i * 65);
    }
  }

  // 6. Tiếng đếm ngược tích tắc (Game 3)
  playTick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.06);
  }

  // 7. Tiếng còi buzzer sai (Game 3)
  playBuzzer() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.38);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.38);
  }

  // 8. Tiếng lắc ống quẻ tre (Game Bonus)
  playShake() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, this.audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(260, this.audioCtx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.09);
  }

  // 9. Tiếng chuông lộc vàng ting ting
  playBonus() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    [987.77, 1318.51, 1975.53].forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.22, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.7);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.7);
      }, i * 90);
    });
  }
}

window.soundSystem = new SoundController();
