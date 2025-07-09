const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/download", async (req, res) => {
  const { url, type } = req.query;
  if (!url || !type) return res.status(400).send("Permintaan tidak lengkap.");
  
  try {
    const api = "https://www.tikwm.com/api/";
    const { data } = await axios.get(`${api}?url=${encodeURIComponent(url)}`);
    
    if (data && data.data) {
      if (type === "video") {
        return res.redirect(data.data.play); // MP4 video HD
      } else if (type === "audio") {
        return res.redirect(data.data.music); // MP3 audio
      }
    }
    
    res.status(500).send("Gagal mengambil data video/audio.");
  } catch (e) {
    res.status(500).send("Terjadi kesalahan: " + e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});