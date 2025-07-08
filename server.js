const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/download", async (req, res) => {
  const { url, type } = req.query;
  if (!url || !type) return res.status(400).send("Request tidak valid.");

  try {
    const apiUrl = `https://ttsave.app/api/ajax/search`;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://ttsave.app",
      "Referer": "https://ttsave.app/",
    };

    const formData = new URLSearchParams();
    formData.append("q", url);

    const response = await axios.post(apiUrl, formData.toString(), { headers });
    const result = response.data;

    if (type === "video") {
      return res.redirect(result.links.nowatermark); // video HD tanpa watermark
    } else if (type === "audio") {
      return res.redirect(result.links.music); // audio mp3
    } else {
      return res.status(400).send("Jenis download tidak valid.");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Gagal mengambil video/audio TikTok.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
