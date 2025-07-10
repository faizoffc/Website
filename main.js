// Validasi input link
function validasiLink(link) {
  if (!link || link.trim() === "") {
    alert("⚠️ Masukkan link TikTok terlebih dahulu.");
    return false;
  }
  return true;
}

// Download Video MP4
function downloadVideo() {
  const link = document.getElementById("tiktokLink").value;
  if (!validasiLink(link)) return;

  fetch(`/api/video?url=${encodeURIComponent(link)}`)
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil video.");
      return response.blob();
    })
    .then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tiktok-video.mp4";
      a.click();
    })
    .catch(() => alert("❌ Gagal download video."));
}

// Download Audio MP3
function downloadAudio() {
  const link = document.getElementById("tiktokLink").value;
  if (!validasiLink(link)) return;

  fetch(`/api/audio?url=${encodeURIComponent(link)}`)
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil audio.");
      return response.blob();
    })
    .then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tiktok-audio.mp3";
      a.click();
    })
    .catch(() => alert("❌ Gagal download audio."));
}
