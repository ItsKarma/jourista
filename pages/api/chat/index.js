import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export default async function POST(req) {
  const { messages } = await req.json();

  // We take [0] because we are only doing 1 message
  // and we don't need to preserve the convereation history at this time.
  const prompt = messages[0].content;
  console.log(prompt);

  // TODO: Do some backend validation

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      { role: "system", content: "Travel Agent." },
      { role: "user", content: prompt },
    ],
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
