/**
 * HTTP SERVER LOCAL CỰC NHẸ (NODE.JS THUẦN)
 * CÓ HEADER CHỐNG CACHE TRÌNH DUYỆT (NO-CACHE) ĐỂ CẬP NHẬT GIAO DIỆN TỨC THÌ
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(__dirname, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Không tìm thấy file');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Lỗi máy chủ nội bộ: ' + err.code);
      }
    } else {
      // HEADER CHỐNG CACHE TRÌNH DUYỆT - LUÔN LOAD CODE MỚI NHẤT
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
});

function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

server.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIPs();
  console.log('\n============================================================');
  console.log('🎉 MÁY CHỦ WEB LÌ XÌ TẾT ĐINH MÙI 2027 (UI/UX PRO MAX) 🎉');
  console.log('============================================================');
  console.log(`💻 Truy cập trực tiếp trên máy tính:`);
  console.log(`   👉 http://localhost:${PORT}`);
  
  if (localIps.length > 0) {
    console.log(`\n📱 Truy cập từ điện thoại cả bàn tiệc (cùng WiFi):`);
    localIps.forEach(ip => {
      console.log(`   👉 http://${ip}:${PORT}`);
    });
  }
  console.log('\n⚡ Đã bật Anti-Cache: Tự động tải giao diện mới nhất mỗi lần làm mới trang!');
  console.log('============================================================\n');
});
