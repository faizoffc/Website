const express = require('express');
const axios = require('axios');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Endpoint video MP4
app.get('/api/video', async (req, res) => {
  const { url } = req.query;
  
  if (!url) return res.status(400).json({ error: 'Link TikTok tidak ditemukan' });
  
  try {
    const { data } = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const videoLink = data?.data?.play;
    
    if (!videoLink) return res.status(500).json({ error: 'Gagal ambil video.' });
    
    https.get(videoLink, (stream) => {
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
      stream.pipe(res);
    });
    
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan saat ambil video.', detail: err.message });
  }
});

// Endpoint audio MP3
app.get('/api/audio', async (req, res) => {
  const { url } = req.query;
  
  if (!url) return res.status(400).json({ error: 'Link TikTok tidak ditemukan' });
  
  try {
    const { data } = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const audioLink = data?.data?.music;
    
    if (!audioLink) return res.status(500).json({ error: 'Gagal ambil audio.' });
    
    https.get(audioLink, (stream) => {
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-audio.mp3"');
      stream.pipe(res);
    });
    
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan saat ambil audio.', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server TikTok Downloader aktif di http://localhost:${PORT}`);
});