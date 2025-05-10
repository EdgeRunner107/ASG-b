// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const SHEET_ID = '161LN8Fiwe8YSsOnC6itWv7sWLQAJXy_DOGSXG-w1P8I';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

app.use(cors()); // 👈 CORS 허용 설정

// ✅ '/a' 엔드포인트로 변경
app.get('/a', async (req, res) => {
  try {
    const response = await axios.get(SHEET_URL);
    const data = JSON.parse(response.data.match(/(?<=\().*(?=\))/)[0]);

    const rows = data.table.rows.map(row =>
      row.c.map(cell => (cell ? cell.v : null))
    );

    res.json(rows); // 🔁 전체 데이터 그대로 응답
    console.log(rows)
  } catch (error) {
    console.error('Error fetching sheet:', error.message);
    res.status(500).json({ error: 'Failed to fetch Google Sheet data' });
  }
});
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
