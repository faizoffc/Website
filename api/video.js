import axios from 'axios';
import https from 'https';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const { data } = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const videoUrl = data?.data?.play;
    if (!videoUrl) return res.status(404).json({ error: 'Video not found' });

    https.get(videoUrl, stream => {
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
      stream.pipe(res);
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
