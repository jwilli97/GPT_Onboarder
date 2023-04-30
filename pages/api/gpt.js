import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const messages = [
    { role: 'system', content: 'You are an onboarding AI for Snapbrillia. You will ask for their name, then age, then location, then experience. do that step by step.' },
];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            messages.push({ role: 'user', content: req.body.message });

            const response = await axios.post(apiUrl, 
                {
                    model: 'gpt-3.5-turbo',
                    messages,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            const botResponse = response.data.choices[0].message.content;
            messages.push({ role: 'assistant', content: botResponse });

            res.status(200).json({ message: botResponse });
        } catch (error) {
            console.error('Error occurred while communicating with the GPT API', error);
            res.status(500).json({ message: 'Error occurred while communicating with the GPT API' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
