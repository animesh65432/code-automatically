import "dotenv/config"
import { GoogleGenerativeAI } from "@google/generative-ai"

const MODEL_NAME = process.env.MODEL_NAME as string

async function main() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    model.generationConfig.temperature = 0.0

    const chat = model.startChat();

    const responseStream = await chat.sendMessage("Write the code for a todo application in react or nextjs or express?");


    const data = await responseStream?.response

    console.log(data?.text())
}

main().catch((error) => {
    console.error("Error:", error);
});                  