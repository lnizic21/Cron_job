import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();



const client = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
);

export async function generateSermon(gospelText, popeName) {
  try {
    const prompt = `Napiši propovijed na temelju sljedećeg teksta evanđelja: "${gospelText}". Propovijed treba biti inspirirana stilom i porukom pape ${popeName}.`;

    const response = await client.chat.completions.create({
      model: "gpt-5-nano", // ili drugi model koji tvoj račun podržava
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400, // ili max_output_tokens ovisno o verziji SDK-a
    });

    // Ovisno o odgovoru SDK-a, sadržaj može biti ovdje:
    const message = response.choices?.[0]?.message?.content ?? response.output?.[0]?.content?.[0]?.text;
    return message;
  } catch (err) {
    console.error("generateSermon error:", err);
    throw err;
  }
}
