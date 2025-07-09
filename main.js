function downloadVideo() {
  const link = document.getElementById("tiktokLink").value;
  if (!validasiLink(link)) return;

  // Coba redirect langsung ke link download TikTok via API eksternal
  window.location.href = `https://your-server.com/api/tiktok/video?url=${encodeURIComponent(link)}`;
}

function downloadAudio() {
  const link = document.getElementById("tiktokLink").value;
  if (!validasiLink(link)) return;

  window.location.href = `https://your-server.com/api/tiktok/audio?url=${encodeURIComponent(link)}`;
}

// Fungsi untuk menentukan ucapan sesuai jam
function tampilkanUcapan() {
  const jam = new Date().getHours();
  let ucapan = "Selamat Datang";
  
  if (jam >= 5 && jam < 11) {
    ucapan = "🌅 Selamat Pagi!";
  } else if (jam >= 11 && jam < 15) {
    ucapan = "☀️ Selamat Siang!";
  } else if (jam >= 15 && jam < 18) {
    ucapan = "🌇 Selamat Sore!";
  } else {
    ucapan = "🌙 Selamat Malam!";
  }
  
  const el = document.getElementById("ucapan-waktu");
  if (el) el.textContent = ucapan;
}

// Tampilkan saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", tampilkanUcapan);

// Update otomatis setiap 1 menit
setInterval(tampilkanUcapan, 60000);
