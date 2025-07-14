function downloadVideo() {
  const url = document.getElementById("link").value.trim();
  if (!url) return alert("⚠ Masukkan link TikTok terlebih dahulu");

  const downloadLink = `/api/video?url=${encodeURIComponent(url)}`;
  startDownload(downloadLink, "tiktok-video.mp4");
}

function downloadAudio() {
  const url = document.getElementById("link").value.trim();
  if (!url) return alert("⚠ Masukkan link TikTok terlebih dahulu");

  const downloadLink = `/api/audio?url=${encodeURIComponent(url)}`;
  startDownload(downloadLink, "tiktok-audio.mp3");
}

function startDownload(fileUrl, filename) {
  fetch(fileUrl)
    .then(res => {
      if (!res.ok) throw new Error("Download gagal.");
      return res.blob();
    })
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => alert("❌ " + err.message));
}
