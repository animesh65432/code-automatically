import "dotenv/config"
import { GoogleGenerativeAI } from "@google/generative-ai"

const MODEL_NAME = "gemini-pro";

async function main() {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const chat = model.startChat();

    const firstResponse = await chat.sendMessage(
        "Hello there, how are you today?"
    );
    console.log("Gemini:", firstResponse?.response?.text());

    const secondResponse = await chat.sendMessage("Can you create Todo APplication ?");
    console.log("Gemini:", secondResponse.response?.text());
}

main().catch((error) => {
    console.error("Error:", error);
});                         