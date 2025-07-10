const axios = require('axios');
const https = require('https');

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Link kosong.' });

  try {
    const api = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const videoUrl = api.data?.data?.play;

    if (!videoUrl) return res.status(500).json({ error: 'Gagal ambil video.' });

    https.get(videoUrl, (stream) => {
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
      stream.pipe(res);
    });

  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil video.', detail: err.message });
  }
}