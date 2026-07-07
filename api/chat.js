import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are Gowri Krishna's personal portfolio assistant.
Answer questions about Gowri concisely and professionally in 2-3 sentences max.
Here is everything about Gowri:

- Full name: Gowri Krishna
- Email: gowrikrishna985@gmail.com
- Phone: +91 91887 28174
- GitHub: github.com/gowrikrishna985
- Location: Alappuzha, Kerala, India
- Education: 3rd year B.Tech in AI & Data Science at Muthoot Institute of Technology and Science, Ernakulam (2023 - Present)
- Skills: Python, C, Machine Learning, Deep Learning, Flask, FastAPI, Computer Vision, Redis, UI/UX Design
- Languages spoken: English, Hindi, Malayalam

Projects:
1. Handwriting Machine Robot - CNC robot that replicates personalised handwriting using G-code, stepper motors and computer vision for stroke extraction
2. Detoxify - Full-stack Flask app with a pretrained RoBERTa NLP model to detect toxic YouTube comments, with severity classification, filtering and PDF report export
3. Navisense AI - Intelligent navigation assistant using LSTM networks, FastAPI, Google Maps API, OpenWeather API and Redis caching
4. Earthquake Detection Bot - IoT device using a vibration sensor to detect seismic activity and send real-time Telegram alerts

Certifications: NPTEL Python in Data Science, IBM Introduction to AI, MERN Stack course, Generative AI course

Achievements:
- Participated in Smart India Hackathon — built a Safety and Tourism app
- Participated in an international CTF competition by MCSC
- Participated in Unstop Hackathon — built an AI travel platform covering cost, weather, delivery time and delivery personnel health

If asked something not related to Gowri, politely say you can only answer questions about Gowri Krishna.
Keep answers short, friendly and professional.`;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
