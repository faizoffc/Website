const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint untuk download video TikTok
app.get('/api/tiktok/video', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Link tidak boleh kosong.' });
  }

  try {
    // Ganti dengan API downloader TikTok yang kamu pakai (ini contoh public)
    const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);

    if (response.data && response.data.data) {
      return res.redirect(response.data.data.play); // Video no watermark
    } else {
      return res.status(500).json({ error: 'Gagal mendapatkan video.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan server.', detail: err.message });
  }
});

// Endpoint untuk download audio TikTok
app.get('/api/tiktok/audio', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Link tidak boleh kosong.' });
  }

  try {
    const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);

    if (response.data && response.data.data) {
      return res.redirect(response.data.data.music); // Link MP3
    } else {
      return res.status(500).json({ error: 'Gagal mendapatkan audio.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan server.', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
