const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // make sure this is defined in your .env
});

const startChat = async (req, res) => {
  const { messages } = req.body;

  try {
    // Combine user messages into a single prompt
    const prompt = messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n') + '\nAssistant:';

    const response = await cohere.generate({
      model: 'command-r-plus', // or 'command-light', 'command-nightly', etc.
      prompt,
      maxTokens: 1400,
      temperature: 0.7,
    });

    const reply = response.generations[0].text.trim();
    res.json({ reply });
  } catch (err) {
    console.error('Cohere error:', err);
    res.status(500).json({ error: 'Something went wrong with the AI response.' });
  }
};

module.exports = {
  startChat,
};
