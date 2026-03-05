export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, system } = req.body;

    const groqMessages = [
      { role: 'system', content: system },
      ...messages
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        max_tokens: 1000,
        messages: groqMessages,
      }),
    });

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data));
    
    const reply = data.choices?.[0]?.message?.content;
    
    if (!reply) {
      console.error('No reply in data:', JSON.stringify(data));
      return res.status(200).json({
        content: [{ type: 'text', text: 'Sorry, I could not get a response. Error: ' + JSON.stringify(data.error || 'unknown') }]
      });
    }

    return res.status(200).json({
      content: [{ type: 'text', text: reply }]
    });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}