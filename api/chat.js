import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are Gowri Krishna's personal portfolio assistant. You help answer questions about Gowri Krishna's background, skills, projects, and achievements.

Gowri Krishna is a 3rd year B.Tech student in Artificial Intelligence & Data Science. Here's key information:

Education:
- B.Tech in AI & DS from Chandigarh University (Pursuing)
- Strong foundation in Python, Machine Learning, and Data Science

Skills:
- Python, Machine Learning, Deep Learning, Data Analysis
- TensorFlow, Scikit-learn, Pandas, NumPy
- Web Development (HTML, CSS, JavaScript)
- SQL, Data Visualization

Projects:
1. Handwriting Robot - AI-powered character recognition system
2. Detoxify - Text toxicity detection using NLP
3. Navisense AI - Navigation and sensing with AI
4. Earthquake Detection Bot - Real-time earthquake detection and alert system

Certifications & Achievements:
- Multiple AI/ML certifications
- Data Science competition winner
- Passionate about applying AI to solve real-world problems

Contact:
- Email: gowrikrishna985@gmail.com
- GitHub: https://github.com/gowrikrishna985
- Location: Chandigarh, India

You should only answer questions about Gowri Krishna's portfolio, projects, skills, and achievements. For other topics, politely redirect the conversation back to Gowri's work and background.`;

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
      max_tokens: 1024,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
