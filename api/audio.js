const axios = require('axios');
const https = require('https');

export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) return res.status(400).json({ error: 'Link kosong.' });
  
  try {
    const api = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const audioUrl = api.data?.data?.music;
    
    if (!audioUrl) return res.status(500).json({ error: 'Gagal ambil audio.' });
    
    https.get(audioUrl, (stream) => {
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-audio.mp3"');
      stream.pipe(res);
    });
    
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil audio.', detail: err.message });
  }
}