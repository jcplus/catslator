const axios = require('axios');

async function translateMarkdownToChinese(markdown) {
	const apiKey = 'your_api_key_here'; // 替换为您的API密钥
	const url = 'https://api.openai.com/v1/engines/davinci-codex/translations'; // 替换为相应的API URL

	const response = await axios.post(
		url,
		{
			prompt: `Translate the following English Markdown text to Chinese:\n\n${markdown}`,
			max_tokens: 1000,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`,
			},
		}
	);

	return response.data.choices[0].text;
}

module.exports = {
	translateMarkdownToChinese,
};
