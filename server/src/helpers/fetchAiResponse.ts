export default async function fetchAiResponse(code: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: `Analyze this JavaScript/TypeScript code and provide feedback on best practices, performance, and possible errors: ${code}`,
          },
        ],
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Parse the JSON response
  const data = await response.json();

  // Extract the AI message content
  const aiMessage = data.choices[0].message.content;

  return aiMessage;
}
