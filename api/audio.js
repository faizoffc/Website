import axios from 'axios';
import https from 'https';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const { data } = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const audioUrl = data?.data?.music;
    if (!audioUrl) return res.status(404).json({ error: 'Audio not found' });

    https.get(audioUrl, stream => {
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-audio.mp3"');
      stream.pipe(res);
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
