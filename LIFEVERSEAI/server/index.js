require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('LIFEVERSE server chal raha hai'));

app.post('/chat', async (req, res) => {
  try {
    const messages = req.body.messages || [];
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const model = process.env.MODEL || 'gemini-3.8-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: 'You are LIFEVERSE AI, a friendly, helpful assistant. Reply in the same language as the user.' }],
        },
        contents,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      console.error(JSON.stringify(data));
      return res.status(500).json({ error: 'AI error' });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') ||
      'Jawab nahi mila.';
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'AI error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('Server running on port ' + PORT));