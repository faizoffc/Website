// File: /api/tiktok-video.js
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL TikTok tidak ditemukan.' });

  try {
    const finalUrl = await resolveRedirect(url);
    const { data } = await axios.get(`https://api.tikwm.com/?url=${encodeURIComponent(finalUrl)}`);

    if (data.code !== 0) {
      return res.status(500).json({ error: 'Gagal mengambil video.' });
    }

    return res.status(200).json({
      video_url: data.data.play,
      title: data.data.title,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
  }
}

async function resolveRedirect(shortUrl) {
  try {
    const res = await axios.head(shortUrl, {
      maxRedirects: 0,
      validateStatus: status => status >= 300 && status < 400,
    });
    return res.headers.location || shortUrl;
  } catch {
    return shortUrl;
  }
}
