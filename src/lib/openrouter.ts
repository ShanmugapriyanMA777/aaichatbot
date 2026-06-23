export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionResponse {
  id: string;
  choices: {
    message: Message;
    finish_reason: string;
  }[];
}

export async function chatWithOpenRouter(
  messages: Message[],
  model: string,
  apiKey: string,
  onStream?: (text: string) => void
) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://ai-nexus.app", // Optional
      "X-Title": "AI Nexus", // Optional
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      stream: !!onStream,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch from OpenRouter: ${response.statusText}`);
  }

  if (onStream) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr === "[DONE]") break;
            
            try {
              const data = JSON.parse(dataStr);
              const text = data.choices[0]?.delta?.content || "";
              accumulatedText += text;
              onStream(accumulatedText);
            } catch (e) {
              console.error("Error parsing stream chunk", e);
            }
          }
        }
      }
    }
    return accumulatedText;
  } else {
    const data: ChatCompletionResponse = await response.json();
    return data.choices[0].message.content;
  }
}

export const AVAILABLE_MODELS = [
  { id: "deepseek/deepseek-chat", name: "DeepSeek V3 (Free)", free: true },
  { id: "qwen/qwen-2.5-72b-instruct", name: "Qwen 2.5 72B (Free)", free: true },
  { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B (Free)", free: true },
  { id: "mistralai/mistral-small-24b-instruct-2501:free", name: "Mistral Small (Free)", free: true },
  { id: "google/gemma-2-9b-it:free", name: "Gemma 2 9B (Free)", free: true },
];
