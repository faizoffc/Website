const express = require('express');
const axios = require('axios');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// TikTok Downloader
app.post('/api/tiktok', async (req, res) => {
  const { url } = req.body;
  try {
    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
    const response = await axios.get(api);
    res.json(response.data);
  } catch (err) {
    console.error('TikTok error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil video TikTok' });
  }
});

// YouTube Downloader
app.get('/api/youtube', async (req, res) => {
  const { url } = req.query;
  if (!ytdl.validateURL(url)) return res.status(400).json({ error: 'URL YouTube tidak valid' });
  
  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
    res.json({
      title: info.videoDetails.title,
      formats: formats.map(format => ({
        qualityLabel: format.qualityLabel,
        container: format.container,
        url: format.url
      }))
    });
  } catch (err) {
    console.error('YouTube error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data YouTube' });
  }
});

// Instagram Downloader
app.post('/api/instagram', async (req, res) => {
  const { url } = req.body;
  try {
    const api = `https://api.zeeone-v2.com/downloader/igdl?url=${encodeURIComponent(url)}&apikey=APIKEYKAMU`;
    const response = await axios.get(api);
    res.json(response.data);
  } catch (err) {
    console.error('Instagram error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil video Instagram' });
  }
});

// Facebook Downloader
app.post('/api/facebook', async (req, res) => {
  const { url } = req.body;
  try {
    const api = `https://api.zeeone-v2.com/downloader/fb?url=${encodeURIComponent(url)}&apikey=APIKEYKAMU`;
    const response = await axios.get(api);
    res.json(response.data);
  } catch (err) {
    console.error('Facebook error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil video Facebook' });
  }
});

// Twitter Downloader
app.post('/api/twitter', async (req, res) => {
  const { url } = req.body;
  try {
    const api = `https://api.zeeone-v2.com/downloader/twitter?url=${encodeURIComponent(url)}&apikey=APIKEYKAMU`;
    const response = await axios.get(api);
    res.json(response.data);
  } catch (err) {
    console.error('Twitter error:', err.message);
    res.status(500).json({ error: 'Gagal mengambil video Twitter' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});